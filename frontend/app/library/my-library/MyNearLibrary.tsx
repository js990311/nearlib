"use client"

import {useEffect, useRef, useState} from "react";
import MarkedMap from "@/app/components/map/MarkedMap";
import LatLng from "@/types/LatLng";
import LibraryMarkedMap from "@/app/components/library/LibraryMarkedMap";

export default function MyNearLibrary () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [libraries, setLibraries] = useState([]);

    useEffect(()=>{
        if( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("get current position", position);
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    },[])

    useEffect(()=>{
        if(location.lat === null || location.lng === null) return;
        console.log("location", location);
        fetch(`http://localhost:8080/library/near?lat=${location.lat}&lng=${location.lng}&range=${10000}`)
            .then(resp => resp.json())
            .then(data=>{
                setLibraries(data.contents);
            });
    }, [location]);
    
    return (
        <div>
            <LibraryMarkedMap
                center={location}
                libraries={libraries}
            />
        </div>
    )
}
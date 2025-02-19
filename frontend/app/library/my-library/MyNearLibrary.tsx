"use client"

import {useEffect, useRef, useState} from "react";
import MarkedMap from "@/app/components/map/MarkedMap";
import LatLng from "@/types/LatLng";
import LibraryMarkedMap from "@/app/components/map/LibraryMarkedMap";

export default function MyNearLibrary () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [libraries, setLibraries] = useState([]);

    useEffect(()=>{
        if( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    },[])

    useEffect(()=>{
        if(location.lat === null || location.lng === null) return;
        fetch(`http://localhost:8080/library/near?lat=${location.lat}&lng=${location.lng}&range=${10000}`)
            .then(resp => resp.json())
            .then(data=>{
                console.log(data.contents);
                setLibraries(data.contents);
            });
    }, [location]);

    useEffect(()=>{
        if(location.latitude === null || location.longitude === null) return;
    }, [libraries]);

    return (
        <div>
            <p>{location.latitude}</p>
            <p>{location.longitude}</p>
            <ul>
                {libraries.map(library => (
                    <li key={library.id}>{library.name}</li>
                ))}
            </ul>
            <LibraryMarkedMap
                center={location}
                libraries={libraries}
            />
        </div>
    )
}
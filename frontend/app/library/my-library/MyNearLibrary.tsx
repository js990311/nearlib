"use client"

import {useEffect, useRef, useState} from "react";
import MarkedMap from "@/app/components/map/MarkedMap";
import Latlng from "@/types/latlng";
import LibraryMarkedMap from "@/components/map/LibraryMarkedMap";
import NearLibraryMarkedMap from "@/components/map/NearLibraryMarkedMap";
import RangeRemoteController from "@/components/map/sidebar/RangeRemoteController";

export default function MyNearLibrary () {
    const [location, setLocation] = useState<Latlng | null>(null);
    const [libraries, setLibraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [distance, setDistance] = useState<number>(10000);

    console.log(`서버 : ${process.env.NEXT_PUBLIC_API_BASE}`);

    useEffect(()=>{
        if( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("get current position", position);
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }, (e)=>{
                setError('사용자의 위치정보를 획득하지 못했습니다.');
                setIsLoading(false);
            });
        }
    },[])

    const fetchLibrary = () => {
        if(location == null || location.lat === null || location.lng === null) return;
        console.log("location", location);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/library/near?lat=${location.lat}&lng=${location.lng}&range=${distance}`)
            .then(resp => resp.json())
            .then(data=>{
                setLibraries(data.contents);
            });
    }

    useEffect(()=>{
        fetchLibrary();
    }, [location]);

    return (
        <div>
            <h1>내 주변 도서관 </h1>
            <div>
                <button onClick={() => {
                    fetchLibrary();
                }}>찾기
                </button>
            </div>
            {
                location != null
                &&
                <NearLibraryMarkedMap
                    center={location}
                    libraries={libraries}
                    radius={distance}
                    range={distance}
                    setRange={setDistance}
                    onSearch={() => {fetchLibrary();}}
                />
            }
        </div>
    )
}
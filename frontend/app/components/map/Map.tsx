"use client"

import {useEffect, useRef, useState} from "react";
import Script from "next/script";

export default function Map({lat, lng}: {lat: number, lng: number}) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapState, setMapState] = useState<naver.maps.Map | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(isLoading){
            console.log("Map loaded");
            if(!mapRef.current && typeof window === "undefined" && !window.naver) return;
            const {naver} = window;
            let map: naver.maps.Map;

            console.log(`${lat}, ${lng}`);
            const mapOptions: naver.maps.MapOptions = {
                center: new naver.maps.LatLng(lng, lat),
                zoom: 15,
                zoomControl: false,
            }
            map = new naver.maps.Map(mapRef.current, mapOptions);
            setMapState(map);
        }
    },[isLoading]);

    useEffect(() => {
    }, [lat, lng]);

    return (
        <div>
            <Script
                strategy="afterInteractive"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=br63ap9skm`}
                onLoad={() =>{
                    console.log("로딩되긴 한거임?");
                    setIsLoading(true);
                }}
            />
            <h3>맵</h3>
            <div id="map" ref={mapRef} className="w-[400px] h-[400px]">
            
            </div>
        </div>
    );
}
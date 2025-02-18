"use client"

import {useEffect, useRef, useState} from "react";
import Script from "next/script";

type LatLng = {
    lat: number;
    lng: number;
}

type MarkedMapProps = {
    center: LatLng;
    markers: LatLng[];
}

export default function MarkedMap({center, markers}: MarkedMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapState, setMapState] = useState<naver.maps.Map | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(isLoading){
            if(!mapRef.current || !window.naver) return;
            const {naver} = window;

            const mapOptions: naver.maps.MapOptions = {
                center: center,
                zoom: 15,
                zoomControl: false,
            }
            let map: naver.maps.Map = new naver.maps.Map(mapRef.current, mapOptions);
            let drawingMarkers = markers.map((markerLatLng: LatLng) => {
                return new naver.maps.Marker({
                    position: markerLatLng,
                    map: map
                });
            });

            setMapState(map);
        }
    },[isLoading]);

    return (
        <div>
            <Script
                strategy="afterInteractive"
                src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=br63ap9skm&submodules=drawing"
                onLoad={() => {
                    setIsLoading(true);
                }}
            />
            <h3>맵</h3>
            <div id="map" ref={mapRef} className="w-[400px] h-[400px]">

            </div>
        </div>
    );
}
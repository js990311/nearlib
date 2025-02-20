"use client"

import {useEffect, useRef, useState} from "react";
import Script from "next/script";
import LatLng from "@/types/LatLng";

type MarkedMapProps = {
    center: LatLng;
    markers: LatLng[];
    zoom: number,
    className ?: string
};

export default function MarkedMap({center, markers, zoom=15, className="w-[400px] h-[400px]"}: MarkedMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapState, setMapState] = useState<naver.maps.Map | null>(null);
    const [dmarkers, setDmarkers] = useState<naver.maps.Marker[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    console.log("markers", markers);

    useEffect(()=>{
        if(isLoading){
            if(!mapRef.current || !window.naver) return;
            // map 객체가 null이면 만들기
            const {naver} = window;

            const mapOptions: naver.maps.MapOptions = {
                center: center,
                zoom: zoom,
                zoomControl: false,
            }
            let map: naver.maps.Map = new naver.maps.Map(mapRef.current, mapOptions);
            setMapState(map);
        }
    },[isLoading]);

    useEffect(()=>{
        if(mapState !== null){
            if(dmarkers !== null){
                dmarkers.forEach((marker)=>{
                    marker.setMap(null);
                });
            }
            const drawingMarkers = markers.map((markerLatLng: LatLng) => {
                return new naver.maps.Marker({
                    position: markerLatLng,
                    map: mapState
                });
            });
            setDmarkers(drawingMarkers);
        }
    }, [mapState, markers]);

    useEffect(() => {
        if(mapState != null){
            mapState.setCenter(center);
        }
    }, [mapState, center]);

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
            <div id="map" ref={mapRef} className={className}>

            </div>
        </div>
    );
}
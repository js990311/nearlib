"use client"

import {useEffect, useRef, useState} from "react";
import Script from "next/script";
import LatLng from "@/types/LatLng";

type MarkedMapProps = {
    center: LatLng;
    markers: LatLng[];
    zoom: number,
    className ?: string,
    selected?: number | null
};

export default function MarkedMap({center, markers, zoom=15, selected}: Readonly<MarkedMapProps>) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapState, setMapState] = useState<naver.maps.Map | null>(null);
    const [dmarkers, setDmarkers] = useState<naver.maps.Marker[]>([]);

    console.log("markers", markers);

    const createNaverMap = () => {
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
        if(mapState !== null){
            console.log("center", center);
            mapState.setCenter(center);
        }
    }, [mapState, center]);

    // useEffect(() => {
    //     if(mapState !== null && selected !== null){
    //         console.log(selected, selected);
    //         mapState.setCenter(selected);
    //     }
    // }, [mapState, selected]);

    return (
        <div>
            <Script
                strategy="afterInteractive"
                src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=br63ap9skm&submodules=drawing"
                onReady={() => {
                    createNaverMap();
                }}
            />
            <div id="map" ref={mapRef}
                 className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl shadow-lg border border-gray-300 overflow-hidden">
            </div>
        </div>
    );
}
"use client"

import {useEffect, useRef, useState} from "react";
import Script from "next/script";
import LatLng from "@/types/LatLng";
import Marker from "@/types/Marker";
import marker from "@/types/Marker";
import content from "*.bmp";

type MarkedMapProps = {
    center: LatLng;
    markers: Marker[];
    zoom?: number,
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
            const drawingMarkers = markers.map((marker: Marker) => {
                const dmarker =  new naver.maps.Marker({
                    position: marker.position,
                    map: mapState,
                    icon: {
                        url: '/images/logo.png',
                        size: new naver.maps.Size(25, 34),
                        scaledSize: new naver.maps.Size(25, 34),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(12, 34)
                    }
                });
                if(marker.infoContent){
                    const infowindow = new naver.maps.InfoWindow({
                        content: marker.infoContent
                    });
                    naver.maps.Event.addListener(dmarker, "click", (e)=>{
                        if(infowindow.getMap()){
                            infowindow.close();
                        }else {
                            infowindow.open(mapState,dmarker);
                        }
                    });
                }
                return dmarker;
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
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=drawing`}
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
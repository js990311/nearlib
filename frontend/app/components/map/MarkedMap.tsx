"use client"

import {useEffect, useRef, useState} from "react";
import Script from "next/script";
import Latlng from "@/types/latlng";
import Marker from "@/types/marker";
import marker from "@/types/marker";
import content from "*.bmp";

type MarkedMapProps = {
    center: Latlng;
    markers: Marker[];
    zoom?: number,
    className ?: string,
    selected?: number | null,
    isPerson?: boolean,
    radius ?: number
};

export default function MarkedMap({center, markers, zoom=15, selected, isPerson, radius}: Readonly<MarkedMapProps>) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapState, setMapState] = useState<naver.maps.Map | null>(null);
    const [dmarkers, setDmarkers] = useState<naver.maps.Marker[]>([]);
    const [cMarker, setCMarker] = useState<naver.maps.Marker | null>(null);
    const [circle, setCircle] = useState<naver.maps.Circle | null>(null);

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

            // 도서관 마커들
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

            // 중심 마커
            const centerMarker =  new naver.maps.Marker({
                position: center,
                map: mapState,
                icon: {
                    url: '/images/my_pin.png',
                    size: new naver.maps.Size(25, 34),
                    scaledSize: new naver.maps.Size(25, 34),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(12, 34)
                }
            });
            setCMarker(centerMarker);
        }
    }, [mapState, markers]);

    useEffect(() => {
        if(mapState === null){
            return;
        }
        // 중심선 기준 원 그리기
        if(radius){
            if(circle){ // 있으먄 재설정
                circle.setRadius(radius);
            }else { // 없으면 그려
                const circleTmp = new naver.maps.Circle({
                    strokeColor: '#E74C3C',
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                    fillColor: '#E74C3C',
                    fillOpacity: 0.1,
                    center: center, // 원의 중심 좌표
                    radius: radius,                                         // 원의 반경 (미터 단위)
                    zIndex: 100,
                    clickable: false,
                    map: mapState
                });
                setCircle(circleTmp);
            }
        }
    }, [mapState, radius]);

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
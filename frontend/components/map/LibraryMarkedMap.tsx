"use client"

import {useEffect, useRef, useState} from "react";
import Marker, {MarkerInfo} from "@/types/marker";
import Latlng from "@/types/latlng";
import Library from "@/types/library";
import Map, {MapHandler} from "@/components/map/Map";
import map from "@/components/map/Map";
import library from "@/types/library";

type LibraryMarkedMapProps = {
    center: Latlng;
    libraries: Library[],
    zoom?: number,
    className?: string
    isPerson?: boolean,
    radius ?: number;
}

const buildInfoWindow = (library : Library) : string => {
    return `
                  <div class="max-w-xs p-4 bg-white rounded-xl shadow-lg font-sans">
                    <h1 class="text-xl font-semibold text-gray-800 mb-2">
                      ${library.name}
                    </h1>
                    <p class="text-sm text-gray-600 mb-4">
                      ${library.address}
                    </p>
                    <a
                      href="${library.webpage}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                      도서관 홈페이지로
                    </a>
                  </div>
                `
}

export default function LibraryMarkedMap({center:initCenter, libraries, zoom=15, isPerson, radius}: LibraryMarkedMapProps) {
    const [selected, setSelected] = useState<number>(0);
    const [center, setCenter] = useState(initCenter);
    const mapRef = useRef<MapHandler | null>(null);

    useEffect(()=>{
        const libraryMarkers: MarkerInfo[] = libraries.map((library) => {
            return {
                position: {
                    lat : library.latitude,
                    lng : library.longitude
                },
                infoContent : buildInfoWindow(library),
                markerId: library.id,
                iconUrl: '/images/logo.png'
            };
        });
        mapRef.current?.drawMarkers(libraryMarkers);
    }, [libraries]);

    useEffect(() => {
        if(center){
            mapRef.current?.setCenter(center);
        }
    }, []);

    return (
        <div>
           <Map
               ref={mapRef}
               className={"w-full h-[500px] md:h-[600px] lg:h-[700px]"}
           ></Map>
        </div>
    );
}
"use client"

import LatLng from "@/types/LatLng";
import Library from "@/types/Library";
import MarkedMap from "@/app/components/map/MarkedMap";
import React, {useEffect, useRef, useState} from "react";
import LibraryCard from "@/app/components/library/LibraryCard";
import {LibraryListItem} from "@/app/library/my-library/LibraryListItem";
import OpenList from "@/app/components/list/OpenList";
import Marker from "@/types/Marker";

type LibraryMarkedMapProps = {
    center: LatLng;
    libraries: Library[],
    zoom?: number,
    className?: string
    isPerson?: boolean;
}

export default function LibraryMarkedMap({center:initCenter, libraries, zoom=15, isPerson}: LibraryMarkedMapProps) {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selected, setSelected] = useState<number>(0);
    const [center, setCenter] = useState(initCenter);


    
    useEffect(()=>{
        const libraryMarkers: Marker[] = libraries.map((library) => {
            let lat = library.latitude;
            let lng = library.longitude;

            return {
                position: {
                    lat : lat,
                    lng : lng
                },
                infoContent : `
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
                `,
            };
        });
        setMarkers(libraryMarkers);
    }, [libraries]);

    useEffect(() => {
        setCenter(initCenter);
    }, [initCenter]);

    console.log("libraries", libraries);

    console.log("LibraryMarkedMap", center, initCenter);

    return (
        <div>
            <MarkedMap
                center={center}
                markers={markers}
                zoom={zoom}
                isPerson={isPerson}
            />
            <OpenList>
                {libraries.map((library)=>(
                    <LibraryListItem
                        onClick={(center:LatLng )=>{setCenter(center)}}
                        key={library.id}
                        library={library}
                    />
                ))
                }
            </OpenList>
        </div>
    );
}
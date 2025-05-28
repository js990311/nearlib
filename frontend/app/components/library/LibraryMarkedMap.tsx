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
    zoom: number,
    className?: string;
}

export default function LibraryMarkedMap({center:initCenter, libraries, zoom=15}: LibraryMarkedMapProps) {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selected, setSelected] = useState<number>(null);
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
                infoContent : `<div><h1>${library.name}</h1><p>${library.address}</p><a href="${library.webpage}">도서관 홈페이지로</a></div>`
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
"use client"

import LatLng from "@/types/LatLng";
import Library from "@/types/Library";
import MarkedMap from "@/app/components/map/MarkedMap";
import React, {useEffect, useRef, useState} from "react";
import LibraryCard from "@/app/components/library/LibraryCard";
import {LibraryListItem} from "@/app/library/my-library/LibraryListItem";
import OpenList from "@/app/components/list/OpenList";

type LibraryMarkedMapProps = {
    center: LatLng;
    libraries: Library[],
    zoom: number,
    className?: string;
}

export default function LibraryMarkedMap({center, libraries, zoom=15}: LibraryMarkedMapProps) {
    const [markers, setMarkers] = useState<LibraryMarkedMapProps>([]);
    const [selected, setSelected] = useState<number>(null);


    
    useEffect(()=>{
        const libraryMarkers: LatLng[] = libraries.map((library) => {
            let lat = library.longitude;
            let lng = library.latitude;

            return {
                lat : lat,
                lng : lng
            };
        });
        setMarkers(libraryMarkers);
    }, [libraries]);

    console.log("libraries", libraries);

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
                        onClick={(id:number)=>{setSelected(id)}}
                        key={library.id}
                        library={library}
                    />
                ))
                }
            </OpenList>
        </div>
    );
}
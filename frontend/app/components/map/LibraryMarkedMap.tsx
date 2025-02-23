"use client"

import LatLng from "@/types/LatLng";
import Library from "@/types/Library";
import MarkedMap from "@/app/components/map/MarkedMap";
import {useEffect, useRef, useState} from "react";

type LibraryMarkedMapProps = {
    center: LatLng;
    libraries: Library[],
    zoom: number,
    className?: string;
}

export default function LibraryMarkedMap({center, libraries, zoom=15, className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl shadow-lg border border-gray-300 overflow-hidden"}: LibraryMarkedMapProps) {
    const [markers, setMarkers] = useState<LibraryMarkedMapProps>([]);

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
          <MarkedMap
            center={center}
            markers={markers}
            zoom={zoom}
            className={className}
          />
    );
}
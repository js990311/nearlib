"use client"

import LatLng from "@/types/LatLng";
import Library from "@/types/Library";
import MarkedMap from "@/app/components/map/MarkedMap";
import {useEffect, useRef, useState} from "react";

type LibraryMarkedMapProps = {
    center: LatLng;
    libraries: Library[],
    zoom: number
}

export default function LibraryMarkedMap({center, libraries, zoom=15}: LibraryMarkedMapProps) {
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
          />
    );
}
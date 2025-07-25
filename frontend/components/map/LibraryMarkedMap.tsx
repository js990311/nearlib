"use client"

import {useEffect, useRef} from "react";
import Library from "@/types/library";
import Map, {MapHandler} from "@/components/map/Map";
import {buildLibraryMarkers} from "@/utils/libraryMapUtils";
import {MarkerInfo} from "@/types/marker";

type LibraryMarkedMapProps = {
    libraries: Library[],
}

export default function LibraryMarkedMap({libraries}: LibraryMarkedMapProps) {
    const mapRef = useRef<MapHandler | null>(null);

    useEffect(()=>{
        const libraryMarkers: MarkerInfo[] = buildLibraryMarkers(libraries);
        mapRef.current?.drawMarkers(libraryMarkers);
        if(libraries.length > 1){
            mapRef.current?.setCenter({
                lat : libraries[0].latitude,
                lng : libraries[0].longitude,
            });
        }
    }, [libraries]);

    return (
        <div>
           <Map
               ref={mapRef}
               className={"w-full h-[500px] md:h-[600px] lg:h-[700px]"}
           ></Map>
        </div>
    );
}
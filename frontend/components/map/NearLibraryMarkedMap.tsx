"use client"

import {useEffect, useRef} from "react";
import Library from "@/types/library";
import Map, {MapHandler} from "@/components/map/Map";
import {buildLibraryMarkers} from "@/utils/libraryMapUtils";
import {MarkerInfo} from "@/types/marker";
import Latlng from "@/types/latlng";

type NearLibraryMarkedMapProps = {
    center: Latlng;
    radius : number;
    libraries: Library[],
}

export default function NearLibraryMarkedMap({libraries, radius, center}: NearLibraryMarkedMapProps) {
    const mapRef = useRef<MapHandler | null>(null);

    useEffect(()=>{
        const libraryMarkers: MarkerInfo[] = buildLibraryMarkers(libraries);
        mapRef.current?.drawMarkers(libraryMarkers);
    }, [libraries]);

    useEffect(() => {
        mapRef.current?.drawCircle(center, radius, '#E74C3C', '#E74C3C');
    }, [center, radius]);

    useEffect(() => {
        mapRef.current?.setCenter({
            lat : center.lat,
            lng : center.lng,
        });
    }, [center])

    return (
        <div>
           <Map
               ref={mapRef}
               className={"w-full h-[500px] md:h-[600px] lg:h-[700px]"}
           ></Map>
        </div>
    );
}
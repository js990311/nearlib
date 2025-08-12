"use client"

import {useEffect, useRef, useState} from "react";
import Library from "@/types/library";
import Map, {MapHandler} from "@/components/map/Map";
import {buildLibraryMarkers} from "@/utils/libraryMapUtils";
import {MarkerInfo} from "@/types/marker";
import MapSideBar from "@/components/map/sidebar/MapSideBar";
import LibraryCard from "@/components/list/LibraryCard";
import Latlng from "@/types/latlng";

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
        <div className={'relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden'}>
            <MapSideBar>
                <h3 className={"text-2xl font-bold"}>
                    검색결과
                </h3>
                <ul>
                    {
                        libraries.map((library: Library,) => (
                            <
                                LibraryCard library={library} key={library.id}
                                onClick={(center: Latlng) => {
                                    mapRef.current?.setCenter(center);
                                }}
                            />
                        ))
                    }
                </ul>
            </MapSideBar>
            <Map
                ref={mapRef}
                className={"w-full h-[500px] md:h-[600px] lg:h-[700px]"}
            >
            </Map>
        </div>
    );
}
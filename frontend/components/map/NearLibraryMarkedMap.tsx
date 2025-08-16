"use client"

import {useEffect, useRef} from "react";
import Library from "@/types/library";
import Map, {MapHandler} from "@/components/map/Map";
import {buildLibraryMarkers} from "@/utils/libraryMapUtils";
import {MarkerInfo} from "@/types/marker";
import Latlng from "@/types/latlng";
import MapSideBar from "@/components/map/sidebar/MapSideBar";
import RangeRemoteController from "@/components/map/sidebar/RangeRemoteController";
import LibraryCard from "@/components/list/LibraryCard";

type NearLibraryMarkedMapProps = {
    center: Latlng;
    radius : number;
    libraries: Library[],
    range: number,
    setRange: (range: number) => void
    onSearch: ()=> void;
}

export default function NearLibraryMarkedMap({libraries, radius, center, range, setRange, onSearch}: NearLibraryMarkedMapProps) {
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
        <div className={'relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden'}>
            <MapSideBar>
                <div>
                    <RangeRemoteController
                        range={range}
                        setRange={setRange}
                        onSearch={onSearch}
                    />
                </div>
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
            ></Map>
        </div>
    );
}
import LibraryCard from "@/app/components/library/LibraryCard";
import Library from "@/types/Library";
import React from "react";
import LibrarySearchBar from "@/app/library/search/components/LibrarySearchBar";
import LatLng from "@/types/LatLng";
import LibraryMarkedMap from "@/app/components/library/LibraryMarkedMap";

type LibraryResponse = {
    contents : Library[],
    contentSize: number,
    pageNumber: number,
    pageSize: number,
}

type LibrarySearchProps = Promise<{
    q : string,
    p ?: number,
    s ?: number
}>

export default async function LibrarySearch({searchParams} : {searchParams: LibrarySearchProps}) {
    const {q,p,s} = await searchParams;

    const query =  q;
    const page =  p || "1";
    const size =  s || "20";

    const {
        contents,
        contentSize,
        pageNumber,
        pageSize
    } : LibraryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/library/search?q=${query}&p=${page}&s=${size}`, {}).then(res => res.json());

    let totalLat = 0;
    let totalLng = 0;

    const libraryMarkers: LatLng[] = contents.map((library) => {
        let lat = library.latitude;
        let lng = library.longitude;

        totalLat += lat;
        totalLng += lng;

        return {
            lat : lat,
            lng : lng
        };
    });

    const center: LatLng = libraryMarkers.length === 0
        ? {lat:36.34, lng:127.77}
        : {lat: totalLat / libraryMarkers.length, lng:totalLng / libraryMarkers.length};


    return (
        <div>
            <LibrarySearchBar
                query={query}
                pageNumber={pageNumber}
                contentSize={contentSize}
                pageSize = {pageSize}
            />
            <LibraryMarkedMap
                center={center}
                libraries={contents}
                zoom={15}
            />
        </div>
    )
}
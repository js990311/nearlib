import LibraryCard from "@/app/components/library/LibraryCard";
import Library from "@/types/Library";
import React from "react";
import SearchBar from "@/app/components/searchbar/SearchBar";
import LibrarySearchBar from "@/app/library/search/components/LibrarySearchBar";
import MarkedMap from "@/app/components/map/MarkedMap";
import library from "@/types/Library";
import LatLng from "@/types/LatLng";
import LibraryMarkedMap from "@/app/components/library/LibraryMarkedMap";

type LibraryResponse = {
    contents : Library[],
    contentSize: number,
    pageNumber: number,
    pageSize: number,
}

export default async function LibrarySearch({searchParams} : {searchParams: {
        q : string,
        p ?: number,
        s ?: number
    }}) {
    const query = searchParams.q;
    const page = searchParams.p || "1";
    const size = searchParams.s || "20";

    const {
        contents,
        contentSize,
        pageNumber,
        pageSize
    } : LibraryResponse = await fetch(`http://localhost:8080/library/search?q=${query}&p=${page}&s=${size}`, {}).then(res => res.json());

    let totalLat = 0;
    let totalLng = 0;

    const libraryMarkers: LatLng[] = contents.map((library) => {
        let lat = library.longitude;
        let lng = library.latitude;

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
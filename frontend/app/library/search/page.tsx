import LibraryCard from "@/components/library/LibraryCard";
import Library from "@/types/library";
import React from "react";
import LibrarySearchBar from "@/components/searchbar/LibrarySearchBar";
import Latlng from "@/types/latlng";
import LibraryMarkedMap from "@/components/map/LibraryMarkedMap";

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

    return (
        <div>
            <LibrarySearchBar
                query={query}
                pageNumber={pageNumber}
                contentSize={contentSize}
                pageSize = {pageSize}
            />
            <LibraryMarkedMap
                libraries={contents}
            />
        </div>
    )
}
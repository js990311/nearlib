import LibraryCard from "@/app/components/library/LibraryCard";
import Library from "@/types/Library";
import React from "react";
import SearchBar from "@/app/components/searchbar/SearchBar";
import LibrarySearchBar from "@/app/library/search/components/LibrarySearchBar";

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

    return (
        <div>
            <LibrarySearchBar
                query={query}
                pageNumber={pageNumber}
                contentSize={contentSize}
                pageSize = {pageSize}
            />
            {contents.map((library)=>(
                    <LibraryCard
                        key={library.id}
                        library={library} />
                )
            )
        }
        </div>
    )
}
"use client"

import SearchBar from "@/components/searchbar/SearchBar";
import {useRouter} from "next/navigation";
import {BeforeButton, AfterButton} from "@/components/button/PageButton";

type LibrarySearchBarProps = {
    query: string,
    contentSize: number,
    pageNumber: number,
    pageSize: number,
};

export default function LibrarySearchBar({query, contentSize, pageSize, pageNumber} : LibrarySearchBarProps) {
    const router = useRouter();

    const onSearch = (q: string) => {
        router.push(`/library/search?q=${q}`);
    }

    const onPageChange = (p:number) => {
        router.push(`/library/search?q=${query}&p=${p}`);
    }

    return (
        <div className=''>
            <div>
                <SearchBar
                    onSubmit={onSearch}
                />
            </div>
            <div className="flex justify-between items-center py-3">
                <BeforeButton
                    isAble={pageNumber !== 1}
                    onClick={() => {onPageChange(pageNumber - 1)}}
                />
                <AfterButton
                    isAble={pageNumber !== pageSize}
                    onClick={() => {onPageChange(pageNumber + 1)}}
                />
            </div>
        </div>
    )
}
"use client"

import Library from "@/types/library";
import Latlng from "@/types/latlng";

type LibraryCardProps = {
    library: Library,
    onClick: (center: Latlng) => void,
}

export default function LibraryCard({library, onClick}: LibraryCardProps) {
    return (
        <li key={library.id}
            className={"bg-white border border-gray-200 rounded-lg p-4 mb-2 text-black hover:text-green-700  hover:text-green-700 hover:bg-green-100"}
            onClick={
                ()=>{onClick({lat: library.latitude, lng: library.longitude});}
            }
        >
            <h3 className={"font-extrabold text-xl"}>
                {library.name}
            </h3>
            <p>
                {library.address}
            </p>
            <a href={library.webpage} target="_blank">
                홈페이지로 가기
            </a>
        </li>
    );
}
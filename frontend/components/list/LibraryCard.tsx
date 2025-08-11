"use client"

import Library from "@/types/library";

type LibraryCardProps = {
    library: Library;
}

export default function LibraryCard({library}: LibraryCardProps) {
    return (
        <li key={library.id}
            className={"bg-white border border-gray-200 rounded-lg p-4 mb-2 text-black hover:text-green-700  hover:text-green-700 hover:bg-green-100"}
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
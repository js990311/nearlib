"use client"

import Library from "@/types/Library";
import Link from "next/link";
import LatLng from "@/types/LatLng";

type LibraryListItemProps = {
    library: Library;
    onClick: (center:LatLng) => void;
}

export function LibraryListItem({library, onClick}: LibraryListItemProps) {


    return (
        <li className="p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
            onClick={()=> onClick({
                lat: library.longitude,
                lng : library.latitude
            })}
        >
            <Link
                href={`/library/${library.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
            >
                {library.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{library.address}</p>
        </li>
    );
}
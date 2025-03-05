import React from "react";
import Link from "next/link";
import Library from "@/types/Library";

export default async function LibraryCard({library}: {library: Library}): React.ReactNode {
    return (
        <div className="p-3 border border-gray-200">
            <Link href={`/library/${library.id}`}>
                <div>
                    <div className="mb-5">
                        <p className="font-bold">
                            {library.name}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>{library.address}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
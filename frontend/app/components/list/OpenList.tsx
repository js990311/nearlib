"use client"

import React, {useState} from "react";

export default function OpenList({children}: {children:React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full"
            >
                열기
            </button>
            <div className={`z-10 mt-3 transition-all duration-300 ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
    );
}
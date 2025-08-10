"use client"

import {useState} from "react";

type MapSideBarProps={
    children: React.ReactNode
}

export default function MapSideBar({children} : MapSideBarProps){
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            className={`z-40 bg-white absolute top-0 left-0 transition-transform duration-200 h-full w-[350px] ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
            <div
                className={'relative'}
            >
                <div
                    className={'absolute top-1 right-0'}
                >
                    <button onClick={() => setIsOpen((prev)=>!prev)}>
                        열기
                    </button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
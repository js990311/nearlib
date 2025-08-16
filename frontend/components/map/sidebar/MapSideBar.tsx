"use client"


import {useState} from "react";

type MapSideBarProps={
    children: React.ReactNode,
}

export default function MapSideBar({children} : MapSideBarProps){
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            className={`z-40 bg-gray-50 p-3 absolute top-0 left-0 transition-transform duration-200 h-full w-[350px] ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
            <div
                className={'relative'}
            >
                <button
                    className={"absolute top-1.5 right-0 transform translate-x-full bg-slate-800 text-white p-1"}
                    onClick={() => setIsOpen((prev)=>!prev)}
                >
                    {isOpen ? "Close" : "Open"}
                </button>
            </div>
            <div className={'overflow-y-scroll h-full'}>
                {children}
            </div>
        </div>
    )
}
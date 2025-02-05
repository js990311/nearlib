"use client"

import Link from "next/link";
import {useState} from "react";

export default function Nav():React.ReactNode {
    const [openNav, setOpenNav] = useState(false);

    return (
        <nav>
            <div className="container mx-auto flex justify-between items-center">
                <div id="nav-left" className="flex justify-between items-center">
                    <div className="md:mr-20">
                        <Link href={"/"}>
                            TODO logo
                        </Link>
                    </div>
                    <div className="hidden md:flex justify-between items-center">
                        <Link href={"/library"}>
                            내 주변 도서관 찾기
                        </Link>
                    </div>
                </div>
                <div id="nav-right" className="hidden md:flex justify-between items-center">
                    {/* TODO 검색창 */}
                    <input type="text"/>
                    <div>
                        TODO 내 정보 보기
                    </div>
                </div>
                <div>
                    <button className="md:hidden" onClick={() => {
                        setOpenNav(true);
                    }}>
                        열기
                    </button>
                </div>
            </div>
            {/* small size nav side */}
            {openNav && (
                <div className="fixed inset-0 bg-white z-10">
                    <div className="flex flex-col ">
                        <div className="relative w-full py-3">
                            <button
                                className="absolute top-0 right-0"
                                onClick={() => {
                                    setOpenNav(false)
                                }}
                            >
                                닫기
                            </button>
                        </div>
                        <div>
                            TODO 내 정보 보기
                        </div>
                        {/* TODO 검색창 */}
                        <input type="text"/>
                        <Link href={"/library"}>
                            내 주변 도서관 찾기
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
"use client"

import Link from "next/link";
import {useState} from "react";
import IconButton from "@/app/components/button/IconButton";

export default function Nav():React.ReactNode {
    const [openNav, setOpenNav] = useState(false);

    return (
        <nav>
            <div className="container mx-auto flex justify-between items-center">
                <div id="nav-left" className="flex justify-start items-center">
                    <div className="md:mr-20">
                        <Link href={"/public"}>
                            TODO logo
                        </Link>
                    </div>
                    <div className="hidden md:flex justify-start items-center">
                        <Link href={"/library"}>
                            내 주변 도서관 찾기
                        </Link>
                    </div>
                </div>
                <div id="nav-right" className="hidden md:flex justify-end items-center">
                    {/* TODO 검색창 */}
                    <input type="text"/>
                    <div>
                        <IconButton
                            iconClass="fa-solid fa-user p-3"
                        />
                    </div>
                </div>
                <div className="md:hidden">
                    <IconButton
                        iconClass="fa-solid fa-bars"
                        className="p-3"
                        onClick={() => {
                            setOpenNav(true);
                    }} />
                </div>
            </div>
            {/* small size nav side */}
            {openNav && (
                <div className="fixed inset-0 bg-white z-10">
                    <div className="flex flex-col ">
                        <div className="relative w-full py-3">
                            <IconButton
                                iconClass="fa-solid fa-xmark p-3"
                                className="absolute top-0 right-0"
                                onClick={() => {
                                    setOpenNav(false)
                                }}
                            />
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
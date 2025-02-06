"use client"

import Link from "next/link";
import {useState} from "react";
import IconButton from "@/app/components/button/IconButton";
import NavSmall from "@/app/components/nav/NavSmall";
import SearchBar from "@/app/components/searchbar/SearchBar";

export default function Nav():React.ReactNode {
    const [openNav, setOpenNav] = useState(false);

    const closeNav = () => {
        setOpenNav(false);
    };

    return (
        <nav className="border-b border-gray-600 shadow-md bg-gray-500 text-white p-1">
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
                    <SearchBar />
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

            {/* small size nav */}
            {openNav && (
                <NavSmall
                    onClose={closeNav}
                />
            )}
        </nav>
    )
}
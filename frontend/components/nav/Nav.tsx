"use client"

import Link from "next/link";
import {useState} from "react";
import NavSmall from "@/components/nav/NavSmall";
import SearchBar from "@/components/searchbar/SearchBar";
import {useRouter} from "next/navigation";
import Logo from "@/components/logo/Logo";
import IconButton from "@/components/button/IconButton";

export default function Nav():React.ReactNode {
    const [openNav, setOpenNav] = useState(false);
    const router = useRouter();

    const onSearch = (q:string) => {
        router.push(`/library/search?q=${q}`);
    }

    const closeNav = () => {
        setOpenNav(false);
    };

    return (
        <nav className="border-b border-gray-600 shadow-md bg-slate-800 text-white p-1">
            <div className="container mx-auto flex justify-between items-center">
                <div id="nav-left" className="flex justify-start items-center">
                    <div className="md:mr-20">
                        <Link href={"/public"}>
                            <Logo />
                        </Link>
                    </div>
                    <div className="hidden md:flex justify-start items-center">
                        <Link href={"/library/my-library"}>
                            내 주변 도서관 찾기
                        </Link>
                    </div>
                </div>
                <div id="nav-right" className="hidden md:flex justify-end items-center">
                    <SearchBar
                        onSubmit={onSearch}
                    />
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
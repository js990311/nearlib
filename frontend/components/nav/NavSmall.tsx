import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import SearchBar from "@/components/searchbar/SearchBar";
import IconButton from "@/components/button/IconButton";

interface NavSmallProps {
    onClose: () => void
}

export default function NavSmall({onClose} : NavSmallProps): React.ReactNode {
    const router = useRouter();

    const onSearch = (q:string) => {
        onClose();
        router.push(`/library?q=${q}`);
    }

    return (
        <div className="fixed inset-0 bg-white z-10 text-black">
            <div className="flex flex-col ">
                <div className="relative w-full py-3">
                    <IconButton
                        iconClass="fa-solid fa-xmark p-3"
                        className="absolute top-0 right-0"
                        onClick={onClose}
                    />
                </div>
                <div>
                    TODO 내 정보 보기
                </div>
                <SearchBar
                    onSubmit={onSearch}
                />
                <Link href={"/library"}>
                    내 주변 도서관 찾기
                </Link>
            </div>
        </div>
    );
}
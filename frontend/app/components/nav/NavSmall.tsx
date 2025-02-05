import React from "react";
import IconButton from "@/app/components/button/IconButton";
import Link from "next/link";

interface NavSmallProps {
    onClose?: () => void
}

export default function NavSmall({onClose} : NavSmallProps): React.ReactNode {
    return (
        <div className="fixed inset-0 bg-white z-10">
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
                {/* TODO 검색창 */}
                <input type="text"/>
                <Link href={"/library"}>
                    내 주변 도서관 찾기
                </Link>
            </div>
        </div>
    );
}
import React from 'react';
import Logo from "@/app/components/logo/Logo";
import IconButton from "@/app/components/button/IconButton";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100  ">
                            <Image
                                src="/images/logo.png"
                                width={30}
                                height={12}
                                alt="NearLib Logo"
                                priority
                            />
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                            근처 도서관을 <span className="text-green-600 dark:text-green-400">찾아보세요</span>.
                        </h1>

                        <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 dark:text-gray-400">
                            클릭 한 번으로 간편하게 주변의 도서관을 검색하거나, 내 위치에서 가장 가까운 도서관을 찾아보세요.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href={"/library/search"}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg text-green-600 px-6 py-3 text-base font-semibold hover:text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 sm:w-auto"
                            >
                                <i className={"fa-solid fa-magnifying-glass"}></i>
                                도서관 검색하기
                            </a>
                            <a
                                href={"/library/my-library"}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-all duration-200 hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800 sm:w-auto"
                            >
                                <i className="fa-solid fa-map-location-dot"></i>
                                내 주변 도서관 찾기
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

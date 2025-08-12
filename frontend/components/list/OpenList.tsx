"use client"

import React, { useState } from "react";

export default function OpenList({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-blue-500 text-white py-2 rounded"
            >
                열기
            </button>

            {/* 딤처리 배경 */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                />
            )}

            {/* 바텀 시트 */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl p-4 shadow-lg z-50 transition-transform duration-500 ${
                    isOpen ? "translate-y-0" : "translate-y-full"
                }`}
                style={{
                    maxHeight: "70vh",
                }}
            >
                {/* 닫기 바 */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="block mx-auto mb-4 bg-gray-300 w-12 h-1.5 rounded-full"
                />

                {/* 스크롤 가능한 영역 */}
                <div className="overflow-y-auto max-h-[calc(70vh-40px)]">
                    <ul>{children}</ul>
                </div>
            </div>
        </div>
    );
}

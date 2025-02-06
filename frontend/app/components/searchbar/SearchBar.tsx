"use client"

import {useState} from "react";
import IconButton from "@/app/components/button/IconButton";

type SearchBarProps = {
    onSubmit: (q: string) => void;
};

export default function SearchBar({onSubmit}: SearchBarProps):React.ReactNode {
    const [query, setQuery] = useState('');
    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        onSubmit(query);
    };
    return (
        <form onSubmit={onSearch} className="border rounded-lg p-1 w-full bg-white text-black flex">
            <input
                type="text"
                className="outline-none w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value) }
            />
            <IconButton
                iconClass="fa-solid fa-magnifying-glass p-1"
                isSubmit={true}
            />
        </form >
    );
}
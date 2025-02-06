"use client"

import {useState} from "react";
import IconButton from "@/app/components/button/IconButton";

type SearchBarProps = {
    onSubmit?: () => void;
};

export default function SearchBar({onSubmit}: SearchBarProps):React.ReactNode {
    const [query, setQuery] = useState('');
    return (
        <div className="border rounded-lg p-1 w-full max-w-md bg-white text-black">
            <input
                type="text"
                className="outline-none"
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value) }
            />
            <IconButton
                iconClass="fa-solid fa-magnifying-glass p-1"
                onClick={onSubmit}
            />
        </div>
    );
}
"use client"

import {useEffect, useRef, useState} from "react";
import IconButton from "@/app/components/button/IconButton";

type SearchBarProps = {
    onSubmit: (q: string) => void,
};
type LibrarySuggestion = {
    contents: string[];
    count: number;
};

export default function SearchBar({onSubmit}: SearchBarProps):React.ReactNode {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [onShow, setOnShow] = useState<boolean>(false);
    const onFocusRef = useRef<HTMLFormElement>(null);

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        onSubmit(query);
    };

    useEffect(() => {
        console.log("[SearchBar] useEffect");
        
        if(!query) {
            setSuggestions([]);
            setOnShow(false);
            return;
        }
        console.log("[SearchBar] query는 있음");
        
        const handler = setTimeout(async () => {
            console.log("[SearchBar] response이 있음");
            const  resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/library/suggest?q=${query}`);
            if(!resp.ok) throw new Error("Failed to fetch library");
            console.log("[SearchBar] 통신이 제대로 됨");
            const data : LibrarySuggestion = await resp.json();
            console.log(data.contents);
            setSuggestions(data.contents);
            setOnShow(true);
        }, 1500);

        return () => {clearTimeout(handler);};
    }, [query]);

    useEffect(() => {
        const onFocusHandler = (event: MouseEvent) => {
            if(!onFocusRef.current){
                return;
            }
            if(!onFocusRef.current.contains(event.target as Node)){
                setOnShow(false);
            }
        }

        document.addEventListener("mousedown", onFocusHandler);
        return () => {
            document.removeEventListener("mousedown", onFocusHandler);
        }
    }, [onFocusRef]);

    return (
        <form ref={onFocusRef}
            onSubmit={onSearch} className="border rounded-lg p-1 w-full bg-white text-black flex relative">
            <input
                type="text"
                className="outline-none w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value) }
            />
            {
                onShow && (
                    <ul className={"absolute top-full pt-1 bg-white border-2 border-t-0 z-40"}>
                        {
                            suggestions.map((suggestion, idx) => (
                                <li
                                    key={idx}
                                    className={"p-2 border-b-2 hover:bg-gray-200 hover:cursor-pointer"}
                                >
                                    <button
                                        onClick={()=>setQuery(suggestion)}
                                    >
                                        {suggestion}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            <IconButton
                iconClass="fa-solid fa-magnifying-glass p-1"
                isSubmit={true}
            />
        </form >
    );
}
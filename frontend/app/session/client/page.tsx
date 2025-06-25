"use client"

import Link from "next/link";
import {useEffect, useState} from "react";

type ResponseType = {
    status: boolean;
    username?: string;
}

export default function ServerPage(){
    const [username, setUsername] = useState("");
    async function getUsername (){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user`, {
            credentials: 'include',
            cache: 'no-store',
        });
        const resp: ResponseType = await res.json();
        setUsername(resp.username ?? '');
    }
    useEffect( () => {
        getUsername();
    }, []);

    return (
        <div>
            <h1>{username}</h1>
        </div>
    )
}
"use client"

import {useRouter} from "next/navigation";

export default function SessionPage(){

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username':'username', 'password':'password' }),
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/session/server');
                router.refresh();
            }
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <div>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );

}


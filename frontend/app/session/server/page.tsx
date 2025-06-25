import {cookies} from "next/headers";
import Link from "next/link";

type ResponseType = {
    status: boolean;
    username?: string;
}

export default async function ServerPage(){
    const cookieStore = await cookies()
    const cookie = cookieStore.get('JSESSIONID');
    if(!cookie){
        return (
            <div>
                There is no cookie
            </div>
        )
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user`, {
        headers: {
            'Cookie': `JSESSIONID=${cookie.value}`
        },
        // credentials: 'include',
        cache: 'no-store',
    });
    const resp: ResponseType = await res.json();

    console.log(cookie);
    return (
        <div>
            <p>Session ID : </p>
            <p>{cookie?.value}</p>
            <h1>{resp.username}</h1>
            <Link href={"/session/client"}>클라이언트로</Link>
        </div>
    )
}
import Link from "next/link";

export default function Nav():React.ReactNode {
    return (
        <nav>
            <div className="container mx-auto flex justify-between items-center">
                <div id="nav-left" className="flex justify-between items-center">
                    <div className="md:mr-20">
                        <Link href={"/"}>
                            TODO logo
                        </Link>
                    </div>
                    <div className="hidden md:flex justify-between items-center">
                        <Link href={"/library"}>
                            내 주변 도서관 찾기
                        </Link>
                    </div>
                </div>
                <div id="nav-right" className="hidden md:flex justify-between items-center">
                    {/* TODO 검색창 */}
                    <input type="text"/>
                    <div>
                        TODO 내 정보 보기
                    </div>
                </div>
            </div>
        </nav>
    )
}
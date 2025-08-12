import Image from "next/image";

export default function Logo () {
    return (
        <div className="flex justify-start items-center">
            <Image
                src="/images/logo.png"
                width={30}
                height={12}
                alt="NearLib Logo"
                priority
            />
            <span className="height-[12px] ml-2 py-1 text-lg font-semibold">NearLib</span>
        </div>
    );
}
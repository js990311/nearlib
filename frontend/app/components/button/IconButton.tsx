"use client"

type IconButtonProps = {
    iconClass: string;
    className?: string;
    onClick?: () => void;
}

export default function IconButton({className, iconClass, onClick}: IconButtonProps):React.ReactNode {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            <i className={iconClass}></i>
        </button>
    )
}

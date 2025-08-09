"use client"

type IconButtonProps = {
    iconClass: string;
    className?: string;
    onClick?: () => void;
    isSubmit?: boolean;
}

export default function IconButton({className, iconClass, onClick, isSubmit=false}: IconButtonProps):React.ReactNode {
    return (
        <button
            type={isSubmit ? "submit" : "button"}
            className={className}
            onClick={onClick}
        >
            <i className={iconClass}></i>
        </button>
    )
}

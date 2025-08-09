type PageButtonProps = {
    onClick: () => void
    isAble?: boolean
}

const move = ({isAble, onClick} : PageButtonProps) => {
    if(isAble){
        onClick();
    }
}

export function BeforeButton({onClick, isAble}: PageButtonProps) {
    return (
        <button onClick={() => {
            move({isAble, onClick})
        }} className={isAble ? '' : 'opacity-30'}>
            <i className="fas fa-chevron-left"></i>
            <span>이전 페이지</span>
        </button>
    )
}

export function AfterButton({onClick, isAble}: PageButtonProps) {
    return (
        <button onClick={() => {
            move({isAble, onClick})
        }} className={isAble ? '' : 'opacity-30'}>
            <span>다음 페이지</span>
            <i className="fas fa-chevron-right"></i>
        </button>
    )
}
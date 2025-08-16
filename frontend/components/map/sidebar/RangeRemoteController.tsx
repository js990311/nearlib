"use client"

type RangeRemoteControllerProps = {
    range: number,
    setRange : (range: number) => void,
    onSearch : () => void,
}

export default function RangeRemoteController({range, setRange, onSearch}: RangeRemoteControllerProps) {

    return (
        <div
            className={"text-blue-500"}
        >
            <div
                className={"w-full"}
            >
                {/* 주 리모컨 */}
                <label htmlFor="range-slider">범위 (m 단위)</label>
                <input type="range"
                       min={"100"}
                       max={"500000"}
                       value={range}
                       onChange={(e) => {
                           setRange(Number(e.target.value));
                       }}
                />
                <input type="number"
                       value={range}
                       onChange={(e) => {
                           setRange(Number(e.target.value));
                       }}
                />
                <button
                    onClick={onSearch}
                >
                    검색하기
                </button>
            </div>
            <div>
            {/*    버튼형 리모컨  */}
            </div>
        </div>
    )
}
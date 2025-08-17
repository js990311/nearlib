"use client"

import {useState} from "react";
import IconButton from "@/components/button/IconButton";

type RangeRemoteControllerProps = {
    range: number,
    setRange : (range: number) => void,
    onSearch : () => void,
}

export default function RangeRemoteController({range, setRange, onSearch}: RangeRemoteControllerProps) {
    const [temp, setTemp] = useState<number>(100);

    return (
        <div
            className={"text-green-50 border border-green-900 bg-green-500 rounded p-2"}
        >
            <div
                className={"w-full"}
            >
                <h3
                    className={"text-lg font-bold"}
                >
                    검색 범위 (m단위)
                </h3>
                <div>
                    <input type="number"
                           className={"bg-green-700 rounded p-2"}
                           value={range}
                           onChange={(e) => {
                               setRange(Number(e.target.value));
                           }}
                    />
                    <button
                        className={"bg-blue-500 rounded p-2"}
                        onClick={onSearch}
                    >
                        검색하기
                    </button>
                </div>
                <div>
                    <div className={"mt-1"}>
                        <IconButton
                            iconClass={"fa-solid fa-minus"}
                            onClick={() => {
                                setRange(range - temp);
                            }}
                        />
                        <input type="number"
                           className={"bg-green-700 rounded"}
                            value={temp}
                            onChange={(e) => {
                                setTemp(Number(e.target.value));
                            }}
                        />
                        <IconButton
                            iconClass={"fa-solid fa-plus"}
                            onClick={() => {
                                setRange(range + temp);
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={()=>{setTemp(100)}}>100m</button>
                        <button onClick={()=>{setTemp(500)}}>500m</button>
                        <button onClick={()=>{setTemp(1000)}}>1km</button>
                        <button onClick={()=>{setTemp(3000)}}>3km</button>
                        <button onClick={()=>{setTemp(5000)}}>5km</button>
                        <button onClick={()=>{setTemp(10000)}}>10km</button>
                    </div>
                </div>
            </div>
            <div>
                {/*    버튼형 리모컨  */}
            </div>
        </div>
    )
}
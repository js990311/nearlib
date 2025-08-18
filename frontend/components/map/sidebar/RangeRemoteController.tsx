"use client"

import {useState} from "react";
import IconButton from "@/components/button/IconButton";

type RangeRemoteControllerProps = {
    range: number,
    setRange : (range: number) => void,
    onSearch : () => void,
}

const STEP_PRESETS : {value: number, label: string}[] = [
    {value: 100, label: "100m"},
    {value: 500, label: "500m"},
    {value: 1000, label: "1km"},
    {value: 3000, label: "3km"},
    {value: 5000, label: "5km"},
    {value: 10000, label: "10km"},
];

export default function RangeRemoteController({range, setRange, onSearch}: RangeRemoteControllerProps) {
    const [step, setStep] = useState<number>(100);

    const onChangeStep = (newStep : number) => {
        setStep(Math.max(0, newStep));
    }

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
                               setRange(Math.max(0, Number(e.target.value)));
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
                                setRange(Math.max(0, range - step));
                            }}
                        />
                        <input type="number"
                           className={"bg-green-700 rounded"}
                            value={step}
                            onChange={(e) => {
                                onChangeStep(Number(e.target.value));
                            }}
                        />
                        <IconButton
                            iconClass={"fa-solid fa-plus"}
                            onClick={() => {
                                setRange(range + step);
                            }}
                        />
                    </div>
                    <div>
                        {
                            STEP_PRESETS.map((preset: {value: number, label: string}) =>
                                <button key={preset.value} onClick={() => {onChangeStep(preset.value)}}>
                                    {preset.label}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            <div>
                {/*    버튼형 리모컨  */}
            </div>
        </div>
    )
}
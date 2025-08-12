"use client"

import {useEffect, useRef, useState} from "react";
import MarkedMap from "@/app/components/map/MarkedMap";
import Latlng from "@/types/latlng";
import LibraryMarkedMap from "@/components/map/LibraryMarkedMap";
import NearLibraryMarkedMap from "@/components/map/NearLibraryMarkedMap";

export default function MyNearLibrary () {
    const [location, setLocation] = useState<Latlng | null>(null);
    const [libraries, setLibraries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [distance, setDistance] = useState<number>(10000);

    console.log(`서버 : ${process.env.NEXT_PUBLIC_API_BASE}`);

    useEffect(()=>{
        if( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("get current position", position);
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }, (e)=>{
                setError('사용자의 위치정보를 획득하지 못했습니다.');
                setIsLoading(false);
            });
        }
    },[])

    const fetchLibrary = () => {
        if(location == null || location.lat === null || location.lng === null) return;
        console.log("location", location);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/library/near?lat=${location.lat}&lng=${location.lng}&range=${distance}`)
            .then(resp => resp.json())
            .then(data=>{
                setLibraries(data.contents);
            });
    }

    useEffect(()=>{
        fetchLibrary();
    }, [location]);

    return (
        <div>
            <h1>내 주변 도서관 </h1>
            <div>
                <label htmlFor="range-slider">범위 (m 단위)</label>
                <input type="range"
                    min={"100"}
                   max={"500000"}
                       value={distance}
                       onChange={(e)=>setDistance(Number(e.target.value))}
                />
                <input type="number"
                value={distance}
                       onChange={(e)=>setDistance(Number(e.target.value))}
                />
                <div>
                    <div>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev - 100
                            })
                        }}>
                            -100m
                        </button>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev - 500
                            })
                        }}>
                            -500m
                        </button>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev - 1_000
                            })
                        }}>
                            -1km
                        </button>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev - 5_000
                            })
                        }}>
                            -5km
                        </button>
                    </div>
                    <div>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev + 100
                            })
                        }}>
                            +100m
                        </button>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev + 500
                            })
                        }}>
                            +500m
                        </button>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev + 1_000
                            })
                        }}>
                            +1km
                        </button>
                        <button onClick={(e) => {
                            setDistance((prev) => {
                                return prev + 5_000
                            })
                        }}>
                            +5km
                        </button>
                    </div>
                </div>
                <div>
                    <p>빠른 설정</p>
                    <div className={"gird gird-cols-4 sm:grid-cols-4 gap-2"}>
                        <button
                            onClick={(e) => {
                                setDistance(500)
                            }}>
                            500m
                        </button>

                        <button
                            onClick={(e) => {
                                setDistance(1_000)
                            }}>
                            1 km
                        </button>
                        <button
                            onClick={(e) => {
                                setDistance(5_000)
                            }}>
                            5 km
                        </button>
                        <button
                            onClick={(e) => {
                                setDistance(10_000)
                            }}>
                            10 km
                        </button>
                    </div>


                </div>
                <button onClick={() => {
                    fetchLibrary();
                }}>찾기
                </button>
            </div>
            {
                location != null
                &&
                <NearLibraryMarkedMap
                    center={location}
                    libraries={libraries}
                    radius={distance}
                />
            }
        </div>
    )
}
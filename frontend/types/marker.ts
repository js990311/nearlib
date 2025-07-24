import Latlng from "@/types/latlng";

type Marker = {
    position: Latlng,
    infoContent?: string,
}

export type MarkerInfo = {
    position: Latlng;
    iconUrl : string;
    infoContent ?: string;
    markerId ?: number;
    onClick ?: (markerId : number) => void;
};

export default Marker;
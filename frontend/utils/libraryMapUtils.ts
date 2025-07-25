import Library from "@/types/library";
import {MarkerInfo} from "@/types/marker";

/**
 * Library를 위한 InfoWindow 생성기 (지도상에서 사용할 용도)
 * @param library
 */
export const buildInfoWindow = (library : Library) : string => {
    return `
                  <div class="max-w-xs p-4 bg-white rounded-xl shadow-lg font-sans">
                    <h1 class="text-xl font-semibold text-gray-800 mb-2">
                      ${library.name}
                    </h1>
                    <p class="text-sm text-gray-600 mb-4">
                      ${library.address}
                    </p>
                    <a
                      href="${library.webpage}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                      도서관 홈페이지로
                    </a>
                  </div>
                `
}

export const buildLibraryMarkers = (libraries: Library[]) : MarkerInfo[] => {
    return libraries.map((library) => {
        return {
            position: {
                lat : library.latitude,
                lng : library.longitude
            },
            infoContent : buildInfoWindow(library),
            markerId: library.id,
            iconUrl: '/images/logo.png'
        };
    });
}
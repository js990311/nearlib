import Library from "@/types/library";
import MarkedMap from "@/app/components/map/MarkedMap";

type LibraryIdPageProps = Promise<{
    lid: string
}>;

export default async function LibraryIdPage({params}: {params:LibraryIdPageProps}) {
    const { lid } = await params

    const {
        id,
        name,
        webpage,
        latitude,
        longitude,
        address
    } : Library = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/library/${lid}`, {}).then(res => res.json());

    return (<div>
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            <a href={webpage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {webpage}
            </a>
            <p className="text-gray-700 mt-2">{address}</p>
        </div>
        <MarkedMap
            center={{lat:latitude, lng:longitude}}
            markers={[{
                position: {lat:latitude, lng:longitude}
            }]}
        />
    </div>)
}
import Library from "@/types/Library";

export default async function LibraryIdPage({params}:{params: {id:number}}) {

    const {
        id,
        name,
        webpage,
        latitude,
        longitude,
        address
    } : Library = await fetch(`http://localhost:8080/library/${params.id}`, {}).then(res => res.json());

    return (<div>
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            <a href={webpage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {webpage}
            </a>
            <p className="text-gray-700 mt-2">{address}</p>
        </div>
        {/* TODO MAP */}
    </div>)
}
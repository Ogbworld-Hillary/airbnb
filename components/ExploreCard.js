import Image from 'next/image'

function ExploreCard({ img, location, distance }) {
    return (
        <div className="flex items-center m-2 mt-5 space-x-4 transition duration-300 ease-out cursor-pointer rounded-xl hover:bg-gray-50 hover:shadow-sm hover:scale-105">
            <div className="relative w-16 h-16">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-lg"
                />
            </div>
            <div className="">
                <h2 className="font-medium">{location}</h2>
                <h3 className="text-gray-500">{distance}</h3>
            </div>
        </div>
    )
}

export default ExploreCard

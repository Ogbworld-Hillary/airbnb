import Image from 'next/image'

function AnywhereCard({ img, title }) {
    return (
        <div className="m-2 mt-5 transition duration-300 ease-out cursor-pointer rounded-xl hover:bg-gray-50 hover:shadow-sm hover:scale-105">
            <div className="relative h-80 w-80">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-lg"
                />
            </div>
            <h2 className="mt-2 text-xl font-medium">{title}</h2>
        </div>
    )
}

export default AnywhereCard

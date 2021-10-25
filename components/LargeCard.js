import Image from 'next/image'


function LargeCard({ img, title, description, button }) {
    return (
        <section className="relative cursor-pointer mb-14">
            <div className="relative w-full h-80">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-lg"
                />
            </div>
            <div className="absolute top-14 left-14">
                <h3 className="w-64 mb-3 text-4xl font-semibold">{title}</h3>
                <p className="">{description}</p>
                <button className="py-3 mt-4 text-sm font-bold text-white transition duration-300 ease-in-out bg-black shadow-md px-7 rounded-xl hover:bg-white hover:text-black">{button}</button>
            </div>
        </section>
    )
}

export default LargeCard

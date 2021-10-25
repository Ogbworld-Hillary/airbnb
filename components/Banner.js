import Image from 'next/image'

function Banner() {
    return (
        <div className="relative pt-8" style={{ height: '70vh' }}>
            <Image
                src="/hero.webp"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute flex items-center w-full h-full">
                <div className="container px-5 mx-auto md:px-10">
                    <h1 className="w-10/12 mx-auto text-4xl font-bold text-center text-white md:text-5xl lg:text-7xl md:mx-0 md:w-4/12 lg:w-4/12 md:text-left">Olympian & Paralympian Online Experiences</h1>
                    <button className="block py-3 mx-auto mt-8 text-base font-bold transition duration-300 ease-in-out bg-white shadow-md md:mx-0 px-7 rounded-xl hover:bg-black hover:text-white">Explore new</button>
                </div>
            </div>
        </div>
    )
}

export default Banner

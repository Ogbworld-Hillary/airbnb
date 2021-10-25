import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRouter } from "next/dist/client/router"
import { format } from 'date-fns'
import InfoCard from "../components/InfoCard"
import Map from "../components/Map"

function Search({ searchResults }) {
    const router = useRouter()

    const { location, startDate, endDate, guests } = router.query

    const formatedStartDate = format(new Date(startDate), "dd MMM")
    const formatedEndDate = format(new Date(endDate), "dd MMM")
    const range = `${formatedStartDate} - ${formatedEndDate}`

    return (
      <div className="h-screen">
         <Header placeholder={`${location} | ${range} | ${guests} guests`} />

        <main className="flex px-10 mt-24">
            <section className="flex-grow px-6 pt-14">
                <p className="text-sm">300+ Stays - {range} - for {guests} number of guests</p>

                <h1 className="mt-2 mb-6 text-3xl font-semibold">Stays in {location}</h1>

                <div className="flex-wrap hidden mb-5 space-x-3 md:flex whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Places</p>
                    <p className="button">Rooms and Beds</p>
                    <p className="button">More filters</p>
                    </div>

                    {searchResults?.map(item => 
                        <InfoCard 
                            key={item.img}
                            {...item}
                        />
                    )}
                </section>

                <section className="mt-14 hidden rounded-xl overflow-hidden md:inline-flex min-w-[600px] sticky mb-6 top-28 h-screen">
                    <Map searchResults={searchResults} />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps() {
    const searchResults = await fetch('https://jsonkeeper.com/b/5NPS').then(res => res.json())

    return {
        props: {
            searchResults
        }
    }
}

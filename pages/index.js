import Head from 'next/head'
import AnywhereCard from '../components/AnywhereCard'
import Banner from '../components/Banner'
import ExploreCard from '../components/ExploreCard'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'

export default function Home({ exploreData, cardsData }) {
  
  return (
    <div className="">
      <Head>
        <title>Airbnb - by Lary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="container px-5 mx-auto md:px-10">
        <section className="pt-8">
          <h2 className="pb-5 text-4xl font-semibold">Explore Nearby</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(item => <ExploreCard key={item.location} {...item} />)}
          </div>
        </section>

        <section className="pt-12 mb-14">
          <h2 className="pb-5 text-4xl font-semibold">Live Anywhere</h2>
          
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {cardsData?.map(item => <AnywhereCard key={item.title} {...item} />)}
          </div>
        </section>

        <LargeCard 
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          button="Get Inspried"
        />

      </main>

      <Footer />
    </div>
  )
}


export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(res => res.json())
  const cardsData = await fetch('https://links.papareact.com/zp1').then(res => res.json())

  return {
    props: { exploreData, cardsData }
  }
}

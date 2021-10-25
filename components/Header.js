import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, UserCircleIcon, MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useEffect } from 'react'
import Autocomplete from "react-google-autocomplete"
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'
import { useRouter } from 'next/dist/client/router'
import { XCircleIcon } from '@heroicons/react/solid'

const YOUR_GOOGLE_MAPS_APIKEY = ""

function Header({ placeholder }) {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [Infants, setInfants] = useState(0)
    const [dateActive, setDateActive] = useState(false)
    const [guestActive, setGuestActive] = useState(false)

    useEffect(() => {
        if (router?.query?.startDate) {
            setSearchInput(router.query.location)
            setStartDate(new Date(router.query.startDate))
            setEndDate(new Date(router.query.endDate))
            setAdults(router.query.adults)
            setChildren(router.query.children)
            setInfants(router.query.Infants)
        }
    }, [router.query])

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        setDateActive(false)
        window.addEventListener('scroll', transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const handleSelect = ranges => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const clearAll = () => {
        setAdults(0)
        setChildren(0)
        setInfants(0)
    }

    useEffect(() => {
        if (searchInput) {
            setDateActive(true)
            setGuestActive(false)
        }
        else setDateActive(false)
    }, [searchInput])

    const onSearch = () => {
        setDateActive(false)
        setGuestActive(false)
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                adults,
                children,
                Infants,
                guests: Number(adults) + Number(children) + Number(Infants)
            }
        })
    }

    return (
        <header className={`fixed w-full top-0 z-50 grid sm:grid-cols-4 grid-cols-1 navbar p-5 md:px-10 ${show && "nav__stickey"}`}>

            <div className="relative flex items-center justify-center h-10 my-auto mb-4 cursor-pointer" onClick={() => router.push('/')}>
                <Image
                    src="http://links.papareact.com/qd3"
                    // layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                    width="130"
                    height="130"
                />
            </div>
            <div className="flex items-center justify-between col-span-2 py-2 bg-white border-2 rounded-full md:shadow-sm">
                <input 
                  type="text" 
                  onFocus={() => {setGuestActive(false); setDateActive(true)}} 
                  value={searchInput} 
                  onChange={e => setSearchInput(e.target.value)} 
                  placeholder={placeholder ? placeholder : "Start your search"} 
                  className="flex-shrink-0 pl-5 mr-3 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none md:flex-grow" />
                {<Autocomplete
                    apiKey={YOUR_GOOGLE_MAPS_APIKEY}
                    debounce={500}
                    onPlaceSelected={(place) => {
                        console.log(place)
                    }}
                    placeholder="(Google place autocomplete) Start your search...."
                    className="flex-grow pl-5 mr-3 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none"
                />}
                <div onClick={() => { setGuestActive(true); 
                    setDateActive(false) }} 
                    className="flex items-center justify-between px-4 border-l border-gray-200 cursor-pointer w-52">
                    <div className="flex-1">
                        <h4 className="text-sm font-medium">Guests</h4>
                        <p className="w-20 text-xs text-gray-400 truncate">{!!(adults || children || Infants) ? `${adults} - ${children} - ${Infants}` : 'Add'} guests guests</p>
                    </div>
                    {!!(adults || children || Infants) && <XCircleIcon onClick={clearAll} className="h-5 text-gray-500" />}
                </div>
                <SearchIcon 
                  onClick={onSearch} 
                  className="inline-flex w-8 h-8 p-2 mr-2 text-white bg-red-400 rounded-full cursor-pointer" />
            </div>
            <div 
              className="items-center justify-end hidden space-x-3 text-gray-500 cursor-pointer sm:flex">
                <div className={`rounded-full py-2 px-3 flex items-center`}>
                    <p className="hidden mr-3 md:inline-flex">Become a host</p>
                    <GlobeAltIcon
                        className="h-6"
                    />
                </div>
                <div className="flex items-center px-3 py-2 space-x-3 bg-white border-2 rounded-full cursor-pointer">
                    <MenuIcon
                        className="h-6"
                    />
                    <UserCircleIcon
                        className="h-6"
                    />
                </div>
            </div>

            {dateActive && (
            <div className="flex flex-col items-center justify-center col-span-4 mt-4 bg-transparent">
              <div className="relative p-5 bg-white rounded-2xl pt-14">
            <XCircleIcon 
                onClick={() => setDateActive(false)} 
                className="absolute float-right h-6 text-gray-500 cursor-pointer top-4 right-4" />
              <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={['#fd5b61']}
                    onChange={handleSelect}
                />
              </div>
            </div>
            )}
            {guestActive && (
             <div className="flex flex-col items-center justify-center col-span-4 bg-transparent">
                 <div className="relative p-5 mt-4 bg-white rounded-2xl">
                 <XCircleIcon 
                    onClick={() => setGuestActive(false)} 
                    className="absolute float-right h-6 text-gray-500 cursor-pointer top-3 right-3" />
                     <div className="flex items-center justify-between py-4 border-b border-gray-100 w-72">
                        <div>
                         <h5 className="text-base font-semibold">Adults</h5>
                         <p className="text-sm text-gray-500 cursor-pointer">Ages 13 or above</p>
                        </div>
                        <div>
                         <input 
                            type="number" 
                            value={adults} 
                            min="1" 
                            className="w-10 outline-none" 
                            onChange={e => setAdults(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-gray-100 w-72">
                          <div>
                             <h5 className="text-base font-semibold">Children</h5>
                             <p className="text-sm text-gray-500 cursor-pointer">Ages 2 - 12</p>
                         </div>
                         <div>
                          <input type="number" value={children} min="1" className="w-10 outline-none" onChange={e => setChildren(e.target.value)} />
                    </div>
                  </div>
                    <div className="flex items-center justify-between py-4 border-gray-100 w-72">
                        <div>
                         <h5 className="text-base font-semibold">Infants</h5>
                         <p className="text-sm text-gray-500 cursor-pointer">Under 2</p>
                         </div>
                        <div>
                     <input 
                        type="number" 
                        value={Infants} 
                        min="1" 
                        className="w-10 outline-none" 
                        onChange={e => setInfants(e.target.value)}
                      />
                     </div>
                  </div>
                </div>
                </div>
            )}
        </header>
    )
}

export default Header

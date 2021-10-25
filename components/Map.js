import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as geolib from 'geolib'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults?.map(item => ({ latitude: item.lat, longitude: item.long }))

    const center = geolib.getCenter(coordinates)

    const [viewport, setViewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
        width: "100%",
        height: "100%"
    })

    return (
        <ReactMapGL
            mapStyle=""
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(viewport) => setViewport(viewport)}
            {...viewport}
        >
            {searchResults?.map(item => (
        <div key={item.img}>
        <Marker
          latitude={item.lat}
          longitude={item.long}
          offsetLeft={-20}
          offsetLeft={-10}
        >
            <p className="relative z-40 text-2xl cursor-pointer" onClick={() => setSelectedLocation(item)} role="img">
             <img src="/pin.png" loading="lazy" alt="" className="w-10" />
                </p>
             </Marker>
                    {selectedLocation?.long === item?.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={item.lat}
                            longitude={item.long}
                        >
                <div className="p-3 min-w-[300px] relative z-50">
                    <img src={item.img} loading="lazy" className="object-cover w-full h-48 mb-3 rounded-lg" alt="" />
                    <h3 className="mb-2 text-lg font-medium">{item.title}</h3>
                    <div className="flex items-center justify-between">
                    <div>
                    <p className="text-xl font-semibold">{item.price}</p>
                    <p className="flex items-center cursor-pointer">
                        <StarIcon className="h-5 mr-1 text-yellow-500" />
                        {item.star}
                        </p>
                        </div>
                        <HeartIcon className="text-red-600 cursor-pointer h-7" />

                        </div>
                        </div>
                    </Popup>
                    ) : ""}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Coords } from "../types"
import L from "leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix for default marker icon issue in Leaflet with bundlers
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIconRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

const API_KEY = import.meta.env.VITE_API_KEY

type Props = {
    coords: Coords
    onMapClick: (lat: number, lon: number) => void
    mapType: string
}

export default function Map({ coords, onMapClick, mapType }: Props) {
    const { lat, lon } = coords
    return (
        <MapContainer
            center={[lat, lon]}
            zoom={5}
            style={{ width: "100%", height: "100%" }}
        >
            <MapClick onMapClick={onMapClick} coords={coords} />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {mapType !== "standard" && (
                <TileLayer
                    opacity={0.4}
                    url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
                />
            )}
            <Marker position={[lat, lon]} />
        </MapContainer>
    )
}


function MapClick({
    onMapClick,
    coords,
}: {
    onMapClick: (lat: number, lon: number) => void
    coords: Coords
}) {
    const map = useMap()
    map.panTo([coords.lat, coords.lon])

    map.on("click", (e) => {
        const { lat, lng } = e.latlng
        onMapClick(lat, lng)
    })

    return null
}


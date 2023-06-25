import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import "./App.css"
import { useStore } from './store';

function ChangeMapView({ coords }: { coords: LatLngExpression }) {
    const map = useMap();

    const coordsArr = coords.toString().split(",");
    const lat = parseFloat(coordsArr[0]);
    const long = parseFloat(coordsArr[1]);

    if (lat === 30.253730 && long === 97.735870) {
        const bounds: LatLngBoundsExpression = [[30.258180, -97.691260], [30.288200, -97.723260], [30.252630, -97.764061], [30.217700, -97.796570]];
        map.fitBounds(bounds);
        return null;
    }

    useEffect(() => {
        map.flyTo(coords);
    }, [coords]);

    return null;
}

interface Business {
    name: string;
    type: string;
    phone: string;
    address: string;
    coords: LatLngExpression;
}

function Businesses() {

    const { isLoggedIn } = useStore((state) => ({
        isLoggedIn: state.isLoggedIn
    }));

    const [businessData, setBusinessData] = useState<Business[]>([
        { name: "Ephrance Vintage", type: "Secondhand shop", phone: "(218) 780-6974", address: "5305 Bolm Rd, Austin, TX 78721", coords: [30.258180, -97.691260] as LatLngExpression },
        { name: "The Glass Coffin", type: "Antique store", phone: "(512) 739-0084", address: "3009 N Interstate Hwy 35, Austin, TX 78722", coords: [30.288200, -97.723260] as LatLngExpression },
        { name: "South Austin Music", type: "Music store", phone: "(512) 448-4992", address: "1402 S Lamar Blvd, Austin, TX 78704", coords: [30.252630, -97.764061] as LatLngExpression },
        { name: "Reverie Books", type: "Bookstore", phone: "(512) 368-4455", address: "5330 Menchaca Rd Ste D, Austin, TX 78745", coords: [30.217700, -97.796570] as LatLngExpression },
    ]);

    const [newBusiness, setNewBusiness] = useState<Partial<Business>>({});

    const deleteBusiness = (businessToDelete: Business) => {
        setBusinessData(businessData.filter(business => business !== businessToDelete));
    };

    const addBusiness = (event: React.FormEvent) => {
        event.preventDefault();
        if (newBusiness.name && newBusiness.type && newBusiness.phone && newBusiness.address) {
            setBusinessData([...businessData, { ...newBusiness, coords: generateRandomCoords() } as Business]);
            setNewBusiness({});
        } else {
            console.error("All fields must be filled out to add a new business.");
        }
    };

    const center: LatLngExpression = [30.253730, -97.735870];

    const [selectedLocation, setSelectedLocation] = useState<LatLngExpression>(center);
    const [currentBusiness, setDetails] = useState<Business>();

    function getDetails() {
        if (!currentBusiness) {
            return null;
        }
        return (
            <div>
                <h2>{currentBusiness.name}</h2>
                <p>{currentBusiness.type}</p>
                <p>{currentBusiness.phone}</p>
                <p>{currentBusiness.address}</p>
            </div>
        );
    }

    const generateRandomCoords = () => {
        const minLat = 30.15;
        const maxLat = 30.5167;
        const minLong = -97.9;
        const maxLong = -97.5667;

        const lat = Math.random() * (maxLat - minLat) + minLat;
        const long = Math.random() * (maxLong - minLong) + minLong;

        return [lat, long] as LatLngExpression;
    };

    return (
        <>
            <h1>Austin Small Businesses</h1>
            <ul>
                {businessData.map((business, index) => (
                    <a key={index} href="#map">
                        <li onClick={() => {
                            setSelectedLocation(business.coords)
                            setDetails(business)
                        }}>
                            <h2>{business.name}</h2>
                            <p>{business.type}</p>
                            <p>{business.phone}</p>
                            <p>{business.address}</p>
                            {isLoggedIn && <button onClick={() => deleteBusiness(business)}>Delete</button>}
                        </li>
                    </a>
                ))}
            </ul>
            {isLoggedIn && (
                <form id="add-business" onSubmit={addBusiness}>
                    <input placeholder="Name" value={newBusiness.name || ""} onChange={e => setNewBusiness({ ...newBusiness, name: e.target.value })} />
                    <input placeholder="Type" value={newBusiness.type || ""} onChange={e => setNewBusiness({ ...newBusiness, type: e.target.value })} />
                    <input placeholder="Phone" value={newBusiness.phone || ""} onChange={e => setNewBusiness({ ...newBusiness, phone: e.target.value })} />
                    <input placeholder="Address" value={newBusiness.address || ""} onChange={e => setNewBusiness({ ...newBusiness, address: e.target.value })} />
                    <button type="submit">Add New Business</button>
                </form>
            )}
            <div id="map-details">
                <MapContainer center={[30.253730, -97.735870]} id="map" zoom={12} scrollWheelZoom={false}>
                    <ChangeMapView coords={selectedLocation} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {businessData.map((business, index) => (
                        <Marker key={index} position={business.coords}>
                            <Popup>{business.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
                {getDetails()}
            </div>
        </>
    )
}

export default Businesses;
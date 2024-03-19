import { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api";
import Places from "./places";

const Map = () => {
    const mapRef = useRef();
    const center = useMemo(
        () => ({ lat: 3.069944, lng: 101.692278 }),
        []
      );
      const options = useMemo(
        () => ({
          disableDefaultUI: true,
          clickableIcons: false,
        }),
        []
      );
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const [office, setOffice] = useState(null);
    const houses = useMemo(() => generateHouses(office), [office]);

    return (
        <div className="map-container">
            <div className="controls">
                <h1>Find Events?</h1>
                <Places
                    setOffice={(position) => {
                        if (position) {
                            setOffice(position);
                            mapRef.current?.panTo(position);
                        } else {
                            setOffice(position);
                            mapRef.current?.panTo(center);
                        }
                    }}
                />
            </div>
            <div className="map">
                <GoogleMap 
                    zoom={16}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    {houses.length > 0 && houses.map((house => (
                        <Marker 
                            key={house.lat}
                            position={house}
                        />
                    )))}
                    {office && (
                        <>
                            <Marker 
                                position={office}
                            />
                            <Circle center={office} radius={1000} options={closeOptions} />
                        </>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  
  const generateHouses = (position) => {
    const _houses = [];
    const radius = 860; // meter radius

    if (position) {
        const latRange = radius / 111000; // Approximate 1 degree latitude difference = 111 kilometers
        const lngRange = radius / (111000 * Math.cos((Math.PI / 180) * position.lat)); // Adjust longitude range based on latitude
        for (let i = 0; i < 10; i++) {
            const latOffset = Math.random() * (2 * latRange) - latRange; // Random latitude offset within latRange
            const lngOffset = Math.random() * (2 * lngRange) - lngRange; // Random longitude offset within lngRange
    
            const newLat = position.lat + latOffset;
            const newLng = position.lng + lngOffset;
    
            _houses.push({ lat: newLat, lng: newLng });
        }
    }

    return _houses;
  };
 
export default Map;
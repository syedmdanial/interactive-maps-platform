import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";

 const Home = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: [GOOGLE_MAPS_API_KEY_HERE],
        libraries: ['places'],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

export default Home;
import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";

 const Home = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBdnzEU349KfA_UsAenKPrR4Wkb5T0babY",
        libraries: ['places'],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

export default Home;
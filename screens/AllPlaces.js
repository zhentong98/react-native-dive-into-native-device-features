import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {useIsFocused} from "@react-navigation/native";

import {fetchPlaces} from "../util/database";

import PlacesList from "../components/Places/PlacesList";

function AllPlaces({route}) {
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {

        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }

        if (isFocused) {
            loadPlaces().then();
            // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
        }
    }, [isFocused]);

    return (
        <PlacesList places={loadedPlaces}/>
    );
}

export default AllPlaces;

const styles = StyleSheet.create({});

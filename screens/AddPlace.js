import {StyleSheet} from "react-native";

import {insertPlace} from "../util/database";

import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({navigation}) {

    async function createPlaceHandler(place) {
        await insertPlace(place);
        navigation.navigate('AllPlaces');
    }

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
}

export default AddPlace;

const styles = StyleSheet.create({});

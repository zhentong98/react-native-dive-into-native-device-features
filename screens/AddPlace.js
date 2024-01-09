import {StyleSheet} from "react-native";

import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({navigation}) {

    function createPlaceHandler(place) {
        navigation.navigate('AllPlaces', {
            place: place
        });
    }

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
}

export default AddPlace;

const styles = StyleSheet.create({});

import {useEffect, useState} from "react";
import {Alert, Image, ScrollView, StyleSheet, Text, View} from "react-native";

import OutlinedButton from "../components/UI/OutlinedButton";
import IconButton from "../components/UI/IconButton";

import {deletePlaceById, fetchPlaceDetails} from "../util/database";

import {Colors} from "../constants/colors";

function PlaceDetails({route, navigation}) {

    const [fetchedPlace, setFetchedPlace] = useState();

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        });
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlace(place);
            navigation.setOptions({
                title: place.title,
                headerRight: ({tintColor}) => (
                    <IconButton icon="trash" color={tintColor} size={24} onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'Do you really want to delete this place?',
                            [
                                {
                                    text: 'No',
                                    style: 'default'
                                },
                                {
                                    text: 'Yes',
                                    style: 'destructive',
                                    onPress: async () => {
                                        await deletePlaceById(selectedPlaceId);
                                        navigation.navigate('AllPlaces');
                                    }
                                }
                            ]
                        );
                    }}
                    />
                )
            });
        }

        loadPlaceData().then();
    }, [selectedPlaceId]);

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>
                    Loading place data...
                </Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>
                        {fetchedPlace.address}
                    </Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});

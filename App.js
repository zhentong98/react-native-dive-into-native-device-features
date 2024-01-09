import {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";

import IconButton from "./components/UI/IconButton";

import {init} from "./util/database";

import {Colors} from "./constants/colors";

SplashScreen.preventAutoHideAsync().then();

const Stack = createNativeStackNavigator();

export default function App() {

    useEffect(() => {
        init()
            .then(
                () => {
                    SplashScreen.hideAsync().then();
                }
            )
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <StatusBar style={"dark"}/>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary500
                    },
                    headerTintColor: Colors.gray700,
                    contentStyle: {
                        backgroundColor: Colors.gray700
                    }
                }}
                >
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({navigation}) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({tintColor}) => (
                                <IconButton
                                    icon="add"
                                    size={24}
                                    color={tintColor}
                                    onPress={() => navigation.navigate('AddPlace')}/>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: 'Add a New Place',
                            headerBackTitle: 'Back'
                        }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={Map}
                        options={{
                            title: 'Map',
                            headerBackTitle: 'Back'
                        }}
                    />
                    <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
                        title: 'Loading Place...',
                        headerBackTitle: 'Back'
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Intro from "./src/pages/Intro";
import styles from "./src/config/styles";
import {useFonts} from "expo-font";
import {useState} from "react";
import SignIn from "./src/pages/SignIn";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./src/pages/Home";
import SignUp from "./src/pages/SignUp";


function Main() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="SignIn" screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {

    const [done, setDone] = useState(false);

    const [fonts] = useFonts({
        'Raleway': require('./assets/Raleway-SemiBold.ttf'),
        'Kurale': require('./assets/Kurale-Regular.ttf'),
        'Barlow': require('./assets/BarlowCondensed-Medium.ttf')
    })

    if (!fonts) {
        return (
            <ActivityIndicator animating={true} />
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" translucent={true}/>
            {done ? <Main/> : <Intro setDone={setDone}/>}
        </View>
    );
}

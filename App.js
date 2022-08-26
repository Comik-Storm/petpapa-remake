import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Intro from "./src/pages/Intro";
import styles from "./src/config/styles";
import {useFonts} from "expo-font";
import { ActivityIndicator, MD2Colors as Colors } from 'react-native-paper';


export default function App() {

    const [fonts] = useFonts({
        'Raleway': require('./assets/Raleway-SemiBold.ttf'),
        'Kurale': require('./assets/Kurale-Regular.ttf'),
        'Barlow': require('./assets/BarlowCondensed-Medium.ttf')
    })

    if (!fonts) {
        return (
            <ActivityIndicator animating={true} colors={Colors.blue300} />
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" translucent={true}/>
            <Intro />
        </View>
    );
}

import {Platform, StatusBar, StyleSheet} from "react-native";

export default StyleSheet.create({
    globalStatusBar: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    primaryText: {
        fontFamily: 'Raleway',
        fontSize: 24
    },
    secondaryText: {
        fontFamily: 'Kurale',
        fontSize: 19
    },
    actionText: {
        fontFamily: 'Barlow',
    }
})
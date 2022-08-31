import React, {useState} from 'react';

import {ActivityIndicator, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Camera, CameraType} from "expo-camera";
import {Dialog} from "@rneui/base";

const CameraComponent = ({handler}) => {
    const [camType, setCamType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [alert, setAlert] = useState(false);
    if (!permission) {
        return <ActivityIndicator animating={true}/>
    }

    if (!permission.granted) {
        setAlert(true);
        return (
            <Dialog
                isVisible={alert}
                onBackdropPress={() => {setAlert(false)}}
            >
                <Dialog.Title title='Error!' />
                <Text>Please Allow Pet Papa to use your camera to continue!</Text>
                <Dialog.Button title='Okay' onPress={() => {setAlert(false)}}/>
            </Dialog>
        );
    }

    const toggleCameraType = () => {
        setCamType(camType === CameraType.back ? CameraType.front : CameraType.back);
    }

    return (
        <View style={localStyles.container}>
            <Camera style={localStyles.camera} type={type}>
                <View style={localStyles.buttonContainer}>
                    <TouchableOpacity
                        style={localStyles.button}
                        onPress={toggleCameraType}>
                        <Text style={localStyles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={localStyles.button}
                        onPress={() => {
                            //TODO: Need to Fix this, falling into infinite loop
                            //TODO: Else, try everything again!
                            handler(false)
                        }}>
                        <Text style={localStyles.text}>Click</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

export default CameraComponent;

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

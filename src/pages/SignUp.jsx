import React, {useEffect, useRef, useState} from 'react';

import {Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, CameraRoll} from 'react-native';
import SafeView from "../components/SafeView";
import {Button, Avatar, Dialog, ListItem, Icon} from "@rneui/base";
import * as DocPic from 'expo-document-picker'
import {PermissionsAndroid} from 'react-native';
import styles from "../config/styles";
import {Camera, CameraType} from 'expo-camera';
import SignUpForm from "../components/SignUpForm";

const SignUp = ({navigation}) => {
    const [avatar, setAvatar] = useState('');
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState(CameraType.front);
    const [openCam, setOpenCam] = useState(false)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const camRef = useRef(null)

    const toggleCameraType = () => {
        setType(type === CameraType.front ? CameraType.back : CameraType.front)
    }

    const toggleDialog = () => {
        setVisible(!visible)
    }

    const pickImage = () => {
        setVisible(true)
    }

    if (!permission) {
        // Camera permissions are still loading
        return (
            <SafeView>
                <ActivityIndicator size='small' animating={true}/>
            </SafeView>
        );
    }

    if (openCam) {
        return (
            <Dialog
                isVisible={openCam}
            >
                <Camera
                    type={type}
                    useCamera2Api={true}
                    ref={camRef}
                    style={{height: '75%'}}
                />
                    <ListItem.Content
                        style={{
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <Icon
                            name='ban'
                            type='font-awesome-5'
                            color='whitesmoke'
                            size={24}
                            onPress={() => {
                                setOpenCam(false)
                            }}
                        />
                        <Icon
                            name='circle'
                            type='font-awesome-5'
                            color='whitesmoke'
                            reverse
                            onPress={() => {
                                if (camRef) {
                                    const picture = camRef.current.takePictureAsync({
                                        onPictureSaved: camRef.current.onPictureSaved
                                    }).then((picture) => {
                                        setAvatar(picture.uri)
                                        setOpenCam(false)
                                        setVisible(false)
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                }
                            }}
                        />
                        <Icon
                            name='sync-alt'
                            type='font-awesome-5'
                            color='whitesmoke'
                            size={24}
                            onPress={() => {
                                toggleCameraType()
                            }}
                        />
                    </ListItem.Content>
            </Dialog>
        )
    }

    return (
        <SafeView style={{
            justifyContent: 'space-evenly'
        }}>
            <View style={localStyles.logo}>
                {avatar ? <Avatar
                    size={128}
                    rounded
                    source={{uri: avatar}}
                    containerStyle={{backgroundColor: '#2296e3'}}
                >
                    <Avatar.Accessory size={35} onPress={pickImage} style={{
                        backgroundColor: 'rgb(34, 37, 227)',
                    }}/>
                </Avatar> : <Avatar
                    size={128}
                    rounded
                    icon={{
                        name: 'user',
                        type: 'font-awesome-5'
                    }}
                    containerStyle={{backgroundColor: '#2296e3'}}
                >
                    <Avatar.Accessory size={35} onPress={pickImage} style={{
                        backgroundColor: 'rgb(34, 37, 227)',
                    }}/>
                </Avatar>}
            </View>
            <SignUpForm navigation={navigation}/>
            <>
                {/*TODO: Remove JSX Fragment From Here During Production*/}
                <Dialog
                    isVisible={visible}
                    onBackdropPress={toggleDialog}
                    overlayStyle={{
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Dialog.Title
                        title="Select an Avatar"
                        titleStyle={{
                            ...styles.primaryText,
                            fontWeight: 'normal',
                        }}/>
                    <ListItem
                        containerStyle={{
                            marginHorizontal: -5,
                            borderRadius: 8,
                            padding: 5,
                            marginBottom: 10
                        }}
                        onPress={() => {
                            requestPermission().
                            then(() => {
                                setOpenCam(true)
                            }).catch(err => {
                                console.log(err)
                            })
                        }}>
                        <Avatar
                            icon={{
                                name: 'camera',
                                type: 'font-awesome-5'
                            }}
                            size={40}
                            rounded
                            containerStyle={{
                                backgroundColor: '#2296e3',
                                margin: 0,
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title
                                style={{
                                    ...styles.actionText,
                                }}>
                                Take a Picture
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem
                        containerStyle={{
                            marginHorizontal: -5,
                            borderRadius: 8,
                            padding: 5,
                            marginBottom: 10
                        }}
                        onPress={() => {
                            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(() => {
                                DocPic.getDocumentAsync({
                                    type: 'image/*',
                                    copyToCacheDirectory: true
                                }).then((response) => {
                                    console.log(response)
                                    setAvatar(response.uri)
                                }).catch(err => {
                                    console.log(err)
                                })
                            })
                            toggleDialog()
                        }}
                    >
                        <Avatar
                            icon={{
                                name: 'image',
                                type: 'font-awesome-5'
                            }}
                            size={40}
                            rounded
                            containerStyle={{
                                backgroundColor: '#2296e3',
                                margin: 0,
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title
                                style={{
                                    ...styles.actionText,
                                }}>
                                Choose from Gallery
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem
                        containerStyle={{
                            marginHorizontal: -5,
                            borderRadius: 8,
                            padding: 5,
                            marginBottom: 10
                        }}
                        onPress={() => {
                            setAvatar('')
                            toggleDialog()
                        }}>
                        <Avatar
                            icon={{
                                name: 'ban',
                                type: 'font-awesome-5'
                            }}
                            size={40}
                            rounded
                            containerStyle={{
                                backgroundColor: '#2296e3',
                                margin: 0,
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{
                                ...styles.actionText,
                            }}>
                                Remove Avatar
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </Dialog>
            </>
        </SafeView>
    );
};

export default SignUp;

const localStyles = StyleSheet.create({
    logo: {
        alignItems: 'center'
    },
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
})
import React, {useState} from 'react';

import {Image, Text, View, StyleSheet, ImageBackground, StatusBar, ActivityIndicator} from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";
import SafeView from "../components/SafeView";
import styles from "../config/styles";
import {useAssets} from "expo-asset";
import {Button, FAB} from "@rneui/base";

const Intro = ({setDone}) => {
    const [assets, error] = useAssets([
        require('../../assets/images/intro/welcome_cat.jpg'),
        require('../../assets/images/intro/care_pets.jpg'),
        require('../../assets/images/intro/our_services.jpg')
    ]);

    if (!assets || !assets[0] || !assets[1] || !assets[2]) {
        return (
            <ActivityIndicator animating={true} color='#c4c44c' />
        );
    }

    const slides = [
        {
            key: 'one',
            title: 'Mrow?',
            text: '\nHello hooman, what\'s up? It\'s me, Kitty from Pet Papa! Press the right arrow near my paw to continue',
            image: assets[0],
            backgroundColor: '#59b2ab',
        },
        {
            key: 'two',
            title: '\nYour pet\'s e-Home!' ,
            text: '\nNo more hassle of forgetting grooming days! Care for your pets starts right from your fingertips.',
            image: assets[1],
            backgroundColor: '#febe29',
        },
        {
            key: 'three',
            title: '\nOur Services',
            text: '\nGet your pet\'s groomed right from the comfort of your (their) home!\nGet notified about import activities to keep them healthy & happy, and connect with other Pet Papas for double the fun!',
            image: assets[2],
            backgroundColor: '#22bcb5',
        }
    ];

    const _renderItem = ({item}) => {
        return (
            <View key={item.key} style={localStyles.view}>
                <ImageBackground style={localStyles.img} source={item.image} resizeMode="cover">
                    <View  style={{...styles.globalStatusBar, ...localStyles.textView}}>
                        <Text style={styles.primaryText}>{item.title}</Text>
                        <Text style={styles.secondaryText}>{item.text}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    const _onDone = () => {
        setDone(true)
    }

    const _renderNextButton = () => {
        return (
            <FAB
                icon={{
                    name: 'long-arrow-alt-right',
                    type:'font-awesome-5',
                    color: '#000000'
                }}
                size='small'
                raised={true}
                disabled={true}
                disabledStyle={{
                    backgroundColor: '#ffffff'
                }}
                disabledTitleStyle={{
                    color: '#000000'
                }}
            />
        );
    }

    const _renderSkipButton = () => {
        return (
            <FAB
                title="Skip"
                type="solid"
                raised={true}
                color='#ffffff'
                buttonStyle={{
                    borderWidth: 0,
                    borderRadius: 100,
                    margin: 0,
                    padding: 0
                }}
                titleStyle={{
                    color: '#000000',
                    ...styles.actionText
                }}
                size='small'
                disabled={true}
                disabledStyle={{
                    backgroundColor: '#ffffff'
                }}
                disabledTitleStyle={{
                    color: '#000000'
                }}
            />
        );
    }

    const _renderDoneButton = () => {
        return (
            <FAB
                title="Let's Go"
                type="solid"
                raised={true}
                color='#ffffff'
                buttonStyle={{
                    borderWidth: 0,
                    borderRadius: 100,
                    margin: 0,
                    padding: 0
                }}
                titleStyle={{
                    color: '#000000',
                    ...styles.actionText
                }}
                size='small'
                disabled={true}
                disabledStyle={{
                    backgroundColor: '#ffffff'
                }}
                disabledTitleStyle={{
                    color: '#000000'
                }}
            />
        );
    }

    return (
        <>
            <AppIntroSlider data={slides} renderItem={_renderItem} onDone={_onDone} renderNextButton={_renderNextButton} renderSkipButton={_renderSkipButton} showSkipButton={true} renderDoneButton={_renderDoneButton}/>
        </>
    );
};

export default Intro;

const localStyles = StyleSheet.create({
    img: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    view: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textView: {
        height: '100%',
        alignItems: 'center',
        marginHorizontal: 10,
    }
})
import React, {useState} from 'react';

import {Image, Text, View, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";
import SafeView from "../components/SafeView";
import styles from "../config/styles";
import {FAB, Button} from "react-native-paper";
import welcomeCat from "../../assets/images/intro/welcome_cat.jpg"
import petCare from "../../assets/images/intro/care_pets.jpg"
import ourServices from "../../assets/images/intro/our_services.jpg"

const Intro = () => {
    const [done, setDone] = useState(false);
    const slides = [
        {
            key: 'one',
            title: 'Mrow?',
            text: '\nHello hooman, what\'s up? It\'s me, Kitty from Pet Papa! Press the right arrow near my paw to continue',
            image: welcomeCat,
            backgroundColor: '#59b2ab',
        },
        {
            key: 'two',
            title: '\nYour pet\'s e-Home!' ,
            text: '\nNo more hassle of forgetting grooming days! Care for your pets starts right from your fingertips.',
            image: petCare,
            backgroundColor: '#febe29',
        },
        {
            key: 'three',
            title: '\nOur Services',
            text: '\nGet your pet\'s groomed right from the comfort of your (their) home!\nGet notified about import activities to keep them healthy & happy, and connect with other Pet Papas for double the fun!',
            image: ourServices,
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
            <FAB icon="arrow-right-thin" mode="outlined" size="small"/>
        );
    }

    const _renderSkipButton = () => {
        return (
            <Button mode="elevated" textColor="#000000">
                Skip
            </Button>
        );
    }

    const _renderDoneButton = () => {
        return (
            <Button mode="elevated" textColor="#000000">
                Let's Go
            </Button>
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
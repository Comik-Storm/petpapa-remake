import React from 'react';

import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import SafeView from "../components/SafeView";
import {useAssets} from "expo-asset";
import {Avatar} from "@rneui/themed";
import {Button, Divider} from "@rneui/base";
import styles from "../config/styles";

const SignIn = ({navigation}) => {
    const [assets, error] = useAssets([
        require('../../assets/logo/logo.jpeg')
    ])
    if (!assets) {
        return <ActivityIndicator animating={true} />
    }
    return (
        <SafeView style={{
            justifyContent: 'space-evenly'
        }}>
            <View style={localStyles.logo}>
                <Avatar size={128} source={assets[0]} />
            </View>
            <View style={localStyles.btnGroup}>
                <Button
                    title='Sign in with Google'
                    color='rgba(162,219,250,0.2)'
                    buttonStyle={{
                        width: 300,
                        borderRadius: 10,
                        justifyContent: 'space-evenly',
                        marginBottom: 10
                    }}
                    titleStyle={{
                        ...styles.secondaryText,
                        color: '#000000',
                    }}
                    icon={{
                        name: 'google',
                        type: 'font-awesome-5'
                    }}
                />
                <Button
                    title='Sign in with Facebook'
                    color='rgba(162,219,250,0.2)'
                    buttonStyle={{
                        width: 300,
                        borderRadius: 10,
                        justifyContent: 'space-evenly',
                        marginBottom: 10
                    }}
                    titleStyle={{
                        ...styles.secondaryText,
                        color: '#000000',
                    }}
                    icon={{
                        name: 'facebook',
                        type: 'font-awesome-5'
                    }}
                />
                <Divider
                    style={{ width: "80%", margin: 10 }}
                    color="#000000"
                    width={2}
                    orientation="horizontal"
                />
                <Button
                    title='Sign up with Email'
                    color='rgba(162,219,250,0.2)'
                    buttonStyle={{
                        width: 300,
                        borderRadius: 10,
                        justifyContent: 'space-evenly',
                        marginBottom: 10,
                        marginTop: 10
                    }}
                    titleStyle={{
                        ...styles.secondaryText,
                        color: '#000000',
                    }}
                    icon={{
                        name: 'facebook',
                        type: 'font-awesome-5'
                    }}
                    onPress={() => navigation.navigate('SignUp')}
                />
            </View>
        </SafeView>
    );
};

export default SignIn;

const localStyles = StyleSheet.create({
    logo: {
        alignItems: 'center',
    },
    btnGroup: {
        alignItems: 'center',
        marginBottom: 200
    }
})

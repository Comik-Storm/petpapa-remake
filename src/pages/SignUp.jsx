import React from 'react';

import {Text, View} from 'react-native';
import SafeView from "../components/SafeView";
import {Button} from "@rneui/base";

const SignUp = ({navigation}) => {
    return (
        <SafeView>
            <Text>SignUp Screen</Text>
            <Button
                title='Go Back'
                onPress={() => navigation.navigate('SignIn')}
            />
        </SafeView>
    );
};

export default SignUp;

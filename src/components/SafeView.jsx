import React from 'react';

import {Text, View} from 'react-native';
import styles from "../config/styles";

const SafeView = props => {
    return (
        <View style={{...styles.globalStatusBar, backgroundColor: '#ffffff', height: '100%', ...props.style}}>
            {props.children}
        </View>
    );
};

export default SafeView;

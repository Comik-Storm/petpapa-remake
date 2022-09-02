import React, {useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {ErrorMessage, Formik} from "formik";
import {Avatar, Button, color, Dialog, Input, Tooltip} from "@rneui/base";
import * as YUP from 'yup'
import styles from "../config/styles";

const SignUpForm = ({navigation}) => {
    const [pwdIcon, setPwdIcon] = useState('eye-slash')
    const [pwdConfIcon, setPwdConfIcon] = useState('eye-slash')
    const [loading, setLoading] = useState(false);

    return (
        //TODO: Add Other Fields As Required
        <Formik
            initialValues={{
                email: '',
                name: '',
                password: '',
                conf_password: ''
            }}
            validationSchema={YUP.object().shape({
                name: YUP.string().required('Please enter your name!'),
                email: YUP.string().required('Please enter an email!'),
                password: YUP.string().required('Please Enter your Password'),
                conf_password: YUP.string().required('Please re-enter your password!').oneOf([YUP.ref('password')], 'Both passwords must be same!')
            })}
            onSubmit={values => {
                console.log(JSON.stringify(values))
                setLoading(true);
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate('Home')
                }, 3000)
            }}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                <View>
                    <Input
                        placeholder='Name'
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        leftIcon={{
                            name: 'user',
                            type: 'font-awesome-5'
                        }}
                        leftIconContainerStyle={{
                            marginRight: 5
                        }}
                    />
                    {
                        errors.name && touched.name ? <Tooltip>
                            <Text style={{color: 'red'}}>
                                <ErrorMessage name='name'/>
                            </Text>
                        </Tooltip> : null
                    }
                    <Input
                        placeholder='Email Address'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        leftIcon={{
                            name: 'envelope',
                            type: 'font-awesome-5'
                        }}
                        leftIconContainerStyle={{
                            marginRight: 5
                        }}
                    />
                    {
                        errors.email && touched.email ? <Tooltip>
                            <Text style={{color: 'red'}}>
                                <ErrorMessage name='email'/>
                            </Text>
                        </Tooltip> : null
                    }
                    <Input
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        leftIcon={{
                            name: 'key',
                            type: 'font-awesome-5'
                        }}
                        leftIconContainerStyle={{
                            marginRight: 5
                        }}
                        rightIcon={{
                            name: pwdIcon,
                            type: 'font-awesome-5',
                            onPress: () => {
                                setPwdIcon(pwdIcon === 'eye' ? 'eye-slash' : 'eye')
                            }
                        }}
                        secureTextEntry={pwdIcon !== 'eye'}
                    />
                    {
                        errors.password && touched.password ? <Tooltip>
                            <Text style={{color: 'red'}}>
                                <ErrorMessage name='password'/>
                            </Text>
                        </Tooltip> : null
                    }
                    <Input
                        placeholder='Confirm Password'
                        onChangeText={handleChange('conf_password')}
                        onBlur={handleBlur('conf_password')}
                        value={values.conf_password}
                        leftIcon={{
                            name: 'key',
                            type: 'font-awesome-5'
                        }}
                        leftIconContainerStyle={{
                            marginRight: 5
                        }}
                        rightIcon={{
                            name: pwdConfIcon,
                            type: 'font-awesome-5',
                            onPress: () => {
                                setPwdConfIcon(pwdConfIcon === 'eye' ? 'eye-slash' : 'eye')
                            }
                        }}
                        secureTextEntry={pwdConfIcon !== 'eye'}
                    />
                    {
                        errors.conf_password && touched.conf_password ? <Tooltip>
                            <Text style={{color: 'red'}}>
                                <ErrorMessage name='conf_password'/>
                            </Text>
                        </Tooltip> : null
                    }
                    <View style={localStyles.btnGrp}>
                        <Button
                            onPress={handleSubmit}
                            disabled={loading}
                            titleStyle={{
                                paddingHorizontal: 25,
                                ...styles.actionText
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            onPress={() => {
                                navigation.navigate('SignIn')
                            }}
                            disabled={loading}
                            titleStyle={{
                                paddingHorizontal: 25,
                                ...styles.actionText
                            }}
                        >
                            Cancel
                        </Button>
                    </View>
                    {/*  TODO: Add Confirmation Dialog From RNE  */}
                </View>
            )}
        </Formik>
    );
};

export default SignUpForm;

const localStyles = StyleSheet.create({
    btnGrp: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        marginTop: 55
    }
})
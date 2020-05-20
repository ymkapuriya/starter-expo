import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';

import { Data as EnvData } from '_configs/constants';

import { FormBuilder } from '_libs/forms';
import FirebaseAuthService from '_services/firebase/auth.service'
import { ToastService as toast } from '_services/toast.service'

const firebase = new FirebaseAuthService();

const formFields = [
    [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            inputProps: {
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
            },
        },
    ],
    [
        {
            name: 'password',
            label: 'Password',
            type: 'text',
            inputProps: {
                secureTextEntry: true,
            },
        },
    ]
];

const defaultValues = {
    email: EnvData.firebaseAuth.email,
    password: EnvData.firebaseAuth.password,
}

export default class FirebaseSignUp extends Component {

    constructor(props) {
        super(props)
    }

    getFormFields = () => {
        const fields = formFields;
        return fields;
    }

    getDefaultValues = () => {
        const defaults = defaultValues;
        return defaults;
    }

    handleSignUp = async (data) => {
        console.log("Sign Up : ", data);
        try {
            const user = await firebase.emailSignUp(data.email, data.password);
            toast.success("User signed-up with id : " + user.uid);
            this.props.onSignUp(user);
        } catch (error) {
            toast.error(error);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.keyboardView}
            >
                <View style={styles.container}>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        defaultValues={this.getDefaultValues()}
                        handleSubmit={this.handleSignUp}
                        submitBtnTitle="Sign Up"
                        hideReset={true}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    keyboardView: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container: {
        paddingVertical: 10,
    },
    command: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
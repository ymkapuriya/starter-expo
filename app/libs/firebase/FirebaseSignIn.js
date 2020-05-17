import React, { Component } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { Data as EnvData } from '_configs/constants';

import { FormBuilder } from '_libs/forms';
import { FirebaseService as firebase } from '_services/firebase.service'
import { ToastService as toast } from '_services/toast.service'

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
    ],
    [
        {
            name: 'is_verified',
            label: 'Allow signin for verified email only.',
            type: 'boolean',
        },
    ]
];

const defaultValues = {
    email: EnvData.firebaseAuth.email,
    password: EnvData.firebaseAuth.password,
    is_verified: false
}

export default class FirebaseSignIn extends Component {

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

    handleSignIn = async (data) => {
        console.log("Sign In : ", data);
        try {
            const user = await firebase.emailSignIn(data.email, data.password, data.is_verified);
            toast.success("User signed-up with id : " + user.uid);
            this.props.onSignIn(user);
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
                <ScrollView>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        defaultValues={this.getDefaultValues()}
                        handleSubmit={this.handleSignIn}
                        submitBtnTitle="Sign In"
                        hideReset={true}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
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
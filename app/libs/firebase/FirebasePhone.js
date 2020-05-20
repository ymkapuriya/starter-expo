import React, { Component, createRef } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { Data as EnvData } from '_configs/constants';

//libs
import { FormBuilder } from '_libs/forms';

//services
import FirebaseAuthService from '_services/firebase/auth.service'
import { ToastService as toast } from '_services/toast.service'

const firebase = new FirebaseAuthService();

const verifyFields = [
    [
        {
            name: 'phone',
            label: 'Phone No',
            type: 'text',
            isMobile: true,
            withCountry: true,
            inputProps: {
                //autoFocus: true,
                autoCompleteType: "tel",
                keyboardType: "phone-pad",
                textContentType: "telephoneNumber",
                placeholder: "+91 99999 99999"
            },
        }
    ]
];

const confirmFields = [
    [
        {
            name: 'code',
            label: 'Verification Code',
            type: 'text',
            inputProps: {
                autoFocus: true,
                keyboardType: "phone-pad",
                placeholder: "XXXXXX"
            },
        },
    ]
];

const defaultValues = {
    //phone: '+919925699877'
}

export default class FirebasePhone extends Component {

    constructor(props) {
        super(props)
        this.recaptchaVerifier = createRef();
        this.firebaseConfig = firebase.getConfig();
        this.state = {
            verificationId: false
        }
    }

    sendVerificationCode = async (data) => {
        console.log("Verify Phone : ", data);
        const phone = data.phone;
        try {
            const verificationId = await firebase.verifyPhone(phone, this.recaptchaVerifier);
            console.log("Verification : ", verificationId)
            this.setState({
                verificationId: verificationId,
            })
        } catch (error) {
            toast.error(error);
        }
    }

    confirmCode = async (data) => {
        console.log("Confirm Code : ", data);
        const code = data.code;
        try {
            await firebase.confirmPhone(this.state.verificationId, code);
            this.setState({
                verificationId: false,
            })
            //parent callback
            this.props.onSignIn();
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
                    {!this.state.verificationId ?
                        <>
                            <FirebaseRecaptchaVerifierModal
                                ref={this.recaptchaVerifier}
                                firebaseConfig={this.firebaseConfig}
                            />
                            <FormBuilder
                                formFieldsRows={verifyFields}
                                defaultValues={defaultValues}
                                handleSubmit={this.sendVerificationCode}
                                submitBtnTitle="Go Ahead"
                                hideReset={true}
                            />
                        </>
                        :
                        <FormBuilder
                            formFieldsRows={confirmFields}
                            handleSubmit={this.confirmCode}
                            submitBtnTitle="Confirm Verification Code"
                            hideReset={true}
                        />
                    }
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    keyboardView: {
        //flex: 1,
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
import React, { Component } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

import Colors from '_styles/colors';
import { Data as data } from '_configs/constants';

import { FormBuilder } from '_libs/forms';

const formFields = [
    [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            defaultValue: data.subscriber.email,
            inputProps: {
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
            },
        },
    ]    
];

export default class ResetPasswordForm extends Component {

    constructor(props) {
        super(props)
        this.hideReset = true;
    }

    getFormFields = () => {
        const fields = formFields;
        return fields;
    }

    handleSubmit = (state) => {
        const data = state;
        console.log("Reset Password Data", data);
        if (data) {
            this.props.onSubmit(data.email);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Reset Password"
                        hideReset={this.hideReset}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flex: 1,
        color: Colors.bg
    },
    command: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
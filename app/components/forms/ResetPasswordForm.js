import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import Colors from '_styles/colors';
import { Data as data } from '_configs/constants';

import { FormBuilder } from '_libs/forms';

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
    ]
];

const defaultValues = {
    email: data.subscriber.email,
}

export default class ResetPasswordForm extends Component {

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

    handleSubmit = (state) => {
        const data = state;
        console.log("Reset Password Data", data);
        if (data) {
            this.props.onSubmit(data.email);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        defaultValues={this.getDefaultValues()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Reset Password"
                        hideReset={true}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
    }
});
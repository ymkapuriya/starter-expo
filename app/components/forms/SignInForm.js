import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native';

import { Data as EnvData } from '_configs/constants';
import { FormBuilder } from '_libs/forms';

const formFields = [
    [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            isMobile: true,
            withCountry: false,
            inputProps: {
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'phone-pad',
                maxLength: 10,
                placeholder: "99999 99999"
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
];

const defaultValues = {
    username: EnvData.username,
    password: EnvData.password
}

export default class SignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resetForm: false
        }
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
        console.log("SignIn Data", data);
        if (data) {
            this.props.onSubmit(data);
        }
    }

    clearResetStatus = () => {
        this.setState({
            resetForm: false
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FormBuilder
                    formFieldsRows={this.getFormFields()}
                    defaultValues={this.getDefaultValues()}
                    handleSubmit={this.handleSubmit}
                    submitBtnTitle="Login"
                    resetBtnTitle="Reset"
                    hideReset={false}
                    resetForm={this.state.resetForm}
                    resetCallback={this.clearResetStatus}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    }
});
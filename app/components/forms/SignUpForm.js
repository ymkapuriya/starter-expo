import React, { Component } from 'react'
import { StyleSheet } from 'react-native';

import { Data as EnvData } from '_configs/constants';

import { FormBuilder } from '_libs/forms';

const formFields = [
    [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            inputProps: {
                autoCorrect: false,
            },
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            isOptional: true,
            inputProps: {
                autoCorrect: false,
            },
        },
    ],
    [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            isEmail: true,
            inputProps: {
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
            },
        },
    ],
    [
        {
            name: 'phone',
            label: 'Mobile No',
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
    [
        {
            name: 'subscribe',
            label: 'Subscribe me to weekly news from Tech world.',
            type: 'boolean',
        },
    ],
    [
        {
            name: 'birthdate',
            label: 'Birthdate',
            type: 'date',
            inputProps: {
                minimumDate: new Date(2005, 1, 1)
            }
        },
    ],
    [
        {
            name: 'gender',
            label: 'Gender',
            type: 'picker',
            inputProps: {
                mode: 'dropdown'
            },
            items: {
                MALE: 'Male',
                FEMALE: 'Female',
            }
        },
    ],
    [
        {
            name: 'role',
            label: 'Role',
            type: 'checkbox',
            inputProps: {
                color: 'lightblue'
            },
            items: {
                ROLE_ADMN: 'Admin',
                ROLE_MNGR: 'Manager',
                ROLE_OPTR: 'Operator'
            }
        },
    ],
];

const defaultValues = {
    firstName: EnvData.subscriber.first_name,
    lastName: EnvData.subscriber.last_name,
    email: EnvData.subscriber.email,
    phone: EnvData.subscriber.phone,
    password: EnvData.subscriber.password,
    subscribe: true,
    role: ["ROLE_ADMN"],
    gender: 'MALE',
    birthdate: new Date(),
}

export default class SignUpForm extends Component {

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

    /**
     * Submit form
     */
    handleSubmit = (state) => {
        const data = state;
        console.log("SignUp Data", data);
        if (data) {
            this.props.onSubmit(data);
        }
    }

    clearResetStatus = () => {
        this.setState({
            resetForm: false
        })
        this.props.resetCallbackScreen();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.resetForm !== prevState.resetForm) {
            return {
                resetForm: nextProps.resetForm
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <FormBuilder
                formFieldsRows={this.getFormFields()}
                defaultValues={this.getDefaultValues()}
                handleSubmit={this.handleSubmit}
                submitBtnTitle="Sign Up"
                resetBtnTitle="Reset"
                hideReset={false}
                resetForm={this.state.resetForm}
                resetCallback={this.clearResetStatus}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    }
});
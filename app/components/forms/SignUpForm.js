import React, { Component } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

import Colors from '_styles/colors';
import { Data as data } from '_configs/constants';

import { FormBuilder } from '_libs/forms';

const formFields = [
    [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            defaultValue: data.subscriber.first_name,
            inputProps: {
                autoCorrect: false,
            },
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            defaultValue: data.subscriber.last_name,
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
            defaultValue: data.subscriber.email,
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
            defaultValue: data.subscriber.phone,
            inputProps: {
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'phone-pad',
                maxLength: 10
            },
        },
    ],
    [
        {
            name: 'password',
            label: 'Password',
            type: 'text',
            defaultValue: data.subscriber.password,
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
            defaultValue: false,
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
    [
        {
            name: 'gender',
            label: 'Gender',
            type: 'picker',
            defaultValue: 'MALE',
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
            name: 'birthdate',
            label: 'Birthdate',
            type: 'date',
            inputProps: {
                minimumDate: new Date(2005, 1, 1)
            }
        },
    ]
];

export default class SignUpForm extends Component {

    constructor(props) {
        super(props)
    }

    getFormFields = () => {
        const fields = formFields;
        return fields;
    }

    handleSubmit = (state) => {
        const data = state;
        console.log("SignUp Data", data);
        if (data) {
            this.props.onSubmit(data);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Sign Up"
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
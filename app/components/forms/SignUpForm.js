import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';

import Colors from '_styles/colors';
import { Data as data } from '_configs/constants';

import { FormBuilder } from '_libs/forms';
import { ScrollView } from 'react-native-gesture-handler';

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

const defaultValues = {
    firstName: data.subscriber.first_name,
    lastName: data.subscriber.last_name,
    email: data.subscriber.email,
    phone: data.subscriber.phone,
    password: data.subscriber.password,
    subscribe: true,
    //role: ["ROLE_ADMN"],
    //gender: 'MALE',
    //birthdate: new Date(),    
}

export default class SignUpForm extends Component {

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

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.keyboardView}
            >
                <ScrollView style={styles.container}>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        defaultValues={this.getDefaultValues()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Sign Up"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {        
        color: Colors.bg,
        paddingVertical: 10,
    },
    keyboardView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    command: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
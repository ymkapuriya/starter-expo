import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import t from 'tcomb-form-native';

import Colors from '_styles/colors';
import { Data as data } from '_configs/constants';

const Form = t.form.Form;

const SignIn = t.struct({
    username: t.String,
    password: t.String
});

const options = {
    auto: 'placeholders',
    fields: {
        username: {
            label: "Enter username",
            error: "Username is required, usually it is 10 digit mobile number",
            keyboardType: "number-pad",
        },
        password: {
            label: "Enter password",
            error: "Password is required.",
            secureTextEntry: true
        }
    }
}

const defaultValues = {
    username: data.username,
    password: data.password
}

export default class SignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: defaultValues
        }
    }

    onChange = (value) => {
        this.setState({ value: value });
    }

    handleSubmit = () => {
        const data = this._form.getValue(); // use that ref to get the form value
        console.log("SignIn Data", data);
        if (data) {
            this.props.onSubmit(data);
        }
    }

    resetForm = () => {
        // clear content from all textbox
        this.setState({ value: defaultValues });
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={f => this._form = f}
                    type={SignIn}
                    value={this.state.value}
                    options={options}
                    onChange={this.onChange}
                />
                <View style={styles.command}>
                    <Button
                        title="Login"
                        onPress={this.handleSubmit}
                    >
                    </Button>
                    <Button
                        title="Reset"
                        type="outline"
                        onPress={this.resetForm}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    command: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { GoogleService as google } from '_services/google.service';

export default class GoogleSignIn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            signedIn: false,
            accessToken: "",
            user: {}
        }
    }

    handleSignIn = async () => {

        try {
            const result = await google.signIn();
            this.setState({
                signedIn: true,
                accessToken: result.accessToken,
                user: result.user
            })
            /**
             * this.state contains accessToken and user object
             * Which will be used by parent handler
             */
            this.props.onSignIn(this.state);
        } catch (e) {
            console.log("Google Signin : ", e)
        }
    }

    handleSignOut = async () => {
        try {
            const result = await google.signOut(this.state.accessToken);
            this.setState({
                signedIn: false,
                accessToken: "",
                user: {}
            })
            //call parent handler
            this.props.onSignOut();
        } catch (e) {
            console.log("Google Signout : ", e)
        }
    }

    render() {
        if (!this.state.signedIn) {
            return (
                <TouchableOpacity
                    onPress={this.handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                <TouchableOpacity
                    onPress={this.handleSignOut}
                    style={[styles.button, styles.signOut]}
                >
                    <Text style={styles.text}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formCont: {
        justifyContent: "space-around",
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: "violet",
        alignItems: "center"
    },
    signOut: {
        backgroundColor: "yellowgreen",
    },
    text: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
    }
});

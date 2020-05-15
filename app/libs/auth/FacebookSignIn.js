import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { FacebookService as facebook } from '_services/facebook.service';

export default class FacebookSignIn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            signedIn: false,
            accessToken: "",
            user: {},
        }
    }

    handleSignIn = async () => {

        try {
            const { accessToken, user } = await facebook.signIn();

            this.setState({
                signedIn: true,
                accessToken: accessToken,
                user: user
            })

            /**
             * this.state contains accessToken and user object
             * Which will be used by parent handler
             */
            this.props.onSignIn(this.state);
        } catch (e) {
            console.log("Facebook Signin : ", e)
        }
    }

    handleSignOut = async () => {
        try {
            const result = await facebook.signOut(this.state.accessToken);
            this.setState({
                signedIn: false,
                accessToken: "",
                user: {}
            })
            //call parent handler
            this.props.onSignOut();
        } catch (e) {
            console.log("Facebook Signout : ", e)
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
                <Text style={styles.note}>Mock Signout</Text>
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
    },
    note: {
        paddingVertical: 10,
        color: "grey"
    }
});

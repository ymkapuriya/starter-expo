import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

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
                <Button
                    title="Sign In"
                    onPress={this.handleSignIn}
                />
            )
        }
        return (
            <View>
                <Button
                    title="Sign Out"
                    onPress={this.handleSignOut}
                    buttonStyle={[styles.signOut]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    signOut: {
        backgroundColor: "yellowgreen",
    },
});

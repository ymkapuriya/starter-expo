import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

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

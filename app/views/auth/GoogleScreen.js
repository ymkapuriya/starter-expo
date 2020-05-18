import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { googleSignIn, signOut } from '_actions/auth.action';
import { notifyError } from '_actions/notify.action';

//libs
import GoogleSignIn from '_libs/auth/GoogleSignIn';
import { Card } from '_components/elements';


class GoogleScreen extends Component {

    constructor(props) {
        super(props);
    }

    handleSignIn = ({ accessToken, user }) => {
        console.log("Google Signin");
        console.log("Access token", accessToken);
        console.log("User", user);

        //dispatch signIn action using redux
        this.props.googleSignIn(accessToken, user);
        RootNavigation.navigate('Landing');
    }

    handleSignOut = () => {
        console.log("Google Signout");

        //dispatch signOut action
        this.props.signOut();
        RootNavigation.navigate('Landing');
    }

    render() {
        return (
            <Grid style={styles.background}>
                <Row size={25}>
                    <Col style={styles.titleCont}>
                        <Text h4 h4Style={styles.title}>
                            Sign in with Google!
                        </Text>
                    </Col>
                </Row>
                <Row size={65}>
                    <Col size={15}></Col>
                    <Col size={50}>
                        <Card>
                            <GoogleSignIn
                                onSignIn={this.handleSignIn}
                                onSignOut={this.handleSignOut}
                            />
                        </Card>
                    </Col>
                    <Col size={15}></Col>
                </Row>
                <Row size={10}>
                    <Col style={[styles.titleCont, styles.footerCont]}>
                        <Text style={styles.footer}>
                            Developed using
                            </Text>
                        <Text style={[styles.footer, styles.highlight]}>
                            expo-google-app-auth
                        </Text>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.bg,
    },
    titleCont: {
        justifyContent: "center",
        alignItems: 'center',
    },
    title: {
        justifyContent: 'center',
        color: Colors.fg
    },
    component: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerCont: {
        justifyContent: "space-evenly"
    },
    footer: {
        justifyContent: 'center',
        color: Colors.note
    },
    highlight: {
        color: Colors.highlight
    }
});

const mapStateToProps = (state) => {
    const { auth, notify } = state;
    return {
        auth,
        notify
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        googleSignIn: bindActionCreators(googleSignIn, dispatch),
        signOut: bindActionCreators(signOut, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleScreen);

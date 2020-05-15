import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, H1, Text, Button } from "native-base";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { googleSignIn, signOut } from '_actions/auth.action';
import { notifyError } from '_actions/notify.action';

//libs
import GoogleSignIn from '_libs/auth/GoogleSignIn';

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
            <Container style={styles.background}>
                <Grid>
                    <Row size={25}>
                        <Col style={styles.titleCont}>
                            <H1 style={styles.title}>
                                Sign in with Google!
                            </H1>
                        </Col>
                    </Row>
                    <Row size={65}>
                        <Col size={15}></Col>
                        <Col size={50}>
                            <Card style={styles.component}>
                                <CardItem>
                                    <Text>
                                        GoogleSignIn
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.footer}>
                                        Library
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <GoogleSignIn
                                        onSignIn={this.handleSignIn}
                                        onSignOut={this.handleSignOut}
                                    />
                                </CardItem>
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
            </Container>
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

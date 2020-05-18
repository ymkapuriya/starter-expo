import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fbSignIn, signOut } from '_actions/auth.action';
import { notifyError } from '_actions/notify.action';

//libs
import FacebookSignIn from '_libs/auth/FacebookSignIn';
import { Card } from '_components/elements';

class FacebookScreen extends Component {

    constructor(props) {
        super(props);
    }

    handleSignIn = ({ accessToken, user }) => {
        console.log("Facebook Signin");
        console.log("Access token : ", accessToken);
        console.log("User : ", user);

        //dispatch signIn action using redux
        this.props.fbSignIn(accessToken, user);
        RootNavigation.navigate('Landing');
    }

    handleSignOut = () => {
        console.log("Facebook Signout");

        //dispatch signOut action
        this.props.signOut();
        RootNavigation.navigate('Landing');
    }

    render() {
        return (
            <Grid>
                <Row size={25}>
                    <Col style={styles.titleCont}>
                        <Text h4 h4Style={styles.title}>
                            Sign in with Facebook!
                        </Text>
                    </Col>
                </Row>
                <Row size={65}>
                    <Col size={15}></Col>
                    <Col size={50}>
                        <Card style={styles.card}>
                            <FacebookSignIn
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
                            expo-facebook
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
    card: {
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
        fbSignIn: bindActionCreators(fbSignIn, dispatch),
        signOut: bindActionCreators(signOut, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookScreen);

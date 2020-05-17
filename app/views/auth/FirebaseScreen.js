import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Grid, Row, Col, Card, CardItem, H1, H2, Button } from "native-base";
import ViewPager from '@react-native-community/viewpager';

import Colors from '_styles/colors';

//libs
import FirebaseSignIn from '_libs/firebase/FirebaseSignIn';
import FirebaseSignUp from '_libs/firebase/FirebaseSignUp';
import { FirebaseService as firebase } from '_services/firebase.service';
import { ToastService as toast } from '_services/toast.service'


export default class FirebaseScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            loggedUser: {}
        }
    }

    handleSignUp = (newUser) => {
        console.log("Firebase SignUp");
        console.log("User", newUser);
    }

    handleSignIn = (signedUser) => {
        console.log("Firebase Signin");
        console.log("User", signedUser);
        this.setState({
            isSignedIn: true,
            loggedUser: signedUser
        })
    }

    handleSignOut = async () => {
        console.log("Firebase Signout");
        try {
            let response = await firebase.signOut();
            this.setState({
                isSignedIn: false,
                loggedUser: {}
            })
            toast.success(response);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                <Grid>
                    <Row size={20}>
                        <View style={styles.titleCont}>
                            <H1 style={styles.title}>
                                Firebase Authentication
                            </H1>
                        </View>
                    </Row>
                    <Row size={70}>
                        <Col size={15}></Col>
                        <Col size={70}>
                            <View style={styles.pagerCont}>
                                <ViewPager
                                    style={styles.viewPager}
                                    initialPage={0}
                                    showPageIndicator={true}
                                >
                                    <View style={styles.page} key="1">
                                        <Card style={styles.card}>
                                            <CardItem header>
                                                <H1>Sign-in!</H1>
                                            </CardItem>
                                            {this.state.isSignedIn ?
                                                <>
                                                    <CardItem>
                                                        <H2>User : {this.state.loggedUser.email}</H2>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Button
                                                            onPress={() => this.handleSignOut()}>
                                                            <Text style={styles.button}>Signout</Text>
                                                        </Button>
                                                    </CardItem>
                                                </>
                                                :
                                                <CardItem>
                                                    <FirebaseSignIn
                                                        onSignIn={this.handleSignIn}
                                                        onSignOut={this.handleSignOut}
                                                        key="form-signin"
                                                    />
                                                </CardItem>
                                            }
                                        </Card>
                                    </View>
                                    <View style={styles.page} key="2">
                                        <Card style={styles.card}>
                                            <CardItem header>
                                                <H1>Sign-up!</H1>
                                            </CardItem>
                                            <CardItem>
                                                <FirebaseSignUp
                                                    onSignUp={this.handleSignUp}
                                                    key="form-signup"
                                                />
                                            </CardItem>
                                        </Card>
                                    </View>
                                </ViewPager>
                            </View>
                        </Col>
                        <Col size={15}></Col>
                    </Row>
                    <Row size={10}>
                        <View style={[styles.titleCont, styles.footerCont]}>
                            <Text style={styles.footer}>
                                Developed using
                            </Text>
                            <Text style={[styles.footer, styles.highlight]}>
                                firebase-js-sdk
                            </Text>
                            <Text style={styles.footer}>
                                https://docs.expo.io/guides/using-firebase/
                            </Text>
                        </View>
                    </Row>
                </Grid>
            </>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.bg,
        flex: 1,
        flexDirection: "column",
        height: "100%"
    },
    titleCont: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    title: {
        justifyContent: 'center',
        color: Colors.fg
    },
    pagerCont: {
        flex: 1,
    },
    viewPager: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        color: "white"
    },
    footerCont: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    footer: {
        justifyContent: 'center',
        color: Colors.note
    },
    highlight: {
        color: Colors.highlight
    },

});
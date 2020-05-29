import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Card } from 'react-native-elements';

import { Col, Row, Grid } from "react-native-easy-grid";

import ViewPager from '@react-native-community/viewpager';

//styles
import Colors from '_styles/colors';
import { CardStyles } from '_styles/global';

//libs
import FirebaseSignIn from '_libs/firebase/FirebaseSignIn';
import FirebaseSignUp from '_libs/firebase/FirebaseSignUp';
import FirebasePhone from '_libs/firebase/FirebasePhone';

//services
import { ToastService as toast } from '_services/toast.service'
import FirebaseAuthService from '_services/firebase/auth.service'
const firebase = new FirebaseAuthService();

export default class FirebaseScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            loggedUser: {}
        }
    }

    emailSignUp = (newUser) => {
        console.log("Firebase Email SignUp");
        console.log("User", newUser);
        this.setState({
            isSignedIn: true,
            loggedUser: signedUser
        })
    }

    emailSignIn = (signedUser) => {
        console.log("Firebase Email Signin");
        console.log("User", signedUser);
        this.setState({
            isSignedIn: true,
            loggedUser: signedUser
        })
    }

    phoneSignIn = () => {
        console.log("Firebase Phone Signin Successful");
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
                    <Row size={10}>
                        <View style={styles.titleCont}>
                            <Text h4 h4Style={styles.title}>
                                Firebase Authentication
                            </Text>
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
                                        <Card
                                            title="Sign-in!"
                                            containerStyle={[CardStyles.container, styles.card]}>
                                            {this.state.isSignedIn ?
                                                <View>
                                                    <Text>User : {this.state.loggedUser.email}</Text>
                                                    <Button
                                                        title="Signout"
                                                        onPress={() => this.handleSignOut()}
                                                    />
                                                </View>
                                                :
                                                <View>
                                                    <FirebaseSignIn
                                                        onSignIn={this.emailSignIn}
                                                        key="form-signin"
                                                    />
                                                </View>
                                            }
                                        </Card>
                                    </View>
                                    <View style={styles.page} key="2">
                                        <Card
                                            title="Sign-up!"
                                            containerStyle={[CardStyles.container, styles.card]}>
                                            <View>
                                                <FirebaseSignUp
                                                    onSignUp={this.emailSignUp}
                                                    key="form-signup"
                                                />
                                            </View>
                                        </Card>
                                    </View>
                                    <View style={styles.page} key="3">
                                        <Card
                                            title="Phone Auth!"
                                            containerStyle={[CardStyles.container, styles.card]}>
                                            <View>
                                                <FirebasePhone
                                                    onSignIn={this.phoneSignIn}
                                                    key="form-phone"
                                                />
                                            </View>
                                        </Card>
                                    </View>
                                </ViewPager>
                            </View>
                        </Col>
                        <Col size={15}></Col>
                    </Row>
                    <Row size={20}>
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
                            <Text style={styles.footer}>
                                https://docs.expo.io/versions/latest/sdk/firebase-recaptcha/
                            </Text>
                            <Text style={styles.footer}>
                                https://firebase.google.com/docs/auth/web/start
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
        justifyContent: "flex-end",
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
        width: "98%"
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
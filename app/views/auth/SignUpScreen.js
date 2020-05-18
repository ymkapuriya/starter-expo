import React, { Component } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { Text } from 'react-native-elements';

import { Col, Row, Grid } from "react-native-easy-grid";


import { NavigationContext } from '@react-navigation/native';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signUp } from '_actions/auth.action';
import { notifyError, notifySuccess } from '_actions/notify.action';

// Components
import { SignUpForm } from '_forms';
import { Card } from '_components/elements';

class SignUpScreen extends Component {

    static contextType = NavigationContext;

    constructor(props) {
        super(props);

        this.state = {
            resetForm: false
        }
    }

    handleSignUp = (user) => {
        this.props.signUp(user);
    }

    clearResetStatus = () => {
        this.setState({
            resetForm: false
        })
    }

    onFocus = () => {
        console.log("Signup Screen on Focus")
        //Form should be cleared every time it is focussed
        this.setState({
            resetForm: true
        })
    }

    componentDidMount() {
        const navigation = this.context;
        //bind focus event
        this._focus = navigation.addListener('focus', this.onFocus);
    }

    componentWillUnmount() {
        //unbind focus event
        this._focus();
    }

    componentDidUpdate(prevProps) {
        const navigation = this.context;
        if (this.props.notify.isSuccess) {
            this.props.notifySuccess(this.props.notify.message);
            setTimeout(() => {
                navigation.navigate('SignIn');
            }, 2000);
        }
        if (this.props.notify.isError) {
            this.props.notifyError(this.props.notify);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
            >
                <ScrollView>
                    <Grid style={styles.background}>
                        <Row size={15}>
                            <Col style={styles.titleCont}>
                                <Text h4 h4Style={styles.title}>
                                    Sign Up!
                            </Text>
                            </Col>
                        </Row>
                        <Row size={75}>
                            <Col size={10}></Col>
                            <Col size={80}>
                                <Card title="Enter Your Detail">
                                    <SignUpForm
                                        onSubmit={this.handleSignUp}
                                        resetForm={this.state.resetForm}
                                        resetCallbackScreen={this.clearResetStatus}
                                    />
                                </Card>
                            </Col>
                            <Col size={10}></Col>
                        </Row>
                        <Row size={10}>
                            <Col style={[styles.titleCont, styles.footerCont]}>
                                <Text style={styles.footer}>
                                    Developed using
                            </Text>
                                <Text style={[styles.footer, styles.highlight]}>
                                    My Form Library
                            </Text>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingVertical: 30
    },
    title: {
        justifyContent: 'center',
        color: Colors.fg
    },
    card: {
        padding: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
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
        signUp: bindActionCreators(signUp, dispatch),
        notifySuccess: bindActionCreators(notifySuccess, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
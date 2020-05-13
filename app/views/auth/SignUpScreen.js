import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, H1 } from "native-base";

import { NavigationContext } from '@react-navigation/native';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signUp } from '_actions/auth.action';
import { notifyError, notifySuccess } from '_actions/notify.action';

// Components
import { SignUpForm } from '_forms';

class SignUpScreen extends Component {

    static contextType = NavigationContext;

    constructor(props) {
        super(props);
    }

    handleSignUp = (user) => {
        this.props.signUp(user);
    }

    componentDidMount() {
        const navigation = this.context;
        this._focus = navigation.addListener('focus', () => {
            console.log("Focus");
        });
    }

    componentWillUnmount() {
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
            <Container style={styles.background}>
                <Grid>
                    <Row size={20}>
                        <Col style={styles.titleCont}>
                            <H1 style={styles.title}>
                                Sign Up!
                            </H1>
                        </Col>
                    </Row>
                    <Row size={80}>
                        <Col size={10}></Col>
                        <Col size={80}>
                            <Card style={styles.formCont}>
                                <CardItem style={styles.form}>
                                    <SignUpForm
                                        onSubmit={this.handleSignUp}
                                    />
                                </CardItem>
                            </Card>
                        </Col>
                        <Col size={10}></Col>
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
    formCont: {
        justifyContent: 'center',
        alignItems: 'center',
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
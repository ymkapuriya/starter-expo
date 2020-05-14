import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, H1, Text } from "native-base";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signIn } from '_actions/auth.action';
import { notifyError } from '_actions/notify.action';

// Components
import { SignInForm } from '_forms';

class SignInScreen extends Component {

    constructor(props) {
        super(props);
    }

    handleSignIn = (user) => {
        this.props.signIn(user);
        RootNavigation.navigate('Landing');
    }

    componentDidUpdate(prevProps) {
        if (this.props.notify.isError) {
            this.props.notifyError(this.props.notify);
        }
    }

    render() {
        return (
            <Container style={styles.background}>
                <Grid>
                    <Row size={25}>
                        <Col style={styles.titleCont}>
                            <H1 style={styles.title}>
                                Sign In!
                            </H1>
                        </Col>
                    </Row>
                    <Row size={65}>
                        <Col size={10}></Col>
                        <Col size={80}>
                            <Card style={styles.formCont}>
                                <CardItem>
                                    <SignInForm
                                        onSubmit={this.handleSignIn}
                                    />
                                </CardItem>
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
                                tcomb-form-native
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
    formCont: {
        justifyContent: "space-around",
        alignItems: 'center',
        paddingBottom: 50,
    },
    footerCont : {
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
        signIn: bindActionCreators(signIn, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

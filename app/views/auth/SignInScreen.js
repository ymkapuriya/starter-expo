import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signIn } from '_actions/auth.action';
import { notifyError } from '_actions/notify.action';

// Components
import { SignInForm } from '_forms';
import { Card } from '_components/elements';

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
            <Grid style={styles.background}>
                <Row size={25}>
                    <Col style={styles.titleCont}>
                        <Text h4 h4Style={styles.title}>
                            Sign In!
                            </Text>
                    </Col>
                </Row>
                <Row size={65}>
                    <Col size={10}></Col>
                    <Col size={80}>
                        <Card title="Enter Credentials">
                            <SignInForm
                                onSubmit={this.handleSignIn}
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
        signIn: bindActionCreators(signIn, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

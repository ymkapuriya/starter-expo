import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text } from 'react-native-elements';

import { Col, Row, Grid } from "react-native-easy-grid";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { resetPassword } from '_actions/auth.action';
import { notifyError, notifySuccess } from '_actions/notify.action';

// Components
import { ResetPasswordForm } from '_forms';
import { Card } from '_components/elements';

class ResetPasswordScreen extends Component {

    constructor(props) {
        super(props);
    }

    handleResetPassword = (email) => {
        this.props.resetPassword(email);
    }

    componentDidUpdate(prevProps) {
        if (this.props.notify.isSuccess) {
            this.props.notifySuccess(this.props.notify.message);
            setTimeout(() => {
                RootNavigation.navigate('SignIn');
            }, 2000);
        }
        if (this.props.notify.isError) {
            this.props.notifyError(this.props.notify);
        }
    }

    render() {
        return (
            <Grid style={styles.background}>
                <Row size={20}>
                    <Col style={styles.titleCont}>
                        <Text h4 h4Style={styles.title}>
                            Reset Password!
                            </Text>
                    </Col>
                </Row>
                <Row size={70}>
                    <Col size={10}></Col>
                    <Col size={80}>
                        <Card title="Enter Detail">
                            <ResetPasswordForm
                                onSubmit={this.handleResetPassword}
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
        resetPassword: bindActionCreators(resetPassword, dispatch),
        notifySuccess: bindActionCreators(notifySuccess, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
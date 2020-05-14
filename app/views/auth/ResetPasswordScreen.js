import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, H1 } from "native-base";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { resetPassword } from '_actions/auth.action';
import { notifyError, notifySuccess } from '_actions/notify.action';

// Components
import { ResetPasswordForm } from '_forms';

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
            <Container style={styles.background}>
                <Grid>
                    <Row size={20}>
                        <Col style={styles.titleCont}>
                            <H1 style={styles.title}>
                                Reset Password!
                            </H1>
                        </Col>
                    </Row>
                    <Row size={80}>
                        <Col size={10}></Col>
                        <Col size={80}>
                            <Card style={styles.formCont}>
                                <CardItem style={styles.form}>
                                    <ResetPasswordForm
                                        onSubmit={this.handleResetPassword}
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
        resetPassword: bindActionCreators(resetPassword, dispatch),
        notifySuccess: bindActionCreators(notifySuccess, dispatch),
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
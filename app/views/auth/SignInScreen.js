import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, Text, Button } from "native-base";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signIn } from '_actions/auth.action';

class SignInScreen extends Component {

    constructor(props) {
        super(props);
    }

    handleSignIn = () => {
        let user = {
            username: 'username',
            password: 'password',
            deviceId: 'device_id'
        }
        this.props.signIn(user);
        RootNavigation.navigate('Landing');
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={100}>
                        <Col style={styles.background}>
                            <Card transparent>
                                <CardItem>
                                    <Text>
                                        Sign In!
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Button bordered onPress={this.handleSignIn}>
                                        <Text>Go</Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.fg,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

const mapStateToProps = (state) => {
    const { auth, error } = state;
    return {
        auth,
        error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: bindActionCreators(signIn, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

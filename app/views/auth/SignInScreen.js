import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, Text, H1, Button, Toast } from "native-base";

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';
import { authService as auth } from '_services/auth';
import { ToastService as toast } from '_services/common';

export default class SignInScreen extends Component {

    constructor(props) {
        super(props);
    }

    async signIn() {
        try {
            let response = await auth.login('username', 'pass');
            toast.success('Successful Login');

            //redirect to Dashboard via Landing screen
            RootNavigation.navigate('Landing');
        } catch (error) {
            toast.error(error);
        }
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
                                    <Button bordered onPress={this.signIn}>
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
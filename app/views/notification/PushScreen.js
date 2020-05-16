import React, { Component } from "react";
import { StyleSheet, View, Vibration } from "react-native";
import { Container, Grid, Row, Col, H1, Button, Text } from "native-base";

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';

//library
import PushNotification from '_libs/notification/PushNotification';

export default class PushScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fcmComponent: false,
            expoToken: "",
            notification: {},
            received: false
        }
    }

    initComponent = () => {
        this.setState({
            fcmComponent: true
        })
    }

    tokenRegistered = (token) => {
        this.setState({
            expoToken: token
        })
    }

    onNotification = (notification) => {
        Vibration.vibrate();
        this.setState({
            notification: notification,
            received: true
        });
    }

    render() {
        return (
            <Container>
                <AppHeader
                    title="Push"
                    iconName="ios-notifications"
                    iconType="Ionicons"
                    {...this.props}
                />
                <Grid>
                    <Row size={30}>
                        <Col style={styles.header}>
                            <H1 style={styles.title}>Push Notifications</H1>
                            <Text style={styles.title}>Firebase Cloud Messaging</Text>
                            <Button primary rounded onPress={this.initComponent} >
                                <Text>Load Component</Text>
                            </Button>
                        </Col>
                    </Row>
                    <Row size={20}>
                        <Col style={styles.header}>
                            {this.state.fcmComponent &&
                                <>
                                    <Text>Expo Token : {this.state.expoToken} </Text>
                                    <PushNotification
                                        tokenRegistered={this.tokenRegistered}
                                        onNotification={this.onNotification}
                                    />
                                </>
                            }
                        </Col>
                    </Row>
                    <Row size={30}>
                        <Col>
                            <View style={styles.content}>
                                <Text>Notification Detail</Text>
                                {this.state.received &&
                                    <View style={styles.notification}>
                                        <Text>Origin: {this.state.notification.origin}</Text>
                                        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
                                    </View>
                                }
                            </View>
                        </Col>
                    </Row>
                    <Row size={20}>
                        <Col>
                            <Text style={styles.footer}>
                                Developed using
                            </Text>
                            <Text style={[styles.footer, styles.highlight]}>
                                expo-notification-api
                            </Text>
                            <Text style={[styles.footer]}>
                                https://docs.expo.io/guides/push-notifications/
                            </Text>
                            <Text style={[styles.footer]}>
                                https://docs.expo.io/guides/using-fcm/
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.bg,
        justifyContent: "space-evenly",
        alignItems: 'center',
        flex: 1
    },
    title: {
        color: Colors.fg,
    },
    content: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
    },
    notification: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        justifyContent: 'center',
        color: Colors.note,
        textAlign: "center"
    },
    highlight: {
        color: Colors.highlight
    }
});
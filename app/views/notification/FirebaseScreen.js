import React, { Component } from "react";
import { StyleSheet, View, Vibration } from "react-native";
import { Container, Grid, Row, Col, H1, Button, Text } from "native-base";

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';

//library
import FCMPush from '_libs/notification/FCMPush';

export default class FirebaseScreen extends Component {

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

    updateToken = (token) => {
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
                    title="FCM Push"
                    iconName="firebase"
                    iconType="MaterialCommunityIcons"
                    {...this.props}
                />
                <Grid>
                    <Row size={30}>
                        <Col style={styles.header}>
                            <H1 style={styles.title}>Firebase Cloud Messaging</H1>
                            <Text style={styles.title}>Push Notifications</Text>
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
                                    <FCMPush
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
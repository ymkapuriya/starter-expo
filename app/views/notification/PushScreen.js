import React, { Component } from "react";
import { StyleSheet, View, Vibration } from "react-native";
import { Text, Button } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

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
            <>
                <AppHeader
                    title="Push"
                    iconName="ios-notifications"
                    iconType="ionicon"
                    {...this.props}
                />
                <Grid>
                    <Row size={30}>
                        <Col style={styles.header}>
                            <Text h4 h4Style={styles.title}>Push Notifications</Text>
                            <Text style={styles.title}>Firebase Cloud Messaging</Text>
                            <Button
                                title="Load Component"
                                onPress={this.initComponent}
                            />
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
            </>
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
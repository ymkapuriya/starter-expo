import React, { Component } from 'react'
import { Button } from "react-native";

import PropTypes from 'prop-types'

import { Notifications } from 'expo';

import { NotificationService as notification } from '_services/notification.service.js';
import { ToastService as toast } from '_services/toast.service.js';

export default class PushNotification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pushToken: "",
            notification: {}
        };
    };

    registerForPushNotifications = async () => {
        try {
            let token = await notification.register();
            console.log("Registration : ", token);
            this.setState({
                pushToken: token
            });
            this.props.tokenRegistered(token);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    _handleNotification = (notification) => {
        console.log("Notification : ", notification);
        this.setState({
            notification: notification
        });
        this.props.onNotification(notification);
    };


    componentDidMount() {
        this.registerForPushNotifications();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    componentWillUnmount() {
        //unbind focus event
        this._handleNotification();
    }

    /**
     * Send push notification
     */
    sendPushNotification = async () => {
        const message = {
            to: this.state.pushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { sample: 'this is sample date' },
            _displayInForeground: true,
        };

        try {
            const response = await notification.send(message);
            toast.success(response);
        } catch (error) {
            toast.error(error);
        }
    };

    render() {
        return (
            <Button
                title={'Press to Send Test Notification'}
                onPress={() => this.sendPushNotification()}
            />
        );
    }
}

PushNotification.propTypes = {
    tokenRegistered: PropTypes.func,    //registration callback
    onNotification: PropTypes.func      //notification received callback
};

PushNotification.defaultProps = {
    tokenRegistered: f => f,
    onNotification: f => f,
};

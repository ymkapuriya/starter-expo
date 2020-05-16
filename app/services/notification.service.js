import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export class NotificationService {

    /**
     * Register device for push notification
     * 
     * @returns {Promise} - With device token in case of success or error
     */
    static register = async () => {

        //check device or not
        if (Constants.isDevice) {
            //check notification permissions
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                return Promise.reject("Failed to get permission for push notification!");
            }

            try {
                const token = await Notifications.getExpoPushTokenAsync();

                if (Platform.OS === 'android') {
                    Notifications.createChannelAndroidAsync('default', {
                        name: 'default',
                        sound: true,
                        priority: 'max',
                        vibrate: [0, 250, 250, 250],
                    });
                }

                return Promise.resolve(token);
            } catch (error) {
                return Promise.reject("Failed to get push token for push notification!");
            }
        } else {
            return Promise.reject("Must use physical device for Push Notifications");
        }
    }

    /**
     * Send push notification using Expo
     */
    static send = async (message) => {

        const url = 'https://exp.host/--/api/v2/push/send';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (response.ok) {
            return Promise.resolve("Push notification sent.")
        }
        console.log("Notification Service - Send : ", response);
        return Promise.reject("Error in sending push notification");
    }
} 
import { Alert } from 'react-native';


export class AlertService {

    static ok(title, message, callback = undefined) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Ok',
                    onPress: () => {
                        if (callback) {
                            callback()
                        }
                    },
                }
            ]
        );
    }

    static confirm(title, message, okCallback, cancelCallback = undefined) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Yes',
                    onPress: () => okCallback(),
                },
                {
                    text: 'No',
                    onPress: () => {
                        if (cancelCallback) {
                            cancelCallback()
                        }
                    },
                    style: 'cancel',
                }
            ],
            {
                cancelable: false
            }
        );
    }
}
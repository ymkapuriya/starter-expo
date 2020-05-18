import Colors from '_styles/colors';
import Toast from 'react-native-root-toast';
//https://www.npmjs.com/package/react-native-root-toast

const defaultOptions = {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
}
const POSITION = -50

export class ToastService {

    static show(message) {
        Toast.show(message, defaultOptions);
    }

    static success(message) {
        Toast.show(message, {
            position: POSITION
        });
    }

    static error(error) {
        let type = typeof error;
        let message;
        //console.log(type);
        switch (type) {
            case 'string':
                message = error;
                break;
            case 'object':
                let messages = [];
                for (const key in error) {
                    if (error.hasOwnProperty(key)) {
                        const m = error[key];
                        messages.push(m);
                    }
                }
                message = messages.join(", ");
            default:
                message = error.message
                break;
        }
        Toast.show(message, {
            duration: 5000,
            backgroundColor: Colors.errorBackground,
            shadow: false,
            opacity: 0.7,
            position: POSITION
        });
    }
}
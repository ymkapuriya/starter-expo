import { Toast } from "native-base";
import Colors from '_styles/colors';


export class ToastService {

    static success(message) {
        Toast.show({
            text: message,
            buttonText: "Ok"
        });
    }

    static error(message) {
        let type = typeof message;
        switch (type) {
            case 'string':
                break;
            case 'object':
                let messages = [];
                for (const key in message) {
                    if (message.hasOwnProperty(key)) {
                        const m = message[key];
                        messages.push(m);
                    }
                }
                message = messages.join(", ");
            default:
                break;
        }
        Toast.show({
            text: message,
            buttonText: "Ok",
            duration: 3000,
            style: {
                backgroundColor: Colors.errorBackground
            }
        });
    }
}
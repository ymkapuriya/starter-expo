import { Toast } from "native-base";
import Colors from '_styles/colors';


export class ToastService {

    static success(message) {
        Toast.show({
            text: message,
            buttonText: "Ok"
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
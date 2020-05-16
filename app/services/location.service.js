
import * as Location from 'expo-location';

/*
######## Structure of location object

const location = {
    "coords": {
        "accuracy": 65,
        "altitude": 16,
        "altitudeAccuracy": 10,
        "heading": -1,
        "latitude": 21.230927328932164,
        "longitude": 72.8357667480027,
        "speed": -1,
    },
    "timestamp": 1589611326461.168,
}
*/

export class LocationService {

    /**
     * Get current location of device
     * 
     * @returns {Promise} Location
     */
    static async current() {

        //get location permisssion
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                return Promise.reject('Permission to access location was denied');
            }
        } catch ({ message }) {
            return Promise.reject(message);
        }

        //get current location
        try {
            let location = await Location.getCurrentPositionAsync({});
            return Promise.resolve(location);
        } catch ({ message }) {
            return Promise.reject(message);
        }
    }
}
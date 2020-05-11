import * as SecureStore from 'expo-secure-store';
import { Environment as env, Data as data } from '_configs/constants';

class StorageService {
    constructor() {
        // this.url = env.url;
    }

    /**
     * Store key-value pair
     * @param {string} key 
     * @param {*} value 
     */
    async store(key, value) {
        if (env.isWeb) {
            //return without storage
            return Promise.resolve(1);
        }
        //store token
        try {
            value = JSON.stringify(value);
            await SecureStore.setItemAsync(key, value);
            return Promise.resolve(1);
        } catch (error) {
            console.log("Store " + key, error);
            return Promise.reject(error);
        }
    }

    /**
     * Retrieve value for key
     * @param {string} key 
     */
    async retrieve(key) {
        if (env.isWeb) {
            //retrieve from environment
            if (data[key]) {
                let value = data[key];
                return Promise.resolve(value);
            } else {
                return Promise.reject("Not found " + key);
            }
        }
        try {
            let value = await SecureStore.getItemAsync(key);
            if (value) {
                value = JSON.parse(value);
                return Promise.resolve(value);
            } else {
                return Promise.reject("Not found " + key);
            }
        } catch (error) {
            console.log("Retrive " + key, error);
            return Promise.reject(error);
        }
    }

    /**
     * Delete key
     * @param {string} key 
     */
    async delete(key) {
        if (env.isWeb) {
            //return without storage
            return Promise.resolve(1);
        }
        try {
            await SecureStore.deleteItemAsync(key);
            return Promise.resolve(1);
        } catch (error) {
            console.log("Delete " + key, error);
            return Promise.reject(error);
        }
    }
}

export const storageService = new StorageService();
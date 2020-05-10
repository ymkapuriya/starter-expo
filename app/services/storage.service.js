import * as SecureStore from 'expo-secure-store';
import { Environment as env } from '_configs/constants';

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
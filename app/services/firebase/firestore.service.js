import firebase from './init';

import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default class FirestoreService {

    /**
     * Create instance for firestore db
     */
    constructor() {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    /**
     * Bind collection snapshot
     * 
     * @param {string} collection 
     * @param {array} conditions 
     * @param {function} onResult 
     * @param {function} onError 
     * @returns {function}
     */
    collectionSnapshot(collection, conditions, onResult, onError) {
        let collectionRef = this.db.collection(collection)
        //add conditions
        conditions.forEach(c => {
            collectionRef = collectionRef.where(c.key, c.op, c.value);
        });
        return collectionRef.onSnapshot(onResult, onError);
    }

    /**
     * Bind document snapshot
     * 
     * @param {string} collection 
     * @param {string} docRef 
     * @param {function} onResult 
     * @param {function} onError 
     * @returns {function}
     */
    documentSnapshot(collection, docRef, onResult, onError) {
        return this.db.collection(collection).doc(docRef)
            .onSnapshot(onResult, onError);
    }

    /**
     * Get document by ref
     * 
     * @param {string} collection 
     * @param {string} ref 
     */
    async getDoc(collection, ref) {
        try {
            const doc = await this.db.collection(collection).doc(ref).get();
            if (doc.exists) {
                return Promise.resolve(doc.data());
            } else {
                return Promise.reject("No such document");
            }
        } catch (error) {
            return Promise.reject("Error get : " + error);
        }
    }

    /**
     * Add new document to collection
     * @param {string} collection
     * @param {object} data 
     */
    async addDoc(collection, data) {
        //add timestamp
        data['created'] = new Date();
        try {
            const docRef = await this.db.collection(collection).add(data);
            return Promise.resolve(docRef.id);
        } catch (error) {
            return Promise.reject("Error add : " + error)
        }
    }

    /**
     * Delete document from collection specified by id
     * 
     * @param {string} collection 
     * @param {string} ref 
     * @param {object} data
     */
    async updateDoc(collection, ref, data) {
        try {
            await this.db.collection(collection).doc(ref).update(data);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject("Error update : " + error);
        }
    }

    /**
     * Delete document from collection specified by id
     * 
     * @param {string} collection 
     * @param {string} ref 
     */
    async deleteDoc(collection, ref) {
        try {
            await this.db.collection(collection).doc(ref).delete();
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject("Error delete : " + error);
        }
    }

}
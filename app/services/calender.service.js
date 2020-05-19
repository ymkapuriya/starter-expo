import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export class CalenderService {

    /**
     * Checks calender permission or not
     */
    static checkPermission = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            return Promise.resolve(true);
        }
        return Promise.reject('Calender permission not granted.');
    }

    /**
     * Get list of calenders
     */
    static getCalenders = async () => {
        try {
            const calendars = await Calendar.getCalendarsAsync();
            return Promise.resolve(calendars);
        } catch (error) {
            return Promise.reject("Get calenders : " + String.toString(error));
        }
    }

    /**
     * Get default calender source
     */
    static getDefault = async () => {
        //get calenders
        try {
            const calendars = await CalenderService.getCalenders();
        } catch (error) {
            return Promise.reject(error);
        }

        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        try {
            return Promise.resolve(defaultCalendars[0].source);
        } catch (error) {
            return Promise.reject("Default : " + String.toString(error));
        }
    }

    /**
     * Create new calender
     */
    static createCalender = async (name, color, internalName = 'internalCalendarName', owner = 'personal') => {

        //get default source
        try {
            const defaultCalendarSource =
                Platform.OS === 'ios'
                    ? await CalenderService.getDefault()
                    : { isLocalAccount: true, name: name };
        } catch (error) {
            Promise.reject("Create : " + String.toString(error))
        }

        //prepare configuration for new calender
        const configs = {
            title: name,
            color: color,
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: internalName,
            ownerAccount: owner,
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        }

        //create calender
        try {
            const newCalendarID = await Calendar.createCalendarAsync(configs);
            return Promise.resolve(newCalendarID);
        } catch (error) {
            return Promise.reject("Create : " + String.toString(error));
        }
    }

    /**
     * Get events for specified period and calenders
     * 
     * @param {array} calId - Calender ids
     * @param {Date} start - Start date
     * @param {Date} end - End date
     */
    static getEvents = async (calIds, start, end) => {
        //console.log(calIds, start, end)
        //get calender events 
        try {
            const events = await Calendar.getEventsAsync(calIds, start, end)
            return Promise.resolve(events);
        } catch (error) {
            return Promise.reject("Get events " + String.toString(error));
        }
    }

    /**
     * Create new calender event
     * 
     * @param {string} calId - ID of calender
     * @param {object} event - Detail of event
     */
    static createEvent = async (calId, event) => {
        try {
            const eventId = await Calendar.createEventAsync(calId, event);
            return Promise.resolve(eventId);
        } catch (error) {
            console.log(error);
            return Promise.reject("Create event " + String.toString(error));
        }
    }

}
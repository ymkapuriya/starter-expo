import moment from 'moment';

export class UtilityService {

    /**
     * Converts date object to string as per specified format 
     * @param {Date} date 
     * @param {string} format 
     */
    static dateToString(date, format) {
        return moment(date).format(format);
    }
}
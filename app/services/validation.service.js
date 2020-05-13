
export class ValidationService {
    /**
     * Check supplied value is valid email address or not
     */
    static isEmail = (value) => {
        /**
         * /^[a-zA-Z0-9._-]+ : Begin with alpha-numeric characters, periods and underscores
         * @ : Must be forwarded by @
         * [a-zA-Z0-9.-]+ : Alpha-numeric characters. It can also contain period and hyphens
         * [a-zA-Z]{2,4}$/ : Should end with domain names with 2 to 4 characters
         */
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(value);
    }
}
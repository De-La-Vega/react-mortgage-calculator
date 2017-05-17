/**
 * lowerFirstLetter
 * 
 * @param {string} string value
 * @returns {string} result
 */
export function lowerFirstLetter (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * logN
 * 
 * @param {number} x value
 * @param {number} base value
 * @returns {number} result
 */
function logN (x, base){
    return Math.log(x) / Math.log(base);
}

/**
 * calcAnnuitet
 * 
 * @param {number} rate value
 * @param {number} duration value
 * @returns {number} result
 */
export function calcAnnuitet (rate, duration) {
    rate = rate / 1200;
    return (rate * Math.pow(1 + rate, duration)) / (Math.pow(1 + rate, duration) - 1);
}

/**
 * calcDuration
 * 
 * @param {number} sum value
 * @param {number} monthly value
 * @param {number} rate value
 * @returns {number} result
 */
export function calcDuration (sum, monthly, rate) {
    rate = rate / 1200;
    if (monthly - sum * rate <= 0) return 1000000;
    return logN(monthly / (monthly - sum * rate), 1 + rate);
}

/**
 * beautifyAmount
 * 
 * @param {number} value 1000000
 * @returns {number} 1 000 000
 */
export function beautifyAmount (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
import {APARTMENT_PRICE, FIRST_PAYMENT, CREDIT_SUM, CREDIT_DURATION, CREDIT_RATE, MONTHLY_PAYMENT} from './../consts';

import {calcAnnuitet, calcDuration} from './Utils';

/**
 * creditSum value updating.
 * 
 * @param {object} state state
 * @returns {number} new value
 */
function recalcCreditSum (state) {
    const monthlyPayment = state[MONTHLY_PAYMENT];
    const creditRate = state[CREDIT_RATE];
    const creditDuration = state[CREDIT_DURATION];

    return monthlyPayment.current / calcAnnuitet(creditRate.current, creditDuration.current);
}

/**
 * creditDuration value updating.
 * 
 * @param {object} state state
 * @returns {number} new value
 */
function recalcCreditDuration (state) {
    const creditSum = state[CREDIT_SUM];
    const monthlyPayment = state[MONTHLY_PAYMENT];
    const creditRate = state[CREDIT_RATE];

    return calcDuration(creditSum.current, monthlyPayment.current, creditRate.current);
}

/**
 * monthlyPayment value updating.
 * 
 * @param {object} state state
 * @returns {number} new value
 */
function recalcMonthlyPayment (state) {
    const creditSum = state[CREDIT_SUM];
    const creditRate = state[CREDIT_RATE];
    const creditDuration = state[CREDIT_DURATION];

    return creditSum.current * calcAnnuitet(creditRate.current, creditDuration.current);
}

/**
 * On change apartment price.
 * 
 * @param {object} prevState previous state
 * @param {number} value newValue
 * @returns {object} newState
 */
function onUpdateApartmentPrice (prevState, value) {
    let newState = prevState;
    let newValueApartmentPrice = newState[APARTMENT_PRICE];
    let newValueFirstPayment = newState[FIRST_PAYMENT];
    let newValueCreditSum = newState[CREDIT_SUM];
    let newValueMonthlyPayment = newState[MONTHLY_PAYMENT];

    newValueApartmentPrice.current = value;
    newValueFirstPayment.max = value;
    newValueCreditSum.max = value;
    newValueMonthlyPayment.max = value;

    if (newValueCreditSum.isFixed || newValueMonthlyPayment.isFixed) {
        newValueFirstPayment.current = newValueApartmentPrice.current - newValueCreditSum.current;
    } else {
        newValueCreditSum.current = newValueApartmentPrice.current - newValueFirstPayment.current;
    }

    newValueMonthlyPayment.current = recalcMonthlyPayment(newState);

    return {
        [APARTMENT_PRICE]: newValueApartmentPrice,
        [FIRST_PAYMENT]: newValueFirstPayment,
        [CREDIT_SUM]: newValueCreditSum,
        [MONTHLY_PAYMENT]: newValueMonthlyPayment
    }
}

/**
 * On change first payment.
 * 
 * @param {object} prevState previous state
 * @param {number} value newValue
 * @returns {object} newState
 */
function onUpdateFirstPayment (prevState, value) {
    let newState = prevState;
    let newValueApartmentPrice = newState[APARTMENT_PRICE];
    let newValueFirstPayment = newState[FIRST_PAYMENT];
    let newValueCreditSum = newState[CREDIT_SUM];
    let newValueMonthlyPayment = newState[MONTHLY_PAYMENT];

    newValueFirstPayment.current = value;

    if (newValueCreditSum.isFixed || newValueMonthlyPayment.isFixed) {
        newValueApartmentPrice.current = value + newValueCreditSum.current;
    } else {
        newValueCreditSum.current = newValueApartmentPrice.current - value;
    }

    newValueMonthlyPayment.current = recalcMonthlyPayment(newState);

    return {
        [APARTMENT_PRICE]: newValueApartmentPrice,
        [FIRST_PAYMENT]: newValueFirstPayment,
        [CREDIT_SUM]: newValueCreditSum,
        [MONTHLY_PAYMENT]: newValueMonthlyPayment
    }
}

/**
 * On change credit sum.
 * 
 * @param {object} prevState previous state
 * @param {number} value newValue
 * @returns {object} newState
 */
function onUpdateCreditSum (prevState, value) {
    let newState = prevState;
    let newValueApartmentPrice = newState[APARTMENT_PRICE];
    let newValueFirstPayment = newState[FIRST_PAYMENT];
    let newValueCreditSum = newState[CREDIT_SUM];
    let newValueCreditDuration = newState[CREDIT_DURATION];
    let newValueMonthlyPayment = newState[MONTHLY_PAYMENT];

    newValueCreditSum.current = value;
    newValueFirstPayment.current = newValueApartmentPrice.current - value;

    if (newValueMonthlyPayment.isFixed) {
        newValueCreditDuration.current = recalcCreditDuration(newState);
    } else {
        newValueMonthlyPayment.current = recalcMonthlyPayment(newState);
    }

    return {
        [APARTMENT_PRICE]: newValueApartmentPrice,
        [FIRST_PAYMENT]: newValueFirstPayment,
        [CREDIT_SUM]: newValueCreditSum,
        [CREDIT_DURATION]: newValueCreditDuration,
        [MONTHLY_PAYMENT]: newValueMonthlyPayment
    }
}

/**
 * On change credit duration.
 * 
 * @param {object} prevState previous state
 * @param {number} value newValue
 * @returns {object} newState
 */
function onUpdateCreditDuration (prevState, value) {
    let newState = prevState;
    let newValueCreditSum = newState[CREDIT_SUM];
    let newValueCreditDuration = newState[CREDIT_DURATION];
    let newValueMonthlyPayment = newState[MONTHLY_PAYMENT];

    newValueCreditDuration.current = value;

    if (newValueMonthlyPayment.isFixed) {
        newValueCreditSum.current = recalcCreditSum(newState);
    } else {
        newValueMonthlyPayment.current = recalcMonthlyPayment(newState);
    }

    return {
        [CREDIT_SUM]: newValueCreditSum,
        [CREDIT_DURATION]: newValueCreditDuration,
        [MONTHLY_PAYMENT]: newValueMonthlyPayment
    }
}

/**
 * On change credit rate.
 * 
 * @param {object} prevState previous state
 * @param {number} value newValue
 * @returns {object} newState
 */
function onUpdateCreditRate (prevState, value) {
    let newState = prevState;
    let newValueCreditSum = newState[CREDIT_SUM];
    let newValueCreditDuration = newState[CREDIT_DURATION];
    let newValueCreditRate = newState[CREDIT_RATE];
    let newValueMonthlyPayment = newState[MONTHLY_PAYMENT];

    newValueCreditRate.current = value;

    // TODO: check logic (if both selected)
    if (newValueMonthlyPayment.isFixed && newValueCreditSum.isFixed) {
        newValueCreditDuration.current = recalcCreditDuration(newState);
    } else if (newValueMonthlyPayment.isFixed) {
        newValueCreditSum.current = recalcCreditSum(newState);
    } else {
        newValueMonthlyPayment.current = recalcMonthlyPayment(newState);
    }

    return {
        [CREDIT_SUM]: newValueCreditSum,
        [CREDIT_DURATION]: newValueCreditDuration,
        [CREDIT_RATE]: newValueCreditRate,
        [MONTHLY_PAYMENT]: newValueMonthlyPayment
    }
}

/**
 * On change monthly payment.
 * 
 * @param {object} prevState previous state
 * @param {number} value newValue
 * @returns {object} newState
 */
function onUpdateMonthlyPayment (prevState, value) {
    let newState = prevState;
    let newValueCreditSum = newState[CREDIT_SUM];
    let newValueCreditDuration = newState[CREDIT_DURATION];
    let newValueMonthlyPayment = newState[MONTHLY_PAYMENT];

    newValueMonthlyPayment.current = value;

    if (newValueCreditSum.isFixed) {
        newValueCreditDuration.current = recalcCreditDuration(newState);
    } else {
        newValueCreditSum.current = recalcCreditSum(newState);
    }

    return {
        [CREDIT_SUM]: newValueCreditSum,
        [CREDIT_DURATION]: newValueCreditDuration,
        [MONTHLY_PAYMENT]: newValueMonthlyPayment
    }
}

/**
 * Updating plugin state.
 * 
 * @param {object} prevState previous state
 * @param {string} sectionName section name
 * @param {number} value newValue
 * @returns {object} newState
 */
export function updateState (prevState, sectionName, value) {
    let result = null;

    switch (sectionName) {
        case APARTMENT_PRICE:
            result = onUpdateApartmentPrice(prevState, value);
            break;
        case FIRST_PAYMENT:
            result = onUpdateFirstPayment(prevState, value);
            break;
        case CREDIT_SUM:
            result = onUpdateCreditSum(prevState, value);
            break;
        case CREDIT_DURATION:
            result = onUpdateCreditDuration(prevState, value);
            break;
        case CREDIT_RATE:
            result = onUpdateCreditRate(prevState, value);
            break;
        case MONTHLY_PAYMENT:
            result = onUpdateMonthlyPayment(prevState, value);
            break;
        default:
            result = prevState;
    }

    return result;
}

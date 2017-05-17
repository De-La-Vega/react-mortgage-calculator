import {SECTION, SECTION_CAMEL_CASE} from './../consts';

import {calcAnnuitet, calcDuration} from './Utils';

/**
 * creditSum value updating.
 * 
 * @param {object} state state
 * @returns {number} new value
 */
function recalcCreditSum (state) {
    const monthlyPayment = state[SECTION_CAMEL_CASE.MonthlyPayment];
    const creditRate = state[SECTION_CAMEL_CASE.CreditRate];
    const creditDuration = state[SECTION_CAMEL_CASE.CreditDuration];

    return monthlyPayment.current / calcAnnuitet(creditRate.current, creditDuration.current);
}

/**
 * creditDuration value updating.
 * 
 * @param {object} state state
 * @returns {number} new value
 */
function recalcCreditDuration (state) {
    const creditSum = state[SECTION_CAMEL_CASE.CreditSum];
    const monthlyPayment = state[SECTION_CAMEL_CASE.MonthlyPayment];
    const creditRate = state[SECTION_CAMEL_CASE.CreditRate];

    return calcDuration(creditSum.current, monthlyPayment.current, creditRate.current);
}

/**
 * monthlyPayment value updating.
 * 
 * @param {object} state state
 * @returns {number} new value
 */
function recalcMonthlyPayment (state) {
    const creditSum = state[SECTION_CAMEL_CASE.CreditSum];
    const creditRate = state[SECTION_CAMEL_CASE.CreditRate];
    const creditDuration = state[SECTION_CAMEL_CASE.CreditDuration];

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
    let newValueApartmentPrice = newState[SECTION_CAMEL_CASE.ApartmentPrice];
    let newValueFirstPayment = newState[SECTION_CAMEL_CASE.FirstPayment];
    let newValueCreditSum = newState[SECTION_CAMEL_CASE.CreditSum];
    let newValueMonthlyPayment = newState[SECTION_CAMEL_CASE.MonthlyPayment];

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
        [SECTION_CAMEL_CASE.ApartmentPrice]: newValueApartmentPrice,
        [SECTION_CAMEL_CASE.FirstPayment]: newValueFirstPayment,
        [SECTION_CAMEL_CASE.CreditSum]: newValueCreditSum,
        [SECTION_CAMEL_CASE.MonthlyPayment]: newValueMonthlyPayment
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
    let newValueApartmentPrice = newState[SECTION_CAMEL_CASE.ApartmentPrice];
    let newValueFirstPayment = newState[SECTION_CAMEL_CASE.FirstPayment];
    let newValueCreditSum = newState[SECTION_CAMEL_CASE.CreditSum];
    let newValueMonthlyPayment = newState[SECTION_CAMEL_CASE.MonthlyPayment];

    newValueFirstPayment.current = value;

    if (newValueCreditSum.isFixed || newValueMonthlyPayment.isFixed) {
        newValueApartmentPrice.current = value + newValueCreditSum.current;
    } else {
        newValueCreditSum.current = newValueApartmentPrice.current - value;
    }

    newValueMonthlyPayment.current = recalcMonthlyPayment(newState);

    return {
        [SECTION_CAMEL_CASE.ApartmentPrice]: newValueApartmentPrice,
        [SECTION_CAMEL_CASE.FirstPayment]: newValueFirstPayment,
        [SECTION_CAMEL_CASE.CreditSum]: newValueCreditSum,
        [SECTION_CAMEL_CASE.MonthlyPayment]: newValueMonthlyPayment
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
    let newValueApartmentPrice = newState[SECTION_CAMEL_CASE.ApartmentPrice];
    let newValueFirstPayment = newState[SECTION_CAMEL_CASE.FirstPayment];
    let newValueCreditSum = newState[SECTION_CAMEL_CASE.CreditSum];
    let newValueCreditDuration = newState[SECTION_CAMEL_CASE.CreditDuration];
    let newValueMonthlyPayment = newState[SECTION_CAMEL_CASE.MonthlyPayment];

    newValueCreditSum.current = value;
    newValueFirstPayment.current = newValueApartmentPrice.current - value;

    if (newValueMonthlyPayment.isFixed) {
        newValueCreditDuration.current = recalcCreditDuration(newState);
    } else {
        newValueMonthlyPayment.current = recalcMonthlyPayment(newState);
    }

    return {
        [SECTION_CAMEL_CASE.ApartmentPrice]: newValueApartmentPrice,
        [SECTION_CAMEL_CASE.FirstPayment]: newValueFirstPayment,
        [SECTION_CAMEL_CASE.CreditSum]: newValueCreditSum,
        [SECTION_CAMEL_CASE.CreditDuration]: newValueCreditDuration,
        [SECTION_CAMEL_CASE.MonthlyPayment]: newValueMonthlyPayment
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
    let newValueCreditSum = newState[SECTION_CAMEL_CASE.CreditSum];
    let newValueCreditDuration = newState[SECTION_CAMEL_CASE.CreditDuration];
    let newValueMonthlyPayment = newState[SECTION_CAMEL_CASE.MonthlyPayment];

    newValueCreditDuration.current = value;

    if (newValueMonthlyPayment.isFixed) {
        newValueCreditSum.current = recalcCreditSum(newState);
    } else {
        newValueMonthlyPayment.current = recalcMonthlyPayment(newState);
    }

    return {
        [SECTION_CAMEL_CASE.CreditSum]: newValueCreditSum,
        [SECTION_CAMEL_CASE.CreditDuration]: newValueCreditDuration,
        [SECTION_CAMEL_CASE.MonthlyPayment]: newValueMonthlyPayment
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
    let newValueCreditSum = newState[SECTION_CAMEL_CASE.CreditSum];
    let newValueCreditDuration = newState[SECTION_CAMEL_CASE.CreditDuration];
    let newValueCreditRate = newState[SECTION_CAMEL_CASE.CreditRate];
    let newValueMonthlyPayment = newState[SECTION_CAMEL_CASE.MonthlyPayment];

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
        [SECTION_CAMEL_CASE.CreditSum]: newValueCreditSum,
        [SECTION_CAMEL_CASE.CreditDuration]: newValueCreditDuration,
        [SECTION_CAMEL_CASE.CreditRate]: newValueCreditRate,
        [SECTION_CAMEL_CASE.MonthlyPayment]: newValueMonthlyPayment
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
    let newValueCreditSum = newState[SECTION_CAMEL_CASE.CreditSum];
    let newValueCreditDuration = newState[SECTION_CAMEL_CASE.CreditDuration];
    let newValueMonthlyPayment = newState[SECTION_CAMEL_CASE.MonthlyPayment];

    newValueMonthlyPayment.current = value;

    if (newValueCreditSum.isFixed) {
        newValueCreditDuration.current = recalcCreditDuration(newState);
    } else {
        newValueCreditSum.current = recalcCreditSum(newState);
    }

    return {
        [SECTION_CAMEL_CASE.CreditSum]: newValueCreditSum,
        [SECTION_CAMEL_CASE.CreditDuration]: newValueCreditDuration,
        [SECTION_CAMEL_CASE.MonthlyPayment]: newValueMonthlyPayment
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
        case SECTION.ApartmentPrice:
            result = onUpdateApartmentPrice(prevState, value);
            break;
        case SECTION.FirstPayment:
            result = onUpdateFirstPayment(prevState, value);
            break;
        case SECTION.CreditSum:
            result = onUpdateCreditSum(prevState, value);
            break;
        case SECTION.CreditDuration:
            result = onUpdateCreditDuration(prevState, value);
            break;
        case SECTION.CreditRate:
            result = onUpdateCreditRate(prevState, value);
            break;
        case SECTION.MonthlyPayment:
            result = onUpdateMonthlyPayment(prevState, value);
            break;
        default:
            result = prevState;
    }

    return result;
}

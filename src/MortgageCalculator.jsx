import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {cloneDeep} from 'lodash';

import {lowerFirstLetter} from './Utils';

import Section from './Components/Section';

import {SECTION} from './consts';

class MortgageCalculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apartmentPrice: {
                min: 0,
                max: 100000000,
                current: 0
            },
            firstPayment: {
                min: 0,
                max: 0,
                current: 0
            },
            creditSum: {
                min: 0,
                max: 0,
                current: 0,
                isFixed: false
            },
            creditDuration: {
                min: 1,
                max: 240,
                current: 60,
                isFixed: false
            },
            creditRate: {
                min: 0,
                max: 100,
                current: 12
            },
            monthlyPayment: {
                min: 0,
                max: 0,
                current: 0,
                isFixed: false
            }
        }
    }

    /**
     * Similar logic in input and slider on change.
     * 
     * @param {string} sectionName section name
     * @param {number} value inputs value
     * @returns {void}
     */
    setGeneralState (sectionName, value) {
        this.setState((prevState) => {
            const lowerSectionApartmentPrice = lowerFirstLetter(SECTION.ApartmentPrice);
            const lowerSectionFirstPayment = lowerFirstLetter(SECTION.FirstPayment);
            const lowerSectionCreditSum = lowerFirstLetter(SECTION.CreditSum);

            if (sectionName === SECTION.ApartmentPrice) {
                let newValueApartmentPrice = cloneDeep(prevState[lowerSectionApartmentPrice]);
                let newValueFirstPayment = cloneDeep(prevState[lowerSectionFirstPayment]);
                let newValueCreditSum = cloneDeep(prevState[lowerSectionCreditSum]);

                newValueApartmentPrice.current = value;
                newValueFirstPayment.max = value;
                newValueCreditSum.max = value;

                return {
                    [lowerSectionApartmentPrice]: newValueApartmentPrice,
                    [lowerSectionFirstPayment]: newValueFirstPayment,
                    [lowerSectionCreditSum]: newValueCreditSum

                }
            } else {
                let newValue = cloneDeep(prevState[lowerFirstLetter(sectionName)]);
                newValue.current = value;

                return {
                    [lowerFirstLetter(sectionName)]: newValue
                }
            }
        });
    }

    /**
     * INPUT change.
     * 
     * @param {string} sectionName section name
     * @param {number} value inputs value
     * @returns {void}
     */
    onChangeInput (sectionName, value) {
        console.log("onChangeInput (" + sectionName + "):", value);

        this.setGeneralState(sectionName, value);
    }

    /**
     * SLIDER change.
     * 
     * @param {string} sectionName section name
     * @param {number} value slider value
     * @returns {void}
     */
    onChangeSlider (sectionName, value) {
        console.log("onChangeSlider (" + sectionName + "):", value);

        this.setGeneralState(sectionName, value);
    }

    /**
     * CHECKBOX change.
     * 
     * @param {string} sectionName section name
     * @param {number} value slider value
     * @returns {void}
     */
    onChangeCheckbox (sectionName, value) {
        console.log("onChangeCheckbox (" + sectionName + "):", value);

        this.setState((prevState) => {
            let newValue = cloneDeep(prevState[lowerFirstLetter(sectionName)]);
            newValue.isFixed = value;

            return {
                [lowerFirstLetter(sectionName)]: newValue
            }
        });
    }

    /**
     * Get value for section.
     * 
     * @param {string} sectionName section name
     * @returns {object} object with values
     */
    getValues (sectionName) {
        const sectionState = this.state[lowerFirstLetter(sectionName)];
        const hasCheckbox = [
            SECTION.CreditSum,
            SECTION.CreditDuration,
            SECTION.MonthlyPayment
        ];
        let values = {
            inputValue: sectionState.current,
            sliderMinValue: sectionState.min,
            sliderMaxValue: sectionState.max,
            sliderCurrentValue: sectionState.current
        };

        if (hasCheckbox.indexOf(sectionName) > -1) {
            values = Object.assign(values, {
                checkboxValue: sectionState.isFixed
            });
        }

        return values;
    }

    /**
     * Render patched content.
     * 
     * @param {array} propsChildren childrens array
     * @returns {array} patched childrens array
     */
    renderContent (propsChildren) {
        return Children.map(propsChildren, (child) => {
            const sectionsArr = [
                SECTION.ApartmentPrice,
                SECTION.FirstPayment,
                SECTION.CreditSum,
                SECTION.CreditDuration,
                SECTION.CreditRate,
                SECTION.MonthlyPayment
            ];
            let result = null;

            if (child && child.props && child.props.type && sectionsArr.indexOf(child.props.type) > -1) {
                let props = {
                    onChange: (sectionName, fieldType, value) => this['onChange' + fieldType](sectionName, value)
                };
                let patchedProps = Object.assign(props, this.getValues(child.props.type));

                result = cloneElement(child, patchedProps);
            }

            return result;
        });
    }

    render () {
        return (
            <div>
                {this.renderContent(this.props.children)}
            </div>
        );
    }
}

MortgageCalculator.defaultProps = {
    children: PropTypes.element.isRequired
};

export default MortgageCalculator;
export {
    MortgageCalculator,
    Section
}

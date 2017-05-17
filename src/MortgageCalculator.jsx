import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {cloneDeep} from 'lodash';

import Section from './Components/Section';

import {SECTION, SECTION_CAMEL_CASE} from './consts';
import {updateState} from './Utils/StateUpdateUtils';

class MortgageCalculator extends React.Component {
    constructor(props){
        super(props);

        this.recursionFlag = false;
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
        if (this.recursionFlag) return;
        this.recursionFlag = true;

        this.setState((prevState) => {
            return updateState(cloneDeep(prevState), sectionName, value);
        }, () => {
            this.recursionFlag = false;
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
        this.props.logEvents && console.log("onChangeInput (" + sectionName + "):", value);

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
        this.props.logEvents && console.log("onChangeSlider (" + sectionName + "):", value);

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
        this.props.logEvents && console.log("onChangeCheckbox (" + sectionName + "):", value);

        this.setState((prevState) => {
            let newState = cloneDeep(prevState);

            switch (sectionName) {
                case SECTION.CreditSum:
                    newState[SECTION_CAMEL_CASE.CreditSum].isFixed = value;
                    newState[SECTION_CAMEL_CASE.CreditDuration].isFixed = false;
                    newState[SECTION_CAMEL_CASE.MonthlyPayment].isFixed = false;
                    break;
                case SECTION.CreditDuration:
                    newState[SECTION_CAMEL_CASE.CreditSum].isFixed = false;
                    newState[SECTION_CAMEL_CASE.CreditDuration].isFixed = value;
                    newState[SECTION_CAMEL_CASE.MonthlyPayment].isFixed = false;
                    break;
                case SECTION.MonthlyPayment:
                    newState[SECTION_CAMEL_CASE.CreditSum].isFixed = false;
                    newState[SECTION_CAMEL_CASE.CreditDuration].isFixed = false;
                    newState[SECTION_CAMEL_CASE.MonthlyPayment].isFixed = value;
                    break;
            }

            return newState;
        });
    }

    /**
     * Get value for section.
     * 
     * @param {string} sectionName section name
     * @returns {object} object with values
     */
    getValues (sectionName) {
        const sectionState = this.state[SECTION_CAMEL_CASE[sectionName]];
        const hasCheckbox = [
            SECTION.CreditSum,
            SECTION.CreditDuration,
            SECTION.MonthlyPayment
        ];
        let values = {
            inputClassName: this.props.inputClassName,
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
    inputClassName: '',
    checkboxClassName: ''
};

MortgageCalculator.propTypes = {
    children: PropTypes.array.isRequired,
    inputClassName: PropTypes.string,
    logEvents: PropTypes.bool
};

export default MortgageCalculator;
export {
    MortgageCalculator,
    Section
}

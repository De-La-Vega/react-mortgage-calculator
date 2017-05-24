import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {cloneDeep} from 'lodash';

import Section from './Components/Section';

import {APARTMENT_PRICE, FIRST_PAYMENT, CREDIT_SUM, CREDIT_DURATION, CREDIT_RATE, MONTHLY_PAYMENT} from './consts';
import {updateState} from './Utils/StateUpdateUtils';
import {beautifyAmount} from './Utils/Utils';

class MortgageCalculator extends React.Component {
    constructor(props){
        super(props);

        this.recursionFlag = false;
        this.state = {
            [APARTMENT_PRICE]: {
                min: 0,
                max: 100000000,
                current: 0
            },
            [FIRST_PAYMENT]: {
                min: 0,
                max: 0,
                current: 0
            },
            [CREDIT_SUM]: {
                min: 0,
                max: 0,
                current: 0,
                isFixed: false
            },
            [CREDIT_DURATION]: {
                min: 1,
                max: 240,
                current: 60,
                isFixed: false
            },
            [CREDIT_RATE]: {
                min: 0,
                max: 100,
                current: 12
            },
            [MONTHLY_PAYMENT]: {
                min: 0,
                max: 0,
                current: 0,
                isFixed: false
            }
        }
    }

    returnResults () {
        const {state} = this;

        this.props.getResults({
            [APARTMENT_PRICE]: state[APARTMENT_PRICE].current,
            [FIRST_PAYMENT]: state[FIRST_PAYMENT].current,
            [CREDIT_SUM]: state[CREDIT_SUM].current,
            [CREDIT_DURATION]: state[CREDIT_DURATION].current,
            [CREDIT_RATE]: state[CREDIT_RATE].current,
            [MONTHLY_PAYMENT]: state[MONTHLY_PAYMENT].current,
        });
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
            // let newValue = updateState(cloneDeep(prevState), sectionName, value)
            // let newState = {};
            
            // Object.keys(newValue).map((key) => {
            //     let obj = newValue[key];
            //     obj.current = beautifyAmount(obj.current.toFixed(0))
            //     newState[key] = obj;
            // });

            // console.log(newState);
            // console.log(updateState(cloneDeep(prevState), sectionName, value));

            return updateState(cloneDeep(prevState), sectionName, value);
        }, () => {
            this.recursionFlag = false;
            this.props.getResults && this.returnResults();
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
                case CREDIT_SUM:
                    newState[CREDIT_SUM].isFixed = value;
                    newState[CREDIT_DURATION].isFixed = false;
                    newState[MONTHLY_PAYMENT].isFixed = false;
                    break;
                case CREDIT_DURATION:
                    newState[CREDIT_SUM].isFixed = false;
                    newState[CREDIT_DURATION].isFixed = value;
                    newState[MONTHLY_PAYMENT].isFixed = false;
                    break;
                case MONTHLY_PAYMENT:
                    newState[CREDIT_SUM].isFixed = false;
                    newState[CREDIT_DURATION].isFixed = false;
                    newState[MONTHLY_PAYMENT].isFixed = value;
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
        const sectionState = this.state[sectionName];
        const hasCheckbox = [
            CREDIT_SUM,
            CREDIT_DURATION,
            MONTHLY_PAYMENT
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
                APARTMENT_PRICE,
                FIRST_PAYMENT,
                CREDIT_SUM,
                CREDIT_DURATION,
                CREDIT_RATE,
                MONTHLY_PAYMENT
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
    logEvents: PropTypes.bool,
    getResults: PropTypes.func
};

export default MortgageCalculator;
export {
    Section
}

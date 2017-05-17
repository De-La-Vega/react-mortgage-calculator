import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {SECTION} from './../consts';

import Input from '../Components/Input';
import Checkbox from "../Components/Checkbox";

export default class Section extends React.Component {
    /**
     * Has this section type checkbox.
     * 
     * @param {string} type section name
     * @returns {boolean} has this section type checkbox
     */
    hasCheckbox (type) {
        let result = false;

        switch (type) {
            case SECTION.CreditSum:
            case SECTION.CreditDuration:
            case SECTION.MonthlyPayment:
                result = true;
                break;
            case SECTION.ApartmentPrice:
            case SECTION.FirstPayment:
            case SECTION.CreditRate:
            default:
                result = false;
                break;
        }

        return result;
    }

    render () {
        const {
            placeholder, className, onChange, render, type,
            inputValue, sliderMinValue, sliderMaxValue, sliderCurrentValue, checkboxValue
        } = this.props;

        const input = (
            <Input
                disabled={checkboxValue}
                value={inputValue}
                className={className}
                placeholder={placeholder}
                onChange={(value) => onChange(type, 'Input', value)}
            />
        );
        const slider = (
            <Slider
                disabled={checkboxValue}
                min={sliderMinValue}
                max={sliderMaxValue}
                value={sliderCurrentValue}
                onChange={(value) => onChange(type, 'Slider', value)}
            />
        );
        const checkbox = this.hasCheckbox(type) ? (
            <Checkbox
                className={className}
                isChecked={checkboxValue}
                onChange={(value) => onChange(type, 'Checkbox', value)}
            />
        ) : null;
        
        return render ?
            render(input, slider, checkbox) :
            <div>
                {input}
                {slider}
                {checkbox}
            </div>
    }
}

Section.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    render: PropTypes.func,
    inputValue: PropTypes.number,
    checkboxValue: PropTypes.bool,
    sliderMinValue: PropTypes.number,
    sliderMaxValue: PropTypes.number,
    sliderCurrentValue: PropTypes.number
}

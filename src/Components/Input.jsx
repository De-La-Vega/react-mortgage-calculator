import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
    render () {
        let {placeholder, onChange, className, value, disabled} = this.props;

        return (
            <input
                onChange={(e) => onChange(parseInt(e.target.value))}
                type="text"
                className={className}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
            />
        );
    }
}

Input.defaultProps = {
    placeholder: ''
};

Input.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number,
    disabled: PropTypes.bool
};

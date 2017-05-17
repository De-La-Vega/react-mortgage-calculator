import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
    render () {
        let {isChecked, onChange, className} = this.props;

        return (
            <input
                onChange={(e) => onChange(e.target.checked)}
                type="checkbox"
                className={className}
                checked={isChecked}
            />
        );
    }
}

Checkbox.defaultProps = {
    isChecked: false
};

Checkbox.propTypes = {
    isChecked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func
};

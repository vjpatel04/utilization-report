import React from 'react';
import PropTypes from 'prop-types';

const TimeSpan = props => {
    return (
        <div>
            <label>
                Time Span:
                <select value={props.selectedTimeSpan} onChange={props.onTimeSpanChange}>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
            </label>
        </div>
    );
};

TimeSpan.propTypes = {
    selectedTimeSpan: PropTypes.string.isRequired,
    onTimeSpanChange: PropTypes.func.isRequired
};

export default TimeSpan;
import React from 'react';
import PropTypes from 'prop-types';

const WeekHeader = props => {
    let headers = props.weeks.map((week) => <th key={week}>{week}</th>);
    return headers;
};

WeekHeader.propTypes = {
    weeks: PropTypes.array.isRequired
};

export default WeekHeader;
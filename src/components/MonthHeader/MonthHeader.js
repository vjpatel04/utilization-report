import React from 'react';
import PropTypes from 'prop-types';

const MonthHeader = props => {
    let headers = props.months.map((month) => <th key={month}>{month}</th>);
    return headers;
};

MonthHeader.propTypes = {
    months: PropTypes.array.isRequired
};

export default MonthHeader;
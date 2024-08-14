import React from 'react';
import PropTypes from 'prop-types';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ padding: '5px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', fontSize: '12px' }}>
                <p className="label">{`${label}`}</p>
                {payload.map((entry, index) => (
                    <p key={`item-${index}`} style={{ margin: 0 }}>{`${entry.name}: ${entry.value}`}</p>
                ))}
            </div>
        );
    }

    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CustomTooltip;

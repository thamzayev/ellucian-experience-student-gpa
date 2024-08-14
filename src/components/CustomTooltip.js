import React from 'react';

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

export default CustomTooltip;

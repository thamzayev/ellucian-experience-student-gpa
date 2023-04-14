import React from 'react';
import { Sector } from 'recharts';

const gpaGauge = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy-20} dy={3} textAnchor="middle" width={100}>
        <tspan x={cx} dy="0em" alignmentBaseline="middle" fontSize="10">
          Overall
        </tspan>
        <tspan x={cx} dy="1em" alignmentBaseline="middle" fontSize="22">
          {Number(payload.value).toFixed(2) + ' GPA'}
        </tspan>
        <tspan x={cx} dy="1.5em" fontSize="14">
          {payload.credits + ' Credits'}
        </tspan>
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={10}
      />
    </g>
  );
};

export default gpaGauge;
import React, { FC } from 'react';
import * as d3 from 'd3';
import { Series } from './Series';

// From: https://bigbinary.com/blog/using-d3-js-with-react-js
export const LineChart: FC<Props> = ({
    width = 600,
    height = 300,
    data = { xValues: [], yMin: 0, yMax: 30, points: [], },
}) => {
    let xScale = d3.scalePoint()
        .domain(data.xValues)
        .range([0, width]);

    let yScale = d3.scaleLinear()
        .range([height, 10])
        .domain([data.yMin, data.yMax]);

    return (
        <svg width={width} height={height}>
            <Series
                xScale={xScale}
                yScale={yScale}
                data={data} />
        </svg>
    );


};
type Props = {
    width: 600;
    height: 300;
    data: { xValues: []; yMin; yMax; points; };
};

export default LineChart
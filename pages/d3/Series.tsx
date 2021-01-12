import React, { FC } from 'react';
import * as d3 from 'd3';
import { Line } from './Line';

type Props = {
    data: { points: []; };
    interpolationType?: "cardinal" | "linear";
    // colors?: d3.scale.category10;
    xScale: Function;
    yScale: Function;
};

export const Series: FC<Props> = ({
    data = { points: [] },
    // interpolationType = "cardinal",
    // colors = [],
    xScale = (x) => { },
    yScale = (s) => { }
}) => {

    let line = d3
        .line()
        .x((d) => {
            return xScale(d.x);
        })
        .y((d) => {
            return yScale(d.y);
        })
    // .interpolate(interpolationType)

    let lines = data.points.map((series, id) => {
        return <Line path={line(series)}
            // stroke={colors(id)}
            key={id} />;
    });
    return (<g>
        <g>{lines}</g>
    </g>);
};

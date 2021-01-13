import React, { FC } from 'react';

// A D3 Line for graphs
// From: https://bigbinary.com/blog/using-d3-js-with-react-js
export const Line: FC<Props> = ({
    path = '',
    stroke = 'dodgerblue',
    fill = 'none',
    strokeWidth = 3
}) => {
    return <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth} />;
};
type Props = {
    path?: string;
    stroke?: string;
    fill?: string;
    strokeWidth?: number;
};

export default Line;
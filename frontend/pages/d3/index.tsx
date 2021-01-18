/** D3JS Experiments */
import React, { useEffect } from 'react'
import { useD3 } from '../../hooks/useD3';
import { BarChart } from './BarChart';
let values = require('~/../test/values')
let sales = require('~/../test/sales')
let data = require('~/../test/linear');
import * as d3 from 'd3'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { Line } from './Line';
import { LineChart } from './LineChart';

export default function Index() {

    useEffect(() => {
        d3.selectAll('p').style('color', 'steelblue')
        d3.selectAll('h1').style('color', 'dodgerblue')
    }, [])

    return (
        <div>
            <h1>Yeaaahhh</h1>
            {/* <span>{`${d3.median(sales.map(d => d.sales))}, ${d3.mean(sales.map(d => d.sales))}`}</span> */}
            {/* <Histogram data={values} /> */}
            {/* <Histogram data={[12, 45, 77, 10, 40, 21, 31]} /> */}

            <LineChart
                data={data}
                width={600}
                height={300}
            />
            <BarChart data={sales} />
        </div>
    )
}


const ForceDirectedGraph = ({ data = [] }) => {
    const ref = useD3(
        (svg) => {

            svg
                // .attr('viewbox', [0, 0, 100, 90])
                .append('g')

        }, [data.length])
    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: '100%',
                marginRight: '0px',
                marginLeft: '0px'
            }}>
            <g className='plot-area' />
            <g className='x-axis' />
            <g className='y-axis' />
        </svg>

    )
}

// const Histogram = ({ data = [] }) => {
//     const h = 500;
//     const w = 500;
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const ref = useD3((svg) => {


//         svg.append("svg").attr("width", 700).attr("height", 300);
//         svg.selectAll("rect").data(data).enter().append("rect")

//         svg.selectAll("rect")
//             .data(data)
//             .enter()
//             .append("rect")
//             .attr("x", (d, i) => i * 70)
//             .attr("y", 0)
//             .attr("width", 25)
//             .attr("height", (d, i) => d)
//             .attr("fill", "green");


//         // let accessToRef = d3.select(ref.current)

//         // console.log('data', data)
//         // svg
//         //     .attr("width", width)
//         //     .attr('height', height)
//         //     .style('background-color', '#e6e')
//         //     .style('fill', 'currentColor')
//         //     .style('padding', 10)
//         //     .style('margin', 5)

//         // svg
//         //     .selectAll('rect')
//         //     .data(data)
//         //     .enter()
//         //     .append('rect')
//         //     .attr("x", (d, i) => i * 70)
//         //     .attr("y", (d, i) => height - 10 * d)
//         //     .attr("width", 40)
//         //     .attr('height', (d, i) => d * 10)
//         //     .attr('fill', 'tomato')

//     }, [data.length])



// }

// const svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .style("margin-left", 100);

// svg.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => i * 70)
//     .attr("y", (d, i) => h - 10 * d)
//     .attr("width", 65)
//     .attr("height", (d, i) => d * 10)
//     .attr("fill", "green")

// return (

//     <svg
//         ref={ref}
//         style={{
//             height: 500,
//             width: '100%',
//             marginRight: '0px',
//             marginLeft: '0px'
//         }}>
//         <g className='plot-area' />
//         <g className='x-axis' />
//         <g className='y-axis' />
//     </svg>
// )
// }}
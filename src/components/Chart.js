import React, {Component} from 'react';
import * as d3 from 'd3';

class Chart extends Component {
    componentDidMount() {
        this.createChart();
    }

    createChart() {
        const choiceArr = this.props.choiceArr;
        const dataForPie = {};
        this.props.responseData.forEach(datum => {
            if (datum.count) dataForPie[datum.choice] = datum.count;
        });
        const chart = document.getElementById('donut_chart');
        if (chart) chart.innerHTML = "";
        const width = window.innerWidth * 0.74 < 350 ? window.innerWidth * 0.74 : 350;
        const height = width / 7 * 5;
        const margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3.select("#donut_chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const data = dataForPie;

        // Colour scale
        const color = d3.scaleOrdinal()
            .domain(choiceArr)
            .range(d3.schemeAccent);

        // Create the pie chart
        const pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(d => d.value);
        const data_ready = pie(d3.entries(data));

        // The arc generator
        const arc = d3.arc()
            .innerRadius(radius * 0.4)         // This is the size of the donut hole
            .outerRadius(radius * 0.8);

        // Another arc that won't be drawn. Just for labels positionning
        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.key))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        // Add the polylines between chart and labels:
        svg
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', d => {
                const posA = arc.centroid(d); // line insertion in the slice
                const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
                const posC = outerArc.centroid(d); // Label position = almost the same as posB
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC];
            });

        // Add the polylines between chart and labels:
        svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .text( d => d.data.key )
            .attr('transform', d => {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', d => {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midangle < Math.PI ? 'start' : 'end')
            });
    }

    render() {
        return (
            <div id="donut_chart"/>
        );
    }
}

export default Chart;
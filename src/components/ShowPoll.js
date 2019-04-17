import React, {Component} from 'react';
import axios from 'axios';
import * as d3 from 'd3';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class ShowPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollId: this.props.pollId,
            submittedVote: false,
            pollData: {
                question: "",
                choices: [],
                author: ""
            },
            responseData: []
        }
    }

    componentDidUpdate() {
        if (this.props.pollId !== this.state.pollId) {
            this.setState({
                pollId: this.props.pollId,
                submittedVote: false
            }, this.getPollData);
        }
    }

    async getPollData() {
        try {
            const pollCall = await axios.get('pollData/' + this.props.pollId);
            const pollData = pollCall.data;
            this.setState({pollData});
        } catch (e) {
            alert("There was an error getting the poll data from the server");
            console.log(e);
        }
    }

    async castVote(choice) {
        try {
            let username = this.props.username;
            if (!this.props.authenticated) {
                const ip = await axios.get('ip');
                username = ip.data;
            }
            const voteResponse = await axios.post('/castVote', {choice, id: this.props.pollId, username});
            this.setState({
                responseData: voteResponse.data,
                submittedVote: true
            });
            this.props.updateParentState({pollMenuNeedsUpdate: true});
        } catch (e) {
            alert("There was an error getting information to or from the server. Please check console for error.");
            console.log(e);
        }

    }

    showChoiceBtns() {
        const choices = this.state.pollData.choices.map(choice => <button className={"choiceBtn"} onClick={() => this.castVote(choice)}>{choice}</button>);
        return(
            <div className={"userChoices"}>
                {choices}
            </div>
        );
    }

    showResults() {
        let choiceArr = [];
        const choiceCount = this.state.responseData.map(datum => {
            const {choice, count} = datum;
            choiceArr.push(choice);
            return(<p>{choice}: {count} votes</p>)
        });
        // D3 START
        console.log(this.state.responseData);
        const dataForPie = {};
        this.state.responseData.forEach(datum => {
           dataForPie[datum.choice] = datum.count;
        });
        const chart = document.getElementById('donut_chart');
        if (chart) chart.innerHTML = "";
        const width = 250;
        const height = 250;
        const margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin;

        var svg = d3.select("#donut_chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
        var data = dataForPie;
        // var data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14};

// set the color scale
        var color = d3.scaleOrdinal()
            .domain(choiceArr)
            .range(d3.schemeDark2);

// Compute the position of each group on the pie:
        var pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(function(d) {return d.value; });
        var data_ready = pie(d3.entries(data));

// The arc generator
        var arc = d3.arc()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8);

// Another arc that won't be drawn. Just for labels positionning
        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d){ return(color(d.data.key)) })
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
            .attr('points', function(d) {
                var posA = arc.centroid(d); // line insertion in the slice
                var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
                var posC = outerArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            });

// Add the polylines between chart and labels:
        svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .text( function(d) { console.log(d.data.key) ; return d.data.key } )
            .attr('transform', function(d) {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midangle < Math.PI ? 'start' : 'end')
            });
        // END
        return(
            <div>
                <h3>Results:</h3>
                <div id="donut_chart"></div>
                {choiceCount}
            </div>
        )
    }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>{this.state.pollData.question}</h2>
                    {this.state.submittedVote ? this.showResults() : this.showChoiceBtns()}
                </div>
            </div>
        );
    }
}

export default ShowPoll;
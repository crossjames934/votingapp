import React, {Component} from 'react';
import axios from 'axios';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';
import Chart from './Chart';

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
        let choices = this.state.pollData ?
            this.state.pollData.choices.map(choice =>
                <button
                    className={"choiceBtn"}
                    onClick={() => this.castVote(choice)}>
                    {choice}
                </button>) :
            "Could not connect to server.";
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
            if (count > 0) choiceArr.push(choice);
            return(<p>{choice}: {count} votes</p>)
        });
        return(
            <div>
                <h3>Results:</h3>
                <Chart choiceArr={choiceArr} responseData={this.state.responseData}/>
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
                    <p>Created By: {this.state.pollData.author || "Anonymous"}</p>
                </div>
            </div>
        );
    }
}

export default ShowPoll;
import React, {Component} from 'react';
import axios from 'axios';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class MyPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            polls: [],
            previousUsername: ""
        }
    }

    componentDidMount() {
        this.getMyPolls();
    }

    componentDidUpdate() {
        if (this.state.previousUsername !== this.props.username) {
            this.setState({previousUsername: this.props.username}, this.getMyPolls);
        }
    }

    async getMyPolls() {
        if (!this.props.authenticated) return;
        try {
            const res = await axios.post('/myPolls', {username: this.props.username});
            const data = res.data;
            if (data.error) {
                console.log(data.error);
                return this.setState({errorMessage: data.message});
            }
            // success
            this.setState({polls: data.polls, errorMessage: ""});
        } catch (e) {
            this.setState({errorMessage: "There was a problem connecting, see console for the error"});
            console.log(e);
        }
    }

    showList() {
        if (!this.props.authenticated) return (<p className={'red'}>Please log in to see poll list</p>);
        return this.state.polls.map(poll => {
            const choosePoll = () => {
                this.props.updateParentState({showingPollId: poll._id});
                this.props.showPoll();
            };
            return(
                <p className={'clickableText'} onClick={choosePoll}>{poll.question}</p>
            );
        });
    }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>My Polls</h2>
                    {this.showList()}
                    <p className="red">{this.state.errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default MyPolls;
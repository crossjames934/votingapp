import React, {Component} from 'react';
import axios from 'axios';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

// Strings stored in global variables for consistency and production ease. Used in sorting function.
const RECENT = 'dateAdded';
const LAST_VOTE = 'lastVotedOn';
const MOST_VOTES = 'voteCount';

class PollMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            list: [],
            sortBy: RECENT
        };
        this.showList = this.showList.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getPollList();
    }

    async getPollList() {
        try {
            const listCall = await axios.get('pollList');
            const list = listCall.data;
            list.forEach(poll => {
               poll.dateAdded = new Date(poll.dateAdded);
               poll.lastVotedOn = new Date(poll.lastVotedOn);
            });
            await this.setState({list});
            this.sortList(this.state.sortBy);
        } catch (e) {
            alert('There was an error getting polls from the server, see console for error.');
            console.log(e);
        }
    }

    showList() {
        let list = this.state.list;
        if (this.state.searchQuery.length > 0) {
            try {
                const regex = new RegExp(this.state.searchQuery, 'gi');
                list = list.filter(poll => regex.test(poll.question));
            } catch (e) {
                console.log('invalid regex');
            }
        }
        return list.map(poll => {
            const showIfVoted = {
                display: poll.userHasVoted ? "flex" : "none"
            };
            return(
                <div className={'flexCenter'}>
                    <p className={"pollMenuChoice clickableText"} onClick={() => {
                        window.scrollTo(0, 0);
                        this.props.updateParentState({showingPollId: poll.id});
                        this.props.showPoll();
                    }}>{poll.question}</p>
                    <p
                        // onMouseOver={this.setState({showingToolTip: true})}
                        // onMouseOut={this.setState({showingToolTip: false})}
                        style={showIfVoted}
                        className={'votedSign'}
                    >V</p>
                </div>
            );
        })
    }

    sortList(category) {
        const list = this.state.list.sort((a,b) => b[category] - a[category]);
        this.setState({list, sortBy: category}, this.showList);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate() {
        if (this.props.needsUpdate) {
            this.props.updateParentState({pollMenuNeedsUpdate: false});
            this.getPollList();
        }
    }

    render() {
        // isSelected underlines the currently chosen sort-by option
        const isSelected = (choice) => ({
            textDecoration: choice === this.state.sortBy ? 'underline' : 'none'
        });
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Poll Menu</h2>
                    <div>
                        <p onClick={this.props.createNew} className="clickableText">Create New Poll</p>
                        <input
                            onChange={this.handleChange}
                            name='searchQuery'
                            value={this.state.searchQuery}
                            className={'searchBar'}
                            type='text'
                        />
                        <div className="sortBy">
                            <p style={isSelected(RECENT)} onClick={() => { this.sortList(RECENT) }} className={'clickableText'}>Recently made</p>
                            <p style={isSelected(LAST_VOTE)} onClick={() => { this.sortList(LAST_VOTE) }} className={'clickableText'}>Last voted on</p>
                            <p style={isSelected(MOST_VOTES)} onClick={() => { this.sortList(MOST_VOTES) }} className={'clickableText'}>Most votes</p>
                        </div>
                        <hr/>
                        {this.showList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default PollMenu;
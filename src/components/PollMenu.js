import React, {Component} from 'react';
import axios from 'axios';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class PollMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.showList = this.showList.bind(this);
    }

    componentDidMount() {
        this.getPollList();
    }

    async getPollList() {
        try {
            const listCall = await axios.get('pollList');
            const list = listCall.data;
            this.setState({list});
        } catch (e) {
            alert('There was an error getting polls from the server, see console for error.');
            console.log(e);
        }
    }

    showList() {
        return this.state.list.map(poll => {
            return(
                <div>
                    <p className={"pollMenuChoice"} onClick={() => {
                        this.props.updateParentState({showingPollId: poll.id});
                        this.props.showPoll();
                    }}>{poll.question}</p>
                </div>
            );
        })
    }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Poll Menu</h2>
                    <div>
                        {this.showList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default PollMenu;
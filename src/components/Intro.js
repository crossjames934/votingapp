import React, {Component} from 'react';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class Intro extends Component {
    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Welcome to Cross Voting</h2>
                    <p>Here you can make your own polls, and have your friends vote on them.</p>
                    <p>You can do all this without making an account, but if you want to make lots of polls you will need to register.</p>
                    <p>Registering is super easy, you can do it with a couple clicks if you use your Facebook or Google account.</p>
                    <p>You can also register using traditional means too.</p>
                </div>
            </div>
        );
    }
}

export default Intro;
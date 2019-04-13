import React, {Component} from 'react';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class RENAME extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                </div>
            </div>
        );
    }
}

export default RENAME;
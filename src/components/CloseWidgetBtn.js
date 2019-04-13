import React, {Component} from 'react';

class CloseWidgetBtn extends Component {
    render() {
        return (
            <div className={"closeWidgetBtn"}>
                <p onClick={this.props.close} className={"innerX"}>X</p>
            </div>
        );
    }
}

export default CloseWidgetBtn;
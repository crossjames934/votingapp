import React, {Component} from 'react';

class PollMenu extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    render() {
        const widgetStyle = {
            order: this.props.order,
            display: (this.props.showing ? "block" : "none"),
            animation: `appear 1s ease-out ${this.props.order*200}ms forwards`
        };
        return (
            <div className={"widget"} style={widgetStyle}>
                <div className={"closeWidgetBtn"}>
                    <p onClick={this.props.close} className={"innerX"}>X</p>
                </div>
                <h2>Poll Menu</h2>
            </div>
        );
    }
}

export default PollMenu;
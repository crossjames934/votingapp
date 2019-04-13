import React, {Component} from 'react';

class CreateNewPoll extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    render() {
        const widgetStyle = {
            order: this.props.order,
            display: (this.props.showing ? "block" : "none"),
            width: "30vw",
            animation: `appear 1s ease-out ${this.props.order*100}ms forwards`
        };
        return (
            <div className={"widget"} style={widgetStyle}>
                <div className={"closeWidgetBtn"}>
                    <p onClick={this.props.close} className={"innerX"}>X</p>
                </div>
                <h2>Create New Poll</h2>
            </div>
        );
    }
}

export default CreateNewPoll;
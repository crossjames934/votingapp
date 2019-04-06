import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const widgetStyle = {
            order: this.props.order,
            display: (this.props.showing ? "block" : "none"),
            width: "30vw",
            animation: `appear 1s ease-out ${this.props.order*100}ms forwards`
        };
        return (
            <div className={"widget"} style={widgetStyle}>
                <div onClick={this.props.close} className={"closeWidgetBtn"}>
                    <p className={"innerX"}>X</p>
                </div>
            </div>
        );
    }
}

export default Register;
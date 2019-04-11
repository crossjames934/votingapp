import React, {Component} from 'react';

class MainMenu extends Component {
    options() {
        let listItems = this.props.widgets.map(widget => <li>{widget}</li>);
        return(
            <ul>
                {listItems}
            </ul>
        );
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
                <div className={"closeWidgetBtn"}>
                    <p onClick={this.props.close} className={"innerX"}>X</p>
                </div>
                <h2>Main Menu</h2>
                {this.options()}
            </div>
        );
    }
}

export default MainMenu;
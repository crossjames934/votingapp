import React, {Component} from 'react';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';
import axios from "axios";

class CreateNewPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            choices: ["", ""]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewChoice = this.addNewChoice.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e) {
        const author = this.props.username;
        const { question, choices } = this.state;
        axios.post('/poll', {question, choices, author})
            .then((response) => {
                //handle success
                if (response.status !== 200) {
                    alert("There was a problem after connecting to the server, see console for more information");
                    return console.log(response);
                }

            })
            .catch((response) => {
                //handle error
                console.log(response);
            });
        e.preventDefault();
    }

    blankSpace() {
        return (
            <div style={{width: 30, height: 30}}> </div>
        );
    }

    choices() {
        // For each choice, generate an input field with label
        return this.state.choices.map((choice, index) => {
            const changeChoice = e => {
                const arrayForUpdate = this.state.choices.slice();
                arrayForUpdate[index] = e.target.value;
                this.setState({choices: arrayForUpdate});
            };
            const deleteChoice = () => {
                let arrayForUpdate = this.state.choices.slice();
                arrayForUpdate.splice(index, 1);
                this.setState({choices: arrayForUpdate});

            };
            return(
                <div key={"choice_"+index} className="spaceAround">
                    <p>Choice {index+1}: </p>
                    <input onChange={changeChoice} value={this.state.choices[index]} type="text" required/>
                    {
                        // If there's more than 2 choices, you can delete one
                        this.state.choices.length > 2 ?
                        <p onClick={deleteChoice} className={"innerX"}>X</p> :
                        this.blankSpace()
                    }
                </div>
            )
        });
    }

    addNewChoice() {
        this.setState({choices: [...this.state.choices, ""]});
    }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Create New Poll</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="spaceAround">
                            <p>Question: </p>
                            <input name={"question"} onChange={this.handleChange} type="text" value={this.state.question} required/>
                            {this.blankSpace()}
                        </div>
                        {this.choices()}
                        <button className={"addNewChoiceBtn"} onClick={this.addNewChoice}>Add New Choice</button>
                        <br/>
                        <input className={"submitBtn"} type="submit" value="Submit Poll"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateNewPoll;
import React, { Component } from "react";
import "./month.css"
import Picker from "react-month-picker";
import "react-month-picker/css/month-picker.css";
import axios from "axios";
axios.defaults.withCredentials=true;

class MonthBox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value || "N/A"
        };
        this._handleClick = this._handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || "N/A"
        });
    }

    render() {
        return (
            <div className="box" onClick={this._handleClick}>
                <label>{this.state.value}</label>
            </div>
        );
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e);
    }
}

class List extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            mvalue: { year: 2021, month: 1 },
        };

        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || "N/A"
        });
    }

    render() {
        const pickerLang = {
            months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            from: "From",
            to: "To"
        };
        const mvalue = this.state.mvalue;

        const makeText = m => {
            if (m && m.year && m.month)
                return pickerLang.months[m.month - 1] + ". " + m.year;
            return "?";
        };

        return (
            <ul>
                <li>
                    <label>
                        <b>Pick A Month</b>
                    </label>
                    <div className="edit">
                        <Picker
                            ref="pickAMonth"
                            years={[2020, 2021, 2022]}
                            value={mvalue}
                            lang={pickerLang.months}
                            onChange={this.handleAMonthChange}
                            onDismiss={this.handleAMonthDissmis}
                        >
                            <MonthBox
                                value={makeText(mvalue)}
                                onClick={this.handleClickMonthBox}
                            />
                        </Picker>
                    </div>
                </li>
            </ul>
        );
    }

    handleClickMonthBox(e) {
        this.refs.pickAMonth.show();
    }
    handleAMonthChange(value, text) {
        // 
    }
    handleAMonthDissmis(value) {
        this.setState({ mvalue: value });
        console.log(value);
        axios.get(`http://localhost:4000/view_missingdays_and_hours`,{month:value.month,year : value.year})
        .then(res => {
            console.log(res.data );
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: this.props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    render() {
        return (
            <div className="list-area">
                <List />
            </div>
        );
    }
}

export default () => {
    return <Main />;
};

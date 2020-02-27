import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

const stateDefinitions = {
  available: {
    color: "#ffedba",
    label: 'Available'
  }
};

class DatePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: true,
      value: null
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
    console.log("This is DatePicker's state", this.state);
    this.props.onSelect(this.state);
  };

  renderSelectionValue = () => {
    return (
      <div>
        <div>Selection</div>
        {(this.state.value ? `${this.state.value.start.format("YYYY-MM-DD")} - ${this.state.value.end.format("YYYY-MM-DD")}` : `---------- - ----------`)}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>{this.renderSelectionValue()}</div>

        {this.state.isOpen && (
          <DateRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={true}
            minimumDate={new Date()}
            defaultState="available"
            stateDefinitions={stateDefinitions}
          />
        )}
      </div>
    );
  }
}

export default DatePicker;
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Shared.scss';

class CustomReactSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitAndClear = this.submitAndClear.bind(this);
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  submitAndClear = () => {
    console.log(this.state.selectedOption);
    this.props.submit(this.state.selectedOption);
    this.setState({ selectedOption: '' });
  }
  render() {
    return (
      <div className="display-flex">
        <div className="select-width">
          <Select
            closeOnSelect={false}
            disabled={false}
            multi
            onChange={this.handleChange}
            options={this.props.options}
            placeholder="Select employee(s)"
            joinValues
            delimiter={','}
            removeSelected
            value={this.state.selectedOption}
          />
        </div>
        <input type="button" value="Submit" className="form-control btn-primary custom-submit" onClick={this.submitAndClear} />
      </div>
    );
  }
}

export default CustomReactSelect;

import React from 'react';
import { connect } from 'react-redux';
import ReactSuperSelect from 'react-super-select';
import { Button } from 'react-bootstrap';


class CreateBenifitComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      benifit: '',
      country: '',
      position: '',
      company: 'mcbitss'
    };
    this.setTextField = this.setTextField.bind(this);
    this.addBenifit = this.addBenifit.bind(this);
    this.countryHandler = this.countryHandler.bind(this);
    this.positionHandler = this.positionHandler.bind(this);
  }

  setTextField(event) {
    this.setState({ benifit: event.target.value });
  }

  countryHandler(data) {
    if (data) {
      this.setState({ country: data.name });
    }
  }

  positionHandler(data) {
    if (data) {
      this.setState({ position: data.code });
    }
  }

  addBenifit() {
    if (this.state.benifit !== ''
    && this.state.country !== ''
    && this.state.position !== '') {
      const obj = {
        name: this.state.benifit,
        country: this.state.country,
        position: this.state.position,
        company: this.state.company
      };
      this.props.addBenifit(obj);
      this.setState({ benifit: '' });
    }
  }

  bindDataToDropDownList(masterData, fieldName) {
    const field = fieldName.toUpperCase();
    let masterArray = [];
    masterData.forEach(obj => {
      if (obj.masterDataType.code === field) {
        masterArray = obj.masterDataType.names;
      }
    });

    return masterArray;
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Select Country:</label>
          <ReactSuperSelect
            dataSource={this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
            onChange={this.countryHandler}
            deselectOnSelectedOptionClick={false}
            clearSelectedValueOnDataSourceChange
            clearable={false}
            searchable
            optionValueKey="_id"
            initialValue={undefined}
          />
        </div>
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Select Emp Position:</label>
          <ReactSuperSelect
            dataSource={this.bindDataToDropDownList(this.props.masterInfo, 'Position')}
            onChange={this.positionHandler}
            deselectOnSelectedOptionClick={false}
            clearSelectedValueOnDataSourceChange
            clearable={false}
            optionValueKey="_id"
            initialValue={undefined}
            searchable
          />
        </div>
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Enter Benifit:</label>
          <input
            type="text"
            className="entry-input"
            value={this.state.benifit}
            onChange={(e) => this.setTextField(e)}
          />
        </div>
        <div className="col-lg-3">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.addBenifit()}
          >
            Add Benifit
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    masterInfo: state.masterData.currentMasterData
  };
}
export default connect(mapStateToProps)(CreateBenifitComp);

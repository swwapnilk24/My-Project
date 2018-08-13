import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import ReactSuperSelect from 'react-super-select';
import { Button } from 'react-bootstrap';
import CustomDatePicker from './CustomDatePicker';

class NominationComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      relationship: '',
      dob: '',
      nomineeType: 'retiral',
      errorMsg: ''
    };
    this.setTextField = this.setTextField.bind(this);
    this.relationChHandler = this.relationChHandler.bind(this);
    this.updateDob = this.updateDob.bind(this);
  }

  setTextField(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  relationChHandler(data) {
    if (data) {
      this.setState({ relationship: data.name });
    }
  }

  updateDob(date) {
    this.setState({ dob: date });
  }

  addNominee() {
    if (this.state.relationship !== ''
    && this.state.firstName !== ''
    && this.state.lastName !== '' && this.state.dob !== '') {
      const obj = {
        name: this.state.benifit,
        country: this.state.country,
        position: this.state.position,
        company: this.state.company
      };
      if (this.props.nominees.length > 2) {
        this.setState({ errorMsg: 'Cannot add more than 2 nominees' });
      } else {
        this.props.addNominee(obj);
        this.setState({ firstName: '', lastName: '' });
      }
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

  /* eslint-disable */
  createElement(el) {
    return (
      <tr>
        <td>
          <span>{el.firstName}</span>
        </td>
        <td>
          <span>{el.lastName}</span>
        </td>
        <td>
          <span>{el.relationship}</span>
        </td>
        <td>
          <span>{el.dob}</span>
        </td>
        <td>
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.props.deletenominee(el._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  /* eslint-enable */

  render() {
    const { nominees } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-2">
            <label className="custom-label" htmlFor="usr">* First Name:</label>
            <input
              type="text"
              className="entry-input"
              name="firstName"
              value={this.state.firstName}
              onChange={(e) => this.setTextField(e)}
            />
          </div>
          <div className="col-lg-2">
            <label className="custom-label" htmlFor="usr">* Last Name:</label>
            <input
              type="text"
              className="entry-input"
              name="lastName"
              value={this.state.lastName}
              onChange={(e) => this.setTextField(e)}
            />
          </div>
          <div className="col-lg-2">
            <label className="custom-label" htmlFor="usr">*Employee Relation :</label>
            <ReactSuperSelect
              dataSource={this.bindDataToDropDownList(this.props.masterInfo, 'nominees relationship')}
              onChange={this.relationChHandler}
              deselectOnSelectedOptionClick={false}
              clearSelectedValueOnDataSourceChange
              clearable={false}
              searchable
              optionValueKey="_id"
              initialValue={undefined}
            />
          </div>
          <div className="col-lg-2">
            <label className="custom-label" htmlFor="usr">* Select DOB:</label>
            <CustomDatePicker
              targetName="dob"
              onDayChange={this.updateDob}
              value={this.state.dob}
            />
          </div>
          <div className="col-lg-2">
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              className="payroll-btn"
              onClick={this.addNominee}
            >
              Add Nominee
            </Button>
          </div>
        </div>
        {this.state.errorMsg !== '' && <p>{this.state.errorMsg}</p>}
        {nominees.length > 0 && <table className="table table--stripes pf-grid">
          <tbody>
            <tr>
              <th>
                <span className="table-label">First Name</span>
              </th>
              <th>
                <span className="table-label">last Name</span>
              </th>
              <th>
                <span className="table-label">Relationship</span>
              </th>
              <th>
                <span className="table-label">DOB</span>
              </th>
            </tr>
            { map(nominees, el => this.createElement(el))}
          </tbody>
        </table>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    masterInfo: state.masterData.currentMasterData
  };
}
export default connect(mapStateToProps)(NominationComp);

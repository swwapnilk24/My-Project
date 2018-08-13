import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import moment from 'moment';
// import DatePickerCustom from './DatePickerCustom';
import './AddNewPosition.scss';
import { updateEmployeePosition, postEmployeePosition, checkPotential } from '../../actions/AddNewPositionActions';

class AddNewPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readiness: [
        {
          name: 'Ready Now',
          id: 1
        },
        {
          name: '1-2 years',
          id: 2
        },
        {
          name: '3-5 years',
          id: 3
        }
      ],
      modifyPositionErrorText: '',
      modifyPotentialErrorText: '',
      modifyCountryOfBirthErrorText: '',
      modifyNotesErrorText: '',
      modifyReadinessErrorText: ''
    };
    this.formValidation = this.formValidation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }
  setSyncedWithServer = (value) => {
    console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }

  handleInputChange() {
    console.log('shree');
    this.props.dispatch(checkPotential());
  }

  formatHireDateUserFriendly(inputDate) {
    const formattedHireDateDay = (inputDate)
        ? moment(inputDate).format('DD-MMM-YYYY')
        : '';
    return formattedHireDateDay;
  }
  // toggleElementChecked(value) {
  //   this.props.dispatch(getFilteredWorker(value));
  // }
  bindDataToDropDownList(masterData, fields) {
    const field = fields.toUpperCase();
    const data = masterData;
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field) {
        const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }
  formValidation(fieldValue, id, errorMessage) {
    if (fieldValue === '') {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).textContent = `${errorMessage} is required`;
      return true;
    }
    return false;
  }

  updateEmployeePosition = (data) => {
    this.setSyncedWithServer(false);
    const field = data.target.name.split('.');
    const len = field.length;
    this.props.dispatch(
        updateEmployeePosition(
            { value: data.target.value, field: data.target.name }
        )
    );
    if (field[len - 1] === 'position') {
      this.setState({ modifyPositionErrorText: '' });
    }
    if (field[len - 1] === 'notes') {
      this.setState({ modifyNotesErrorText: '' });
    }
    if (field[len - 1] === 'potential') {
      this.setState({ modifyPotentialErrorText: '' });
    }
    if (field[len - 1] === 'country') {
      this.setState({ modifyCountryOfBirthErrorText: '' });
    }
    if (field[len - 1] === 'readiness') {
      this.setState({ modifyReadinessErrorText: '' });
    }
  }
  Validation() {
    let allow = true;
    if (this.props.addNewPosition.currentEmployee.newPosition.position === '') {
      this.setState({ modifyPositionErrorText: <span>position cannot be Empty </span> });
      allow = false;
    }
    if (this.props.addNewPosition.currentEmployee.newPosition.country === '') {
      this.setState({ modifyCountryOfBirthErrorText: <span>Country cannot be Empty </span> });
      allow = false;
    }

    if (this.props.addNewPosition.currentEmployee.newPosition.potential === '') {
      this.setState({ modifyPotentialErrorText: <span>Potential cannot be unchecked </span> });
      allow = false;
    }
    // if (this.props.addNewPosition.currentEmployee.newPosition.toDate === '') {
    //   this.setState({ modifyToDateErrorText: <span>Note cannot be Empty </span> });
    //   allow = false;
    // }
    if (this.props.addNewPosition.currentEmployee.newPosition.readiness === '') {
      this.setState({ modifyReadinessErrorText: <span>Readiness cannot be Empty </span> });
      allow = false;
    }
    if (this.props.addNewPosition.currentEmployee.newPosition.notes === '') {
      this.setState({ modifyNotesErrorText: <span>Notes cannot be Empty </span> });
      allow = false;
    }
    this.state.isInvalidData = allow;
  }

  save() {
    this.Validation();
    //  updateEmployeePosition({ employee: this.props.addNewPosition.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    if (this.state.isInvalidData === true) {
      if (!this.state.syncedWithServer) {
        let positionObject = Object.assign({}, this.props.addNewPosition.currentEmployee);
        console.log(JSON.stringify(positionObject, null, 2));
        positionObject = omit(positionObject, ['SkillsId']);
        this.props.dispatch(postEmployeePosition(positionObject));
        JSON.stringify(positionObject, null, 2);
        console.log('saving the employee data');
      }
    }
  }
  render() {
    const dropDownOptions = this.state.readiness.map((options, index) => <option key={index} value={options.id}>{options.name}</option>);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div id="steps-add-employee" className="steps-wrapper">
              <div className="steps">
                <div className="step-app">
                  <div className="step-content">
                    <div className="step-tab-panel" id="step2">
                      <div className="box">
                        <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                <g id="Warstwa_2" data-name="Warstwa 2">
                                  <g id="dashboard">
                                    <path d="M38.91,9.93a3.74,3.74,0,0,0-5.28,0l-1,1V1.11A1.11,1.11,0,0,0,31.56,0H4.26A4.26,4.26,0,0,0,0,4.26V35.74A4.26,4.26,0,0,0,4.26,40h27.3a1.11,1.11,0,0,0,1.11-1.11V21.45l6.24-6.24a3.73,3.73,0,0,0,0-5.28ZM16.47,2.22h4.07V6.61l-1.37-1a1.11,1.11,0,0,0-1.34,0l-1.37,1ZM6,37.78H4.26a2,2,0,0,1-2-2V4.26a2,2,0,0,1,2-2H6Zm24.43,0H8.24V23.21H9.75a1.11,1.11,0,0,0,0-2.22H8.24V19h4.14a1.11,1.11,0,0,0,0-2.22H8.24V2.22h6V8.85A1.11,1.11,0,0,0,16,9.73l2.48-1.88L21,9.73a1.31,1.31,0,0,0,1.17.11,1.12,1.12,0,0,0,.62-1V2.22h7.68V13.11L18,25.56a1.11,1.11,0,0,0-.33.79v3.71a1.11,1.11,0,0,0,1.11,1.11H22.5a1.11,1.11,0,0,0,.79-.33l7.16-7.16ZM22,28.94H19.9V26.8L33.47,13.23l2.14,2.14Zm15.3-15.3-.16.16L35,11.66l.16-.16a1.55,1.55,0,0,1,2.14,0A1.57,1.57,0,0,1,37.34,13.64Z" fill="#f4f7fa" />
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <h2 className="box-title">Add New Succession Planning</h2>
                          </li>
                        </ul>
                        <div className="box-content">
                          <div className="box-tab active">
                            <div className="box-inner--no-pad">
                              <div className="toggler active" id="biographicalInfo">
                                <div className="toggler-content">
                                  <table className="table table--stripes">
                                    <tbody>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Position
                                          </span>
                                        </td>
                                        <td>
                                          <input name="position" className="textBoxStyle entry-input" value={this.props.addNewPosition.currentEmployee.newPosition.position} onChange={this.updateEmployeePosition} onBlur={() => this.save()} />
                                          <p className="dangerError">
                                            {this.state.modifyPositionErrorText !== '' ? this.state.modifyPositionErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                          * Country
                                          </span>
                                        </td>
                                        <td>
                                          <select className="custom-select" name="country" onChange={this.updateEmployeePosition} onBlur={() => this.save()} >
                                            <option value="" selected disabled >select</option>
                                            { this.bindDataToDropDownList(this.props.masterInfo, 'Country') }
                                          </select>
                                          {/* <select className="custom-select" name="country" onChange={this.updateEmployeePosition} onBlur={() => this.save()} >
                                            <option value="" selected disabled >select</option>
                                            {dropDownOptions}
                                          </select> */}
                                          <p className="dangerError">
                                            {this.state.modifyCountryOfBirthErrorText !== '' ? this.state.modifyCountryOfBirthErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Proposed by
                                          </span>
                                        </td>
                                        <td>
                                          <input name="skillsAqquired" className="textBoxStyle entry-input" value={this.props.addNewPosition.currentEmployee.newPosition.proposedBy} onChange={this.updateEmployeePosition} onBlur={() => this.save()} />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Proposed On
                                          </span>
                                        </td>
                                        <td>
                                          {/* <DatePickerCustom
                                            targetName="proposedOn"
                                            onDayChange={this.updateEmployeePosition}
                                            value={this.props.addNewPosition.currentEmployee.newPosition.proposedOn}
                                          /> */}
                                          {/* <DatePickerCustom
                                            className="textBoxStyle entry-input"
                                            targetName="jobInformation.employmentDetails.globalFields.hireDate"
                                            value={this.formatHireDateUserFriendly(this.props.addNewPosition.currentEmployee.newPosition.proposedOn)}
                                          /> */}
                                          <input
                                            name="proposedOn"
                                            className="textBoxStyle entry-input"
                                            value={this.formatHireDateUserFriendly(this.props.addNewPosition.currentEmployee.newPosition.proposedOn)}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                          * Readiness
                                          </span>
                                        </td>
                                        <td>
                                          <select className="custom-select" name="readiness" onChange={this.updateEmployeePosition} onBlur={() => this.save()} >
                                            <option value="" selected disabled >select</option>
                                            {dropDownOptions}
                                          </select>
                                          <p className="dangerError">
                                            {this.state.modifyReadinessErrorText !== '' ? this.state.modifyReadinessErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Notes
                                          </span>
                                        </td>
                                        <td>
                                          <textarea name="notes" className="textBoxStyle entry-input" value={this.props.addNewPosition.currentEmployee.newPosition.notes} onChange={this.updateEmployeePosition} onBlur={() => this.save()} style={{ height: '100px' }} />
                                          <p className="dangerError">
                                            {this.state.modifyNotesErrorText !== '' ? this.state.modifyNotesErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Potential successor
                                          </span>
                                        </td>
                                        <td>
                                          <div className="compare-single">
                                            {/* <input type="checkbox" id="compare-HYD104" className="compare-checkbox" value="on" />
                                            <label htmlFor="compare-HYD104" className="compare-label" /> */}
                                            {/* <input
                                              type="checkbox"
                                              id={`checkbox-${i}-${k}`}
                                              className="compare-checkbox"
                                            onClick={() => this.toggleElementChecked(menuObjectKey)}
                                             /> */}
                                            <input
                                              name="potential"
                                              type="checkbox"
                                              id="compare-HYD104"
                                              className="compare-checkbox"
                                              checked={this.props.addNewPosition.currentEmployee.newPosition.potential}
                                              onClick={() => this.handleInputChange()}
                                            />
                                            <label htmlFor="compare-HYD104" className="compare-label" />
                                          </div>
                                          <p className="dangerError">
                                            {this.state.modifyPotentialErrorText !== '' ? this.state.modifyPotentialErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <input type="button" name="Submit" id="submit" value="Submit" className="form-control btn-primary custom-submit" onClick={this.save} />
                                        </td>
                                      </tr>
                                      {/* <tr>
                                        <td className="table-align">
                                          <label className="errorMessage">{(this.props.addNewPosition.isSavedSkilles === false && this.props.addNewPosition.skillsMessage) || (this.state.isInvalidData === true && this.state.errorMessage)}</label>
                                        </td>
                                      </tr> */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addNewPosition: state.addNewPosition,
    masterInfo: state.masterData.currentMasterData,
    newEmployee: state.employee.newEmployee
  };
}

export default connect(mapStateToProps)(AddNewPosition);

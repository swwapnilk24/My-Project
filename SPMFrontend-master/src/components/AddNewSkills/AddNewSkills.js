import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import DatePickerCustom from './DatePickerCustom';
import './AddNewSkills.scss';
import { updateSkills, postEmployeeSkills } from '../../actions/AddNewSkillsActions';

class AddNewSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Level: [
        {
          name: 'Senior Level',
          id: 1
        },
        {
          name: 'Mid Level',
          id: 2
        },
        {
          name: 'Junior Level',
          id: 3
        }
      ],
      modifySkillsErrorText: '',
      modifyFromDateErrorText: '',
      modifyToDateErrorText: ''
    };
    this.formValidation = this.formValidation.bind(this);
    this.save = this.save.bind(this);
  }
  setSyncedWithServer = (value) => {
    console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
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

  updateSkills = (data) => {
    this.setSyncedWithServer(false);
    const field = data.target.name.split('.');
    const len = field.length;
    this.props.dispatch(
        updateSkills(
            { value: data.target.value, field: data.target.name }
        )
    );
    if (field[len - 1] === 'skillsAqquired') {
      this.setState({ modifySkillsErrorText: '' });
    }
    if (field[len - 1] === 'fromDate') {
      this.setState({ modifyFromDateErrorText: '' });
    }
    if (field[len - 1] === 'toDate') {
      this.setState({ modifyToDateErrorText: '' });
    }
    if (field[len - 1] === 'level') {
      this.setState({ modifyLevelErrorText: '' });
    }
  }
  Validation() {
    let allow = true;
    if (this.props.addNewSkills.currentEmployee.newSkills.skillsAqquired === '') {
      this.setState({ modifySkillsErrorText: <span>skills cannot be Empty </span> });
      allow = false;
    }
    if (this.props.addNewSkills.currentEmployee.newSkills.fromDate === '') {
      this.setState({ modifyFromDateErrorText: <span>From Date cannot be Empty </span> });
      allow = false;
    }
    if (this.props.addNewSkills.currentEmployee.newSkills.toDate === '') {
      this.setState({ modifyToDateErrorText: <span>To Date cannot be Empty </span> });
      allow = false;
    }
    if (this.props.addNewSkills.currentEmployee.newSkills.level === '') {
      this.setState({ modifyLevelErrorText: <span>Level cannot be Empty </span> });
      allow = false;
    }
    this.state.isInvalidData = allow;
  }

  save() {
    this.Validation();
    //  updateSkills({ employee: this.props.addNewSkills.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    if (this.state.isInvalidData === true) {
      if (!this.state.syncedWithServer) {
        let skillsObject = Object.assign({}, this.props.addNewSkills.currentEmployee);
        console.log(JSON.stringify(skillsObject, null, 2));
        skillsObject = omit(skillsObject, ['SkillsId']);
        this.props.dispatch(postEmployeeSkills(skillsObject));
        JSON.stringify(skillsObject, null, 2);
        console.log('saving the employee data');
        this.props.router.push('TalentManagement');
      }
    }
  }
  render() {
    const dropDownOptions = this.state.Level.map((options, index) => <option key={index} value={options.id}>{options.name}</option>);
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
                            <h2 className="box-title">Add New Skills</h2>
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
                                            * Skills Aqquired
                                          </span>
                                        </td>
                                        <td>
                                          <input name="skillsAqquired" className="textBoxStyle entry-input" value={this.props.addNewSkills.currentEmployee.newSkills.skillsAqquired} onChange={this.updateSkills} onBlur={() => this.save()} />
                                          <p className="dangerError">
                                            {this.state.modifySkillsErrorText !== '' ? this.state.modifySkillsErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * From Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="fromDate"
                                            onDayChange={this.updateSkills}
                                            value={this.props.addNewSkills.currentEmployee.newSkills.fromDate}
                                          />
                                          <p className="dangerError">
                                            {this.state.modifyFromDateErrorText !== '' ? this.state.modifyFromDateErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                          * To Date
                                                    </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="toDate"
                                            onDayChange={this.updateSkills}
                                            value={this.props.addNewSkills.currentEmployee.newSkills.toDate}
                                          />
                                          <p className="dangerError">
                                            {this.state.modifyToDateErrorText !== '' ? this.state.modifyToDateErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                          * Level
                                          </span>
                                        </td>
                                        <td>
                                          <select className="custom-select" name="level" onChange={this.updateSkills} onBlur={() => this.save()} >
                                            <option value="" selected disabled >select</option>
                                            {dropDownOptions}
                                          </select>
                                          <p className="dangerError">
                                            {this.state.modifyLevelErrorText !== '' ? this.state.modifyLevelErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <input type="button" name="Submit" id="submit" value="Submit" className="form-control btn-primary custom-submit" onClick={this.save} />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <label className="errorMessage">{(this.props.addNewSkills.isSavedSkilles === false && this.props.addNewSkills.skillsMessage) || (this.state.isInvalidData === true && this.state.errorMessage)}</label>
                                        </td>
                                      </tr>
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
    addNewSkills: state.addNewSkills
  };
}

export default connect(mapStateToProps)(AddNewSkills);

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import EmptyRowsView from './EmptyRowsView';
import CustomModal from './customModal';
import NomineesForm from './NomineesForm';
import { fetchEmployeeNominees, deleteNomineesAction, saveNominees, deleteNominees, fetchEmployeePlanData } from '../../actions/EmployeeBasedNomineesActions';

class HealthInuranceNomintaionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.nomineesRowGetter = this.nomineesRowGetter.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openAddForm = this.openAddForm.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.getGridRowId = this.getGridRowId.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.removeRecord = this.removeRecord.bind(this);
    this.displayingPlansData = this.displayingPlansData.bind(this);
    this.state = {
      formShowing: false,
      formType: '',
      formData: {},
      initialRender: true,
      nomineesGridHeight: 35,
      gridSelectedIndex: [-1],
      planData: [],
      nomineesColumns: [{ key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
      { key: 'relationship', name: 'Relation Ship With The Employee' },
      { key: 'dob', name: 'Date of Birth' }],
      nomineesRows: []
    };
  }
  componentWillReceiveProps(newprops) {
    const key = '_id';
    if (this.state.initialRender) {
      this.setState({ initialRender: false });
      this.props.dispatch(fetchEmployeeNominees(newprops.currentEmployee[key], 'Health'));
      this.props.dispatch(fetchEmployeePlanData('5a7434715bb78c3900840c73', '5a747ab7c2c4d5299c9c2cfa', '200001', this.displayingPlansData));
      // this.props.dispatch(fetchEmployeePlan(newprops.currentEmployee[key], newprops.currentEmployee.jobInformation.employmentDetail.keyJobAttribute.position));
    }
    if (!this.state.initialRender) {
      if (this.props.currentEmployee[key] !== newprops.currentEmployee[key]) {
        this.props.dispatch(fetchEmployeeNominees(newprops.currentEmployee[key], 'Health'));
      } else {
        console.log('filter id', newprops.currentEmployee);
      }
    }
    // if (this.props.currentEmployee[key] !== newprops.currentEmployee[key]) {
    //   this.props.dispatch(fetchEmployeeNominees(newprops.currentEmployee[key], 'Health'));
    // } else {
    //   console.log('filter id', newprops.currentEmployee);
    // }
    console.log('updated', newprops.currentEmployee);
    this.setState({ nomineesGridHeight: (newprops.nominees.length * 35) + 35 });
    this.setState({ nomineesRows: newprops.nominees });
  }
  getGridRowId(data) {
    this.setState({ gridSelectedIndex: [data.rowIdx] });
    this.setState({ formData: this.state.nomineesRows[data.rowIdx] });
  }
  // save() {
  //   setTimeout(() => {
  //     this.props.dispatch(saveNominees(this.props.nominees));
  //   }, 0);
  // }
  toggleElement(id) {
    document.getElementById(id).classList.toggle('active');
  }
  bindDataToDropDownList(masterData, fields) {
    const field = fields.toUpperCase();
    const data = masterData;
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field) {
        const optionsList = obj.masterDataType.names;
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }
  nomineesRowGetter(index) {
    const rowObjectDateFormatted = _.cloneDeep(this.state.nomineesRows[index]);
    const formattedDob = (rowObjectDateFormatted.dob) ? moment(rowObjectDateFormatted.dob).format('DD-MMM-YYYY') : '';
    rowObjectDateFormatted.dob = formattedDob;
    return rowObjectDateFormatted;
  }
  closeForm() {
    this.setState({ formShowing: false });
  }
  submitEvent(data, type) {
    console.log(data, type);
    if (type === 'Add') {
      let allow = true;
      this.props.nominees.map((existedData, index) => {
        const formattedDob = (existedData.dob) ? moment(existedData.dob).format('DD-MMM-YYYY') : '';
        console.log(formattedDob, data);
        if (formattedDob === data.dob && existedData.firstName.toUpperCase() === data.firstName.toUpperCase() && existedData.lastName.toUpperCase() === data.lastName.toUpperCase() && existedData.relationship.toUpperCase() === data.relationship.toUpperCase()) {
          allow = false;
        }
        return index;
      });
      console.log(allow);
      if (allow) {
        // this.props.dispatch(updateNominees(data));
        const key = '_id';
        const finalData = {};
        const dataObj = data;
        dataObj.nominationType = 'Health';
        finalData.id = this.props.currentEmployee[key];
        finalData.nomineeType = 'Health';
        finalData.nominee = data;
        this.props.dispatch(saveNominees(finalData));
        this.setState({ formShowing: false });
      } else {
        alert('already exist');
      }
    }
  }
  openAddForm() {
    this.setState({ formType: 'Add' });
    this.setState({ formShowing: true });
  }
  openEditForm() {
    this.setState({ formShowing: true });
  }
  removeRecord(recordId) {
    this.props.dispatch(deleteNomineesAction(recordId));
  }
  deleteRow() {
    if (Object.keys(this.state.formData).length !== 0) {
      console.log(this.state.formData);
      const key = ['_id'];
      this.props.dispatch(deleteNominees(this.props.currentEmployee[key], this.state.formData[key], this.removeRecord));
      this.setState({ formData: {} });
    } else {
      alert('please select a row');
    }
  }
  displayingPlansData(data) {
    this.setState({ planData: data });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="planView">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Nominee Plans</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('planView')} />
                          </div>

                          <div className="toggler-content">
                            { this.state.planData.length > 0 ?
                              <div>
                                <table className="table table--stripes">
                                  <tbody>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          * plan:
                                        </span>
                                      </td>
                                      <td>
                                        {this.state.planData[0].plan}
                                      </td>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Premium:
                                        </span>
                                      </td>
                                      <td>
                                        {this.state.planData[0].amount}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Frequency:
                                        </span>
                                      </td>
                                      <td>
                                        {this.state.planData[0].frequency}
                                      </td>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Contribution From Employee:
                                        </span>
                                      </td>
                                      <td>
                                        {this.state.planData[0].contributionFromEmployee}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                        Contribution From Employer:
                                        </span>
                                      </td>
                                      <td>
                                        {this.state.planData[0].contributionFromEmployer}
                                      </td>
                                      <td className="table-align">
                                        <span className="table-label">
                                          pdfData:
                                        </span>
                                      </td>
                                      <td>
                                        <a href={this.state.planData[0].pdfData}>plad pdf file</a>
                                      </td>
                                    </tr>
                                    {/* <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Current Address:
                                        </span>
                                      </td>
                                      <td>
                                        {}
                                      </td>
                                      <td />
                                      <td />
                                    </tr> */}
                                  </tbody>
                                </table>
                              </div>
                              : 'no plans found for you' }
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="nominees">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Nominee Details</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForm}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.deleteRow}>
                                    <i className="fas fa-trash fa-4" aria-hidden="true" />
                                  </a>
                                </li>
                                {/* <li>
                                  <a onClick={this.openEditForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                {/* <li>
                                  <a>
                                    <i title="History" onClick={this.showHistoryForCompensation} className="fa fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('nominees')} />
                          </div>

                          <div className="toggler-content">
                            <ReactDataGrid
                              minHeight={this.state.nomineesGridHeight}
                              columns={this.state.nomineesColumns}
                              rowGetter={this.nomineesRowGetter}
                              rowsCount={this.state.nomineesRows.length}
                              enableCellSelect
                              onCellSelected={this.getGridRowId}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.gridSelectedIndex
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal Form={<NomineesForm formType={this.state.formType} closeEvent={this.closeForm} submitEvent={this.submitEvent} data={this.state.formData} />} show={this.state.formShowing} />
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
  console.log('health nomination state', state);
  return {
    nominees: state.employeebasednominees.NomineesData,
    masterInfo: state.masterData.currentMasterData,
    currentEmployee: state.employee.currentEmployee
  };
}
export default connect(mapStateToProps)(HealthInuranceNomintaionScreen);

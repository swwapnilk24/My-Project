import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import { setLeavesMasterData } from '../../actions/LeavesMasterDataAction';
import { updateLeavesMasterData } from '../../services/Leaves.service';
import { creditTimeOffTypes, creditIndividualTimeOffTypes } from '../../services/Employee.service';
import { updateLeavesAudit } from '../../services/Audit.service';
import CustomModal from '../JobInfo/CustomModal';
import CustomReactTable from '../JobInfo/CustomReactTable';
import CreditLeavesForm from './CreditLeavesForm';
import CustomReactSelect from '../Shared/CustomReactSelect';
import './LeavesMasterData.scss';
import CustomSnackBar from '../JobInfo/CustomSnackBar';
import { insertIntoLeavesAudit } from '../../actions/AuditActions';
import AuthorizedComponent from '../Routes/AuthorizedComponent';

class LeavesMasterData extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: undefined,
      selected: null,
      showingLeaveTypes: false,
      creditLeavesFormIsOpen: false,
      currentSelectedIndexForCreditLeaves: [-1],
      currentGridDataObjectForCreditLeaves: {},
      creditLeavesRows: [],
      creditLeavesColumns: [{ key: 'country', name: 'Country', filterable: true }, { key: 'role', name: 'Role', filterable: true }, { key: 'timeOffType', name: 'Time Off Type' }, { key: 'numberOfDays', name: 'Number Of Days' }, { key: 'yearStartDate', name: 'Year Start Date' }, { key: 'yearEndDate', name: 'Year End Date' }, { key: 'status', name: 'Status' }],
      // creditLeavesColumns: [{ accessor: 'status', Header: 'Status' }, { accessor: 'country', Header: 'Country' }, { accessor: 'role', Header: 'Role' }, { accessor: 'timeOffType', Header: 'Time Off Type' }, { accessor: 'numberOfDays', Header: 'Number Of Days', filterable: false }, { accessor: 'yearStartDate', Header: 'Year Start Date', filterable: false }, { accessor: 'yearEndDate', Header: 'Year End Date', filterable: false }]
      creditLeavesGridSize: 35,
      creditLeavesType: '',
      creditLeavesAuditIsOpen: false,
      creditLeavesAuditColumns: [{ accessor: 'country', Header: 'Country' }, { accessor: 'role', Header: 'Role' }, { accessor: 'timeOffType', Header: 'Time Off Type' }, { accessor: 'numberOfDays', Header: 'Number Of Days' }, { accessor: 'yearStartDate', Header: 'Year Start Date' }, { accessor: 'yearEndDate', Header: 'Year End Date' }, { accessor: 'status', Header: 'Status' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      creditLeavesAuditRows: [],
      snackBarIsOpen: false,
      snackBarMessage: '',
      leavesAuditData: '',
      options: [],
      creditIndividualLeavesColumns: [{ key: 'firstNameAndEmpId', name: 'Name - Employee ID', filterable: true }, { key: 'country', name: 'Country', filterable: true }, { key: 'role', name: 'Role', filterable: true }, { key: 'timeOffType', name: 'Time Off Type' }, { key: 'numberOfDays', name: 'Number Of Days' }, { key: 'yearStartDate', name: 'Year Start Date' }, { key: 'yearEndDate', name: 'Year End Date' }, { key: 'status', name: 'Status' }],
      individualCreditLeavesRows: [],
      individualCreditLeavesGridSize: 35,
      matchedData: [],
      currentSelectedIndexForIndividualCreditLeaves: [-1],
      currentGridDataObjectForIndividualCreditLeaves: {},
      leavesIndividualColumns: [{ accessor: 'firstNameAndEmpId', Header: 'Name - Employee ID' }, { accessor: 'country', Header: 'Country' }, { accessor: 'role', Header: 'Role' }, { accessor: 'timeOffType', Header: 'Time Off Type' }, { accessor: 'numberOfDays', Header: 'Number Of Days' }, { accessor: 'yearStartDate', Header: 'Year Start Date' }, { accessor: 'yearEndDate', Header: 'Year End Date' }, { accessor: 'status', Header: 'Status', filterable: false }],
      leavesIndividualRows: [],
      individualSelectedIndex: undefined
    };
    this.submitCreditLeavesForm = this.submitCreditLeavesForm.bind(this);
    this.closeCreditLeavesForm = this.closeCreditLeavesForm.bind(this);
    this.addCreditLeaves = this.addCreditLeaves.bind(this);
    this.editCreditLeave = this.editCreditLeave.bind(this);
    this.getRowIDForCreditLeaves = this.getRowIDForCreditLeaves.bind(this);
    this.rowGetterForCreditLeaves = this.rowGetterForCreditLeaves.bind(this);
    this.processLeave = this.processLeave.bind(this);
    this.deleteCreditLeave = this.deleteCreditLeave.bind(this);
    this.openCreditLeavesAudit = this.openCreditLeavesAudit.bind(this);
    this.closeCreditLeavesAudit = this.closeCreditLeavesAudit.bind(this);
    this.submitSearchOptions = this.submitSearchOptions.bind(this);
    this.rowGetterForIndividualCreditLeaves = this.rowGetterForIndividualCreditLeaves.bind(this);
    this.getLeavesDetails = this.getLeavesDetails.bind(this);
    this.getRowIDForIndividualCreditLeaves = this.getRowIDForIndividualCreditLeaves.bind(this);
    this.processIndividualLeave = this.processIndividualLeave.bind(this);
    this.deleteIndividualLeave = this.deleteIndividualLeave.bind(this);
    this.updateIndividualLeaveStatus = this.updateIndividualLeaveStatus.bind(this);
    // this.editIndividualCreditLeaves = this.editIndividualCreditLeaves.bind(this);
    // this.closeIndividualCreditLeavesForm = this.closeIndividualCreditLeavesForm.bind(this);
  }
  componentWillReceiveProps(newProps) {
    // console.log(newProps);
    const creditLeavesRowCount = newProps.leavesData.leavesMasterData.length + 1;
    const formattedCreditLeavesRows = newProps.leavesData.leavesMasterData.map(data => this.getFormattedDate(data));
    this.setState({ creditLeavesRows: formattedCreditLeavesRows });
    this.setState({ creditLeavesGridSize: creditLeavesRowCount * 35 });
    const formattedCreditLeavesAuditRows = newProps.auditData.leavesAudit.map(data => this.getFormattedDate(data));
    this.setState({ creditLeavesAuditRows: formattedCreditLeavesAuditRows });
    const newOptions = [];
    const key = '_id';
    newProps.myEmployees.map(data => {
      const option = {};
      option.label = `${data.personalInformation.personalInformation.personalInformation.firstName} - ${data.personalInformation.biographicalInformation.biographicalInformation.employeeId}`;
      option.value = data[key];
      newOptions.push(option);
      return data[key];
    });
    // console.log(newOptions);
    this.setState({ options: newOptions });
    const formattedIndvidualLeaves = newProps.leavesData.leavesIndividual.map(data => this.getFormattedDate(data));
    this.setState({ leavesIndividualRows: formattedIndvidualLeaves });
  }
  componentDidUpdate() {
    window.scrollTo(0, this.state.scrollPosition);
  }
  getFormattedDate(row) {
    const tempRow = {};
    Object.keys(row).forEach((key) => {
      if (key === 'yearStartDate') {
        const formattedYearStartDate = (row.yearStartDate) ? moment(row.yearStartDate).format('DD-MMM-YYYY') : '';
        tempRow.yearStartDate = formattedYearStartDate;
      } else {
        tempRow[key] = row[key];
      }
      if (key === 'yearEndDate') {
        const formattedYearEndDate = (row.yearEndDate) ? moment(row.yearEndDate).format('DD-MMM-YYYY') : '';
        tempRow.yearEndDate = formattedYearEndDate;
      }
      if (key === 'insertedDate') {
        const formattedinsertedDate = (row.insertedDate) ? moment(row.insertedDate).format('DD-MMM-YYYY') : '';
        tempRow.insertedDate = formattedinsertedDate;
      }
    });
    return tempRow;
  }
  getRowIDForCreditLeaves(data) {
    this.setState({ scrollPosition: window.scrollY });
    // console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForCreditLeaves: rowID });
    // console.log(this.state.creditLeavesRows[temp]);
    const object = this.state.creditLeavesRows[temp];
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForCreditLeaves: object });
  }
  getRowIDForIndividualCreditLeaves(data) {
    this.setState({ scrollPosition: window.scrollY });
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForIndividualCreditLeaves: rowID });
    // console.log(this.state.individualCreditLeavesRows[temp]);
    const object = this.state.individualCreditLeavesRows[temp];
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForIndividualCreditLeaves: object });
  }
  getLeavesDetails(data) {
    const matchedData = [];
    const temp = this.props.leavesData.leavesMasterData.map((leave, index) => {
      const finalData = { ...data };
      if (finalData.country === leave.country && finalData.role === leave.role && leave.status === 'Processed') {
        finalData.yearEndDate = moment(leave.yearEndDate).format('DD-MMM-YYYY');
        finalData.timeOffType = leave.timeOffType;
        finalData.numberOfDays = Math.floor((leave.numberOfDays / this.getNumberOfMonths(leave.yearStartDate, leave.yearEndDate)) * this.getNumberOfMonths(finalData.yearStartDate, leave.yearEndDate));
        matchedData.push(finalData);
      }
      return index;
    });
    console.log(matchedData, temp);
    return matchedData;
  }
  getNumberOfMonths(startDate, endDate) {
    const months = moment(new Date(endDate)).diff(new Date(startDate), 'months', true);
    // console.log(months);
    return months;
  }
  getBasicDetails(data, key) {
    const newLeavesObj = {};
    newLeavesObj.employeeID = data[key];
    newLeavesObj.firstNameAndEmpId = `${data.personalInformation.personalInformation.personalInformation.firstName} - ${data.personalInformation.biographicalInformation.biographicalInformation.employeeId}`;
    newLeavesObj.country = data.personalInformation.addressInformation.addressInformation[0].country;
    newLeavesObj.role = data.jobInformation.employmentDetail.keyJobAttribute.position;
    newLeavesObj.yearStartDate = moment(data.identify.identify.identify.hireDate).format('DD-MMM-YYYY');
    newLeavesObj.status = 'Pending';
    return newLeavesObj;
  }
  bindDataToDropDownList(masterData, fieldName) {
    const field = fieldName.toUpperCase();
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
  addCreditLeaves() {
    this.setState({ creditLeavesType: 'add' });
    this.setState({ creditLeavesFormIsOpen: true });
    this.setState({ currentGridDataObjectForCreditLeaves: '' });
  }
  editCreditLeave() {
    if (this.state.currentGridDataObjectForCreditLeaves.status === 'Pending') {
      this.setState({ creditLeavesType: 'edit' });
      const editData = this.state.currentGridDataObjectForCreditLeaves;
      console.log('editData is: ', editData);
      this.setState({ creditLeavesFormIsOpen: true });
      this.setState({ currentSelectedIndexForCreditLeaves: -1 });
    } else if (this.state.currentGridDataObjectForCreditLeaves.status === undefined) {
      this.setState({ snackBarIsOpen: true });
      this.setState({ snackBarMessage: 'Please select a row first' });
      setTimeout(() => {
        this.setState({ snackBarIsOpen: false });
      }, 1000);
    }
    this.setState({ currentSelectedIndexForCreditLeaves: [-1] });
  }
  processLeave() {
    if (this.state.currentGridDataObjectForCreditLeaves.status === 'Pending') {
      creditTimeOffTypes({ timeOffType: this.state.currentGridDataObjectForCreditLeaves }, this.props.dispatch);
      const newData = { ...this.state.currentGridDataObjectForCreditLeaves };
      newData.insertedBy = 'Prajith';
      newData.insertedDate = new Date();
      newData.operation = 'Processed';
      // console.log(newData);
      this.state.leavesAuditData = newData;
      this.props.dispatch(
        insertIntoLeavesAudit(newData)
      );
      updateLeavesAudit({ leavesAudit: this.state.leavesAuditData }, this.props.dispatch);
    } else if (this.state.currentGridDataObjectForCreditLeaves.status === undefined) {
      this.setState({ snackBarIsOpen: true });
      this.setState({ snackBarMessage: 'Please select a row first' });
      setTimeout(() => {
        this.setState({ snackBarIsOpen: false });
      }, 1000);
    } else if (this.state.currentGridDataObjectForCreditLeaves.status === 'Processed') {
      this.setState({ snackBarIsOpen: true });
      this.setState({ snackBarMessage: 'You can\'t process the leaves that have already been proceessed' });
      setTimeout(() => {
        this.setState({ snackBarIsOpen: false });
      }, 1800);
    }
    this.setState({ currentSelectedIndexForCreditLeaves: [-1] });
    this.setState({ currentGridDataObjectForCreditLeaves: '' });
  }
  deleteCreditLeave() {
    if (this.state.currentGridDataObjectForCreditLeaves.status === 'Pending') {
      const newData = { ...this.state.currentGridDataObjectForCreditLeaves };
      newData.status = 'Deleted';
      // console.log(newData);
      this.props.dispatch(
        setLeavesMasterData({ newData, type: 'edit' })
      );
      newData.insertedBy = 'Prajith';
      newData.insertedDate = new Date();
      newData.operation = 'Delete';
      // console.log(newData);
      this.state.leavesAuditData = newData;
      this.props.dispatch(
        insertIntoLeavesAudit(newData)
      );
      this.save();
    } else if (this.state.currentGridDataObjectForCreditLeaves.status === undefined) {
      this.setState({ snackBarIsOpen: true });
      this.setState({ snackBarMessage: 'Please select a row first' });
      setTimeout(() => {
        this.setState({ snackBarIsOpen: false });
      }, 1000);
    } else {
      this.setState({ snackBarIsOpen: true });
      this.setState({ snackBarMessage: 'You cannot delete a row once it is processed' });
      setTimeout(() => {
        this.setState({ snackBarIsOpen: false });
      }, 1800);
    }
    this.setState({ currentSelectedIndexForCreditLeaves: [-1] });
    this.setState({ currentGridDataObjectForCreditLeaves: '' });
  }
  submitCreditLeavesForm(data, formType) {
    const newData = data;
    newData.status = 'Pending';
    if (formType === 'add') {
      // console.log(newData);
      this.props.dispatch(
        setLeavesMasterData({ newData, type: formType })
      );
      newData.insertedBy = 'Prajith';
      newData.insertedDate = new Date();
      newData.operation = 'Insert';
      console.log(newData);
      this.state.leavesAuditData = newData;
      this.props.dispatch(
        insertIntoLeavesAudit(newData)
      );
    }
    if (formType === 'edit') {
      const field = '_id';
      newData[field] = this.state.currentGridDataObjectForCreditLeaves[field];
      // console.log(field, ' :', this.state.currentGridDataObjectForCreditLeaves[field]);
      this.props.dispatch(
        setLeavesMasterData({ newData, type: formType })
      );
      newData.insertedBy = 'Prajith';
      newData.insertedDate = new Date();
      newData.operation = 'Update';
      // console.log(newData);
      this.state.leavesAuditData = newData;
      this.props.dispatch(
        insertIntoLeavesAudit(newData)
      );
    }
    this.save();
    this.setState({ creditLeavesFormIsOpen: false });
    this.setState({ currentSelectedIndexForCreditLeaves: [-1] });
    this.setState({ currentGridDataObjectForCreditLeaves: '' });
  }
  updateIndividualLeaveStatus(response) {
    if (response.message) {
      alert(response.message);
    } else if (response.leavesIndividual.status === 'Processed') {
      const rows = [...this.state.individualCreditLeavesRows];
      rows.splice(this.state.individualSelectedIndex, 1);
      this.setState({ individualCreditLeavesRows: rows });
      this.setState({ individualCreditLeavesGridSize: (rows.length + 1) * 35 });
    }
  }
  processIndividualLeave() {
    this.setState({ scrollPosition: window.scrollY });
    // console.log(this.state.currentGridDataObjectForIndividualCreditLeaves);
    creditIndividualTimeOffTypes(this.state.currentGridDataObjectForIndividualCreditLeaves, this.props.dispatch, this.updateIndividualLeaveStatus);
    this.setState({ individualSelectedIndex: this.state.currentSelectedIndexForIndividualCreditLeaves });
    this.setState({ currentSelectedIndexForIndividualCreditLeaves: [-1] });
  }
  deleteIndividualLeave() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForIndividualCreditLeaves.status === 'Pending') {
      const newData = this.state.currentGridDataObjectForIndividualCreditLeaves;
      newData.status = 'Deleted';
      const rows = [...this.state.individualCreditLeavesRows];
      rows[this.state.currentSelectedIndexForIndividualCreditLeaves] = newData;
      console.log(newData);
      this.setState({ individualCreditLeavesRows: rows });
    }
    this.setState({ currentSelectedIndexForIndividualCreditLeaves: [-1] });
  }
  openCreditLeavesAudit() {
    this.setState({ creditLeavesAuditIsOpen: true });
  }
  closeCreditLeavesAudit() {
    this.setState({ creditLeavesAuditIsOpen: false });
  }
  closeCreditLeavesForm() {
    this.setState({ creditLeavesFormIsOpen: false });
    this.setState({ currentGridDataObjectForCreditLeaves: '' });
  }
  rowGetterForCreditLeaves(index) {
    return this.state.creditLeavesRows[index];
  }
  save = () => {
    setTimeout(() => {
      updateLeavesMasterData({ leavesMasterData: this.props.currentData }, this.props.dispatch);
      updateLeavesAudit({ leavesAudit: this.state.leavesAuditData }, this.props.dispatch);
    }, 1);
  }
  submitSearchOptions(employees) {
    console.log(employees, 'from submit func');
    this.setState({ scrollPosition: window.scrollY });
    const key = '_id';
    let finalEmployees = [];
    this.props.myEmployees.map(data =>
      employees.filter((employee, index) => {
        if (employee.value === data[key]) {
          console.log(employee);
          const newLeavesObj = this.getBasicDetails(data, key);
          const finalLeavesArray = this.getLeavesDetails(newLeavesObj);
          if (finalLeavesArray.length >= 1) {
            finalEmployees = finalEmployees.concat(finalLeavesArray);
          } else {
            alert('No data found');
          }
        }
        return index;
      })
    );
    console.log(finalEmployees);
    this.setState({ individualCreditLeavesRows: finalEmployees });
    this.setState({ individualCreditLeavesGridSize: (finalEmployees.length + 1) * 35 });
    this.setState({ currentSelectedIndexForIndividualCreditLeaves: [-1] });
  }
  rowGetterForIndividualCreditLeaves(index) {
    return this.state.individualCreditLeavesRows[index];
  }
  render() {
    return (
      <div>
        <div className="container">

          <div className="row">

            <div className="col-xs-12">

              <div className="box">

                <div id="errorMessage" className={this.state.snackBarIsOpen ? 'snackBarStyle' : 'actionDisable'}>
                  <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.snackBarMessage} />
                </div>

                <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    <div className="box-icon">
                      <i className="far fa-calendar-alt leaveIcon" aria-hidden="true" />
                    </div>
                    <h2 className="box-title">Leaves</h2>
                    <ul className="box-actions">
                      {/* <li>
                      <a >Edit</a>
                    </li> */}
                      <li>
                        <a title="Help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                        </a>
                      </li>
                    </ul>
                  </li>

                </ul>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler active">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Credit Leaves</h2>
                              <div className="toggleAction">
                                <ul className="box-actions">
                                  <li>
                                    <a onClick={this.addCreditLeaves}>
                                      <i className="fas fa-plus addIcon" aria-hidden="true" title="Add" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.editCreditLeave}>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.processLeave}>
                                      <i className="fas fa-check" aria-hidden="true" title="Process" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.deleteCreditLeave}>
                                      <i className="fas fa-trash-alt" aria-hidden="true" title="Delete" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.openCreditLeavesAudit}>
                                      <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" />
                            </div>

                            <div className="toggler-content no-padding">
                              <CustomModal form={<CreditLeavesForm formType={this.state.creditLeavesType} data={this.state.currentGridDataObjectForCreditLeaves} submit={this.submitCreditLeavesForm} close={this.closeCreditLeavesForm} />} show={this.state.creditLeavesFormIsOpen} />
                              <ReactDataGrid
                                columns={this.state.creditLeavesColumns}
                                rowGetter={this.rowGetterForCreditLeaves}
                                rowsCount={this.state.creditLeavesRows.length}
                                minHeight={this.state.creditLeavesGridSize}
                                enableCellSelect
                                onCellSelected={this.getRowIDForCreditLeaves}
                                showCheckbox={false}
                                rowSelection={{
                                  showCheckbox: false,
                                  selectBy: {
                                    indexes: this.state.currentSelectedIndexForCreditLeaves
                                  }
                                }}
                                enableRowSelect={false}
                              />
                              <CustomModal form={<CustomReactTable headerName={'Credit Leaves'} auditData={this.state.creditLeavesAuditRows} auditColumns={this.state.creditLeavesAuditColumns} close={this.closeCreditLeavesAudit} />} show={this.state.creditLeavesAuditIsOpen} />
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="box">

                {/* <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    <div className="box-icon">
                      <i className="fa fa-calendar-times-o leaveIcon" aria-hidden="true" />
                    </div>
                    <h2 className="box-title">Add leaves manually</h2>
                  </li>

                </ul> */}
                <div>
                  <CustomReactSelect options={this.state.options} submit={this.submitSearchOptions} />
                </div>
                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler active">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Credit Leaves Individually</h2>
                              <div className="toggleAction">
                                <ul className="box-actions">
                                  <li>
                                    <a onClick={this.processIndividualLeave}>
                                      <i className="fas fa-check" aria-hidden="true" title="Process" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.deleteIndividualLeave}>
                                      <i className="fas fa-trash-alt" aria-hidden="true" title="Delete" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" />
                            </div>

                            <div className="toggler-content no-padding">
                              <ReactDataGrid
                                columns={this.state.creditIndividualLeavesColumns}
                                rowGetter={this.rowGetterForIndividualCreditLeaves}
                                rowsCount={this.state.individualCreditLeavesRows.length}
                                emptyRowsView={() => <div>Select employee(s) to show their details</div>}
                                minHeight={this.state.individualCreditLeavesGridSize}
                                enableCellSelect
                                onCellSelected={this.getRowIDForIndividualCreditLeaves}
                                showCheckbox={false}
                                rowSelection={{
                                  showCheckbox: false,
                                  selectBy: {
                                    indexes: this.state.currentSelectedIndexForIndividualCreditLeaves
                                  }
                                }}
                                enableRowSelect={false}
                              />
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

                          <div className="toggler active">

                            {/* <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title"></h2>
                              <span className="box-filter-arrow" />
                            </div> */}

                            <div className="toggler-content no-padding">
                              <CustomReactTable headerName={'Individually credited leaves'} auditData={this.state.leavesIndividualRows} auditColumns={this.state.leavesIndividualColumns} customWidth={'100%'} noClose pageSize={5} />
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
  console.log(state);
  return {
    masterInfo: state.masterData.currentMasterData,
    leavesData: state.leavesMasterData,
    currentData: state.leavesMasterData.currentData,
    auditData: state.auditTrail.leavesAudit,
    myEmployees: state.employee.myEmployees
  };
}

export default connect(mapStateToProps)(LeavesMasterData);

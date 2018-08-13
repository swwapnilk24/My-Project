/**
 * @file Compensation Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
//import Modal from 'react-responsive-modal';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import SnackBar from 'react-material-snackbar';
// import { Form, Modal, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-responsive-modal/lib/react-responsive-modal.css';
// import Modal from 'react-responsive-modal/lib/css';
import { Link } from 'react-router';
import { updateCompensationData } from '../../actions/EmployeeActions';
import { updateAuditForCompensatonInfo } from '../../actions/AuditActions';
import { updateCompanyInfo } from '../../services/CompanyInfo.service';
import { updateAuditInfo } from '../../services/Audit.service';
import './Compensation.scss';
import CustomModal from './customModal';
import OneTimePaymentModalForm from './oneTimePaymentModalForm';
import RecurringPaymentModalForm from './recurringPaymentModalForm';
import CompensationGroupModalForm from './compensationGroupModalForm';
import CompensationModalForm from './compensationModalForm';
import EmptyRowsView from './EmptyRowsView';
import AuditTable from './AuditTable';

// import DatePickerCustom from '../AddEmployee/DatePickerCustom';


class Compensation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.updateCompensationData = this.updateCompensationData.bind(this);
    // Methods of Grid and Model For compensation
    this.rowGetterForCompensation = this.rowGetterForCompensation.bind(this);
    this.getRowIDForCompensation = this.getRowIDForCompensation.bind(this);
    this.EditOpenForCompensation = this.EditOpenForCompensation.bind(this);
    // this.editCloseForCompensation = this.editCloseForCompensation.bind(this);
    // this.editUpdateForCompensation = this.editUpdateForCompensation.bind(this);
    this.addOpenForCompensation = this.addOpenForCompensation.bind(this);
    this.addCloseForCompensation = this.addCloseForCompensation.bind(this);
    this.SubmitForCompensation = this.SubmitForCompensation.bind(this);
    // Methods of Grid and Model For OneTimePayment
    this.rowGetterForOneTimePayment = this.rowGetterForOneTimePayment.bind(this);
    this.getRowIDForOneTimePayment = this.getRowIDForOneTimePayment.bind(this);
    this.editCloseForOneTimePaymentModalForm = this.editCloseForOneTimePaymentModalForm.bind(this);
    this.editOpenForOneTimePaymentModalForm = this.editOpenForOneTimePaymentModalForm.bind(this);
    this.addOpenForOneTimePaymentModalForm = this.addOpenForOneTimePaymentModalForm.bind(this);
    this.addCloseForOneTimePaymentModalForm = this.addCloseForOneTimePaymentModalForm.bind(this);
    this.addSubmitForOneTimePayment = this.addSubmitForOneTimePayment.bind(this);
    //
    this.rowGetterForRecurringPayment = this.rowGetterForRecurringPayment.bind(this);
    this.getRowIDForRecurringPayment = this.getRowIDForRecurringPayment.bind(this);
    this.editCloseForRecurringPaymentForm = this.editCloseForRecurringPaymentForm.bind(this);
    this.addOpenForRecurringPaymentModalForm = this.addOpenForRecurringPaymentModalForm.bind(this);
    this.editOpenForRecurringPaymentModalForm = this.editOpenForRecurringPaymentModalForm.bind(this);
    this.addSubmitForRecurringPaymentForm = this.addSubmitForRecurringPaymentForm.bind(this);
    //
    this.editCloseForCompensationGroupModalForm = this.editCloseForCompensationGroupModalForm.bind(this);
    this.editOpenForcompensationGrouptModalForm = this.editOpenForcompensationGrouptModalForm.bind(this);
    this.SubmitForCompensationGroup = this.SubmitForCompensationGroup.bind(this);
    this.showHistoryForCompensation = this.showHistoryForCompensation.bind(this);
    this.showHistoryForCompensationGroup = this.showHistoryForCompensationGroup.bind(this);
    this.showHistoryForOneTimePayment = this.showHistoryForOneTimePayment.bind(this);
    this.showHistoryForRecurringPayment = this.showHistoryForRecurringPayment.bind(this);
    this.hideHistoryForCompensation = this.hideHistoryForCompensation.bind(this);
    this.hideHistoryForCompensationGroup = this.hideHistoryForCompensationGroup.bind(this);
    this.hideHistoryForOneTimePayment = this.hideHistoryForOneTimePayment.bind(this);
    this.hideHistoryForRecurringPayment = this.hideHistoryForRecurringPayment.bind(this);
    // console.log('propscomp', props.currentEmployee);
    this.state = {
      scrollPosition: undefined,
      enableScrollPosition: false,
      compensationGridHeight: 35,
      oneTimePaymentGridHeight: 35,
      recurringPaymentGridHeight: 35,
      open: false,
      ShowingForCompensation: false,
      ShowingForOneTimePayment: false,
      ShowingForRecurringPayment: false,
      ShowingForCompensationGroup: false,
      showingHistoryForCompensationGroup: false,
      showingHistoryForCompensation: false,
      showingHistoryForOneTimePayment: false,
      showingHistoryForRecurringPayment: false,
      snackbarForCompensation: true,
      crrentGridDataObjectForCompensation: {},
      currentGridDataObjectForOneTimePayment: {},
      currentGridDataObjectForRecurringPayment: {},
      currentGridDataObjectForCompensationGroup: {},
      currentSelectedIndexForCompensation: [-1],
      currentSelectedIndexForOneTimePayment: [-1],
      currentSelectedIndexForRecurringPayment: [-1],
      columnsForCompensationGrid: [{ key: 'payComponent', name: 'PayComponent', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'markPaymentIsEligibleForEmployee', name: 'Payment Is Eligible For Employee', resizable: true }, { key: 'markTaxDeductionAtSource', name: 'Tax Deduction At Source', resizable: true }, { key: 'socialContributionRelevant', name: 'Social Contribution Relevant', resizable: true }, { key: 'contributionFromEmployee', name: 'Contribution From Employee', resizable: true }, { key: 'markContributionForEmployer', name: 'Contribution From Employer', resizable: true }],
      rowsForCompensationGrid: [],
      columnsForOneTimePaymentGrid: [{ key: 'payComponent', name: 'PayComponent' }, { key: 'amount', name: 'Amount' }, { key: 'currency', name: 'Currency' }, { key: 'paymentDate', name: 'Payment Date' }],
      rowsForOneTimePaymentGrid: [],
      columnsForRecurringPaymentGrid: [{ key: 'payComponent', name: 'PayComponent', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'startDate', name: 'Start Date', resizable: true }, { key: 'endDate', name: 'End Date', resizable: true }, { key: 'markPaymentIsEligibleForEmployee', name: 'Payment Is Eligible For Employee', resizable: true }, { key: 'markTaxDeductionAtSource', name: 'Tax Deduction At Source', resizable: true }, { key: 'socialContributionRelevant', name: 'Social Contribution Relevant', resizable: true }, { key: 'contributionFromEmployee', name: 'Contribution From Employee', resizable: true }, { key: 'markContributionForEmployer', name: 'Contribution From Employer', resizable: true }],
      rowsForRecurringPaymentGrid: [],
      columnsForCompensationTable: [{ accessor: 'payComponent', Header: 'PayComponent' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'frequency', Header: 'Frequency' }, { accessor: 'markPaymentIsEligibleForEmployee', Header: 'Payment Is Eligible For Employee' }, { accessor: 'markTaxDeductionAtSource', Header: 'Tax Deduction At Source' }, { accessor: 'markContributionForEmployer', Header: 'Contribution From Employer' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Date' }, { accessor: 'operation', Header: 'Operation Type' }],
      columnsForCompensationGroupTable: [{ accessor: 'payType', Header: 'Pay Type' }, { accessor: 'payGroup', Header: 'Pay Group' }, { accessor: 'isEligibleForBenefit', Header: 'Is Eligible For BeneFit' }, { accessor: 'isEligibleForCar', Header: 'Is Eligible For Car' }, { accessor: 'benefitRate', Header: 'Benefit Rate' }, { accessor: 'compaRatio', Header: 'Company Ratio' }, { accessor: 'rangePenetration', Header: 'Range Penetration' }, { accessor: 'annualizedSalary', Header: 'Annualized Salary' }, { accessor: 'teo', Header: 'TEO' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Date' }, { accessor: 'operation', Header: 'Operation Type' }],
      columnsForOneTimePaymentTable: [{ accessor: 'payComponent', Header: 'PayComponent' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'paymentDate', Header: 'Payment Date' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Date' }, { accessor: 'operation', Header: 'Operation Type' }],
      columnsForRecurringPaymentTable: [{ accessor: 'payComponent', Header: 'PayComponent' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'startDate', Header: 'Start Date' }, { accessor: 'endDate', Header: 'End Date' }, { accessor: 'markPaymentIsEligibleForEmployee', Header: 'Payment Is Eligible For Employee' }, { accessor: 'markTaxDeductionAtSource', Header: 'Tax Deduction At Source' }, { accessor: 'markContributionForEmployer', Header: 'Contribution From Employer' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Date' }, { accessor: 'operation', Header: 'Operation Type' }],
      formTypeForOneTimePayment: undefined,
      formTypeForRecurringPayment: undefined,
      formTypeForCompensation: undefined,
      syncedWithServer: true,
      benefitRate: '10',
      comparatio: '100.99%',
      rangepenetration: '66.7%',
      anuualSalary: '1000USD',
      TEO: '2200USD',
      amoutn: '100',
      frequency: 'monthly/weekly/yearly',
      startdate: '12/12/12',
      enddate: '12/12/12',
      disable: true,
      disable1: true
    };
  }
  componentDidMount() {
    // const compensationDivElement = document.getElementById('compensation');
    // console.log('foucs', compensationDivElement);
    // compensationDivElement.focus();
    // alert('hey', document.activeElement);
    // check undo
    document.getElementById('snackCompensation').style.display = 'none';
    document.getElementById('snackOneTimePayment').style.display = 'none';
    document.getElementById('snackRecurringPayment').style.display = 'none';
  }
  componentWillReceiveProps(newprops) {
    const dateFormattedDataForOneTimePay = [];
    newprops.currentEmployee.compensationInformation.oneTimePayment.oneTimePayment.map((obj) => {
      // alert("ee");
      const tempObj = {};
      Object.keys(obj).forEach((key) => {
        // const formattedEndDateDay = (inputDate) ? moment().format('DD-MMM-YYYY') : '';
        if (key === 'paymentDate') {
          // console.log('keys', key);
          const formattedEndDateDay = (obj.paymentDate) ? moment(obj.paymentDate).format('DD-MMM-YYYY') : '';
          // console.log('keys', formattedEndDateDay);
          tempObj.paymentDate = formattedEndDateDay;
        } else {
          tempObj[key] = obj[key];
        }
      }
    );
      dateFormattedDataForOneTimePay.push(tempObj);
      // console.log('keys', tempObj);
      return null;
    });
    const dateFormattedDataForRecurringPay = [];
    newprops.currentEmployee.compensationInformation.recurringPayment.recurringPayment.map((obj) => {
      const tempObj = {};
      Object.keys(obj).forEach((key) => {
        if (key === 'startDate') {
          // console.log('keys', key);
          const formattedEndDateDay = (obj.startDate) ? moment(obj.startDate).format('DD-MMM-YYYY') : '';
          // console.log('keys', formattedEndDateDay);
          tempObj.startDate = formattedEndDateDay;
        } else if (key === 'endDate') {
          const formattedEndDateDay = (obj.endDate) ? moment(obj.endDate).format('DD-MMM-YYYY') : '';
          // console.log('keys', formattedEndDateDay);
          tempObj.endDate = formattedEndDateDay;
        } else {
          tempObj[key] = obj[key];
        }
      }
    );
      dateFormattedDataForRecurringPay.push(tempObj);
      // console.log('keys', tempObj);
      return null;
    });
    // console.log('keys', dateFormattedDataForOneTimePay);
    // console.log('newprops', newprops);
    const compensationRows = newprops.currentEmployee.compensationInformation.compensationInformation.compensation.length + 1;
    const oneTimePaymentRows = dateFormattedDataForOneTimePay.length + 1;
    const recurringPaymentRows = dateFormattedDataForRecurringPay.length + 1;
    const finalCompensationRowSize = compensationRows * 35;
    const finalOneTimePaymentRowSize = oneTimePaymentRows * 35;
    const finalRecurringPaymentRowSize = recurringPaymentRows * 35;
    // console.log('norows', compensationRows, oneTimePaymentRows, recurringPaymentRows);
    // console.log('nowrows', finalCompensationRowSize, finalOneTimePaymentRowSize, finalRecurringPaymentRowSize);
    this.setState({ compensationGridHeight: finalCompensationRowSize });
    this.setState({ oneTimePaymentGridHeight: finalOneTimePaymentRowSize });
    this.setState({ recurringPaymentGridHeight: finalRecurringPaymentRowSize });
    const nowRevConfCompensation = [...newprops.currentEmployee.compensationInformation.compensationInformation.compensation];
    this.setState({ rowsForCompensationGrid: nowRevConfCompensation.reverse() });
    this.setState({ rowsForOneTimePaymentGrid: dateFormattedDataForOneTimePay.reverse() });
    this.setState({ rowsForRecurringPaymentGrid: dateFormattedDataForRecurringPay.reverse() });
    this.setState({ currentGridDataObjectForCompensationGroup: newprops.currentEmployee.compensationInformation.compensationInformation.compensationGroup });
    // console.log('recurringRows', this.state.currentGridDataObjectForCompensationGroup, newprops.currentEmployee.compensationInformation.compensationInformation.compensationGroup);
    this.props.auditTrail.compensationInformation.compensationInformation.compensationGroup.map((data, index) => {
      const newData = data;
      const formattedDate = (newData.insertedDate) ? moment(newData.insertedDate).format('DD-MMM-YYYY') : '';
      newData.insertedDate = formattedDate;
      this.props.auditTrail.compensationInformation.compensationInformation.compensationGroup[index] = newData;
      return index;
    });
    this.props.auditTrail.compensationInformation.compensationInformation.compensation.map((data, index) => {
      const newData = data;
      const formattedDate = (newData.insertedDate) ? moment(newData.insertedDate).format('DD-MMM-YYYY') : '';
      newData.insertedDate = formattedDate;
      this.props.auditTrail.compensationInformation.compensationInformation.compensation[index] = newData;
      return index;
    });
    this.props.auditTrail.compensationInformation.oneTimePayment.oneTimePayment.map((data, index) => {
      const newData = data;
      const formattedDate = (newData.insertedDate) ? moment(newData.insertedDate).format('DD-MMM-YYYY') : '';
      newData.insertedDate = formattedDate;
      this.props.auditTrail.compensationInformation.oneTimePayment.oneTimePayment[index] = newData;
      return index;
    });
    this.props.auditTrail.compensationInformation.recurringPayment.recurringPayment.map((data, index) => {
      const newData = data;
      const formattedDate = (newData.insertedDate) ? moment(newData.insertedDate).format('DD-MMM-YYYY') : '';
      newData.insertedDate = formattedDate;
      this.props.auditTrail.compensationInformation.recurringPayment.recurringPayment[index] = newData;
      return index;
    });
  }
  componentDidUpdate() {
    window.scrollTo(0, this.state.scrollPosition);
  // onOpenModal = () => {
  //   this.setState({ open: true });
  // };

  // onCloseModal = () => {
  //   this.setState({ open: false });
  }
  setSyncedWithServer = (value) => {
    // console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  // start :Methods Definitons for Grid and Model For Compensation
  getRowIDForCompensation(data) {
    this.setState({ scrollPosition: window.scrollY });
    // console.log('what data ?', data);
    const vdata = [data.rowIdx];
    this.setState({ currentSelectedIndexForCompensation: vdata });
    // console.log(this.state.rowsForCompensationGrid[data.rowIdx]);
    // this.setState({showing:true});
    const object = this.state.rowsForCompensationGrid[data.rowIdx];
    object.rowNo = data.rowIdx;
    this.setState({ crrentGridDataObjectForCompensation: object });
  }
  getRowIDForOneTimePayment(dataParameter) {
    this.setState({ scrollPosition: window.scrollY });
    // console.log(dataParameter);
    const gridRowIndex = [dataParameter.rowIdx];
    this.setState({ currentSelectedIndexForOneTimePayment: gridRowIndex });
    const temp = this.state.rowsForOneTimePaymentGrid[dataParameter.rowIdx];
    temp.rowNo = dataParameter.rowIdx;
    this.setState({ currentGridDataObjectForOneTimePayment: temp });
  }
  getRowIDForRecurringPayment(dataParameter) {
    this.setState({ scrollPosition: window.scrollY });
    const gridRowIndex = [dataParameter.rowIdx];
    this.setState({ currentSelectedIndexForRecurringPayment: gridRowIndex });
    const temp = this.state.rowsForRecurringPaymentGrid[dataParameter.rowIdx];
    temp.rowNo = dataParameter.rowIdx;
    this.setState({ currentGridDataObjectForRecurringPayment: temp });
  }
  rowGetterForCompensation(parameter) {
    // console.log(parameter);
    return this.state.rowsForCompensationGrid[parameter];
  }
  addOpenForCompensation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ crrentGridDataObjectForCompensation: {} });
    this.setState({ ShowingForCompensation: true });
    this.setState({ formTypeForCompensation: 'add' });
  }
  addCloseForCompensation() {
    this.setState({ currentGridDataObjectForCompensationGroup: {} });
    this.setState({ currentSelectedIndexForCompensation: [-1] });
    this.setState({ ShowingForCompensation: false });
  }
  EditOpenForCompensation() {
    this.setState({ scrollPosition: window.scrollY });
    // console.log('propscomp', this.props.currentEmployee);
    const object = this.state.crrentGridDataObjectForCompensation;
    // console.log(object);
    if (object.currency) {
      this.setState({ ShowingForCompensation: true });
      this.setState({ formTypeForCompensation: 'edit' });
    } else {
      // alert('please select a row ');
      document.getElementById('snackCompensation').style.display = 'block';
      setTimeout(() => {
        document.getElementById('snackCompensation').style.display = 'none';
      }, 2000);
    }
  }
  // editUpdateForCompensation() {
  //   const form = document.forms.compensationInformation_compesation_edit;
  //   const newEditedData = {};
  //   newEditedData.payComponent = form.paycomponent.value;
  //   newEditedData.currency = form.currency.value;
  //   newEditedData.frequency = form.frequency.value;
  //   newEditedData.amount = form.amount.value;
  //   console.log(newEditedData);
  //   console.log(this.state.crrentGridDataObjectForCompensation.rowNo);
  //   const newRows = Object.assign([], this.state.rowsForCompensationGrid);
  //   //console.log(this.state.rows);
  //   newRows[this.state.crrentGridDataObjectForCompensation.rowNo] = newEditedData;
  //   //this.setState({ rows: newEditedData });
  //   console.log(newRows);
  //   this.props.dispatch(updateCompensationData({ newData: newRows, subsection: 'compensation' }));
  //   this.setState({ currentSelectedIndexForCompensation: -1 });
  //   this.setState({ editShowingForCompensation: false });
  //   this.save();
  // }
  SubmitForCompensation(submitData, hiddenType) {
    const newSubmitData = submitData;
    let newRows = Object.assign([], this.state.rowsForCompensationGrid);
    // console.log(submitData, hiddenType);
    if (hiddenType === 'add') {
      newRows.unshift(submitData);
      // console.log(submitData);
      newSubmitData.operation = 'INSERT';
    } else {
      // console.log(this.state.rows);
      newRows[this.state.crrentGridDataObjectForCompensation.rowNo] = submitData;
      // this.setState({ rows: newEditedData });
      // console.log(newRows);
      newSubmitData.operation = 'UPDATE';
      this.setState({ currentSelectedIndexForCompensation: -1 });
    }
    newRows = newRows.reverse();
    this.props.dispatch(updateCompensationData({ newData: newRows, subsection: 'compensation' }));
    this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'compensation' }));
    this.setState({ ShowingForCompensation: false });
    this.save();
    // const form = document.forms.compensationInformation_compesation_add;
    // const newAddedData = {};
    // newAddedData.payComponent = form.paycomponent.value;
    // newAddedData.currency = form.currency.value;
    // newAddedData.frequency = form.frequency.value;
    // newAddedData.amount = form.amount.value;
    // console.log(newAddedData);
    // const newRows = Object.assign([], this.state.rowsForCompensationGrid);
    // newRows.push(newAddedData);
    // console.log(newRows);
    // this.props.dispatch(updateCompensationData({ newData: newRows, subsection: 'compensation' }));
    // this.setState({ addShowingForCompensation: false });
    // this.save();
  }
  // editCloseForCompensation() {
  //   this.setState({ editShowingForCompensation: false });
  //   //console.log(this.state.showing);
  //   this.setState({ currentSelectedIndexForCompensation: -1 });
  // }
  // End :Methods Definitons for Grid and Model For Compensation
  // start
  editCloseForCompensationGroupModalForm() {
    this.setState({ crrentGridDataObjectForCompensation: {} });
    this.setState({ ShowingForCompensationGroup: false });
  }
  editOpenForcompensationGrouptModalForm() {
    this.setState({ ShowingForCompensationGroup: true });
    this.setState({ scrollPosition: window.scrollY });
  }
  SubmitForCompensationGroup(data) {
    // console.log(data, inside paramater should come hiddenType);
    this.props.dispatch(updateCompensationData({ newData: data, subsection: 'compensationGroup' }));
    const newSubmitData = data;
    newSubmitData.operation = 'UPDATE';
    this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'compensationGroup' }));
    this.setState({ ShowingForCompensationGroup: false });
    this.save();
  }
  // End
  // start :Methods Definitons for Grid and Model For OneTimePayment
  editCloseForOneTimePaymentModalForm() {
    this.setState({ currentSelectedIndexForOneTimePayment: -1 });
    this.setState({ currentGridDataObjectForOneTimePayment: {} });
    this.setState({ ShowingForOneTimePayment: false });
  }
  editOpenForOneTimePaymentModalForm() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForOneTimePayment.payComponent) {
      this.setState({ formTypeForOneTimePayment: 'edit' });
      this.setState({ ShowingForOneTimePayment: true });
      // const form = document.forms.oneTimePaymentForm;
      // console.log(form);
    } else {
      // alert('please select a row');
      document.getElementById('snackOneTimePayment').style.display = 'block';
      setTimeout(() => {
        document.getElementById('snackOneTimePayment').style.display = 'none';
      }, 2000);
    }
  }
  addOpenForOneTimePaymentModalForm() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForOneTimePayment: 'add' });
    this.setState({ currentGridDataObjectForOneTimePayment: {} });
    this.setState({ currentSelectedIndexForOneTimePayment: -1 });
    this.setState({ currentGridDataObjectForOneTimePayment: {} });
    this.setState({ ShowingForOneTimePayment: true });
  }
  addCloseForOneTimePaymentModalForm() {
    this.setState({ currentSelectedIndexForOneTimePayment: -1 });
    this.setState({ currentGridDataObjectForOneTimePayment: {} });
    this.setState({ ShowingForOneTimePayment: false });
  }
  addSubmitForOneTimePayment(data, hiddenType) {
    const newSubmitData = data;
    let newRows = Object.assign([], this.state.rowsForOneTimePaymentGrid);
    if (hiddenType === 'add') {
      // console.log(data);
      newRows.unshift(data);
      // console.log(newRows);
      newSubmitData.operation = 'INSERT';
    } else {
      // alert('pending work...');
      newRows[this.state.currentGridDataObjectForOneTimePayment.rowNo] = data;
      // console.log(newRows);
      newSubmitData.operation = 'UPDATE';
      this.setState({ currentSelectedIndexForOneTimePayment: -1 });
    }
    newRows = newRows.reverse();
    this.props.dispatch(updateCompensationData({ newData: newRows, subsection: 'oneTimePayment' }));
    this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'oneTimePayment' }));
    this.setState({ currentGridDataObjectForOneTimePayment: {} });
    this.setState({ ShowingForOneTimePayment: false });
    this.save();
  }
  rowGetterForOneTimePayment(index) {
    return this.state.rowsForOneTimePaymentGrid[index];
  }
  mapDropDownValue(obj, helpArray) {
    console.log('help Array', obj, helpArray);
  }
  // End :Methods Definitons for Grid and Model For OneTimePayment
  // start :Methods Definitons for Grid and Model For Recurring Payment
  rowGetterForRecurringPayment(index) {
    // console.log('recurringRows', this.state.rowsForRecurringPaymentGrid);
    console.log('show data', this.state.rowsForRecurringPaymentGrid[index]);
    const helpArray = [];
    const payComponentHelp = {};
    payComponentHelp.masterDataref = 'payComponent';
    payComponentHelp.keyRef = 'pay component';
    helpArray.push(payComponentHelp);
    this.mapDropDownValue(this.state.rowsForRecurringPaymentGrid[index], helpArray);
    return this.state.rowsForRecurringPaymentGrid[index];
  }
  addOpenForRecurringPaymentModalForm() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForRecurringPayment: 'add' });
    this.setState({ currentGridDataObjectForRecurringPayment: {} });
    this.setState({ ShowingForRecurringPayment: true });
  }
  editOpenForRecurringPaymentModalForm() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForRecurringPayment.payComponent) {
      this.setState({ formTypeForRecurringPayment: 'edit' });
      this.setState({ ShowingForRecurringPayment: true });
    } else {
      // alert('select a row first');
      document.getElementById('snackRecurringPayment').style.display = 'block';
      setTimeout(() => {
        document.getElementById('snackRecurringPayment').style.display = 'none';
      }, 2000);
    }
  }
  editCloseForRecurringPaymentForm() {
    this.setState({ ShowingForRecurringPayment: false });
  }
  addSubmitForRecurringPaymentForm(data, hiddenType) {
    const newSubmitData = data;
    let newRows = Object.assign([], this.state.rowsForRecurringPaymentGrid);
    // console.log(data, hiddenType);
    if (hiddenType === 'add') {
      // console.log(data);
      newRows.unshift(data);
      // console.log(newRows);
      newSubmitData.operation = 'INSERT';
    } else {
      newRows[this.state.currentGridDataObjectForRecurringPayment.rowNo] = data;
     // console.log(newRows);
      newSubmitData.operation = 'UPDATE';
    }
    newRows = newRows.reverse();
    this.props.dispatch(updateCompensationData({ newData: newRows, subsection: 'recurringPayment' }));
    this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'recurringPayment' }));
    this.setState({ currentSelectedIndexForRecurringPayment: -1 });
    this.setState({ currentGridDataObjectForRecurringPayment: {} });
    this.setState({ ShowingForRecurringPayment: false });
    this.save();
  }
  // End :Methods Definitons for Grid and Model For Recurring Payment
  updateCompensationData = (data) => {
    this.setSyncedWithServer(false);
    // console.log(data.target.name);
    // console.log(data.target.value);
    this.props.dispatch(
      updateCompensationData(
        { value: data.target.value, field: data.target.name }
      )
    );
    this.save();
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'compensation') {
      const y = document.getElementById('compensationToggle');
      y.classList.toggle('actionDisable');
      // console.log(y);
    }
    if (elementID === 'oneTimePayment') {
      const z = document.getElementById('oneTimePaymentToggle');
      z.classList.toggle('actionDisable');
      // console.log(z);
    }
    if (elementID === 'recuringDeductionPayment') {
      const w = document.getElementById('recuringDeductionPaymentToggle');
      w.classList.toggle('actionDisable');
    }
    if (elementID === 'compensationGroup') {
      const u = document.getElementById('compensationGroupToggle');
      u.classList.toggle('actionDisable');
    }
  }
  save() {
    // console.log('saving the employee data');
    // console.log({ companyInfo: this.props.companyInfo });
    updateCompanyInfo({ employee: this.props.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    updateAuditInfo({ employee: this.props.auditTrail }, this.props.dispatch);
  }
  bindDataToDropDownList(masterData, fields) {
    const field = fields;
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
  dateFormatter(inputDate) {
    const formattedEndDateDay = (inputDate)
    ? moment(inputDate).format('DD-MMM-YYYY')
    : '';
    return formattedEndDateDay;
  }
  showHistoryForCompensationGroup() {
    this.setState({ showingHistoryForCompensationGroup: true });
    this.setState({ scrollPosition: window.scrollY });
  }
  showHistoryForCompensation() {
    this.setState({ showingHistoryForCompensation: true });
    this.setState({ scrollPosition: window.scrollY });
  }
  showHistoryForOneTimePayment() {
    this.setState({ showingHistoryForOneTimePayment: true });
    this.setState({ scrollPosition: window.scrollY });
  }
  showHistoryForRecurringPayment() {
    this.setState({ showingHistoryForRecurringPayment: true });
    this.setState({ scrollPosition: window.scrollY });
  }
  hideHistoryForCompensationGroup() {
    this.setState({ showingHistoryForCompensationGroup: false });
    this.setState({ scrollPosition: window.scrollY });
  }
  hideHistoryForCompensation() {
    this.setState({ showingHistoryForCompensation: false });
    this.setState({ scrollPosition: window.scrollY });
  }
  hideHistoryForOneTimePayment() {
    this.setState({ showingHistoryForOneTimePayment: false });
    this.setState({ scrollPosition: window.scrollY });
  }
  hideHistoryForRecurringPayment() {
    this.setState({ showingHistoryForRecurringPayment: false });
    this.setState({ scrollPosition: window.scrollY });
  }
  render() {
  //  const { open } = this.state;
    const snackbarStyle = {
      position: 'relative',
      background: '#404040',
      color: '#fff',
      padding: '4px',
      WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      fontWeight: '500',
      textTransform: 'initial',
      willChange: 'transform',
      whiteSpace: 'nowrap',
      transform: 'translateY(20px)',
      WebkitTransform: 'translateY(20px)',
      boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
      fontSize: '4px',
      opacity: 0,
      borderRadius: '3px',
      display: '-webkit-box, -ms-flexbox, flex',
      // display: '-ms-flexbox',
      // display: 'flex',
      WebkitBoxAlign: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxPack: 'justify',
      msFlexPack: 'justify',
      justifyContent: 'space-between',
      lineHeight: '8px'
    };
    return (
      <div className="container">
        <div className="row row--panel">
          <div className="col-xs-12 col-md-12 col-lg-3">
            {/* <div>
              <button onClick={this.onOpenModal}>Open modal</button>
              <Modal open={open} onClose={this.onCloseModal} little>
                <h2>Simple centered modal</h2>
                <div className="modalContent">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a nisl volutpat, feugiat neque id, consectetur ante. Etiam eget nunc tincidunt, venenatis orci porta, pulvinar enim. Quisque semper felis sit amet maximus gravida. Nam interdum molestie facilisis. Etiam vel nunc nisl. Suspendisse imperdiet pretium ipsum, ut aliquam diam pellentesque nec. Donec scelerisque, massa at finibus luctus, eros leo dapibus urna, id scelerisque lorem velit sed purus. Aliquam porttitor consectetur leo sit amet porta. Nunc euismod leo vitae nisi interdum ullamcorper. Nulla pharetra odio ut auctor egestas. Fusce semper aliquet enim, ut vehicula metus suscipit quis.

Etiam at luctus neque. Nam urna ante, aliquet sit amet turpis a, euismod semper eros. Etiam quis sagittis nulla, tincidunt lacinia felis. Quisque metus eros, suscipit eget dolor in, aliquet aliquam turpis. Nullam sagittis quis magna a feugiat. Vestibulum convallis pellentesque mollis. Suspendisse dapibus justo in ligula tempus, at consectetur sem placerat. Etiam quis purus vulputate, porttitor nulla sed, lobortis erat.

Vivamus sit amet urna ligula. Cras a nunc nibh. Sed gravida nibh id felis vehicula congue. Phasellus pretium lacus ut nunc vestibulum ultrices. Sed consequat viverra mauris, at dignissim leo sollicitudin ac. Praesent eleifend dapibus neque, ut eleifend eros tincidunt ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam condimentum dui neque, id egestas purus posuere id. Cras ut lacus eget nibh malesuada dapibus eu vitae est. Aliquam nec dolor dictum, volutpat tellus id, congue magna. Suspendisse mauris metus, pretium eu commodo tristique, bibendum sit amet est. Duis viverra nisl metus, a pulvinar purus sodales vitae. Suspendisse aliquet neque et eros imperdiet pellentesque. Praesent at laoreet orci. Maecenas lacinia justo felis, interdum aliquam enim gravida ut.

Nullam vel velit viverra, auctor neque vel, suscipit turpis. Aliquam tempus velit turpis, sit amet dictum leo congue eget. Proin mollis consequat dui sed aliquam. Vivamus sagittis nisl elit, eget dapibus enim vehicula et. Integer ut vulputate magna. Vivamus non laoreet est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac dictum magna, a gravida mi. Nulla risus ipsum, dapibus nec ultricies nec, cursus a elit. Nunc molestie mauris in ultricies consectetur. Ut eget rutrum urna. Duis semper leo turpis, a iaculis massa pharetra non. Nam metus quam, luctus nec mollis at, mollis rhoncus magna. Vestibulum interdum massa nisl, id porttitor arcu porta non.

Donec in nunc vitae neque ullamcorper rhoncus. Sed in est pulvinar neque sollicitudin iaculis. Aenean id suscipit enim, sed varius ex. Ut diam massa, congue vitae pulvinar vitae, laoreet non lorem. Fusce a vulputate neque, sit amet viverra diam. Nullam vitae odio vitae lectus sodales vestibulum quis vitae ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum neque nisl, eu eleifend tellus pretium a. Donec lobortis, leo ut egestas tristique, ipsum ante egestas nisi, at fermentum risus mi id purus. Sed at ornare felis. Quisque tincidunt ex sit amet neque suscipit pharetra. Fusce pellentesque turpis ut mollis placerat. Mauris congue scelerisque ligula, vitae tincidunt leo vehicula non.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a nisl volutpat, feugiat neque id, consectetur ante. Etiam eget nunc tincidunt, venenatis orci porta, pulvinar enim. Quisque semper felis sit amet maximus gravida. Nam interdum molestie facilisis. Etiam vel nunc nisl. Suspendisse imperdiet pretium ipsum, ut aliquam diam pellentesque nec. Donec scelerisque, massa at finibus luctus, eros leo dapibus urna, id scelerisque lorem velit sed purus. Aliquam porttitor consectetur leo sit amet porta. Nunc euismod leo vitae nisi interdum ullamcorper. Nulla pharetra odio ut auctor egestas. Fusce semper aliquet enim, ut vehicula metus suscipit quis.

Etiam at luctus neque. Nam urna ante, aliquet sit amet turpis a, euismod semper eros. Etiam quis sagittis nulla, tincidunt lacinia felis. Quisque metus eros, suscipit eget dolor in, aliquet aliquam turpis. Nullam sagittis quis magna a feugiat. Vestibulum convallis pellentesque mollis. Suspendisse dapibus justo in ligula tempus, at consectetur sem placerat. Etiam quis purus vulputate, porttitor nulla sed, lobortis erat.

Vivamus sit amet urna ligula. Cras a nunc nibh. Sed gravida nibh id felis vehicula congue. Phasellus pretium lacus ut nunc vestibulum ultrices. Sed consequat viverra mauris, at dignissim leo sollicitudin ac. Praesent eleifend dapibus neque, ut eleifend eros tincidunt ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam condimentum dui neque, id egestas purus posuere id. Cras ut lacus eget nibh malesuada dapibus eu vitae est. Aliquam nec dolor dictum, volutpat tellus id, congue magna. Suspendisse mauris metus, pretium eu commodo tristique, bibendum sit amet est. Duis viverra nisl metus, a pulvinar purus sodales vitae. Suspendisse aliquet neque et eros imperdiet pellentesque. Praesent at laoreet orci. Maecenas lacinia justo felis, interdum aliquam enim gravida ut.

Nullam vel velit viverra, auctor neque vel, suscipit turpis. Aliquam tempus velit turpis, sit amet dictum leo congue eget. Proin mollis consequat dui sed aliquam. Vivamus sagittis nisl elit, eget dapibus enim vehicula et. Integer ut vulputate magna. Vivamus non laoreet est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac dictum magna, a gravida mi. Nulla risus ipsum, dapibus nec ultricies nec, cursus a elit. Nunc molestie mauris in ultricies consectetur. Ut eget rutrum urna. Duis semper leo turpis, a iaculis massa pharetra non. Nam metus quam, luctus nec mollis at, mollis rhoncus magna. Vestibulum interdum massa nisl, id porttitor arcu porta non.

Donec in nunc vitae neque ullamcorper rhoncus. Sed in est pulvinar neque sollicitudin iaculis. Aenean id suscipit enim, sed varius ex. Ut diam massa, congue vitae pulvinar vitae, laoreet non lorem. Fusce a vulputate neque, sit amet viverra diam. Nullam vitae odio vitae lectus sodales vestibulum quis vitae ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum neque nisl, eu eleifend tellus pretium a. Donec lobortis, leo ut egestas tristique, ipsum ante egestas nisi, at fermentum risus mi id purus. Sed at ornare felis. Quisque tincidunt ex sit amet neque suscipit pharetra. Fusce pellentesque turpis ut mollis placerat. Mauris congue scelerisque ligula, vitae tincidunt leo vehicula non.
                  </div>
              </Modal>
            </div> */}
            <div className="panel key">
              <div className="key-icon">
                <img src="/assets/images/icons/key-money.svg" alt="" />
              </div>

              <div className="key-data">

                <div className="key-title">Salary</div>
                <div className="key-value key-value--salary">{ this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.annualizedSalary }</div>

              </div>

              <div className="panel-edit" id="salary" onClick={() => this.toggleElement('salary')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li className="panel-edit-item js-panel-item active" data-keytitle="Salary" data-keyvalue="10 000">Change to salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Base salary" data-keyvalue="2500">Change to base salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Hourly salary" data-keyvalue="25">Change to hourly salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP low" data-keyvalue="1220">Change to MRP low</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP" data-keyvalue="1900">Change to MRP</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP high" data-keyvalue="2250">Change to MRP high</li>
                </ul>

              </div>

            </div>

          </div>

          <div className="col-xs-12 col-md-12 col-lg-3">

            <div className="panel key">

              <div className="key-icon">
                <img src="/assets/images/icons/key-goal.svg" alt="" />
              </div>

              <div className="key-data">

                <div className="key-title">Target total</div>
                <div className="key-value key-value--bonus">{ this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.teo}</div>

              </div>

              <div className="panel-edit" id="targetTotal" onClick={() => this.toggleElement('targetTotal')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li className="panel-edit-item js-panel-item active" data-keytitle="Salary" data-keyvalue="10 000">Change to salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Base salary" data-keyvalue="2500">Change to base salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Hourly salary" data-keyvalue="25">Change to hourly salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP low" data-keyvalue="1220">Change to MRP low</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP" data-keyvalue="1900">Change to MRP</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP high" data-keyvalue="2250">Change to MRP high</li>
                </ul>

              </div>

            </div>

          </div>

          <div className="col-xs-12 col-md-12 col-lg-3">

            <div className="panel key">

              <div className="key-icon">
                <img src="/assets/images/icons/key-docs.svg" alt="" />
              </div>

              <div className="key-data">

                <div className="key-title">Planwork time</div>
                <div className="key-value key-value--docs">12</div>

              </div>

              <div className="panel-edit" id="planworkTime" onClick={() => this.toggleElement('planworkTime')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li className="panel-edit-item js-panel-item active" data-keytitle="Salary" data-keyvalue="10 000">Change to salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Base salary" data-keyvalue="2500">Change to base salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Hourly salary" data-keyvalue="25">Change to hourly salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP low" data-keyvalue="1220">Change to MRP low</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP" data-keyvalue="1900">Change to MRP</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP high" data-keyvalue="2250">Change to MRP high</li>
                </ul>

              </div>

            </div>

          </div>

          <div className="col-xs-12 col-md-12 col-lg-3">

            <div className="panel key">

              <div className="key-icon">
                <img src="/assets/images/icons/key-docs.svg" alt="" />
              </div>

              <div className="key-data">

                <div className="key-title">Company ratio</div>
                <div className="key-value key-value--docs">{this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.compaRatio}</div>

              </div>

              <div className="panel-edit" id="companyRatio" onClick={() => this.toggleElement('companyRatio')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li className="panel-edit-item js-panel-item active" data-keytitle="Salary" data-keyvalue="10 000">Change to salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Base salary" data-keyvalue="2500">Change to base salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="Hourly salary" data-keyvalue="25">Change to hourly salary</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP low" data-keyvalue="1220">Change to MRP low</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP" data-keyvalue="1900">Change to MRP</li>
                  <li className="panel-edit-item js-panel-item" data-keytitle="MRP high" data-keyvalue="2250">Change to MRP high</li>
                </ul>

              </div>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-xs-12">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.5 38.5">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <polygon
                            points="0 0 0 38.5 38.5 38.5 38.5 36 34.5 36 34.5 12 32 12 32 36 26.5 36 26.5 16 24 16 24 36 18.5 36 18.5 20 16 20 16 36 10.5 36 10.5 24 8 24 8 36 2.5 36 2.5 0 0 0"
                            fill="#f4f7fa"
                          />
                          <polygon points="24 4.27 24 8.5 26.5 8.5 26.5 0 18 0 18 2.5 22.23 2.5 10.29 14.44 12.06 16.2 24 4.27" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Compensation Information</h2>
                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="compensationGroup">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            <h2 className="toggler-title">Compensation Group</h2>
                            <div id="compensationGroupToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.editOpenForcompensationGrouptModalForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i title="History" onClick={this.showHistoryForCompensationGroup} className="fas fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICG000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('compensationGroup')} />
                          </div>

                          <div className="toggler-content">

                            <table className="table table--stripes">
                              <tbody>
                                <tr className="table-left-align">
                                  <td>
                                    <span className="table-label">Pay Type</span>
                                  </td>
                                  <td>
                                    <select id="payType" name="compensationInformation.compensationInformation.compensationGroup.payType" value={this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.payType} className="custom-select" >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'PAY TYPE')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Pay Group</span>
                                  </td>
                                  <td>
                                    <select id="payGroup" name="compensationInformation.compensationInformation.compensationGroup.payGroup" value={this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.payGroup} className="custom-select" >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'PAY GROUP')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Is Eligible For Benefit</span>
                                  </td>
                                  <td>
                                    <select id="isEligibleForBenefit" name="compensationInformation.compensationInformation.compensationGroup.isEligibleForBenefit" value={this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForBenefit} className="custom-select" >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'IS ELIGIBLE FOR BENEFIT')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Is Eligible For Car</span>
                                  </td>
                                  <td>
                                    <select id="isEligibleForCar" name="compensationInformation.compensationInformation.compensationGroup.isEligibleForCar" value={this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForCar} className="custom-select" >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'IS ELIGIBLE FOR CAR')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Benefit Rate</span>
                                  </td>
                                  <td id="benefitRate">{ this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.benefitRate }</td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Compa Ratio</span>
                                  </td>
                                  <td id="comapnyRatioCompensationGroup" >{this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.compaRatio}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Range Penetration</span>
                                  </td>
                                  <td id="rangePenetration" >{ this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.rangePenetration }</td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">AnnualizedSalary (AnnualizedSalary)</span>
                                  </td>
                                  <td id="annualizedSalary" >{ this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.annualizedSalary }</td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="table-label">Total Earning Opportunity (TEO)</span>
                                  </td>
                                  <td id="teo" >{ this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.teo }</td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                          <div>
                            <CustomModal Form={<CompensationGroupModalForm formType={this.state.formTypeForCompensation} data={this.state.currentGridDataObjectForCompensationGroup} closeEvent={this.editCloseForCompensationGroupModalForm} submitEvent={this.SubmitForCompensationGroup} />} show={this.state.ShowingForCompensationGroup} />
                            <CustomModal Form={<AuditTable headerName="Compesnaton Group Audit" auditData={this.props.auditTrail.compensationInformation.compensationInformation.compensationGroup} auditColumns={this.state.columnsForCompensationGroupTable} close={this.hideHistoryForCompensationGroup} />} show={this.state.showingHistoryForCompensationGroup} />
                          </div>

                          {/* <div className="salary-block">
                            <img src="../../assets/sample.png" alt="" />
                          </div> */}

                        </div>

                        {/* <div className="toggler active" id="compensation">

                          <div className="toggler-bar js-toggler-bar" >
                            <h2 className="toggler-title">Compensation</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fa fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i title="History" className="fa fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('compensation')} />
                          </div>

                          <div className="toggler-content padding" >
                            <div className="grid-wrapper" >
                              <ReactDataGrid
                                minHeight={this.state.compensationGridHeight}
                                columns={this.state.columnsForCompensationGrid}
                                rowGetter={this.rowGetterForCompensation}
                                rowsCount={this.state.rowsForCompensationGrid.length}
                                enableCellSelect
                                onCellSelected={this.getRowIDForCompensation}
                                showCheckbox={false}
                                emptyRowsView={EmptyRowsView}
                                rowSelection={{
                                  showCheckbox: false,
                                  selectBy: {
                                    indexes: this.state.currentSelectedIndexForCompensation
                                  }
                                }}
                                enableRowSelect={false}
                              />
                            </div>
                          </div>
                          <div>
                            <CustomModal Form={<CompensationModalForm formType={this.state.formTypeForCompensation} data={this.state.crrentGridDataObjectForCompensation} closeEvent={this.addCloseForCompensation} submitEvent={this.SubmitForCompensation} />} show={this.state.ShowingForCompensation} />
                          </div>

                        </div> */}

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
                      <div className="toggler active" id="compensation">

                        <div className="toggler-bar js-toggler-bar" >
                          <h2 className="toggler-title">Compensation</h2>
                          <div id="compensationToggle" className="actionEnable" >
                            <ul className="box-actions" >
                              <li>
                                <a onClick={this.addOpenForCompensation}>
                                  <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                </a>
                              </li>
                              <li>
                                <a onClick={this.EditOpenForCompensation}>
                                  <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                </a>
                              </li>
                              <li>
                                <a>
                                  <i title="History" onClick={this.showHistoryForCompensation} className="fas fa-history historyIco" aria-hidden="true" />
                                </a>
                              </li>
                              <li>
                                <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                  <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <span className="box-filter-arrow" onClick={() => this.toggleElement('compensation')} />
                        </div>

                        <div className="toggler-content" >
                          <div className="grid-wrapper" >
                            <div className="form-group snackBar" id="snackCompensation" >
                              <SnackBar
                                show={this.state.snackbarForCompensation}
                                timer={6000}
                                style={snackbarStyle}
                                className="form-group"
                              >
                                <p>please select a row</p>
                              </SnackBar>
                            </div>
                            <ReactDataGrid
                              minHeight={this.state.compensationGridHeight}
                              columns={this.state.columnsForCompensationGrid}
                              rowGetter={this.rowGetterForCompensation}
                              rowsCount={this.state.rowsForCompensationGrid.length}
                              enableCellSelect
                              onCellSelected={this.getRowIDForCompensation}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForCompensation
                                }
                              }}
                              enableRowSelect={false}
                            />
                          </div>
                        </div>
                        <div>
                          <CustomModal Form={<CompensationModalForm formType={this.state.formTypeForCompensation} data={this.state.crrentGridDataObjectForCompensation} closeEvent={this.addCloseForCompensation} submitEvent={this.SubmitForCompensation} />} show={this.state.ShowingForCompensation} />
                          <CustomModal Form={<AuditTable headerName="Compesnaton Audit" auditData={this.props.auditTrail.compensationInformation.compensationInformation.compensation} auditColumns={this.state.columnsForCompensationTable} close={this.hideHistoryForCompensation} />} show={this.state.showingHistoryForCompensation} />
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.99 37.97">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path
                            d="M24.39.85a3.08,3.08,0,0,0-4.24,0L7,14H3a3,3,0,0,0-3,3V35a3,3,0,0,0,3,3H31a3,3,0,0,0,3-3v-14l3.12-3.12a3,3,0,0,0,0-4.24h0ZM2,16H32V28H2ZM32,36H2V30H32Zm5.18-19.51L36.11,16l-1.78,1.79-.47-1.63a2.8,2.8,0,0,0-.13-.39l-.47-1.05-1-.47A3,3,0,0,0,31,14H9.85L22.26,1.56Z"
                            fill="#f4f7fa"
                          />
                          <rect x="6.98" y="20.97" width="6" height="4" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">One Time Payment</h2>
                </li>

              </ul> */}

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="oneTimePayment">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.99 37.97">
                                <g id="Warstwa_2" data-name="Warstwa 2">
                                  <g id="dashboard">
                                    <path
                                      d="M24.39.85a3.08,3.08,0,0,0-4.24,0L7,14H3a3,3,0,0,0-3,3V35a3,3,0,0,0,3,3H31a3,3,0,0,0,3-3v-14l3.12-3.12a3,3,0,0,0,0-4.24h0ZM2,16H32V28H2ZM32,36H2V30H32Zm5.18-19.51L36.11,16l-1.78,1.79-.47-1.63a2.8,2.8,0,0,0-.13-.39l-.47-1.05-1-.47A3,3,0,0,0,31,14H9.85L22.26,1.56Z"
                                      fill="#3487CA"
                                    />
                                    <rect x="6.98" y="20.97" width="6" height="4" fill="#3487CA" />
                                  </g>
                                </g>
                              </svg>
                            </div>
                            {/* <h2 className="box-title">One Time Payment</h2> */}
                            <h2 className="toggler-title margin-left">One Time Payment</h2>
                            <div id="oneTimePaymentToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForOneTimePaymentModalForm}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.editOpenForOneTimePaymentModalForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i title="History" onClick={this.showHistoryForOneTimePayment} className="fas fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSOPOP000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('oneTimePayment')} />
                          </div>

                          <div className="toggler-content">
                            <div className="form-group snackBar" id="snackOneTimePayment" >
                              <SnackBar
                                show={this.state.snackbarForCompensation}
                                timer={6000}
                                style={snackbarStyle}
                                className="form-group"
                              >
                                <p>please select a row</p>
                              </SnackBar>
                            </div>
                            <ReactDataGrid
                              columns={this.state.columnsForOneTimePaymentGrid}
                              rowGetter={this.rowGetterForOneTimePayment}
                              rowsCount={this.state.rowsForOneTimePaymentGrid.length}
                              minHeight={this.state.oneTimePaymentGridHeight}
                              enableCellSelect
                              onCellSelected={this.getRowIDForOneTimePayment}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForOneTimePayment
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal Form={<OneTimePaymentModalForm formType={this.state.formTypeForOneTimePayment} data={this.state.currentGridDataObjectForOneTimePayment} closeEvent={this.editCloseForOneTimePaymentModalForm} submitEvent={this.addSubmitForOneTimePayment} />} show={this.state.ShowingForOneTimePayment} />
                            <CustomModal Form={<AuditTable headerName="One Time Payment Audit" auditData={this.props.auditTrail.compensationInformation.oneTimePayment.oneTimePayment} auditColumns={this.state.columnsForOneTimePaymentTable} close={this.hideHistoryForOneTimePayment} />} show={this.state.showingHistoryForOneTimePayment} />
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#f4f7fa" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#f4f7fa" /></g></g></svg>
                  </div>
                  <h2 className="box-title">Recurring Deduction / Payment</h2>
                </li>

              </ul> */}

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="recuringDeductionPayment">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div>
                            <h2 className="toggler-title margin-left">Recurring Deduction / Payment</h2>
                            <div id="recuringDeductionPaymentToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForRecurringPaymentModalForm}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.editOpenForRecurringPaymentModalForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i title="History" onClick={this.showHistoryForRecurringPayment} className="fas fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSRPRP000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('recuringDeductionPayment')} />
                          </div>

                          <div className="toggler-content">
                            <div className="form-group snackBar" id="snackRecurringPayment" >
                              <SnackBar
                                show={this.state.snackbarForCompensation}
                                timer={6000}
                                style={snackbarStyle}
                                className="form-group"
                              >
                                please select a row
                              </SnackBar>
                            </div>
                            <ReactDataGrid
                              columns={this.state.columnsForRecurringPaymentGrid}
                              rowGetter={this.rowGetterForRecurringPayment}
                              rowsCount={this.state.rowsForRecurringPaymentGrid.length}
                              minHeight={this.state.recurringPaymentGridHeight}
                              enableCellSelect
                              onCellSelected={this.getRowIDForRecurringPayment}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForRecurringPayment
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal Form={<RecurringPaymentModalForm formType={this.state.formTypeForRecurringPayment} data={this.state.currentGridDataObjectForRecurringPayment} closeEvent={this.editCloseForRecurringPaymentForm} submitEvent={this.addSubmitForRecurringPaymentForm} />} show={this.state.ShowingForRecurringPayment} />
                            <CustomModal Form={<AuditTable headerName="Recurring Payment Audit" auditData={this.props.auditTrail.compensationInformation.recurringPayment.recurringPayment} auditColumns={this.state.columnsForRecurringPaymentTable} close={this.hideHistoryForRecurringPayment} />} show={this.state.showingHistoryForRecurringPayment} />
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
  // console.log(state.masterData.currentMasterData);
  // console.log('hiii welocme again');
  return { currentEmployee: state.employee.currentEmployee, masterInfo: state.masterData.currentMasterData, auditTrail: state.auditTrail.currentEmployee };
}
export default connect(mapStateToProps)(Compensation);

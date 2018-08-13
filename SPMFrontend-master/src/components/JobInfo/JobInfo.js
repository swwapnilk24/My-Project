/**
 * @file JobInfo Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import './JobInfo.scss';
import { updateJobInfoData } from '../../actions/EmployeeActions';
import { insertIntoAudit } from '../../actions/AuditActions';
import { updateCompanyInfo } from '../../services/CompanyInfo.service';
import { updateAuditInfo } from '../../services/Audit.service';
import CustomModal from './CustomModal';
import CustomSnackBar from './CustomSnackBar';
import ExpandableModal from './ExpandableModal';
import KeyJobAttribute from './KeyJobAttributeForm';
import OrganisationalInformation from './OrganisationalInformationForm';
import JobInformation from './JobInformationForm';
import TimeInformation from './TimeInformationForm';
import JobRelationships from './JobRelationshipsForm';
import EmploymentDetails from './EmploymentDetailsForm';
import CountrySpecific from './CountrySpecificFieldsForm';
import CustomReactTable from './CustomReactTable';
import AuthorizedComponent from '../Routes/AuthorizedComponent';

class JobInfo extends AuthorizedComponent {
  constructor(props) {
    super(props);
    // Row Getters for react-data-grid
    this.rowGetterForKeyJobAttribute = this.rowGetterForKeyJobAttribute.bind(this);
    this.rowGetterForOrganizationalInfo = this.rowGetterForOrganizationalInfo.bind(this);
    this.rowGetterForJobInformation = this.rowGetterForJobInformation.bind(this);
    this.rowGetterForJobRelationships = this.rowGetterForJobRelationships.bind(this);
    // Methods to get selected row details (react-data-grid)
    // this.getRowIDForKeyJobAttribute = this.getRowIDForKeyJobAttribute.bind(this);
    this.getRowIDForOrganizationalInfo = this.getRowIDForOrganizationalInfo.bind(this);
    this.getRowIDForJobInformation = this.getRowIDForJobInformation.bind(this);
    this.getRowIDForJobRelationships = this.getRowIDForJobRelationships.bind(this);
    // Methods to open form for adding new info
    // this.addKeyJobAttributes = this.addKeyJobAttributes.bind(this);
    this.addOrgInformation = this.addOrgInformation.bind(this);
    this.addJobInformation = this.addJobInformation.bind(this);
    this.addJobRelationships = this.addJobRelationships.bind(this);
    // Methods to open form for editing current info
    this.editKeyJobAttributes = this.editKeyJobAttributes.bind(this);
    this.editOrgInformation = this.editOrgInformation.bind(this);
    this.editJobInformation = this.editJobInformation.bind(this);
    this.editTimeInformation = this.editTimeInformation.bind(this);
    this.editJobRelationships = this.editJobRelationships.bind(this);
    this.editEmploymentDetails = this.editEmploymentDetails.bind(this);
    this.editCountrySpecificFields = this.editCountrySpecificFields.bind(this);
    // Mehtods to open expandable Modal
    this.expandJobInfoModal = this.expandJobInfoModal.bind(this);
    this.expandOrgInfoModal = this.expandOrgInfoModal.bind(this);
    // Methods to open Audit Modal
    this.openKJAAudit = this.openKJAAudit.bind(this);
    this.openOrgInfoAudit = this.openOrgInfoAudit.bind(this);
    this.openJobInfoAudit = this.openJobInfoAudit.bind(this);
    this.openTimeInfoAudit = this.openTimeInfoAudit.bind(this);
    this.openCountrySpecificAudit = this.openCountrySpecificAudit.bind(this);
    this.openJobRelationshipsAudit = this.openJobRelationshipsAudit.bind(this);
    this.openEmpDetailsAudit = this.openEmpDetailsAudit.bind(this);
    // Methods to submit add/edit form
    this.submitKeyJobAttributesForm = this.submitKeyJobAttributesForm.bind(this);
    this.submitJobInformationForm = this.submitJobInformationForm.bind(this);
    this.submitOrgInformationForm = this.submitOrgInformationForm.bind(this);
    this.submitTimeInformationForm = this.submitTimeInformationForm.bind(this);
    this.submitCountrySpecificFieldsForm = this.submitCountrySpecificFieldsForm.bind(this);
    this.submitJobRelationshipsForm = this.submitJobRelationshipsForm.bind(this);
    this.submitEmploymentDetailsForm = this.submitEmploymentDetailsForm.bind(this);
    // Methods to close form Modal
    this.closeKeyJobAttributesForm = this.closeKeyJobAttributesForm.bind(this);
    this.closeOrgInformationForm = this.closeOrgInformationForm.bind(this);
    this.closeJobInformationForm = this.closeJobInformationForm.bind(this);
    this.closeTimeInformationForm = this.closeTimeInformationForm.bind(this);
    this.closeCountrySpecificForm = this.closeCountrySpecificForm.bind(this);
    this.closeJobRelationshipsForm = this.closeJobRelationshipsForm.bind(this);
    this.closeEmploymentDetailsForm = this.closeEmploymentDetailsForm.bind(this);
    // Methods to close Audit Modal
    this.closeKJAAudit = this.closeKJAAudit.bind(this);
    this.closeOrgInfoAudit = this.closeOrgInfoAudit.bind(this);
    this.closeJobInfoAudit = this.closeJobInfoAudit.bind(this);
    this.closeTimeInfoAudit = this.closeTimeInfoAudit.bind(this);
    this.closeCountrySpecificAudit = this.closeCountrySpecificAudit.bind(this);
    this.closeJobRelationshipsAudit = this.closeJobRelationshipsAudit.bind(this);
    this.closeEmpDetailsAudit = this.closeEmpDetailsAudit.bind(this);
    // Mehtods to collapse expandable modal
    this.collapseJobInfo = this.collapseJobInfo.bind(this);
    this.collapseOrgInfo = this.collapseOrgInfo.bind(this);
    this.state = {
      syncedWithServer: undefined,
      scrollPosition: undefined,
      // To capture the selected row in react-data-grid (initially -1 since no row is selected)
      currentSelectedIndexForKeyJobAttribute: [-1],
      currentSelectedIndexForOrganizationalInfo: [-1],
      currentSelectedIndexForJobInformation: [-1],
      currentSelectedIndexForJobRelationships: [-1],
      // Coulmns to populate data in react-data-grid based on the key's value
      // name specifies the header name for the grid
      columnsForKeyJobAttribute: [{ key: 'jobCode', name: 'Job Code' }, { key: 'position', name: 'Position' }],
      columnsForOrganizationalInfo: [{ key: 'businessUnit', name: 'Business Unit', resizable: true }, { key: 'department', name: 'Department', resizable: true }, { key: 'location', name: 'Location', resizable: true }, { key: 'timeZone', name: 'Timezone', resizable: true }, { key: 'costCenter', name: 'Cost Center', resizable: true }],
      columnsForOrganizationalInfoModal: [{ key: 'company', name: 'Company', resizable: true }, { key: 'businessUnit', name: 'Business Unit', resizable: true }, { key: 'division', name: 'Division', resizable: true }, { key: 'department', name: 'Department', resizable: true }, { key: 'location', name: 'Location', resizable: true }, { key: 'timeZone', name: 'Timezone', resizable: true }, { key: 'costCenter', name: 'Cost Center', resizable: true }],
      columnsForJobInformation: [{ key: 'employmentStatus', name: 'Employee Status', resizable: true, width: 110 }, { key: 'supervisor', name: 'Supervisor', resizable: true, width: 86 }, { key: 'jobClassification', name: 'Job Classification', resizable: true, width: 116 }, { key: 'localJobTitle', name: 'Local Job Title', resizable: true, width: 110 }, { key: 'payGrade', name: 'Pay Grade', resizable: true, width: 88 }],
      columnsForJobInformationModal: [{ key: 'employmentStatus', name: 'Employee Status', resizable: true, width: 149 }, { key: 'supervisor', name: 'Supervisor', resizable: true, width: 125 }, { key: 'jobClassification', name: 'Job Classification', resizable: true, width: 188 }, { key: 'jobTitle', name: 'Job Title', resizable: true, width: 178 }, { key: 'localJobTitle', name: 'Local Job Title', resizable: true, width: 175 }, { key: 'payGrade', name: 'Pay Grade', resizable: true, width: 80 }, { key: 'regularOrTemporary', name: 'Regular / Temporary', resizable: true, width: 122 }, { key: 'standardWeeklyHours', name: 'Standard Weekly Hours', resizable: true, width: 138 }, { key: 'fte', name: 'FTE', resizable: true, width: 125 }],
      columnsForJobRelationships: [{ key: 'relationshipType', name: 'Relationship Type' }, { key: 'name', name: 'Name' }],
      // Coulmns to populate data in react-table based on the accessor's value
      // Header specifies the Header Name for the table
      kjaAuditColumns: [{ accessor: 'jobCode', Header: 'Job Code' }, { accessor: 'position', Header: 'Position' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      orgInfoAuditColumns: [{ accessor: 'company', Header: 'Company' }, { accessor: 'businessUnit', Header: 'Business Unit' }, { accessor: 'division', Header: 'Division' }, { accessor: 'department', Header: 'Department' }, { accessor: 'location', Header: 'Location' }, { accessor: 'timeZone', Header: 'Timezone' }, { accessor: 'costCenter', Header: 'Cost Center' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      jobInfoAuditColumns: [{ accessor: 'employmentStatus', Header: 'Employee Status' }, { accessor: 'supervisor', Header: 'Supervisor' }, { accessor: 'jobClassification', Header: 'Job Classification' }, { accessor: 'jobTitle', Header: 'Job Title' }, { accessor: 'localJobTitle', Header: 'Local Job Title' }, { accessor: 'payGrade', Header: 'Pay Grade' }, { accessor: 'regularOrTemporary', Header: 'Regular / Temporary' }, { accessor: 'standardWeeklyHours', Header: 'Standard Weekly Hours' }, { accessor: 'fte', Header: 'FTE' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      timeInfoAuditColumns: [{ accessor: 'holidayCalendar', Header: 'Holiday Calendar' }, { accessor: 'workSchedule', Header: 'Work Schedule' }, { accessor: 'timeProfile', Header: 'Time Profile' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      countrySpecificAuditColumns: [{ accessor: 'isFullTime', Header: 'Is Full Time' }, { accessor: 'notes', Header: 'Notes' }, { accessor: 'employeeClass', Header: 'Employee Class' }, { accessor: 'flsaStatus', Header: 'FLSA Status' }, { accessor: 'isShiftEmployee', Header: 'Is Shift Employee' }, { accessor: 'shiftCode', Header: 'Shift Code' }, { accessor: 'shiftRate', Header: 'Shift Rate' }, { accessor: 'shiftPercent', Header: 'Shift Percent' }, { accessor: 'isCrossBorderWorker', Header: 'Is Cross Border Worker' }, { accessor: 'eeoJobGroup', Header: 'EEO Job Group' }, { accessor: 'contractType', Header: 'Contract Type' }, { accessor: 'continuedSicknessPayPeriod', Header: 'Continued Sickness Pay Period' }, { accessor: 'continuedSicknessPayMeasure', Header: 'Continued Sickness Pay Measure' }, { accessor: 'noticePeriod', Header: 'Notice Period' }, { accessor: 'initialEntry', Header: 'Initial Entry' }, { accessor: 'entryIntoGroup', Header: 'Entry Into Group' }, { accessor: 'corporation', Header: 'Corporation' }, { accessor: 'eeoCategory1', Header: 'EEO Category 1' }, { accessor: 'eeoCategory2', Header: 'EEO Category 2' }, { accessor: 'eeoCategory3', Header: 'EEO Category 3' }, { accessor: 'eeoCategory4', Header: 'EEO Category 4' }, { accessor: 'eeoCategory5', Header: 'EEO Category 5' }, { accessor: 'eeoCategory6', Header: 'EEO Category 6' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      jobRelatinoshipsAuditColumns: [{ accessor: 'relationshipType', Header: 'Relationship Type' }, { accessor: 'name', Header: 'Name' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      empDetailsAuditColumns: [{ accessor: 'retireDate', Header: 'Retire Date' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }, { accessor: 'operation', Header: 'Operation' }],
      // Rows for data grid
      rowsForKeyJobAttribute: [],
      rowsForOrganizationalInfo: [],
      rowsForJobInformation: [],
      rowsForJobRelationships: [],
      // Rows for audit table
      kJAAuditRows: [],
      orgInfoAuditRows: [],
      jobInfoAuditRows: [],
      timeInfoAuditRows: [],
      countrySpecificAuditRows: [],
      jobRelatinoshipsAuditRows: [],
      empDetailsAuditRows: [],
      // Setting form type --> Either Add or Edit
      // Initially undefined for sections which have add option
      formTypeForKeyJobAttribute: 'edit',
      formTypeForOrganisationalInformation: undefined,
      formTypeForJobInformation: undefined,
      formTypeForTimeInformation: 'edit',
      formTypeForJobRelationships: undefined,
      formTypeForEmploymentDetails: 'edit',
      formTypeForCountrySpecificFields: 'edit',
      // To capture the selected row data
      // currentGridDataObjectForKeyJobAttribute: {},
      currentDataObjectForKeyJobAttribute: {},
      currentGridDataObjectForOrgInformation: {},
      currentGridDataObjectForJobInformation: {},
      currentDataObjectForTimeInformation: {},
      currentGridDataObjectForJobRelationships: {},
      currentDataObjectForEmploymentDetails: {},
      currentDataObjectForCountrySpecificFields: {},
      // To adjust the grid size based on the number of rows
      // Initially 35 (height of a cell) for the header
      kjaGridSize: 35,
      oiGridSize: 35,
      jiGridSize: 35,
      jrGridSize: 35,
      showingForKeyJobAttribute: false,
      showingForOrganisationalInformation: false,
      showingForJobInformation: false,
      showingForTimeInformation: false,
      showingForJobRelationships: false,
      showingForEmploymentDetails: false,
      showingForCountrySpecificFields: false,
      kjaAuditIsOpen: false,
      orgInfoAuditIsOpen: false,
      jobInfoAuditIsOpen: false,
      timeInfoAuditIsOpen: false,
      countrySpecificAuditIsOpen: false,
      jobRelatinoshipsAuditIsOpen: false,
      empDetailsAuditIsOpen: false,
      snackBarIsOpen: true,
      expandOrgInfo: false,
      expandJobInfo: false,
      editErrorMessage: 'Please select a row to edit'
    };
    this.toggleElement = this.toggleElement.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
  }
  componentWillReceiveProps(newProps) {
    console.log('Job Info Will Receive Props: ', newProps);
    const kjaRowCount = newProps.currentEmployee.jobInformation.employmentDetail.keyJobAttribute.length + 1;
    const oiRowCount = newProps.currentEmployee.jobInformation.employmentDetail.organizationalInformation.length + 1;
    const jiRowCount = newProps.currentEmployee.jobInformation.employmentDetail.jobInformation.length + 1;
    const jrRowCount = newProps.currentEmployee.jobInformation.jobRelationships.globalFields.length + 1;
    const newRowsForKeyJobAttribute = Object.assign([], newProps.currentEmployee.jobInformation.employmentDetail.keyJobAttribute);
    const newRowsForOrganizationalInfo = Object.assign([], newProps.currentEmployee.jobInformation.employmentDetail.organizationalInformation);
    const newRowsForJobInformation = Object.assign([], newProps.currentEmployee.jobInformation.employmentDetail.jobInformation);
    const newRowsForJobRelationships = Object.assign([], newProps.currentEmployee.jobInformation.jobRelationships.globalFields);
    this.setState({ rowsForKeyJobAttribute: newRowsForKeyJobAttribute.reverse() });
    this.setState({ rowsForOrganizationalInfo: newRowsForOrganizationalInfo.reverse() });
    this.setState({ rowsForJobInformation: newRowsForJobInformation.reverse() });
    this.setState({ rowsForJobRelationships: newRowsForJobRelationships.reverse() });
    this.setState({ kjaGridSize: kjaRowCount * 35 });
    this.setState({ oiGridSize: oiRowCount * 35 });
    this.setState({ jiGridSize: jiRowCount * 35 });
    this.setState({ jrGridSize: jrRowCount * 35 });
    console.log('desc', this.state.rowsForKeyJobAttribute);

    // Formatting date for Audits
    const kjaFormattedData = newProps.auditData.jobInformation.employmentDetail.keyJobAttribute.map((data) => this.getFormattedDate(data));
    const orgInfoFormattedData = newProps.auditData.jobInformation.employmentDetail.organizationalInformation.map((data) => this.getFormattedDate(data));
    const jobInfoFormattedData = newProps.auditData.jobInformation.employmentDetail.jobInformation.map((data) => this.getFormattedDate(data));
    const timeInfoFormattedData = newProps.auditData.jobInformation.employmentDetail.timeInformation.map((data) => this.getFormattedDate(data));
    const countrySpecificFormattedData = newProps.auditData.jobInformation.employmentDetail.countrySpecificFields.us.map((data) => this.getFormattedDate(data));
    const jobRelationshipsFormattedData = newProps.auditData.jobInformation.jobRelationships.globalFields.map((data) => this.getFormattedDate(data));
    const empDetailsFormattedData = newProps.auditData.jobInformation.employmentDetails.globalFields.map((data) => this.getFormattedDate(data));
    this.setState({ kJAAuditRows: kjaFormattedData });
    this.setState({ orgInfoAuditRows: orgInfoFormattedData });
    this.setState({ jobInfoAuditRows: jobInfoFormattedData });
    this.setState({ timeInfoAuditRows: timeInfoFormattedData });
    this.setState({ countrySpecificAuditRows: countrySpecificFormattedData });
    this.setState({ jobRelatinoshipsAuditRows: jobRelationshipsFormattedData });
    this.setState({ empDetailsAuditRows: empDetailsFormattedData });
  }
  componentDidUpdate() {
    window.scrollTo(0, this.state.scrollPosition);
  }
  onDayChange(data) {
    console.log(data);
  }
  getFormattedDate(row) {
    const tempRow = {};
    Object.keys(row).forEach((key) => {
      if (key === 'insertedDate') {
        const formattedinsertedDate = (row.insertedDate) ? moment(row.insertedDate).format('DD-MMM-YYYY') : '';
        tempRow.insertedDate = formattedinsertedDate;
      } else {
        tempRow[key] = row[key];
      }
      if (key === 'retireDate') {
        const formattedRetireDate = (row.retireDate) ? moment(row.retireDate).format('DD-MMM-YYYY') : '';
        tempRow.retireDate = formattedRetireDate;
      }
    });
    return tempRow;
  }
  setSyncedWithServer = (value) => {
    console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  // Data-Grid Defs
  // getRowIDForKeyJobAttribute(data) {
  //   this.setState({ scrollPosition: window.scrollY });
  //   console.log(data);
  //   const temp = data.rowIdx;
  //   const rowID = [temp];
  //   this.setState({ currentSelectedIndexForKeyJobAttribute: rowID });
  //   console.log(this.state.rowsForKeyJobAttribute[temp]);
  //   const object = this.state.rowsForKeyJobAttribute[temp];
  //   object.uniqueID = temp;
  //   this.setState({ currentGridDataObjectForKeyJobAttribute: object });
  // }
  getRowIDForOrganizationalInfo(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForOrganizationalInfo: rowID });
    const object = this.state.rowsForOrganizationalInfo[temp];
    console.log('object for OI is: ', object);
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForOrgInformation: object });
  }
  getRowIDForJobInformation(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForJobInformation: rowID });
    const object = this.state.rowsForJobInformation[temp];
    console.log('object for JI is: ', object);
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForJobInformation: object });
  }
  getRowIDForJobRelationships(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForJobRelationships: rowID });
    const object = this.state.rowsForJobRelationships[temp];
    console.log('object for JR is: ', object);
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForJobRelationships: object });
  }
  rowGetterForKeyJobAttribute(index) {
    return this.state.rowsForKeyJobAttribute[index];
  }
  rowGetterForOrganizationalInfo(index) {
    return this.state.rowsForOrganizationalInfo[index];
  }
  rowGetterForJobInformation(index) {
    return this.state.rowsForJobInformation[index];
  }
  rowGetterForJobRelationships(index) {
    return this.state.rowsForJobRelationships[index];
  }
  expandJobInfoModal() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ expandJobInfo: true });
  }
  expandOrgInfoModal() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ expandOrgInfo: true });
  }
  // Model Form Defs
  collapseJobInfo() {
    this.setState({ expandJobInfo: false });
  }
  collapseOrgInfo() {
    this.setState({ expandOrgInfo: false });
  }
  closeKeyJobAttributesForm() {
    this.setState({ currentSelectedIndexForKeyJobAttribute: -1 });
    this.setState({ currentDataObjectForKeyJobAttribute: {} });
    this.setState({ showingForKeyJobAttribute: false });
  }
  closeOrgInformationForm() {
    this.setState({ currentSelectedIndexForOrganizationalInfo: -1 });
    this.setState({ currentGridDataObjectForOrgInformation: {} });
    this.setState({ showingForOrganisationalInformation: false });
  }
  closeJobInformationForm() {
    this.setState({ currentSelectedIndexForJobInformation: -1 });
    this.setState({ currentGridDataObjectForJobInformation: {} });
    this.setState({ showingForJobInformation: false });
  }
  closeTimeInformationForm() {
    this.setState({ showingForTimeInformation: false });
  }
  closeCountrySpecificForm() {
    this.setState({ showingForCountrySpecificFields: false });
  }
  closeJobRelationshipsForm() {
    this.setState({ currentSelectedIndexForJobRelationships: -1 });
    this.setState({ currentGridDataObjectForJobRelationships: {} });
    this.setState({ showingForJobRelationships: false });
  }
  closeEmploymentDetailsForm() {
    this.setState({ showingForEmploymentDetails: false });
  }
  closeKJAAudit() {
    this.setState({ kjaAuditIsOpen: false });
  }
  closeOrgInfoAudit() {
    this.setState({ orgInfoAuditIsOpen: false });
  }
  closeJobInfoAudit() {
    this.setState({ jobInfoAuditIsOpen: false });
  }
  closeTimeInfoAudit() {
    this.setState({ timeInfoAuditIsOpen: false });
  }
  closeCountrySpecificAudit() {
    this.setState({ countrySpecificAuditIsOpen: false });
  }
  closeJobRelationshipsAudit() {
    this.setState({ jobRelatinoshipsAuditIsOpen: false });
  }
  closeEmpDetailsAudit() {
    this.setState({ empDetailsAuditIsOpen: false });
  }
  // addKeyJobAttributes() {
  //   this.setState({ scrollPosition: window.scrollY });
  //   this.setState({ formTypeForKeyJobAttribute: 'add' });
  //   this.setState({ currentGridDataObjectForKeyJobAttribute: {} });
  //   this.setState({ showingForKeyJobAttribute: true });
  // }
  addOrgInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForOrganisationalInformation: 'add' });
    this.setState({ currentGridDataObjectForOrgInformation: {} });
    this.setState({ showingForOrganisationalInformation: true });
  }
  addJobInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForJobInformation: 'add' });
    this.setState({ currentGridDataObjectForJobInformation: {} });
    this.setState({ showingForJobInformation: true });
  }
  addJobRelationships() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForJobRelationships: 'add' });
    this.setState({ currentGridDataObjectForJobRelationships: {} });
    this.setState({ showingForJobRelationships: true });
  }
  openKJAAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ kjaAuditIsOpen: true });
  }
  openOrgInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ orgInfoAuditIsOpen: true });
  }
  openJobInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ jobInfoAuditIsOpen: true });
  }
  openTimeInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ timeInfoAuditIsOpen: true });
  }
  openCountrySpecificAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ countrySpecificAuditIsOpen: true });
  }
  openJobRelationshipsAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ jobRelatinoshipsAuditIsOpen: true });
  }
  openEmpDetailsAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ empDetailsAuditIsOpen: true });
  }
  submitKeyJobAttributesForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.jobCodeField, data.positionField, data.insertedByField, data.insertedDateField];
    const values = [data.jobCode, data.position, data.insertedBy, data.insertedDate];
    // if (hiddenType === 'add') {
    //   this.props.dispatch(
    //     updateJobInfoData({ value: values, field: fields, type: hiddenType })
    //   );
    //   this.props.dispatch(
    //     insertIntoAudit({ value: values, field: fields, operation: 'INSERT' })
    //   );
    // }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updateJobInfoData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForKeyJobAttribute: -1 });
    this.setState({ currentDataObjectForKeyJobAttribute: {} });
    this.setState({ showingForKeyJobAttribute: false });
  }
  submitJobInformationForm(data, hiddenType) {
    console.log('Updating Job Information...');
    console.log(data, hiddenType);
    const fields = [data.employmentStatusField, data.supervisorField, data.jobClassificationField, data.jobTitleField, data.localJobTitleField, data.payGradeField, data.regularOrTemporaryField, data.standardWeeklyHoursField, data.fteField, data.insertedByField, data.insertedDateField];
    const values = [data.employmentStatus, data.supervisor, data.jobClassification, data.jobTitle, data.localJobTitle, data.payGrade, data.regularOrTemporary, data.standardWeeklyHours, data.fte, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'INSERT' })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, id: rowID, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForJobInformation: -1 });
    this.setState({ currentGridDataObjectForJobInformation: {} });
    this.setState({ showingForJobInformation: false });
  }
  submitOrgInformationForm(data, hiddenType) {
    console.log('Updating organisational info....');
    console.log(data, hiddenType);
    const fields = [data.companyField, data.businessUnitField, data.divisionField, data.departmentField, data.locationField, data.timeZoneField, data.costCenterField, data.insertedByField, data.insertedDateField];
    const values = [data.company, data.businessUnit, data.division, data.department, data.location, data.timeZone, data.costCenter, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updateJobInfoData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'INSERT' })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updateJobInfoData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForOrganizationalInfo: -1 });
    this.setState({ currentGridDataObjectForOrgInformation: {} });
    this.setState({ showingForOrganisationalInformation: false });
  }
  submitTimeInformationForm(data, hiddenType) {
    console.log('Updating Time Information...');
    console.log(data, hiddenType);
    if (hiddenType === 'edit') {
      const fields = [data.holidayCalendarField, data.workScheduleField, data.timeProfileField, data.insertedByField, data.insertedDateField];
      const values = [data.holidayCalendar, data.workSchedule, data.timeProfile, data.insertedBy, data.insertedDate];
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
      this.save();
      this.setState({ showingForTimeInformation: false });
    }
  }
  submitCountrySpecificFieldsForm(data, hiddenType) {
    console.log('Updating Country Specific Fields...');
    console.log(data, hiddenType);
    if (hiddenType === 'edit') {
      const fields = [data.isFullTimeField, data.notesField, data.employeeClassField, data.flsaStatusField, data.isShiftEmployeeField, data.shiftCodeField, data.shiftPercentField, data.shiftRateField, data.isCrossBorderWorkerField, data.eeoJobGroupField, data.contractTypeField, data.continuedSicknessPayPeriodField, data.continuedSicknessPayMeasureField, data.noticePeriodField, data.initialEntryField, data.entryIntoGroupField, data.corporationField, data.eeoCategory1Field, data.eeoCategory2Field, data.eeoCategory3Field, data.eeoCategory4Field, data.eeoCategory5Field, data.eeoCategory6Field, data.insertedByField, data.insertedDateField];
      const values = [data.isFullTime, data.notes, data.employeeClass, data.flsaStatus, data.isShiftEmployee, data.shiftCode, data.shiftPercent, data.shiftRate, data.isCrossBorderWorker, data.eeoJobGroup, data.contractType, data.continuedSicknessPayPeriod, data.continuedSicknessPayMeasure, data.noticePeriod, data.initialEntry, data.entryIntoGroup, data.corporation, data.eeoCategory1, data.eeoCategory2, data.eeoCategory3, data.eeoCategory4, data.eeoCategory5, data.eeoCategory6, data.insertedBy, data.insertedDate];
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
      this.save();
      this.setState({ showingForCountrySpecificFields: false });
    }
  }
  submitJobRelationshipsForm(data, hiddenType) {
    console.log('Updating Job Relatinoships...');
    console.log(data, hiddenType);
    const fields = [data.relationshipTypeField, data.nameField, data.insertedByField, data.insertedDateField];
    const values = [data.relationshipType, data.name, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'INSERT' })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, id: rowID, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForJobRelationships: -1 });
    this.setState({ currentGridDataObjectForJobRelationships: {} });
    this.setState({ showingForJobRelationships: false });
  }
  submitEmploymentDetailsForm(data, hiddenType) {
    console.log('Updating Employment Details', data, hiddenType);
    if (hiddenType === 'edit') {
      const fields = [data.retireDateField, data.insertedByField, data.insertedDateField];
      const values = [data.retireDate, data.insertedBy, data.insertedDate];
      this.props.dispatch(
        updateJobInfoData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertIntoAudit({ value: values, field: fields, operation: 'UPDATE' })
      );
      this.save();
      this.setState({ showingForEmploymentDetails: false });
    }
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
  save() {
    console.log('Saving the employee job information data');
    updateCompanyInfo({ employee: this.props.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'keyJobAttribute') {
      const kja = document.getElementById('keyJobAttributeToggle');
      kja.classList.toggle('actionDisable');
    } else if (elementID === 'organizationalInfo') {
      const oi = document.getElementById('organizationalInformationToggle');
      oi.classList.toggle('actionDisable');
    } else if (elementID === 'JobInfo') {
      const ji = document.getElementById('jobInformationToggle');
      ji.classList.toggle('actionDisable');
    } else if (elementID === 'TimeInfo') {
      const ti = document.getElementById('timeInformationToggle');
      ti.classList.toggle('actionDisable');
    } else if (elementID === 'countrySpecific') {
      const cs = document.getElementById('countrySpecificToggle');
      cs.classList.toggle('actionDisable');
    } else if (elementID === 'globalFields') {
      const gf = document.getElementById('jobRelationshipsToggle');
      gf.classList.toggle('actionDisable');
    } else if (elementID === 'globalFields2') {
      const gf2 = document.getElementById('employmentDetailsToggle');
      gf2.classList.toggle('actionDisable');
    }
  }
  dateFormatter(inputDate) {
    const formattedDate = (inputDate)
      ? moment(inputDate).format('DD-MMM-YYYY')
      : '';
    return formattedDate;
  }
  editKeyJobAttributes() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForKeyJobAttribute: true });
    const editData = this.props.currentEmployee.jobInformation.employmentDetail.keyJobAttribute;
    this.setState({ currentDataObjectForKeyJobAttribute: editData });

    // if (this.state.currentGridDataObjectForKeyJobAttribute.jobCode) {
    //   this.setState({ formTypeForKeyJobAttribute: 'edit' });
    //   const editData = this.state.currentGridDataObjectForKeyJobAttribute;
    //   console.log('editData is: ', editData);
    //   this.setState({ showingForKeyJobAttribute: true });
    // } else {
    //   // this.setState({ snackBarIsOpen: true });
    //   const snackBar = document.getElementById('kJASnackBar');
    //   snackBar.style.display = 'block';
    //   setTimeout(() => {
    //     snackBar.style.display = 'none';
    //   }, 3000);
    // }
  }
  editOrgInformation() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForOrgInformation.businessUnit) {
      this.setState({ formTypeForOrganisationalInformation: 'edit' });
      const editData = this.state.currentGridDataObjectForOrgInformation;
      console.log('editData is: ', editData);
      this.setState({ showingForOrganisationalInformation: true });
    } else {
      const snackBar = document.getElementById('orgInfoSnackBar');
      snackBar.style.display = 'block';
      setTimeout(() => {
        snackBar.style.display = 'none';
      }, 3000);
    }
  }
  editJobInformation() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForJobInformation.employmentStatus) {
      this.setState({ formTypeForJobInformation: 'edit' });
      const editData = this.state.currentGridDataObjectForJobInformation;
      console.log('Edit data for JI', editData);
      this.setState({ showingForJobInformation: true });
    } else {
      const snackBar = document.getElementById('jobInfoSnackBar');
      snackBar.style.display = 'block';
      setTimeout(() => {
        snackBar.style.display = 'none';
      }, 3000);
    }
  }
  editTimeInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForTimeInformation: true });
    const editData = this.props.currentEmployee.jobInformation.employmentDetail.timeInformation;
    this.setState({ currentDataObjectForTimeInformation: editData });
  }
  editJobRelationships() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForJobRelationships.name) {
      this.setState({ formTypeForJobRelationships: 'edit' });
      const editData = this.state.currentGridDataObjectForJobRelationships;
      console.log('Edit data for JR: ', editData);
      this.setState({ showingForJobRelationships: true });
    } else {
      const snackBar = document.getElementById('jobRelationshipsSnackBar');
      snackBar.style.display = 'block';
      setTimeout(() => {
        snackBar.style.display = 'none';
      }, 3000);
    }
  }
  editEmploymentDetails() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForEmploymentDetails: true });
    const editData = this.props.currentEmployee.jobInformation.employmentDetails.globalFields;
    console.log('emp details', this.props.currentEmployee.jobInformation.employmentDetails.globalFields);
    this.setState({ currentDataObjectForEmploymentDetails: editData });
  }
  editCountrySpecificFields() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForCountrySpecificFields: true });
    const editData = this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us;
    this.setState({ currentDataObjectForCountrySpecificFields: editData });
  }
  render() {
    return (
      <div className="container">
        <div className="row row--panel">
          <div className="col-xs-12 col-md-12 col-lg-3">

            <div className="panel key">

              <div className="key-icon">
                <img src="/assets/images/icons/key-money.svg" alt="" />
              </div>

              <div className="key-data">

                <div className="key-title">Salary</div>
                <div className="key-value key-value--salary">
                  { this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.annualizedSalary }
                </div>

              </div>

              <div className="panel-edit" id="salary" onClick={() => this.toggleElement('salary')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li
                    className="panel-edit-item js-panel-item active"
                    data-keytitle="Salary"
                    data-keyvalue="10 000"
                  >
                    Change to salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Base salary"
                    data-keyvalue="2500"
                  >
                    Change to base salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Hourly salary"
                    data-keyvalue="25"
                  >
                    Change to hourly salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP low"
                    data-keyvalue="1220"
                  >
                    Change to MRP low
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP"
                    data-keyvalue="1900"
                  >
                    Change to MRP
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP high"
                    data-keyvalue="2250"
                  >
                    Change to MRP high
                  </li>
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
                <div className="key-value key-value--bonus">
                  {this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.teo}
                </div>

              </div>

              <div className="panel-edit" id="targetTotal" onClick={() => this.toggleElement('targetTotal')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li
                    className="panel-edit-item js-panel-item active"
                    data-keytitle="Salary"
                    data-keyvalue="10 000"
                  >
                    Change to salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Base salary"
                    data-keyvalue="2500"
                  >
                    Change to base salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Hourly salary"
                    data-keyvalue="25"
                  >
                    Change to hourly salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP low"
                    data-keyvalue="1220"
                  >
                    Change to MRP low
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP"
                    data-keyvalue="1900"
                  >
                    Change to MRP
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP high"
                    data-keyvalue="2250"
                  >
                    Change to MRP high
                  </li>
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
                  <li
                    className="panel-edit-item js-panel-item active"
                    data-keytitle="Salary"
                    data-keyvalue="10 000"
                  >
                    Change to salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Base salary"
                    data-keyvalue="2500"
                  >
                    Change to base salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Hourly salary"
                    data-keyvalue="25"
                  >
                    Change to hourly salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP low"
                    data-keyvalue="1220"
                  >
                    Change to MRP low
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP"
                    data-keyvalue="1900"
                  >
                    Change to MRP
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP high"
                    data-keyvalue="2250"
                  >
                    Change to MRP high
                  </li>
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
                <div className="key-value key-value--docs">
                  {this.props.currentEmployee.compensationInformation.compensationInformation.compensationGroup.compaRatio}
                </div>

              </div>

              <div className="panel-edit" id="companyRatio" onClick={() => this.toggleElement('companyRatio')}>

                <div className="panel-edit-icon js-panel-edit" />

                <ul className="panel panel-edit-list">
                  <li
                    className="panel-edit-item js-panel-item active"
                    data-keytitle="Salary"
                    data-keyvalue="10 000"
                  >
                    Change to salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Base salary"
                    data-keyvalue="2500"
                  >
                    Change to base salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="Hourly salary"
                    data-keyvalue="25"
                  >
                    Change to hourly salary
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP low"
                    data-keyvalue="1220"
                  >
                    Change to MRP low
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP"
                    data-keyvalue="1900"
                  >
                    Change to MRP
                  </li>
                  <li
                    className="panel-edit-item js-panel-item"
                    data-keytitle="MRP high"
                    data-keyvalue="2250"
                  >
                    Change to MRP high
                  </li>
                </ul>

              </div>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-xs-12 col-lg-12">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path
                            d="M38.91,9.93a3.74,3.74,0,0,0-5.28,0l-1,1V1.11A1.11,1.11,0,0,0,31.56,0H4.26A4.26,4.26,0,0,0,0,4.26V35.74A4.26,4.26,0,0,0,4.26,40h27.3a1.11,1.11,0,0,0,1.11-1.11V21.45l6.24-6.24a3.73,3.73,0,0,0,0-5.28ZM16.47,2.22h4.07V6.61l-1.37-1a1.11,1.11,0,0,0-1.34,0l-1.37,1ZM6,37.78H4.26a2,2,0,0,1-2-2V4.26a2,2,0,0,1,2-2H6Zm24.43,0H8.24V23.21H9.75a1.11,1.11,0,0,0,0-2.22H8.24V19h4.14a1.11,1.11,0,0,0,0-2.22H8.24V2.22h6V8.85A1.11,1.11,0,0,0,16,9.73l2.48-1.88L21,9.73a1.31,1.31,0,0,0,1.17.11,1.12,1.12,0,0,0,.62-1V2.22h7.68V13.11L18,25.56a1.11,1.11,0,0,0-.33.79v3.71a1.11,1.11,0,0,0,1.11,1.11H22.5a1.11,1.11,0,0,0,.79-.33l7.16-7.16ZM22,28.94H19.9V26.8L33.47,13.23l2.14,2.14Zm15.3-15.3-.16.16L35,11.66l.16-.16a1.55,1.55,0,0,1,2.14,0A1.57,1.57,0,0,1,37.34,13.64Z"
                            fill="#f4f7fa"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Employment Detail</h2>
                  {/* <ul className="box-actions">
                    <li>
                      <a>Edit</a>
                    </li>
                    <li>
                      <a>History</a>
                    </li>
                    <li>
                      <a title="Help">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="24"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                          />
                          <rect width="50" height="50" fill="none" />
                          <path
                            d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul> */}
                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-6 col-lg-6 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="keyJobAttribute">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            <h2 className="toggler-title">Key Job Attribute</h2>
                            <div id="keyJobAttributeToggle" className="toggleAction">
                              <ul className="box-actions" >
                                {/* <li>
                                  <a onClick={this.addKeyJobAttributes}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li> */}
                                <li>
                                  <a onClick={this.editKeyJobAttributes}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openKJAAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'JIEDKJ000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute')} />
                          </div>

                          <div className="toggler-content ji-padding-bottom">
                            <div id="kJASnackBar" className="snackBarStyle actionDisable">
                              <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} />
                            </div>
                            {/* <ReactDataGrid
                              columns={this.state.columnsForKeyJobAttribute}
                              rowGetter={this.rowGetterForKeyJobAttribute}
                              rowsCount={this.state.rowsForKeyJobAttribute.length}
                              minHeight={this.state.kjaGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForKeyJobAttribute}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForKeyJobAttribute
                                }
                              }}
                              enableRowSelect={false}
                            /> */}
                            <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Job Code
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" name="jobInformation.employmentDetail.keyJobAttribute.jobCode" value={this.props.currentEmployee.jobInformation.employmentDetail.keyJobAttribute.jobCode} disabled>
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Job Code')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Position
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" name="jobInformation.employmentDetail.keyJobAttribute.position" value={this.props.currentEmployee.jobInformation.employmentDetail.keyJobAttribute.position} disabled>
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Position')}
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <CustomModal form={<KeyJobAttribute formType={this.state.formTypeForKeyJobAttribute} data={this.state.currentDataObjectForKeyJobAttribute} closeEvent={this.closeKeyJobAttributesForm} submitEvent={this.submitKeyJobAttributesForm} />} show={this.state.showingForKeyJobAttribute} />
                            <CustomModal form={<CustomReactTable headerName={'Key Job Attribute'} auditData={this.state.kJAAuditRows} auditColumns={this.state.kjaAuditColumns} close={this.closeKJAAudit} />} show={this.state.kjaAuditIsOpen} />
                          </div>

                        </div>

                        <div className="toggler active" id="organizationalInfo">

                          <div className="toggler-bar js-toggler-bar">
                            <h2 className="toggler-title">
                              Organizational Information
                            </h2>
                            <div id="organizationalInformationToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.expandOrgInfoModal}>
                                    <i className="fas fa-expand expandIco" aria-hidden="true" title="Expand" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.addOrgInformation}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.editOrgInformation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openOrgInfoAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'JIEDOI000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('organizationalInfo')} />
                          </div>

                          <div className="toggler-content ji-padding-bottom">
                            <div id="orgInfoSnackBar" className="snackBarStyle actionDisable">
                              <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} />
                            </div>
                            <ExpandableModal
                              open={this.state.expandOrgInfo}
                              headerName={'Organizational Information'}
                              columns={this.state.columnsForOrganizationalInfoModal}
                              rowGetter={this.rowGetterForOrganizationalInfo}
                              length={this.state.rowsForOrganizationalInfo.length}
                              gridSize={this.state.oiGridSize}
                              close={this.collapseOrgInfo}
                            />
                            <ReactDataGrid
                              columns={this.state.columnsForOrganizationalInfo}
                              rowGetter={this.rowGetterForOrganizationalInfo}
                              rowsCount={this.state.rowsForOrganizationalInfo.length}
                              minHeight={this.state.oiGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForOrganizationalInfo}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForOrganizationalInfo
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal form={<OrganisationalInformation formType={this.state.formTypeForOrganisationalInformation} data={this.state.currentGridDataObjectForOrgInformation} closeEvent={this.closeOrgInformationForm} submitEvent={this.submitOrgInformationForm} />} show={this.state.showingForOrganisationalInformation} />
                            <CustomModal form={<CustomReactTable headerName={'Organizational Information'} auditData={this.state.orgInfoAuditRows} auditColumns={this.state.orgInfoAuditColumns} close={this.closeOrgInfoAudit} />} show={this.state.orgInfoAuditIsOpen} />
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                  <div className="col-xs-6 col-lg-6 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--side box-inner--no-pad">

                        <div className="toggler active" id="JobInfo">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">Job Information</h2>
                            <div id="jobInformationToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.expandJobInfoModal}>
                                    <i className="fas fa-expand expandIco" aria-hidden="true" title="Expand" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.addJobInformation}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.editJobInformation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openJobInfoAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'JIEDJI000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('JobInfo')} />
                          </div>

                          <div className="toggler-content ji-padding-bottom">
                            <div id="jobInfoSnackBar" className="snackBarStyle actionDisable">
                              <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} />
                            </div>
                            <ExpandableModal
                              open={this.state.expandJobInfo}
                              headerName={'Job Information'}
                              columns={this.state.columnsForJobInformationModal}
                              rowGetter={this.rowGetterForJobInformation}
                              length={this.state.rowsForJobInformation.length}
                              gridSize={this.state.jiGridSize}
                              close={this.collapseJobInfo}
                            />
                            <div>
                              <ReactDataGrid
                                columns={this.state.columnsForJobInformation}
                                rowGetter={this.rowGetterForJobInformation}
                                rowsCount={this.state.rowsForJobInformation.length}
                                minHeight={this.state.jiGridSize}
                                enableCellSelect
                                onCellSelected={this.getRowIDForJobInformation}
                                showCheckbox={false}
                                rowSelection={{
                                  showCheckbox: false,
                                  selectBy: {
                                    indexes: this.state.currentSelectedIndexForJobInformation
                                  }
                                }}
                                enableRowSelect={false}
                              />
                            </div>
                            <CustomModal form={<JobInformation formType={this.state.formTypeForJobInformation} data={this.state.currentGridDataObjectForJobInformation} closeEvent={this.closeJobInformationForm} submitEvent={this.submitJobInformationForm} />} show={this.state.showingForJobInformation} />
                            <CustomModal form={<CustomReactTable headerName={'Job Information'} auditData={this.state.jobInfoAuditRows} auditColumns={this.state.jobInfoAuditColumns} close={this.closeJobInfoAudit} />} show={this.state.jobInfoAuditIsOpen} />
                          </div>

                        </div>

                        <div className="toggler active" id="TimeInfo">

                          <div className="toggler-bar js-toggler-bar">
                            <h2 className="toggler-title">Time Information</h2>
                            <div id="timeInformationToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.editTimeInformation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openTimeInfoAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'JIEDTI000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('TimeInfo')} />
                          </div>

                          <div className="toggler-content ji-padding-bottom">
                            <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Holiday Calendar
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" id="holidayCalendar" name="jobInformation.employmentDetail.timeInformation.holidayCalendar" value={this.props.currentEmployee.jobInformation.employmentDetail.timeInformation.holidayCalendar} disabled >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Work Schedule
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" id="workSchedule" name="jobInformation.employmentDetail.timeInformation.workSchedule" value={this.props.currentEmployee.jobInformation.employmentDetail.timeInformation.workSchedule} disabled >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Work Schedule')}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Time Profile
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" id="timeProfile" name="jobInformation.employmentDetail.timeInformation.timeProfile" value={this.props.currentEmployee.jobInformation.employmentDetail.timeInformation.timeProfile} disabled >
                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Time Profile')}
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <CustomModal form={<TimeInformation formType={this.state.formTypeForTimeInformation} data={this.state.currentDataObjectForTimeInformation} closeEvent={this.closeTimeInformationForm} submitEvent={this.submitTimeInformationForm} />} show={this.state.showingForTimeInformation} />
                            <CustomModal form={<CustomReactTable headerName={'Time Information'} auditData={this.state.timeInfoAuditRows} auditColumns={this.state.timeInfoAuditColumns} close={this.closeTimeInfoAudit} />} show={this.state.timeInfoAuditIsOpen} />
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">
                      <div className="box-inner--top">

                        <div className="toggler active" id="countrySpecific">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">
                              Country Specific - USA
                            </h2>
                            <div id="countrySpecificToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.editCountrySpecificFields}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openCountrySpecificAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'JIEDCS000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('countrySpecific')} />
                          </div>
                          <div className="toggler-content">

                            <div className="row-no-padding">

                              <div className="col-xs-6 col-lg-6 no-padding">

                                <table className="table table--stripes companySpecificGrid">
                                  <tbody>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Country
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.country" disabled>
                                          {/* {this.bindDataToDropDownList(this.props.masterInfo, 'Country')} */}
                                          <option>USA</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Is Fulltime Employee
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.isFullTime" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isFullTime} disabled>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Is Full Time')}
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Notes
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.notes}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Employee Class
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.employeeClass} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'Employee Class') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          FLSA Status
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.flsaStatus} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'Flsa Status') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Is Shift Employee
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isShiftEmployee} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'Is Shift Employee') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Shift Code
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftCode} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'Shift Code') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Shift Rate
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftRate}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Shift Percent
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftPercent}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Is Cross Border Worker
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isCrossBorderWorker} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'Is Cross Border Worker') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Job Group
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoJobGroup} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'EEO Job Group') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Contract Type
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.contractType} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'Contract Type') }
                                        </select>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className="col-xs-6 col-lg-6 no-padding">

                                <table className="table table--stripes table--side-left companySpecificGrid">
                                  <tbody>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Continued Sickness Pay Period
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayPeriod}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Continued Sickness Pay Measure
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayMeasure}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Notice Period
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.noticePeriod}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Initial Entry
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.initialEntry}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Entry into Group
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.entryIntoGroup}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Corporation
                                        </span>
                                      </td>
                                      <td>{this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.corporation}</td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Category 1
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory1} disabled>
                                          { this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 1') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Category 2
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory2} disabled>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 2') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Category 3
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory3} disabled>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 3') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Category 4
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory4} disabled>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 4') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Category 5
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory5} disabled>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 5') }
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          EEO Category 6
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" value={this.props.currentEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory6} disabled>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 6') }
                                        </select>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <CustomModal className="countryWidth" form={<CountrySpecific formType={this.state.formTypeForCountrySpecificFields} data={this.state.currentDataObjectForCountrySpecificFields} closeEvent={this.closeCountrySpecificForm} submitEvent={this.submitCountrySpecificFieldsForm} />} show={this.state.showingForCountrySpecificFields} />
                                <CustomModal form={<CustomReactTable headerName={'Country Specific - USA'} auditData={this.state.countrySpecificAuditRows} auditColumns={this.state.countrySpecificAuditColumns} close={this.closeCountrySpecificAudit} />} show={this.state.countrySpecificAuditIsOpen} />
                              </div>

                            </div>

                          </div>

                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                <div className="box-tab">

                  <div className="box-inner box-inner--no-pad">

                    <div className="js-scrollbar">

                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <span className="table-label">
                                Company Manager:
                              </span>
                            </td>
                            <td>manager</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="table-label">
                                Cmp Mgr Of Cmp Mgr:
                              </span>
                            </td>
                            <td>comManager</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="table-label">
                                Mgr Operational:
                              </span>
                            </td>
                            <td>manager</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="table-label">
                                Op Mgr Of Op Mgr:
                              </span>
                            </td>
                            <td>opManager</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="table-label">
                                Mgr Functional:
                              </span>
                            </td>
                            <td>FunManager</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="table-label">Mgr Hr:</span>
                            </td>
                            <td>hrManager</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>

                  </div>

                </div>

                <div className="box-tab">

                  <div className="box-inner--no-pad">

                    <table className="table">
                      <tbody>
                        <tr>
                          <td><span className="table-label">EName:</span></td>
                          <td>Samruddhi Vairat.</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="table-label">
                              Contact Person Name:
                            </span>
                          </td>
                          <td>madhu</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="table-label">Person Address:</span>
                          </td>
                          <td>satara</td>
                        </tr>
                        <tr>
                          <td><span className="table-label">Country:</span></td>
                          <td>India</td>
                        </tr>
                        <tr>
                          <td><span className="table-label">City:</span></td>
                          <td>pune</td>
                        </tr>
                        <tr>
                          <td><span className="table-label">Mobile:</span></td>
                          <td>1234567890</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-xs-6 col-lg-6">

            <div className="box">

              {/* <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 43 31.89"
                    >
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path
                            d="M30.54,2.26A5.78,5.78,0,1,0,36.32,8,5.78,5.78,0,0,0,30.54,2.26Zm0,9A3.26,3.26,0,1,1,33.8,8,3.26,3.26,0,0,1,30.54,11.3Z"
                            fill="#f4f7fa"
                          />
                          <path
                            d="M14.77,0a5.78,5.78,0,1,0,5.78,5.78A5.79,5.79,0,0,0,14.77,0Zm0,9A3.26,3.26,0,1,1,18,5.78,3.26,3.26,0,0,1,14.77,9Z"
                            fill="#f4f7fa"
                          />
                          <path
                            d="M30.53,18.07A12.12,12.12,0,0,0,25.2,19.3l-.58.28-.5-.41A14.75,14.75,0,0,0,0,30.63v1.26H43V30.63A12.53,12.53,0,0,0,30.53,18.07Zm-28,11.31.24-1.2a12.25,12.25,0,0,1,24,0l.24,1.2Zm27,0-.12-.86a14.64,14.64,0,0,0-2.25-6l-.73-1.11L27.66,21a9.68,9.68,0,0,1,2.87-.44,10,10,0,0,1,9.63,7.53l.32,1.25Z"
                            fill="#f4f7fa"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Job Relationships</h2>
                  <ul className="box-actions">
                    <li>
                      <a>Edit</a>
                    </li>
                    <li>
                      <a title="Help">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="24"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                          />
                          <rect width="50" height="50" fill="none" />
                          <path
                            d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>

              </ul> */}

              <div className="box-content">

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="globalFields">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                        <div className="box-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 43 31.89"
                          >
                            <g id="Warstwa_2" data-name="Warstwa 2">
                              <g id="dashboard">
                                <path
                                  d="M30.54,2.26A5.78,5.78,0,1,0,36.32,8,5.78,5.78,0,0,0,30.54,2.26Zm0,9A3.26,3.26,0,1,1,33.8,8,3.26,3.26,0,0,1,30.54,11.3Z"
                                  fill="#175D9D"
                                />
                                <path
                                  d="M14.77,0a5.78,5.78,0,1,0,5.78,5.78A5.79,5.79,0,0,0,14.77,0Zm0,9A3.26,3.26,0,1,1,18,5.78,3.26,3.26,0,0,1,14.77,9Z"
                                  fill="#175D9D"
                                />
                                <path
                                  d="M30.53,18.07A12.12,12.12,0,0,0,25.2,19.3l-.58.28-.5-.41A14.75,14.75,0,0,0,0,30.63v1.26H43V30.63A12.53,12.53,0,0,0,30.53,18.07Zm-28,11.31.24-1.2a12.25,12.25,0,0,1,24,0l.24,1.2Zm27,0-.12-.86a14.64,14.64,0,0,0-2.25-6l-.73-1.11L27.66,21a9.68,9.68,0,0,1,2.87-.44,10,10,0,0,1,9.63,7.53l.32,1.25Z"
                                  fill="#175D9D"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <h2 className="toggler-title mgn-left">Job Relatinoships</h2>
                        <div id="jobRelationshipsToggle" className="toggleAction">
                          <ul className="box-actions">
                            <li>
                              <a onClick={this.addJobRelationships}>
                                <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.editJobRelationships}>
                                <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.openJobRelationshipsAudit} >
                                <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                              </a>
                            </li>
                            <li>
                              <Link to={`/Help/${'JIJRGF000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                            </li>
                          </ul>
                        </div>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('globalFields')} />
                      </div>

                      {/* <div className="box">
                        <div className="box-content">
                          <div className="row-no-padding">
                            <div className="col-xs-12 col-lg-12 no-padding">
                              <div className="box-tab active" />
                            </div>
                          </div>
                        </div>
                      </div> */}

                      <div className="toggler-content ji-padding-bottom">
                        <div id="jobRelationshipsSnackBar" className="snackBarStyle actionDisable">
                          <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} />
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForJobRelationships}
                          rowGetter={this.rowGetterForJobRelationships}
                          rowsCount={this.state.rowsForJobRelationships.length}
                          minHeight={this.state.jrGridSize}
                          enableCellSelect
                          onCellSelected={this.getRowIDForJobRelationships}
                          showCheckbox={false}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.currentSelectedIndexForJobRelationships
                            }
                          }}
                          enableRowSelect={false}
                        />
                        <CustomModal form={<JobRelationships formType={this.state.formTypeForJobRelationships} data={this.state.currentGridDataObjectForJobRelationships} closeEvent={this.closeJobRelationshipsForm} submitEvent={this.submitJobRelationshipsForm} />} show={this.state.showingForJobRelationships} />
                        <CustomModal form={<CustomReactTable headerName={'Job Relationships'} auditData={this.state.jobRelatinoshipsAuditRows} auditColumns={this.state.jobRelatinoshipsAuditColumns} close={this.closeJobRelationshipsAudit} />} show={this.state.jobRelatinoshipsAuditIsOpen} />
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="col-xs-6 col-lg-6">

            <div className="box">

              {/* <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 40 41.86"
                    >
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path
                            d="M14.81,0a5.8,5.8,0,1,0,5.8,5.8A5.8,5.8,0,0,0,14.81,0Zm0,9.07A3.27,3.27,0,1,1,18.08,5.8,3.27,3.27,0,0,1,14.81,9.07Z"
                            fill="#f4f7fa"
                          />
                          <path
                            d="M27.06,29.46H2.53l.24-1.2a12.36,12.36,0,0,1,12-9.87A12.17,12.17,0,0,1,22,20.78a11.67,11.67,0,0,1,1.79,1.59,12.18,12.18,0,0,1,3,5.89Z"
                            fill="none"
                          />
                          <path
                            d="M24.75,19.78l-.29-.28-.27-.27a15,15,0,0,0-3.62-2.18L20.46,17c-.38-.15-.76-.29-1.15-.42L19,16.49q-.53-.15-1.05-.27l-.34-.07c-.38-.08-.76-.13-1.13-.18l-.27,0a13.35,13.35,0,0,0-1.41-.08h0a13.36,13.36,0,0,0-1.41.08l-.27,0c-.38.05-.76.1-1.13.18l-.34.07c-.35.08-.71.17-1.05.27l-.29.09c-.38.13-.77.27-1.14.42L9,17.06a15,15,0,0,0-3.62,2.18l-.56.55A14.84,14.84,0,0,0,0,29.7L0,32H19.4a8.31,8.31,0,0,1-.16-1.66,8.21,8.21,0,0,1,0-.86H2.53l.24-1.2a12.36,12.36,0,0,1,12-9.87A12.17,12.17,0,0,1,22,20.78a11.67,11.67,0,0,1,1.79,1.59,8.8,8.8,0,0,1,2.46-1A15.91,15.91,0,0,0,24.75,19.78Z"
                            fill="#f4f7fa"
                          />
                          <path
                            d="M28.47,18.79a11.51,11.51,0,0,0-4,.71A11.18,11.18,0,0,0,22,20.78a11.52,11.52,0,0,0-5,8.69c0,.28,0,.57,0,.86A11.4,11.4,0,0,0,17.05,32a11.53,11.53,0,1,0,11.41-13.2Zm0,20.76A9.21,9.21,0,0,1,19.4,32a8.31,8.31,0,0,1-.16-1.66,8.21,8.21,0,0,1,0-.86,9.24,9.24,0,0,1,4.51-7.09,8.8,8.8,0,0,1,2.46-1,9,9,0,0,1,2.22-.27,9.23,9.23,0,1,1,0,18.46Z"
                            fill="#f4f7fa"
                          />
                          <path
                            d="M32.24,24.91l-4.6,4.6a1.13,1.13,0,0,0,0,1.63,1.17,1.17,0,0,0,1.63,0l4.6-4.6a1.15,1.15,0,0,0-1.63-1.63Z"
                            fill="#f4f7fa"
                          />
                          <circle
                            cx="28.46"
                            cy="23.41"
                            r="1.15"
                            fill="#f4f7fa"
                          />
                          <ellipse
                            cx="27.62"
                            cy="32.56"
                            rx="1.23"
                            ry="1.6"
                            fill="#f4f7fa"
                          />
                          <circle
                            cx="35.38"
                            cy="30.33"
                            r="1.15"
                            fill="#f4f7fa"
                          />
                          <circle
                            cx="21.54"
                            cy="30.33"
                            r="1.15"
                            fill="#f4f7fa"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Employment Details</h2>
                  <ul className="box-actions">
                    <li>
                      <a>Edit</a>
                    </li>
                    <li>
                      <a title="Help">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="24"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                          />
                          <rect width="50" height="50" fill="none" />
                          <path
                            d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>

              </ul> */}

              <div className="box-content">

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="globalFields2">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar">

                        <div className="box-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 40 41.86"
                          >
                            <g id="Warstwa_2" data-name="Warstwa 2">
                              <g id="dashboard">
                                <path
                                  d="M14.81,0a5.8,5.8,0,1,0,5.8,5.8A5.8,5.8,0,0,0,14.81,0Zm0,9.07A3.27,3.27,0,1,1,18.08,5.8,3.27,3.27,0,0,1,14.81,9.07Z"
                                  fill="#175D9D"
                                />
                                <path
                                  d="M27.06,29.46H2.53l.24-1.2a12.36,12.36,0,0,1,12-9.87A12.17,12.17,0,0,1,22,20.78a11.67,11.67,0,0,1,1.79,1.59,12.18,12.18,0,0,1,3,5.89Z"
                                  fill="none"
                                />
                                <path
                                  d="M24.75,19.78l-.29-.28-.27-.27a15,15,0,0,0-3.62-2.18L20.46,17c-.38-.15-.76-.29-1.15-.42L19,16.49q-.53-.15-1.05-.27l-.34-.07c-.38-.08-.76-.13-1.13-.18l-.27,0a13.35,13.35,0,0,0-1.41-.08h0a13.36,13.36,0,0,0-1.41.08l-.27,0c-.38.05-.76.1-1.13.18l-.34.07c-.35.08-.71.17-1.05.27l-.29.09c-.38.13-.77.27-1.14.42L9,17.06a15,15,0,0,0-3.62,2.18l-.56.55A14.84,14.84,0,0,0,0,29.7L0,32H19.4a8.31,8.31,0,0,1-.16-1.66,8.21,8.21,0,0,1,0-.86H2.53l.24-1.2a12.36,12.36,0,0,1,12-9.87A12.17,12.17,0,0,1,22,20.78a11.67,11.67,0,0,1,1.79,1.59,8.8,8.8,0,0,1,2.46-1A15.91,15.91,0,0,0,24.75,19.78Z"
                                  fill="#175D9D"
                                />
                                <path
                                  d="M28.47,18.79a11.51,11.51,0,0,0-4,.71A11.18,11.18,0,0,0,22,20.78a11.52,11.52,0,0,0-5,8.69c0,.28,0,.57,0,.86A11.4,11.4,0,0,0,17.05,32a11.53,11.53,0,1,0,11.41-13.2Zm0,20.76A9.21,9.21,0,0,1,19.4,32a8.31,8.31,0,0,1-.16-1.66,8.21,8.21,0,0,1,0-.86,9.24,9.24,0,0,1,4.51-7.09,8.8,8.8,0,0,1,2.46-1,9,9,0,0,1,2.22-.27,9.23,9.23,0,1,1,0,18.46Z"
                                  fill="#175D9D"
                                />
                                <path
                                  d="M32.24,24.91l-4.6,4.6a1.13,1.13,0,0,0,0,1.63,1.17,1.17,0,0,0,1.63,0l4.6-4.6a1.15,1.15,0,0,0-1.63-1.63Z"
                                  fill="#175D9D"
                                />
                                <circle
                                  cx="28.46"
                                  cy="23.41"
                                  r="1.15"
                                  fill="#175D9D"
                                />
                                <ellipse
                                  cx="27.62"
                                  cy="32.56"
                                  rx="1.23"
                                  ry="1.6"
                                  fill="#175D9D"
                                />
                                <circle
                                  cx="35.38"
                                  cy="30.33"
                                  r="1.15"
                                  fill="#175D9D"
                                />
                                <circle
                                  cx="21.54"
                                  cy="30.33"
                                  r="1.15"
                                  fill="#175D9D"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <h2 className="toggler-title mgn-left">Employment Details</h2>
                        <div id="employmentDetailsToggle" className="toggleAction">
                          <ul className="box-actions" >
                            <li>
                              <a onClick={this.editEmploymentDetails}>
                                <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.openEmpDetailsAudit}>
                                <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                              </a>
                            </li>
                            <li>
                              <Link to={`/Help/${'JIEDGF000'}`} target="_blank"><i className="far fa-question-circle" aria-hidden="true" title="Help" /></Link>
                            </li>
                          </ul>
                        </div>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('globalFields2')} />
                      </div>

                      <div className="toggler-content">

                        <table className="table table--stripes">
                          <tbody>
                            <tr>
                              <td className="table-align">
                                <span className="table-label">Hire Date</span>
                              </td>
                              <td>
                                {this.dateFormatter(this.props.currentEmployee.jobInformation.employmentDetails.globalFields.hireDate)}
                              </td>
                            </tr>
                            <tr>
                              <td className="table-align">
                                <span className="table-label">
                                  Original Start Date
                                </span>
                              </td>
                              <td>
                                {this.dateFormatter(this.props.currentEmployee.jobInformation.employmentDetails.globalFields.originalStartDate)}
                              </td>
                            </tr>
                            <tr>
                              <td className="table-align">
                                <span className="table-label">
                                  Seniority Start Date
                                </span>
                              </td>
                              <td>
                                {this.dateFormatter(this.props.currentEmployee.jobInformation.employmentDetails.globalFields.seniorityStartDate)}
                              </td>
                            </tr>
                            <tr>
                              <td className="table-align">
                                <span className="table-label">
                                  Service Date
                                </span>
                              </td>
                              <td>
                                {this.dateFormatter(this.props.currentEmployee.jobInformation.employmentDetails.globalFields.serviceDate)}
                              </td>
                            </tr>
                            <tr>
                              <td className="table-align">
                                <span className="table-label">
                                  Professional Service Date
                                </span>
                              </td>
                              <td>
                                {this.dateFormatter(this.props.currentEmployee.jobInformation.employmentDetails.globalFields.professionalServiceDate)}
                              </td>
                            </tr>
                            <tr>
                              <td className="table-align">
                                <span className="table-label">
                                  Retire/Resign Date
                                </span>
                              </td>
                              <td>
                                {this.dateFormatter(this.props.currentEmployee.jobInformation.employmentDetails.globalFields.retireDate)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <CustomModal form={<EmploymentDetails formType={this.state.formTypeForEmploymentDetails} data={this.state.currentDataObjectForEmploymentDetails} closeEvent={this.closeEmploymentDetailsForm} submitEvent={this.submitEmploymentDetailsForm} />} show={this.state.showingForEmploymentDetails} />
                        <CustomModal form={<CustomReactTable headerName={'Job Relationships'} auditData={this.state.empDetailsAuditRows} auditColumns={this.state.empDetailsAuditColumns} close={this.closeEmpDetailsAudit} />} show={this.state.empDetailsAuditIsOpen} />
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
  console.log(state.employee.currentEmployee);
  return {
    currentEmployee: state.employee.currentEmployee,
    masterInfo: state.masterData.currentMasterData,
    auditData: state.auditTrail.currentEmployee
  };
}
export default connect(mapStateToProps)(JobInfo);

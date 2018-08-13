/**
 * @file Benefits Component.
 * @author Mahesh
 */
import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import CustomModal from '../JobInfo/CustomModal';
import ClaimsInProcess from './ClaimsInProcessModalForm';
import ProcessedClaimsView from './ProcessedClaimsViewForm';
import CurrentBenefitsAllowance from './CurrentBenefitsAllowanceModalForm';
import AllowanceViewModelForm from './AllowanceViewModelForm';
import PSRPlansModalForm from './PSRPlansModalForm';
import PSRPlansViewForm from './PSRPlansViewForm';
import EnrollmentsModal from './EnrollmentsModalForm';
import { updateBenefitsData, cancelBenefitsData } from '../../actions/EmployeeActions';
import { updateCompanyInfo } from '../../services/CompanyInfo.service';
import { updateAuditInfo } from '../../services/Audit.service';
import { insertAuditForBenefits } from '../../actions/AuditActions';
import { BenefitsType, BenefitsStatusTypes } from './BenefitsConstants';
import CustomReactTable from '../JobInfo/CustomReactTable';
import { postClaims } from '../../actions/BenefitsActions';
import AuthorizedComponent from '../Routes/AuthorizedComponent';
import './Benefits.scss';

class Benefits extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.rowGetterForAllowanceBenefits = this.rowGetterForAllowanceBenefits.bind(this);
    this.rowGetterForPSRPlans = this.rowGetterForPSRPlans.bind(this);
    this.rowGetterForInProcessClaims = this.rowGetterForInProcessClaims.bind(this);
    this.rowGetterForProcessedClaims = this.rowGetterForProcessedClaims.bind(this);
    this.rowGetterForEnrollments = this.rowGetterForEnrollments.bind(this);

    this.openAddAllowanceForm = this.openAddAllowanceForm.bind(this);
    this.openAddPSRPlansForm = this.openAddPSRPlansForm.bind(this);
    this.openAddEnrollmentsForm = this.openAddEnrollmentsForm.bind(this);
    this.openAddForClaimsInProcessForm = this.openAddForClaimsInProcessForm.bind(this);
    // view Forms
    this.openAllowancesViewForm = this.openAllowancesViewForm.bind(this);
    this.openPSRPlansViewForm = this.openPSRPlansViewForm.bind(this);
    this.openProcessedClaimsViewForm = this.openProcessedClaimsViewForm.bind(this);
    // Close functions for Modal forms
    this.closeAllowanceForm = this.closeAllowanceForm.bind(this);
    this.closeAllowanceViewForm = this.closeAllowanceViewForm.bind(this);
    this.closePSRPlansForm = this.closePSRPlansForm.bind(this);
    this.closePSRPlansViewForm = this.closePSRPlansViewForm.bind(this);
    this.closeEnrollmentForm = this.closeEnrollmentForm.bind(this);
    this.closeForClaimsInProcessForm = this.closeForClaimsInProcessForm.bind(this);
    this.closeForProcessedClaimsForm = this.closeForProcessedClaimsForm.bind(this);

    // submit Functions for Modal Forms
    this.submitAllowanceForm = this.submitAllowanceForm.bind(this);
    this.submitPSRPlansForm = this.submitPSRPlansForm.bind(this);
    this.submitEnrollmentForm = this.submitEnrollmentForm.bind(this);
    this.submitForClaimsInProcessForm = this.submitForClaimsInProcessForm.bind(this);

    // Edit functions for Modal Forms
    this.handleEditForAllowanceForm = this.handleEditForAllowanceForm.bind(this);
    this.handleEditForPSPlansForm = this.handleEditForPSPlansForm.bind(this);
    this.handleEditForEnrollmentForm = this.handleEditForEnrollmentForm.bind(this);
    this.handleEditforClaimsInProcessForm = this.handleEditforClaimsInProcessForm.bind(this);

    // cancelAction for all Tables in the benefits Screen by passing thesubsection name to the function
    this.cancelRecordforBenefits = this.cancelRecordforBenefits.bind(this);
    // RowIdmethods
    this.getRowIDForClaimsInProcess = this.getRowIDForClaimsInProcess.bind(this);
    this.getRowIDForProcessedClaims = this.getRowIDForProcessedClaims.bind(this);
    this.getRowIDForAllowanceBenefits = this.getRowIDForAllowanceBenefits.bind(this);
    this.getRowIDForPSRPlans = this.getRowIDForPSRPlans.bind(this);
    this.getRowIDForEnrollments = this.getRowIDForEnrollments.bind(this);
    // auditTable Changes
    this.closeAllowancesAuditTable = this.closeAllowancesAuditTable.bind(this);
    this.closePSRPlansAuditTable = this.closePSRPlansAuditTable.bind(this);
    this.closeEnrollemntsAuditTable = this.closeEnrollemntsAuditTable.bind(this);
    this.closeInprocessClaimsAuditTable = this.closeInprocessClaimsAuditTable.bind(this);
    this.openAllowancesAuditTable = this.openAllowancesAuditTable.bind(this);
    this.openPSRPlansAuditTable = this.openPSRPlansAuditTable.bind(this);
    this.openEnrollmentsAuditTable = this.openEnrollmentsAuditTable.bind(this);
    this.openInprocessClaimsAuditTable = this.openInprocessClaimsAuditTable.bind(this);
    // To remove
    this.formattedRowsforTable = this.formattedRowsforTable.bind(this);
    this.save = this.save.bind(this);
    this.isValidforCancel = this.isValidforCancel.bind(this);
    this.setSyncedWithServer = this.setSyncedWithServer.bind(this);
    this.prepareRows = this.prepareRows.bind(this);
    this.isOverlappingWithClaim = this.isOverlappingWithClaim.bind(this);
    this.getEligibleEnrollments = this.getEligibleEnrollments.bind(this);
    this.determineQuarter = this.determineQuarter.bind(this);

    this.state = {
      syncedWithServer: undefined,
      // DatagridChanges
      coloumnsForAllowanceBenefits: [{ key: 'allowanceType', name: 'Allowance Type', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'status', name: 'Status', resizable: true }, { key: 'startDate', name: 'Start Date', resizable: true }, { key: 'endDate', name: 'End Date', resizable: true }, { key: 'requestedDate', name: 'RequestedDate', resizable: true }],
      coloumnsForPSRPlans: [{ key: 'allowanceType', name: 'PlanType', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'status', name: 'Status', resizable: true }, { key: 'startDate', name: 'Start Date', resizable: true }, { key: 'endDate', name: 'End Date', resizable: true }, { key: 'requestedDate', name: 'RequestedDate', resizable: true }],
      coloumnsForEnrollments: [{ key: 'enrollmentType', name: 'Type', resizable: true }, { key: 'startDate', name: 'Start Date', resizable: true }, { key: 'endDate', name: 'End Date', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'status', name: 'Status', resizable: true }],
      // coloumnsForEnrollments: [{ key: 'enrollmentType', name: 'Type', resizable: true, formatter: EnrollmentsSummaryFormatter }, { key: 'status', name: 'Status', resizable: true }],
      // coloumnsForEnrollments: [{ key: 'enrollmentType', name: 'Type', resizable: true }, { key: 'startDate', name: 'Start Date', resizable: true }, { key: 'endDate', name: 'End Date', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'requestedDate', name: 'RequestedDate', resizable: true }, { key: 'approvedBy', name: 'Approved By', resizable: true }, { key: 'approvedDate', name: 'ApprovedDate', resizable: true }, { key: 'status', name: 'Status', resizable: true }],
      coloumnsForInProcessClaims: [{ key: 'claimType', name: 'Type', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'requestedDate', name: 'Requested Date', resizable: true }, { key: 'status', name: 'Status', resizable: true }, { key: 'documents', name: 'documents', resizable: true }],
      coloumnsForProcessedClaims: [{ key: 'claimType', name: 'Type', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'requestedDate', name: 'Requested Date', resizable: true }, { key: 'status', name: 'Status', resizable: true }, { key: 'documents', name: 'documents', resizable: true }],
      rowsForAllowanceBenefits: [],
      rowsForPSRPlans: [],
      rowsforEnrollments: [],
      rowsForInProcessClaims: [],
      rowsForProcessedClaims: [],
      // Seleceted Index
      currentSelectedIndexForAllowanceBenefits: [-1],
      currentSelectedIndexForPSRPlans: [-1],
      currentSelectedIndexForInProcessClaims: [-1],
      currentSelectedIndexForProcessedClaims: [-1],
      currentSelectedIndexForEnrollments: [-1],
      // DataGrid Object
      currentDataGridObjectForAllowanceBenefits: {},
      currentDataGridObjectForPSRPlans: {},
      currentDataGridObjectForEnrollments: {},
      currentGridDataObjectInprocessClaims: {},
      currentGridDataObjectForProcessedClaims: {},
      //
      CBAGridSize: 35,
      CBPSRGridSize: 35,
      IPCGridSize: 35,
      PCGridSize: 35,
      ENLGridSize: 35,
      // Changes for Modal forms
      showAllowanceModalForm: false,
      showPSRPlansModalForm: false,
      showClaimsInProcessForm: false,
      showProcessedClaimsForm: false,
      showEnrollmentsForm: false,
      // view Forms
      showAllowanceViewForm: false,
      showPSRPlansViewForm: false,
      // Changes for determining type of modal forms
      formTypeForClaimsInProcess: undefined,
      formTypeForAllowances: undefined,
      formTypeForPSRPlans: undefined,
      formTypeForEnrollments: undefined,
      // Changes made for AuditTrail
      allowanceAuditIsOpen: false,
      psrPlansAuditIsOpen: false,
      enrollmentsAuditIsOpen: false,
      inprocessClaimsAuditisOpen: false,
      rowsForAllowancesAudits: [],
      rowsForPSRPlansAudits: [],
      rowsForEnrollmentsAudits: [],
      rowsForinProcessClaimsAudit: [],
      // Coloumns For Audit Table using Accessor  and header Value
      coloumnsForAllowancesAudits: [{ accessor: 'allowanceType', Header: 'AllowanceType' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'frequency', Header: 'Frequency' }, { accessor: 'insertedBy', Header: 'InsertedBy' }, { accessor: 'insertedDate', Header: 'InsertedDate' }, { accessor: 'operation', Header: 'Operation' }],
      coloumnsForPSRPlansAudits: [{ accessor: 'allowanceType', Header: 'Plan Type' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'frequency', Header: 'Frequency' }, { accessor: 'insertedBy', Header: 'InsertedBy' }, { accessor: 'insertedDate', Header: 'InsertedDate' }, { accessor: 'operation', Header: 'Operation' }],
      coloumnsForEnrollmentsAudits: [{ accessor: 'enrollmentType', Header: 'Enrollment Type' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'frequency', Header: 'Frequency' }, { accessor: 'insertedBy', Header: 'InsertedBy' }, { accessor: 'insertedDate', Header: 'InsertedDate' }, { accessor: 'operation', Header: 'Operation' }],
      coloumnsForInprocessClaimsAudits: [{ accessor: 'claimType', Header: 'Claim Type' }, { accessor: 'amount', Header: 'Amount' }, { accessor: 'currency', Header: 'Currency' }, { accessor: 'frequency', Header: 'Frequency' }, { accessor: 'insertedBy', Header: 'InsertedBy' }, { accessor: 'insertedDate', Header: 'InsertedDate' }, { accessor: 'operation', Header: 'Operation' }],
      // Storing Names of masterData to display names instyead of code.
      drop_enrollmentType_names: [],
      drop_allowanceType_names: [],
      drop_planType_names: [],
      // Eligible Enrollments to Display
      eligibleEnrollmentsForClaim: []
    };
  }

  componentDidMount() {
    console.log('ProcessedClaims, ComponentDIDMount');
  }

  componentWillReceiveProps(newProps) {
    const dateFormattedDataForAllowances = [];
    newProps.currentEmployee.benefits.currentBenefits.allowance.map((obj) => {
      // alert("ee");
      const tempObj = {};
      Object.keys(obj).forEach((key) => {
        if (key === 'startDate') {
          const formattedDate = (obj.startDate) ? moment(obj.startDate).format('DD-MMM-YYYY') : '';
          tempObj.startDate = formattedDate;
        } else if (key === 'endDate') {
          const formattedDate = (obj.endDate) ? moment(obj.endDate).format('DD-MMM-YYYY') : '';
          tempObj.endDate = formattedDate;
        } else if (key === 'requestedDate') {
          const formattedDate = (obj.requestedDate) ? moment(obj.requestedDate).format('DD-MMM-YYYY') : '';
          tempObj.requestedDate = formattedDate;
        } else {
          tempObj[key] = obj[key];
        }
      });
      dateFormattedDataForAllowances.push(tempObj);
      return null;
    });
    const dateFormattedDataForPSRPlans = [];
    console.log('kaushik', newProps.currentEmployee.benefits.currentBenefits.psrPlans);
    newProps.currentEmployee.benefits.currentBenefits.psrPlans.map((obj) => {
      const tempObj = {};
      Object.keys(obj).forEach((key) => {
        if (key === 'startDate') {
          const formattedDate = (obj.startDate) ? moment(obj.startDate).format('DD-MMM-YYYY') : '';
          tempObj.startDate = formattedDate;
        } else if (key === 'endDate') {
          const formattedDate = (obj.endDate) ? moment(obj.endDate).format('DD-MMM-YYYY') : '';
          tempObj.endDate = formattedDate;
        } else if (key === 'requestedDate') {
          const formattedDate = (obj.requestedDate) ? moment(obj.requestedDate).format('DD-MMM-YYYY') : '';
          tempObj.requestedDate = formattedDate;
        } else {
          tempObj[key] = obj[key];
        }
      });
      dateFormattedDataForPSRPlans.push(tempObj);
      return null;
    });

    // Storing DropdownNames from masterdata at Once to show it in datagrid
    if (newProps.masterInfo.length > 0) {
      console.log('hiiam');
      newProps.masterInfo.map((obj) => {
        if (obj.masterDataType.code === 'ENROLLMENT TYPE') {
          console.log('hiiam1', obj.masterDataType);
          this.state.drop_enrollmentType_names = obj.masterDataType.names;
        } else if (obj.masterDataType.code === 'PLAN TYPE') {
          console.log('hiiam1', obj.masterDataType);
          this.state.drop_planType_names = obj.masterDataType.names;
        } else if (obj.masterDataType.code === 'ALLOWANCE TYPE') {
          console.log('hiiam1', obj.masterDataType);
          this.state.drop_allowanceType_names = obj.masterDataType.names;
        }
        return null;
      });
    }

    const INPRowCount = newProps.currentEmployee.benefits.claims.inprocessClaims.length + 1;
    const PCRowCount = newProps.currentEmployee.benefits.claims.processedClaims.length + 1;
    const CBARowCount = newProps.currentEmployee.benefits.currentBenefits.allowance.length + 1;
    const CBPSRRowCount = newProps.currentEmployee.benefits.currentBenefits.psrPlans.length + 1;
    const ENLRowCount = newProps.currentEmployee.benefits.enrollments.length + 1;

    this.setState({ rowsForInProcessClaims: newProps.currentEmployee.benefits.claims.inprocessClaims });
    this.setState({ rowsForProcessedClaims: newProps.currentEmployee.benefits.claims.processedClaims });
    this.setState({ rowsforEnrollments: newProps.currentEmployee.benefits.enrollments });
    this.setState({ rowsForAllowanceBenefits: dateFormattedDataForAllowances });
    this.setState({ rowsForPSRPlans: dateFormattedDataForPSRPlans });
    this.setState({ rowsForAllowancesAudits: newProps.auditData.benefits.currentBenefits.allowance });
    this.setState({ rowsForPSRPlansAudits: newProps.auditData.benefits.currentBenefits.psrPlans });
    this.setState({ rowsForEnrollmentsAudits: newProps.auditData.benefits.enrollments });
    this.setState({ rowsForinProcessClaimsAudit: newProps.auditData.benefits.claims.inprocessClaims });
    this.setState({ IPCGridSize: INPRowCount * 35 });
    this.setState({ PCGridSize: PCRowCount * 35 });
    this.setState({ CBAGridSize: CBARowCount * 35 });
    this.setState({ CBPSRGridSize: CBPSRRowCount * 35 });
    this.setState({ ENLGridSize: ENLRowCount * 35 });
  }
  getEligibleEnrollments() {
    const activeEnrollments = this.props.currentEmployee.benefits.enrollments.filter((row) =>
    row.status === BenefitsStatusTypes.ACTIVE);
    const inProcessClaims = this.props.currentEmployee.benefits.claims.inprocessClaims;
    const processedClaims = this.props.currentEmployee.benefits.claims.processedClaims;
    const claims = (inProcessClaims.concat(processedClaims)).filter((obj) =>
     obj.status === 'Active' || obj.status === 'Pending');
    console.log('active claims', inProcessClaims, processedClaims, claims);
    const eligibleEnrollments = [];
    let overlapped = false;

    activeEnrollments.map((obj) => {
      const startdate = moment(obj.startDate);
      console.log('ernoll obj , startDateCheck1', obj, startdate, moment());
      const value = moment(startdate).diff(moment(), 'days', true);
      console.log('valueeis', value);
      let isClaimMatched = false;
      // if (obj.startDate > todaysdate) flag = false;
      if (value > 0) {
        console.log('dsd1');
      } else {
        console.log('hi start date  lessthan normalDate', claims);
        claims.map((row) => {
          console.log('helloa', row.claimType, obj.enrollmentType);
          if (row.claimType === obj.enrollmentType) {
            console.log('Claim Type Matched: enr - claim', obj, row);
            isClaimMatched = true;
            overlapped = this.isOverlappingWithClaim(obj, row);
            if (!overlapped) {
              eligibleEnrollments.push(obj);
            } else {
              console.log('Enrollment Has a overlapped Claim and is', obj, row);
            }
          }
          return null;
        });
        // No claim matched for enrollment, and startdate less than todays date push.
        if (isClaimMatched === false && value < 0) {
          console.log('noClaim matched for the enrollnet', obj);
          eligibleEnrollments.push(obj);
        }
      }
      return null;
    });
    console.log('eligibleEnrollments', eligibleEnrollments);
    return eligibleEnrollments;
  }

  setSyncedWithServer = (value) => {
    console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  getRowIDForAllowanceBenefits(data) {
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForAllowanceBenefits: rowID });
    const object = this.state.rowsForAllowanceBenefits[temp];
    object.uniqueID = temp;
    this.setState({ currentDataGridObjectForAllowanceBenefits: object });
  }

  getRowIDForPSRPlans(data) {
    const temp = data.rowIdx;
    const rowID = [temp];
    const object = this.state.rowsForPSRPlans[temp];
    object.uniqueID = temp;
    this.setState({ currentSelectedIndexForPSRPlans: rowID });
    this.setState({ currentDataGridObjectForPSRPlans: object });
    console.log('textimage', object);
  }

  getRowIDForEnrollments(data) {
    console.log('getRowIDForEnrollments', data);
    const temp = data.rowIdx;
    const rowID = [temp];
    const object = this.state.rowsforEnrollments[temp];
    object.uniqueID = temp;
    console.log('object12ddd', object);
    this.setState({ currentSelectedIndexForEnrollments: rowID });
    this.setState({ currentDataGridObjectForEnrollments: object });
  }

  getRowIDForClaimsInProcess(data) {
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForInProcessClaims: rowID });
    const object = this.state.rowsForInProcessClaims[temp];
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectInprocessClaims: object });
  }

  getRowIDForProcessedClaims(data) {
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForProcessedClaims: rowID });
    const object = this.state.rowsForProcessedClaims[temp];
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForProcessedClaims: object });
  }
  formattedRowsforTable() {
    console.log('function called');
  }

  rowGetterForAllowanceBenefits(index) {
    const currentRow = Object.assign({}, this.state.rowsForAllowanceBenefits[index]);
    this.state.drop_allowanceType_names.map((obj) => {
      if (obj.status === 'Active' && obj.code === currentRow.allowanceType) {
        currentRow.allowanceType = obj.name;
      }
      return null;
    });
    return currentRow;
    // return this.state.rowsForAllowanceBenefits[index];
  }

  rowGetterForPSRPlans(index) {
    const currentRow = Object.assign({}, this.state.rowsForPSRPlans[index]);
    this.state.drop_planType_names.map((obj) => {
      if (obj.status === 'Active' && obj.code === currentRow.allowanceType) {
        currentRow.allowanceType = obj.name;
      }
      return null;
    });
    return currentRow;
    // return this.state.rowsForPSRPlans[index];
  }

  rowGetterForEnrollments(index) {
    // console.log('rowGetterForEnrollments123', this.state.rowsforEnrollments[index]);
    const currentRow = Object.assign({}, this.state.rowsforEnrollments[index]);
    this.state.drop_enrollmentType_names.map((obj) => {
      if (obj.status === 'Active' && obj.code === currentRow.enrollmentType) {
        currentRow.enrollmentType = obj.name;
      }
      return null;
    });
    let formattedDate = (currentRow.startDate) ? moment(currentRow.startDate).format('DD-MMM-YYYY') : '';
    currentRow.startDate = formattedDate;
    formattedDate = (currentRow.endDate) ? moment(currentRow.endDate).format('DD-MMM-YYYY') : '';
    currentRow.endDate = formattedDate;
    return currentRow;
  }

  rowGetterForInProcessClaims(index) {
    // console.log('these are the rows: ', this.state.rowsForInProcessClaims[index]);
    const currentRow = Object.assign({}, this.state.rowsForInProcessClaims[index]);
    this.state.drop_enrollmentType_names.map((obj) => {
      if (obj.status === 'Active' && obj.code === currentRow.claimType) {
        currentRow.claimType = obj.name;
      }
      return null;
    });
    const formattedDate = (currentRow.requestedDate) ? moment(currentRow.requestedDate).format('DD-MMM-YYYY') : '';
    currentRow.requestedDate = formattedDate;
    currentRow.documents = currentRow.documents.length;
    return currentRow;
    // return this.state.rowsForInProcessClaims[index];
  }

  rowGetterForProcessedClaims(index) {
    const currentRow = Object.assign({}, this.state.rowsForProcessedClaims[index]);
    this.state.drop_enrollmentType_names.map((obj) => {
      if (obj.status === 'Active' && obj.code === currentRow.claimType) {
        currentRow.claimType = obj.name;
      }
      return null;
    });
    const formattedDate = (currentRow.requestedDate) ? moment(currentRow.requestedDate).format('DD-MMM-YYYY') : '';
    currentRow.requestedDate = formattedDate;
    return currentRow;
  }

  isOverlappingWithClaim(enroll, claim) {
    const claimMonth = moment(claim.requestedDate).month();
    const claimYear = moment(claim.requestedDate).year();
    const timedifference = moment(claim.requestedDate).diff(moment(), 'months', true);
    console.log('month_timediffrence, frequency', claimMonth, timedifference, enroll.frequency);
    let flag = false;
    if (enroll.frequency === 'Monthly') {
      // MONTHLY Frequency: If Claim is present in the present Month - flag set to true
      if ((claimMonth === moment().month()) && claimYear === moment().year()) {
        flag = true;
        console.log('Claim Already Present For this Month, month, year', claimMonth, claimYear);
      }
    } else if ((enroll.frequency === 'Yearly') && (claimYear === moment().year())) {
      // user has already a claim with same type in the present year - flag set to true.
      flag = true;
      console.log('Claim Already Present For this Year- year', claimYear);
    } else if ((enroll.frequency === 'Quarterly')) {
      const claimQuarter = this.determineQuarter(claimMonth);
      if (claimQuarter === this.determineQuarter(moment().month()) && (claimYear === moment().year())) {
        flag = true;
        console.log('Claim Already Present For this Quarter', claimMonth, claimYear, claimQuarter);
      }
    } else {
      console.log(claim.claimType, '_NotOverlapped');
    }
    return flag;
  }

  determineQuarter(month) {
    const quarter = (month + 1) / 4;
    return quarter;
  }

  openAddForClaimsInProcessForm() {
    console.log('elgibleEnrollmenys', this.getEligibleEnrollments());
    this.setState({ eligibleEnrollmentsForClaim: this.getEligibleEnrollments() });
    this.setState({ showClaimsInProcessForm: true });
    this.setState({ formTypeForClaimsInProcess: 'add' });
    this.setState({ currentGridDataObjectInprocessClaims: {} });
  }

  openAddAllowanceForm() {
    this.setState({ showAllowanceModalForm: true });
    this.setState({ formTypeForAllowances: 'add' });
    this.setState({ currentDataGridObjectForAllowanceBenefits: {} });
  }

  openAddPSRPlansForm() {
    console.log('OpenAddPSPlans method');
    this.setState({ showPSRPlansModalForm: true });
    this.setState({ formTypeForPSRPlans: 'add' });
    this.setState({ currentDataGridObjectForPSRPlans: {} });
  }

  openAddEnrollmentsForm() {
    this.setState({ showEnrollmentsForm: true });
    this.setState({ formTypeForEnrollments: 'add' });
    this.setState({ currentDataGridObjectForEnrollments: {} });
  }

  openProcessedClaimsViewForm() {
    console.log('openView Form');
    console.log('View Form Proceed claims: CurrentdataGrid ', this.state.currentGridDataObjectForProcessedClaims.status);
    if (this.state.currentGridDataObjectForProcessedClaims.status) {
      console.log('hipah');
      this.setState({ showProcessedClaimsForm: true });
    } else {
      alert('Please select a row for view');
    }
  }

  openAllowancesViewForm() {
    console.log('openView Form');
    console.log('ViewFormBenefitsAllowancesgrid', this.state.currentDataGridObjectForAllowanceBenefits);
    if (this.state.currentDataGridObjectForAllowanceBenefits.status) {
      this.setState({ showAllowanceViewForm: true });
    } else {
      alert('Please select a row for view');
    }
  }

  openPSRPlansViewForm() {
    console.log('openPSRVIEWFORM MEthod');
    console.log('currentDataGridObjectForPSRPlans', this.state.currentDataGridObjectForPSRPlans);
    if (this.state.currentDataGridObjectForPSRPlans.status) {
      this.setState({ showPSRPlansViewForm: true });
    } else {
      alert('Please select a row for view');
    }
  }

  closeForClaimsInProcessForm() {
    this.setState({ showClaimsInProcessForm: false });
    this.setState({ formTypeForClaimsInProcess: undefined });
    this.setState({ currentSelectedIndexForInProcessClaims: [-1] });
    this.setState({ currentGridDataObjectInprocessClaims: {} });
  }

  closeForProcessedClaimsForm() {
    this.setState({ showProcessedClaimsForm: false });
    this.setState({ currentSelectedIndexForProcessedClaims: [-1] });
    this.setState({ currentGridDataObjectForProcessedClaims: {} });
  }

  closeAllowanceForm() {
    // if(this.state.showAllowanceModalForm === true )
    this.setState({ showAllowanceModalForm: false });
    // else if(this.state.showAllowanceViewForm === true)
    // this.setState({ showAllowanceViewForm: false});
    this.setState({ currentSelectedIndexForAllowanceBenefits: [-1] });
    this.setState({ currentDataGridObjectForAllowanceBenefits: {} });
  }

  closeAllowanceViewForm() {
    this.setState({ showAllowanceViewForm: false });
    this.setState({ currentDataGridObjectForAllowanceBenefits: {} });
    this.setState({ currentSelectedIndexForAllowanceBenefits: [-1] });
  }

  closePSRPlansForm() {
    this.setState({ showPSRPlansModalForm: false });
    this.setState({ currentDataGridObjectForPSRPlans: {} });
    this.setState({ currentSelectedIndexForPSRPlans: [-1] });
  }

  closeEnrollmentForm() {
    this.setState({ showEnrollmentsForm: false });
    this.setState({ currentDataGridObjectForEnrollments: false });
    this.setState({ currentSelectedIndexForEnrollments: [-1] });
  }

  closePSRPlansViewForm() {
    this.setState({ showPSRPlansViewForm: false });
    this.setState({ currentDataGridObjectForPSRPlans: {} });
    this.setState({ currentSelectedIndexForPSRPlans: [-1] });
  }

  handleEditForAllowanceForm() {
    console.log('handleEditCurBnefitsAllowances', this.state.currentDataGridObjectForAllowanceBenefits);
    if (this.state.currentDataGridObjectForAllowanceBenefits.status) { // tolearn
      this.setState({ showAllowanceModalForm: true });
      this.setState({ formTypeForAllowances: 'edit' });
    } else alert('Please Select a row to edit');
  }

  handleEditForPSPlansForm() {
    console.log('handleEditForPSPlansForm', this.state.currentDataGridObjectForPSRPlans);
    if (this.state.currentDataGridObjectForPSRPlans.status) { // tolearn
      this.setState({ showPSRPlansModalForm: true });
      this.setState({ formTypeForPSRPlans: 'edit' });
    } else alert('Please Select a row to edit');
  }

  handleEditForEnrollmentForm() {
    console.log('handleEditForEnrollmentForm', this.state.currentDataGridObjectForEnrollments);
    if (this.state.currentDataGridObjectForEnrollments.status) { // tolearn
      this.setState({ showEnrollmentsForm: true });
      this.setState({ formTypeForEnrollments: 'edit' });
    } else alert('Please Select a row to edit');
  }

  handleEditforClaimsInProcessForm() {
    console.log('handleEditClaims', this.state.currentGridDataObjectInprocessClaims.code);
    let flag = false;
    console.log('status12', this.state.currentGridDataObjectInprocessClaims.status);
    if (this.state.currentSelectedIndexForInProcessClaims < 0) { // check for whether a row is selected or not
      alert('Please Select a Row');
    } else if (this.state.currentGridDataObjectInprocessClaims.status !== BenefitsStatusTypes.PENDING) {
      alert('Can perform edit only for a claim whose status is Pending');
    } else {
      flag = true;
    }

    if (flag) {
      this.setState({ showClaimsInProcessForm: true });
      this.setState({ formTypeForClaimsInProcess: 'edit' });
    }
  }

  isValidforCancel(index, record) {
    let flag = false;

    if (record.status === BenefitsStatusTypes.PENDING) {
      flag = true;
      console.log('validforcancel');
    } else if (record.status !== BenefitsStatusTypes.PENDING) {
      console.log('Record Selected Pending');
      alert('Cannot cancel a record whose status is not Pending');
    }
    return flag;
  }

  /* A common method for cancelling a record for Current benefits
      Allowance and Pensions/Savings/Returments Plans
  */
  cancelRecordforBenefits(str) {
    let index = {}; // index for getting index
    let record = {}; // current selected record
    let fields = {}; // To popolate the field Names to be populated

    console.log('cancelBenefitsRecordsubsection');
    /* To determine for which table cancel action should be performed  based on the string str passsed
    and pass the relavant record and fieldNames
    */
    if (str === BenefitsType.ALLOWANCES) {
      index = this.state.currentSelectedIndexForAllowanceBenefits[0];
      record = this.state.currentDataGridObjectForAllowanceBenefits;
      fields = ['benefits_currentBenefits_allowance_status', 'benefits_currentBenefits_allowance_requestedDate'];
      console.log('gdshdgj', index, record);
    } else if (str === BenefitsType.PSRPlans) {
      index = this.state.currentSelectedIndexForPSRPlans[0];
      record = this.state.currentDataGridObjectForPSRPlans;
      fields = ['benefits_currentBenefits_psrPlans_status', 'benefits_currentBenefits_psrPlans_requestedDate'];
    } else if (str === BenefitsType.ENROLLMENTS) {
      index = this.state.currentSelectedIndexForEnrollments[0];
      record = this.state.currentDataGridObjectForEnrollments;
      fields = ['benefits_enrollments_status', 'benefits_enrollments_requestedDate'];
    } else if (str === BenefitsType.INPROCESSCLAIMS) {
      index = this.state.currentSelectedIndexForInProcessClaims[0];
      record = this.state.currentGridDataObjectInprocessClaims;
      fields = ['benefits_claims_inprocessClaims_status', 'benefits_claims_inprocessClaims_requestedDate'];
    }
    console.log('recordtypeAfter123', record, index, record, fields, str);

    if (index === -1) {
      alert('Please select a row');
    } else {
      const valid = this.isValidforCancel(index, record);
      let values = {};
      if (valid) { // populating values for audit data
        values = [BenefitsStatusTypes.CANCELLED, record.requestedDate];
        this.props.dispatch(
          cancelBenefitsData({ subsection: str, index }
          )
        );
        console.log('dispatched cancel data');
        this.props.dispatch(
         insertAuditForBenefits({ value: values, field: fields, operation: 'CANCEL', insertedBy: 'Auditya' })
        );
        this.save();
        // Making All the Selected rows unselected
        this.setState({ currentSelectedIndexForAllowanceBenefits: [-1] });
        this.setState({ currentDataGridObjectForAllowanceBenefits: {} });
        this.setState({ currentSelectedIndexForPSRPlans: [-1] });
        this.setState({ currentDataGridObjectForPSRPlans: {} });
      }
    }
  }

  updateFileDetails(data) {
    console.log('filedata', data);
    this.save();
  }
  submitForClaimsInProcessForm(data, hiddenType) {
    const key = '_id';
    if (hiddenType === 'add') {
      console.log('hddjahdjk', data.acceptedFilesData);

      postClaims(data, this.props.currentEmployee[key], this.props.dispatch);

      // postFile(data.acceptedFilesData, this.props.currentEmployee[key], this.updateFileDetails);
      // console.log(values, fields);

      // this.props.dispatch(
      //   updateBenefitsData(
      //     { value: values, field: fields, type: hiddenType }
      //   )
      // );

      // this.props.dispatch(
      //   insertAuditForBenefits({ value: values, field: fields, operation: 'INSERT', insertedBy: 'Auditya' })
      // );
    } else if (hiddenType === 'edit') {
      // updating al the fields except approval data, approved by,
      const values = [data.claimType, data.amount, data.currency, data.claimAmount, data.requestedDate, data.status, data.approvedBy, data.approvalDate];
      const fields = [data.claimTypeField, data.amountField, data.currencyField, data.claimAmountField, data.requestedDateField, data.statusField];
      const rowid = data.id;
      // console.log('hddjahdjk', data.acceptedFiles);
      // console.log('jsdsad', postFile(data.acceptedFiles));
      // console.log(values, fields, rowid);
      this.props.dispatch(
        updateBenefitsData(
          { value: values, field: fields, id: rowid, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'UPDATE', insertedBy: 'Auditya' })
      );
      console.log('in claimsinProcess Benefits submit12Edit');
    }
    // this.save();
    this.setState({ showClaimsInProcessForm: false });
    this.setState({ formTypeForClaimsInProcess: undefined });
    this.setState({ currentSelectedIndexForInProcessClaims: [-1] });
    this.setState({ currentGridDataObjectInprocessClaims: {} });
  }

  submitAllowanceForm(data, hiddenType) {
    console.log('submitForOtherBenefitsAllowanceForm', data, hiddenType);
    console.log(this.state.formTypeForAllowances, 'formTypeForAllowances');
    const values = [data.allowanceType, data.amount, data.currency, data.frequency, data.startDate, data.endDate, data.status, data.lastUpdatedDate, data.requestedDate, data.actionDate];
    const fields = [data.allowanceTypeField, data.amountField, data.currencyField, data.frequencyField, data.startDateField, data.endDateField, data.statusField, data.lastUpdatedDateField, data.requestedDateField, data.actionDateField];

    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updateBenefitsData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'INSERT', insertedBy: 'Auditya' })
      );
    } else if (hiddenType === 'edit') {
      console.log('edit');
      const rowid = data.id;
      this.props.dispatch(
        updateBenefitsData(
          { value: values, field: fields, id: rowid, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'UPDATE', insertedBy: 'Auditya' })
      );
    }
    this.save();
    this.setState({ showAllowanceModalForm: false });
    this.setState({ formTypeForAllowances: undefined });
    this.setState({ currentSelectedIndexForAllowanceBenefits: [-1] });
    this.setState({ currentDataGridObjectForAllowanceBenefits: {} });
  }

  submitPSRPlansForm(data, hiddenType) {
    console.log('submitPSRPlansForm', data, hiddenType);
    console.log(this.state.formTypeForPSRPlans, 'formTypeForPSRPlans');
    console.log('hdjshdkj', typeof data.startDate);
    const values = [data.allowanceType, data.amount, data.currency, data.frequency, data.startDate, data.endDate, data.status, data.lastUpdatedDate, data.requestedDate, data.actionDate];
    const fields = [data.allowanceTypeField, data.amountField, data.currencyField, data.frequencyField, data.startDateField, data.endDateField, data.statusField, data.lastUpdatedDateField, data.requestedDateField, data.actionDateField];
    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updateBenefitsData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'INSERT', insertedBy: 'Auditya' })
      );
    } else if (hiddenType === 'edit') {
      console.log('edit');
      const rowid = data.id;
      this.props.dispatch(
        updateBenefitsData(
          { value: values, field: fields, id: rowid, type: hiddenType }
        )
      );
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'UPDATE', insertedBy: 'Auditya' })
      );
    }
    this.save();
    this.setState({ showPSRPlansModalForm: false });
    this.setState({ formTypeForPSRPlans: undefined });
    this.setState({ currentSelectedIndexForPSRPlans: [-1] });
    this.setState({ currentDataGridObjectForPSRPlans: {} });
  }

  submitEnrollmentForm(data, hiddenType) {
    if (hiddenType === 'add') {
      console.log('Submit1', hiddenType);
    }
    console.log('Submit Enrollments Form', data, hiddenType);
    const values = [data.enrollmentType, data.startDate, data.endDate, data.amount, data.currency, data.frequency, data.requestedDate, data.approvedBy, data.approvalDate, data.status];
    const fields = [data.enrollmentTypeField, data.startDateField, data.endDateField, data.amountField, data.currencyField, data.frequencyField, data.requestedDateField, data.approvedByField, data.approvalDateField, data.statusField];
    if (hiddenType === 'add') {
      console.log('adddas');
      this.props.dispatch(
        updateBenefitsData(
          { value: values, field: fields, type: hiddenType }
        ));
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'INSERT', insertedBy: 'Auditya' })
      );
    } else if (hiddenType === 'edit') {
      const rowid = data.id;
      this.props.dispatch(updateBenefitsData(
        { value: values, field: fields, id: rowid, type: hiddenType }
      ));
      this.props.dispatch(
        insertAuditForBenefits({ value: values, field: fields, operation: 'UPDATE', insertedBy: 'Auditya' })
      );
    }
    this.save();
    this.setState({ showEnrollmentsForm: false });
    this.setState({ formTypeForEnrollments: undefined });
    this.setState({ currentDataGridObjectForEnrollments: {} });
    this.setState({ currentSelectedIndexForEnrollments: [-1] });
  }

  // // TODO : To Change this to
  // approvePendingEnrollment() {
  //   const index = this.state.currentSelectedIndexForEnrollments[0];
  //   const selectedRecord = this.state.currentDataGridObjectForEnrollments;
  //   console.log('approvalrecord', index, selectedRecord);
  //   this.prepareRows(selectedRecord);
  //   if (index > -1) {
  //     this.props.dispatch(
  //       approveBenefitEnrollment(
  //         { record: selectedRecord, approvedBy: 'Shyam', approvalDate: new Date() }
  //       )
  //     );
  //   } else {
  //     alert('please Select A Record for Approve');
  //   }
  // }
  /* preparing the row for the */
  prepareRows(record) {
    const monthNames = moment.monthsShort();

    const startDate = moment(record.startDate, 'YYYY-MM-DD');
    const endDate = moment(record.endDate, 'YYYY-MM-DD');
    console.log('startDate', startDate.month(), startDate.date(), startDate.year());
    console.log('endtDate', endDate.month(), endDate.date(), endDate.year());

    const days = endDate.diff(startDate, 'days');
    const months = endDate.diff(startDate, 'months');
    const years = endDate.diff(startDate, 'year');
    const noofrecords = (endDate.month() - startDate.month()) + 1;
    console.log('days-months-years-no-ofrecords', days, years, months, noofrecords);

    const claimArray = [];
    const claimrecord = {};
    const initialMonth = startDate.month();

    for (let i = 0; i < noofrecords; i += 1) {
      claimrecord.status = BenefitsStatusTypes.OPEN;
      claimrecord.period = monthNames[initialMonth];
      claimrecord.frequency = record.frequency;
      claimrecord.amount = record.amount;
      claimrecord.currency = record.currency;
      claimrecord.claimType = record.enrollmentType;
      claimrecord.approvalDate = null;
      claimrecord.approvedBy = '';
      claimrecord.requestedDate = '';
      claimArray.push(claimrecord);
    }

    console.log('claimArray', 'monthsName', claimArray, moment.monthsShort());
  }

  openAllowancesAuditTable() {
    this.setState({ allowanceAuditIsOpen: true });
  }

  openPSRPlansAuditTable() {
    this.setState({ psrPlansAuditIsOpen: true });
  }

  openEnrollmentsAuditTable() {
    console.log('auditTableOpen');
    this.setState({ enrollmentsAuditIsOpen: true });
  }

  openInprocessClaimsAuditTable() {
    this.setState({ inprocessClaimsAuditisOpen: true });
  }

  closeAllowancesAuditTable() {
    this.setState({ allowanceAuditIsOpen: false });
  }

  closePSRPlansAuditTable() {
    this.setState({ psrPlansAuditIsOpen: false });
  }

  closeEnrollemntsAuditTable() {
    this.setState({ enrollmentsAuditIsOpen: false });
  }

  closeInprocessClaimsAuditTable() {
    this.setState({ inprocessClaimsAuditisOpen: false });
  }

  save() {
    console.log('Saving the Employee Benefits Data');
    updateCompanyInfo({ employee: this.props.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  /* Common Function to to display the date to Particular Format.
  */

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
                <div className="key-value key-value--salary">15 000</div>

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
                <div className="key-value key-value--bonus">10 000</div>

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
                <div className="key-value key-value--docs">10</div>

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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.21 38">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path d="M15,8a5,5,0,1,0,5,5A5,5,0,0,0,15,8Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,15,16Z" fill="#f4f7fa" />
                          <path
                            d="M22.18,38a1,1,0,0,0,.85-.69l1.44-4.43,4.43,1.44a1,1,0,0,0,1.2-1.41l-5.62-11,.43-.51a13,13,0,1,0-19.7.14l.44.51L.11,32.91A1,1,0,0,0,.24,34a1,1,0,0,0,1.06.3l4.44-1.44,1.44,4.43a1,1,0,0,0,.87.69h.09A1,1,0,0,0,9,37.45l6.08-11.94,6.09,11.94a1,1,0,0,0,.89.55ZM8.33,34.4l-1-3.09a1,1,0,0,0-.5-.58,1,1,0,0,0-.77-.06L3,31.67l4.2-8.24.93.58a13,13,0,0,0,3.4,1.51l1.18.33ZM15,24A11,11,0,1,1,26,13,11,11,0,0,1,15,24Zm2.5,1.81,1.16-.34A13,13,0,0,0,22,23.92l.93-.6,4.26,8.36-3.08-1a1,1,0,0,0-.77.06,1,1,0,0,0-.5.58l-1,3.08Z"
                            fill="#f4f7fa"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Current Benefits</h2>
                  {/* <ul className="box-actions">
                    <li>
                      <a >Edit</a>
                    </li>
                    <li>
                      <a title="Help">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                      </a>
                    </li>
                  </ul> */}
                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner box-inner--no-pad">

                        <div className="toggler active" id="allowance">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">Allowance</h2>
                            <div id="inProcessClaimsToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddAllowanceForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForAllowanceForm}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openAllowancesViewForm}>
                                    <i className="fas fa-eye" aria-hidden="true" title="View" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => this.cancelRecordforBenefits(BenefitsType.ALLOWANCES)}>
                                    <i className="fas fa-times" aria-hidden="true" title="Cancel" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openAllowancesAuditTable}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <Link to={`/Help/${'BECBAL000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('allowance')} />
                          </div>

                          <div className="toggler-content">

                            {/* <table className="table table--stripes table--typeb">
                              <tbody>
                                <tr>
                                  <td>Car Lease Plan</td>
                                  <td>7,000.00 INR Monthly</td>
                                  <td><a className="table-link">Details</a></td>
                                </tr>
                                <tr>
                                  <td>Company Car Lease Plan</td>
                                  <td>20,000.00 INR Monthly</td>
                                  <td><a className="table-link">Details</a></td>
                                </tr>
                              </tbody>
                            </table> */}
                            <ReactDataGrid
                              columns={this.state.coloumnsForAllowanceBenefits}
                              rowGetter={this.rowGetterForAllowanceBenefits}
                              rowsCount={this.state.rowsForAllowanceBenefits.length}
                              minHeight={this.state.CBAGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForAllowanceBenefits}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForAllowanceBenefits
                                }
                              }}
                              enableRowSelect={false}
                            />

                          </div>
                          <CustomModal
                            form={
                              <CurrentBenefitsAllowance
                                formType={this.state.formTypeForAllowances}
                                data={this.state.currentDataGridObjectForAllowanceBenefits}
                                closeEvent={this.closeAllowanceForm}
                                submitEvent={this.submitAllowanceForm}
                              />}
                            show={this.state.showAllowanceModalForm}
                          />
                          <CustomModal
                            form={
                              <AllowanceViewModelForm
                                data={this.state.currentDataGridObjectForAllowanceBenefits}
                                closeEvent={this.closeAllowanceViewForm}
                                allowanceTypeNames={this.state.drop_allowanceType_names}
                              />}
                            show={this.state.showAllowanceViewForm}
                          />
                          <CustomModal
                            form={
                              <CustomReactTable
                                headerName={'Allowance'}
                                auditData={this.state.rowsForAllowancesAudits}
                                auditColumns={this.state.coloumnsForAllowancesAudits}
                                close={this.closeAllowancesAuditTable}
                              />}
                            show={this.state.allowanceAuditIsOpen}
                          />
                        </div>
                        <div className="toggler active" id="pensionSavingsRetirement">
                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">Pensions / Savings / Retirement Plans</h2>
                            <div id="inProcessClaimsToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddPSRPlansForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForPSPlansForm}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openPSRPlansViewForm}>
                                    <i className="fas fa-eye" aria-hidden="true" title="View" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => this.cancelRecordforBenefits(BenefitsType.PSRPlans)}>
                                    <i className="fas fa-times" aria-hidden="true" title="Cancel " />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openPSRPlansAuditTable}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <Link to={`/Help/${'BECBP001'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('pensionSavingsRetirement')} />
                          </div>

                          <div className="toggler-content">

                            {/* <table className="table table--stripes table--typeb">
                              <tbody>
                                <tr>
                                  <td>Voluntary Pension Contribution</td>
                                  <td>Employee contributes 10,000.00 INR Monthly and
                                                                            Employer contributes 120,00 INR Montly</td>
                                  <td><a className="table-link">Details</a></td>
                                </tr>
                              </tbody>
                            </table> */}
                            <ReactDataGrid
                              columns={this.state.coloumnsForPSRPlans}
                              rowGetter={this.rowGetterForPSRPlans}
                              rowsCount={this.state.rowsForPSRPlans.length}
                              minHeight={this.state.CBPSRGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForPSRPlans}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForPSRPlans
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal
                              form={
                                <PSRPlansModalForm
                                  formType={this.state.formTypeForPSRPlans}
                                  data={this.state.currentDataGridObjectForPSRPlans}
                                  closeEvent={this.closePSRPlansForm}
                                  submitEvent={this.submitPSRPlansForm}
                                />}
                              show={this.state.showPSRPlansModalForm}
                            />
                            <CustomModal
                              form={
                                <PSRPlansViewForm
                                  data={this.state.currentDataGridObjectForPSRPlans}
                                  closeEvent={this.closePSRPlansViewForm}
                                  planTypeNames={this.state.drop_planType_names}
                                />}
                              show={this.state.showPSRPlansViewForm}
                            />
                            <CustomModal
                              form={
                                <CustomReactTable
                                  headerName={'Pensions/Savings/Retirement'}
                                  auditData={this.state.rowsForPSRPlansAudits}
                                  auditColumns={this.state.coloumnsForPSRPlansAudits}
                                  close={this.closePSRPlansAuditTable}
                                />}
                              show={this.state.psrPlansAuditIsOpen}
                            />
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

        <div className="row">

          <div className="col-xs-6 col-lg-6">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.36 37.8">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path
                            d="M26.36,16.32V0H0V16.32H4.43l-4,7L13.19,37.8,25.91,23.37l-4-7ZM2.27,14.06V2.27H24.09V14.06Zm20.88,9-10,11.3-10-11.3L7,16.32h12.3Z"
                            fill="#f4f7fa"
                          />
                          <circle cx="13.17" cy="23.22" r="1.51" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Enrollments</h2>
                  {/* <ul className="box-actions">
                    <li>
                      <a >Edit</a>
                    </li>
                    <li>
                      <a title="Help">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                      </a>
                    </li>
                  </ul> */}
                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner box-inner--no-pad">

                        <div className="toggler active" id="enrollments">
                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">Enrollments</h2>
                            <div className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddEnrollmentsForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForEnrollmentForm}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => this.cancelRecordforBenefits(BenefitsType.ENROLLMENTS)}>
                                    <i className="fas fa-times" aria-hidden="true" title="Cancel" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openEnrollmentsAuditTable}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i className="far fa-question-circle helpIco" aria-hidden="true" title="History" />
                                    <Link to={`/Help/${'BECBAL000'}`} target="_blank"><i className="fa fa-question-circle-o helpIco" aria-hidden="true" title="Help" /></Link>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('enrollments')} />
                          </div>
                          <div className="toggler-content">

                            {/* <table className="table table--stripes table--typeb">
                              <tbody>
                                <tr>
                                  <td>Voluntary Pension Contribution</td>
                                  <td>Employee contributes 10,000.00 INR Monthly and
                                                                            Employer contributes 120,00 INR Montly</td>
                                  <td><a className="table-link">Details</a></td>
                                </tr>
                              </tbody>
                            </table> */}
                            <ReactDataGrid
                              columns={this.state.coloumnsForEnrollments}
                              rowGetter={this.rowGetterForEnrollments}
                              rowsCount={this.state.rowsforEnrollments.length}
                              minHeight={this.state.ENLGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForEnrollments}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForEnrollments
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal
                              form={
                                <EnrollmentsModal
                                  formType={this.state.formTypeForEnrollments}
                                  data={this.state.currentDataGridObjectForEnrollments}
                                  closeEvent={this.closeEnrollmentForm}
                                  submitEvent={this.submitEnrollmentForm}
                                />}
                              show={this.state.showEnrollmentsForm}
                            />
                            <CustomModal
                              form={
                                <CustomReactTable
                                  headerName={'Enrollments'}
                                  auditData={this.state.rowsForEnrollmentsAudits}
                                  auditColumns={this.state.coloumnsForEnrollmentsAudits}
                                  close={this.closeEnrollemntsAuditTable}
                                />}
                              show={this.state.enrollmentsAuditIsOpen}
                            />

                            {/* <CustomModal
                              form={
                                <PSRPlansViewForm
                                  data={this.state.currentDataGridObjectForPSRPlans}
                                  closeEvent={this.closePSRPlansViewForm}
                                />}
                              show={this.state.showPSRPlansViewForm}
                            /> */}
                            {/* <CustomModal
                              form={
                                <CustomReactTable
                                  headerName={'Pensions/Savings/Retirement'}
                                  auditData={this.state.rowsForPSRPlansAudits}
                                  auditColumns={this.state.coloumnsForPSRPlansAudits}
                                  close={this.closePSRPlansAuditTable}
                                />}
                              show={this.state.psrPlansAuditIsOpen}
                            /> */}
                          </div>

                          {/* <div className="toggler-content">

                            <table className="table table--stripes table--typeb">
                              <tbody>
                                <tr>
                                  <td>Health and Child Plan enrollment due on December
                                                                            31, 2017</td>
                                  <td><a className="table-link">Enroll</a></td>
                                </tr>
                                <tr>
                                  <td>Children Hostel Fee Reimbursement enrollment
                                                                            due on December 31, 2017</td>
                                  <td><a className="table-link">Enroll for Program</a></td>
                                </tr>
                                <tr>
                                  <td>Medical Reimbursement enrollment due on December
                                                                            31, 2017</td>
                                  <td><a className="table-link">Enroll for Program</a></td>
                                </tr>
                              </tbody>
                            </table>

                          </div> */}

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="col-xs-6 col-lg-6">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.49 38.5"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M37.74,29,24.49,3.31a5.82,5.82,0,0,0-10.5,0L.75,29A6.81,6.81,0,0,0,1,35.59,5.88,5.88,0,0,0,6,38.5H32.49a5.88,5.88,0,0,0,5-2.91A6.82,6.82,0,0,0,37.74,29Zm-2.36,5.32A3.41,3.41,0,0,1,32.49,36H6a3.4,3.4,0,0,1-2.88-1.71A4.28,4.28,0,0,1,3,30.12L16.22,4.46a3.32,3.32,0,0,1,6.05,0L35.52,30.12A4.29,4.29,0,0,1,35.38,34.29Z" fill="#f4f7fa" /><rect x="17.75" y="9.75" width="3" height="13" fill="#f4f7fa" /><rect x="17.75" y="27.75" width="3" height="3" fill="#f4f7fa" /></g></g></svg>
                  </div>
                  <h2 className="box-title">Claims</h2>
                  {/* <ul className="box-actions"> //To Remove
                    <li>
                      <a >Edit</a>
                    </li>
                    <li>
                      <a title="Help">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                      </a>
                    </li>
                  </ul> */}
                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner box-inner--no-pad">

                        <div className="toggler active" id="inProcessClaims">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">In-process Claims</h2>
                            <div id="inProcessClaimsToggle" className="toggleAction">
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForClaimsInProcessForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditforClaimsInProcessForm}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => this.cancelRecordforBenefits(BenefitsType.INPROCESSCLAIMS)}>
                                    <i className="fas fa-times" aria-hidden="true" title="Cancel " />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openInprocessClaimsAuditTable}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <Link to={`/Help/${'BECLIP000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('inProcessClaims')} />
                          </div>

                          <div className="toggler-content">
                            {/* <div className="percent-bubble">
                              <span>100%</span>
                            </div> */}
                            <ReactDataGrid
                              columns={this.state.coloumnsForInProcessClaims}
                              rowGetter={this.rowGetterForInProcessClaims}
                              rowsCount={this.state.rowsForInProcessClaims.length}
                              minHeight={this.state.IPCGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForClaimsInProcess}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForInProcessClaims
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal form={<ClaimsInProcess formType={this.state.formTypeForClaimsInProcess} eligibleEnroll={this.state.eligibleEnrollmentsForClaim} data={this.state.currentGridDataObjectInprocessClaims} closeEvent={this.closeForClaimsInProcessForm} submitEvent={this.submitForClaimsInProcessForm} />} show={this.state.showClaimsInProcessForm} />
                          </div>
                          <CustomModal
                            form={
                              <CustomReactTable
                                headerName={'In-process Claims'}
                                auditData={this.state.rowsForinProcessClaimsAudit}
                                auditColumns={this.state.coloumnsForInprocessClaimsAudits}
                                close={this.closeInprocessClaimsAuditTable}
                              />}
                            show={this.state.inprocessClaimsAuditisOpen}
                          />
                        </div>
                        <div className="toggler active" id="processedClaims">
                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">Processed Claims</h2>
                            <div className="toggler-dropdown PC-dropdown">
                              <label htmlFor="benefits-processed-claims">Processed Claims of year</label>
                              <select id="benefits-processed-claims" name="benefits-processed-claims" className="custom-select">
                                <option value="v-1">2015</option>
                                <option value="v-2">2016</option>
                              </select>
                            </div>
                            <div id="processedClaimsToggle" className="toggleAction">
                              <ul className="box-actions PC-actions" >
                                <li>
                                  <a onClick={this.openProcessedClaimsViewForm}>
                                    <i className="fas fa-eye" aria-hidden="true" title="View" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <Link to={`/Help/${'BECLPR000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                  </a>
                                </li>
                              </ul>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('processedClaims')} />
                            </div>
                          </div>
                          <div className="toggler-content">
                            {/* <table className="table table--stripes table--typeb">
                              <tbody>
                                <tr>
                                  <td>Leave Travel Allowance</td>
                                  <td>32,000.00 INR claim approved on April 1, 2015</td>
                                  <td><a className="table-link">Details</a></td>
                                </tr>
                              </tbody>
                            </table> */}
                            <ReactDataGrid
                              columns={this.state.coloumnsForProcessedClaims}
                              rowGetter={this.rowGetterForProcessedClaims}
                              rowsCount={this.state.rowsForProcessedClaims.length}
                              minHeight={this.state.PCGridSize}
                              enableCellSelect
                              onCellSelected={this.getRowIDForProcessedClaims}
                              showCheckbox={false}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForProcessedClaims
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal
                              form={<ProcessedClaimsView data={this.state.currentGridDataObjectForProcessedClaims} closeEvent={this.closeForProcessedClaimsForm} />}
                              show={this.state.showProcessedClaimsForm}
                            />
                            {/* <CustomModal
                              form={
                                <CustomReactTable
                                  headerName={'Enrollments'}
                                  auditData={this.state.rowsForEnrollmentsAudits}
                                  auditColumns={this.state.coloumnsForEnrollmentsAudits}
                                  close={this.closeEnrollemntsAuditTable}
                                />}
                              show={this.state.enrollmentsAuditIsOpen}
                            /> */}

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

function mapStatetoProps(state) {
  console.log(state, 'MapStatetoProps-Benefits');
  const activeEnrollments = state.employee.currentEmployee.benefits.enrollments.filter((row) =>
  row.status === BenefitsStatusTypes.CANCELLED);
  const claims = state.employee.currentEmployee.benefits.claims.inprocessClaims;
  return {
    currentEmployee: state.employee.currentEmployee,
    auditData: state.auditTrail.currentEmployee,
    masterInfo: state.masterData.currentMasterData,
    activeEnrollments,
    claims
  };
}
export default connect(mapStatetoProps)(Benefits);

/**
 * @file Add Employee Component.
 * @author Sunny
 */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import Modal from 'react-modal';
import Modal from 'react-responsive-modal';
import ReactDataGrid from 'react-data-grid';
import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router';
// import { getTranslate, getActiveLanguage } from 'react-localize-redux';
// import ReactSuperSelect from 'react-super-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router';
import CustomMoal from './customModal';
import './AddEmployee.scss';
import './AddEmployeeExtra.scss';
import { updateAuditInfo } from '../../services/Audit.service';
import { fetchCompanyData } from '../../actions/CompanyActions';
import RecurringPaymentModalForm from './recurringPaymentModalForm';
import CompensationModalForm from './compensationModalForm';
import OneTimePaymentModalForm from './oneTimePaymentModalForm';

import {
    modifyHireDate,
    // getCurrentEmployee,
    updateCompany,
    updateEventReason,
    addWorkPermitInfoData,
    addAddressInfoData,
    modifyEventReason,
    // addFieldsForArray,
    // emptyNewEmployee,
    // setCurrentEmployee,
    // modifyDOB,
    // updateCountryOfBirth,
    // modifyDateOfDeath,
    // modifyCertificateStartDate,
    // modifyCertificateEndDate,
    // COMPENSATION EMPLOYEE ACTIONS
    updateNewEmployeeCompensation,
    updateEmployeeData, addNationalIdInformationData, addEmailIdInformationData, addPhoneInformationData } from '../../actions/EmployeeActions';

import { updateTempNewEmployee, updateNewEmployee,
    deleteTempNewEmployee,
    getLastEmployeeData,
    counterForNewEmployee,
    getLastTempEmployeeData } from '../../services/Employee.service';
import DatePickerCustom from './DatePickerCustom';
import AddressForm from './AddressForm';
import WorkPermitInfoForm from './WorkPermitInfoForm';
import EmptyRowsView from './EmptyRowsView';
// import { getMasterDataInfo } from '../../services/MasterData.service';

class AddEmployee extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    // console.log('props', props);
    this.toggleElement = this.toggleElement.bind(this);
    //formValidations
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.formValidation = this.formValidation.bind(this);
    // this.tabChange = this.tabChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.addNationalIdInformation = this.addNationalIdInformation.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeCompanies = this.handleChangeCompanies.bind(this);
    this.submitNationalIdModalForm = this.submitNationalIdModalForm.bind(this);
    this.addEmailIdInformation = this.addEmailIdInformation.bind(this);
    this.submitEmailIdModalForm = this.submitEmailIdModalForm.bind(this);
    // Phone modal information
    this.addPhoneInformation = this.addPhoneInformation.bind(this);
    this.closePhoneModal = this.closePhoneModal.bind(this);
    this.closeEmailIdModal = this.closeEmailIdModal.bind(this);
    this.rowGetterTest = this.rowGetterTest.bind(this);
    this.rowsEmailGetter = this.rowsEmailGetter.bind(this);
    this.rowsPhoneGetter = this.rowsPhoneGetter.bind(this);
    this.submitPhoneInformation = this.submitPhoneInformation.bind(this);
    // address modal infor
    this.rowGetterForAddress = this.rowGetterForAddress.bind(this);
    this.closeForAddressForm = this.closeForAddressForm.bind(this);
    this.submitForAddressForm = this.submitForAddressForm.bind(this);
    this.openAddressForm = this.openAddressForm.bind(this);
    // work permit info modal form
    this.rowGetterForWorkPermitInfoTest = this.rowGetterForWorkPermitInfoTest.bind(this);
    this.openWorkPermitInfoForm = this.openWorkPermitInfoForm.bind(this);
    this.closeWorkPermitInfoForm = this.closeWorkPermitInfoForm.bind(this);
    this.submitWorkPermitInfoForm = this.submitWorkPermitInfoForm.bind(this);
    this.validationForCompensationTab = this.validationForCompensationTab.bind(this);
    this.getNewEmployeeId = this.getNewEmployeeId.bind(this);
    this.counterValue = this.counterValue.bind(this);
    this.empId = 1;
    // compensation screen
    this.rowGetterForCompensation = this.rowGetterForCompensation.bind(this);
    this.getRowIDForCompensation = this.getRowIDForCompensation.bind(this);
    this.rowGetterForRecurringPayment = this.rowGetterForRecurringPayment.bind(this);
    this.getRowIDForRecurringPayment = this.getRowIDForRecurringPayment.bind(this);
    this.rowGetterForOneTimePayment = this.rowGetterForOneTimePayment.bind(this);
    this.getRowIDForOneTimePayment = this.getRowIDForOneTimePayment.bind(this);
    this.editCloseForRecurringPaymentForm = this.editCloseForRecurringPaymentForm.bind(this);
    this.addOpenForRecurringPaymentModalForm = this.addOpenForRecurringPaymentModalForm.bind(this);
    this.editOpenForRecurringPaymentModalForm = this.editOpenForRecurringPaymentModalForm.bind(this);
    // compensation form methods
    this.EditOpenForCompensation = this.EditOpenForCompensation.bind(this);
    this.addOpenForCompensation = this.addOpenForCompensation.bind(this);
    this.addCloseForCompensation = this.addCloseForCompensation.bind(this);
    // one time payment form handlers
    this.editCloseForOneTimePaymentModalForm = this.editCloseForOneTimePaymentModalForm.bind(this);
    this.editOpenForOneTimePaymentModalForm = this.editOpenForOneTimePaymentModalForm.bind(this);
    this.addOpenForOneTimePaymentModalForm = this.addOpenForOneTimePaymentModalForm.bind(this);
    this.addCloseForOneTimePaymentModalForm = this.addCloseForOneTimePaymentModalForm.bind(this);
    // form submissio for compensation
    this.SubmitForCompensation = this.SubmitForCompensation.bind(this);
    this.addSubmitForOneTimePayment = this.addSubmitForOneTimePayment.bind(this);
    this.addSubmitForRecurringPaymentForm = this.addSubmitForRecurringPaymentForm.bind(this);
    this.state = {
      nationalIdGridHeight: 35,
      addressGridHeight: 35,
      workPermitGridInfoHeight: 35,
      emailInfoGridHeight: 35,
      phoneInfoGridHeight: 35,
      compensationGridHeight: 35,
      oneTimePaymentGridHeight: 35,
      recurringPaymentGridHeight: 35,
      ShowingForCompensation: false,
      ShowingForOneTimePayment: false,
      ShowingForRecurringPayment: false,
      syncedWithServer: true,
      newEmployeeId: null,
      counter: undefined,
      nationalIdModalForm: false,
      columns: [{ key: 'country', name: 'Country Name' }, { key: 'nationalIdCardType', name: 'National Id Card Type' }, { key: 'nationalId', name: 'National Id' }, { key: 'isPrimary', name: 'Is Primary' }],
      rows: [],
      emailInfoCols: [{ key: 'emailType', name: 'Email type' }, { key: 'emailAddress', name: 'Email Address' }, { key: 'isPrimary', name: 'Is Primary' }],
      emailInfoRows: [],
      emailIdModalForm: false,
      phoneInfoCols: [{ key: 'phoneType', name: 'Phone Type' }, { key: 'number', name: 'Phone Number' }, { key: 'extension', name: 'Extension' }, { key: 'isPrimary', name: 'Is Primary' }],
      phoneInfoRows: [],
      addressrows: [],
      workpermitinfocols: [{ key: 'country', name: 'Country' }, { key: 'documentType', name: 'Document Type' }, { key: 'documentTitle', name: 'Document Title' }, { key: 'documentNumber', name: 'Document Number' }, { key: 'issueDate', name: 'Issue Date' }, { key: 'issuePlace', name: 'Issue Place' }, { key: 'issuingAuthority', name: 'Issuing Authority' }, { key: 'expirationDate', name: 'Expiration  Date' }, { key: 'validated', name: 'validated' }, { key: 'attachments', name: 'Attachments' }],
      workpermitinforows: [],
      addresscols: [{ key: 'addressType', name: 'Address Type' }, { key: 'country', name: 'Country' }, { key: 'state', name: 'State' }, { key: 'city', name: 'City' }, { key: 'line1', name: 'Address Line 1' }, { key: 'line2', name: 'Address Line 2' }, { key: 'zip', name: 'ZIP' }],
      phoneInfoIdModalForm: false,
      closeModalForm: false,
      showingAddressForm: false,
      showingWorkPermitFrom: false,
      companyServiceRender: true,
      breadcrumbPosition: 1,
      modifyHireDateErrorText: '',
      modifyCompanyErrorText: '',
      modifyEventReasonErrorText: '',
      //addemployee personal info
      modifyDOBErrorText: '',
      modifyCountryOfBirthErrorText: '',
      modifyRegionOfBirthErrorText: '',
      modifyFirstNameErrorText: '',
      modifyLastNameErrorText: '',
      modifySuffixErrorText: '',
      modfiyTitleErrorText: '',
      modifyPrefixErrorText: '',
      modifyGenderErrorText: '',
      modifyMaritalStatusErrorText: '',
      modifyNativePreferredLanguage: '',
      modifyNationalIdInfoErrorText: '',
      modifyCountryNameErrorText: '',
      modifyNationalIdCardTypeErrorText: '',
      modifyNationalIdErrorText: '',
      modifyNIIsPrimaryErrorText: '',
      modifyAddressInfoErrorText: '',
      modifyEthnicGroupErrorText: '',
      modifyVeteranErrorText: '',
      modifyChallengedVeteranErrorText: '',
      // modifyWorkPermitInfoErrorText: '',
      modifyPhoneInfoErrorText: '',
      modifyPhoneTypeErrorText: '',
      modifyPhoneNumberErrorText: '',
      modifyPIIsPrimaryErrorText: '',
      modifyEmailInfoErrorText: '',
      modifyEmailTypeErrorText: '',
      modifyEmailAddressErrorText: '',
      modifyCIIsPrimaryErrorText: '',
      //addemployee job infor
      modifyJobCodeErrorText: '',
      modifyPositionErrorText: '',
      modifyOICompanyErrorText: '',
      modifyBusinessUnitErrorText: '',
      modifyDivisionErrorText: '',
      modifyDepartmentErrorText: '',
      modifyLocationErrorText: '',
      modifyTimeZoneErrorText: '',
      modifyCostCenterErrorText: '',
      modifyEmployeeStatusErrorText: '',
      modifySupervisorErrorText: '',
      modifyJobClassificationErrorText: '',
      modifyJobTitleErrorText: '',
      // modifyLocalJobTitleErrorText: '',
      modifyPayGradeErrorText: '',
      modifyRegularTemporaryErrorText: '',
      modifyStandardWeeklyHoursErrorText: '',
      modifyHolidayCalendarErrorText: '',
      modifyWorkScheduleErrorText: '',
      modifyTimeProfileErrorText: '',
      modifyISFullTimeErrorText: '',
      modifyEmployeeClassErrorText: '',
      modifyFLSAtatusErrorText: '',
      modifyIsShiftEmployeeErrorText: '',
      modifyShiftCodeErrorText: '',
      modifyIsCrossBorderWorkerErrorText: '',
      modifyEEOJobGroupErrorText: '',
      modifyContractErrorText: '',
      modifyContinuedSicknessPayPeriodErrorText: '',
      modifyConinuedSicknessPayMeasureErrorText: '',
      modifyNoticePeriodErrorText: '',
      modifyEEOCategeory1ErrorText: '',
      modifyEEOCategeory2ErrorText: '',
      modifyEEOCategeory3ErrorText: '',
      modifyEEOCategeory4ErrorText: '',
      modifyEEOCategeory5ErrorText: '',
      modifyEEOCategeory6ErrorText: '',
      modifyRelationShipTypeErrorText: '',
      modifyNameErrorText: '',
      modifyJobInfoHireDateErrorText: '',
      modifyOriginalStartDateErrorText: '',
      //addemployee compensation info
      modifyPayTypeErrorText: '',
      modifyPayGroupErrorText: '',
      modifyIsEligibleForBenefitErrorText: '',
      modifyIsEligibleForCarErrorText: '',
      modifyBenefitRateErrorText: '',
      modifyCompaRatioErrorText: '',
      modifyRangePenetrationErrorText: '',
      modifyAnnualizedSalaryErrorText: '',
      modifyteoErrorText: '',
      modifyCompensationPayComponentErrorText: '',
      modifyCompensationAmountErrorText: '',
      modifyCompensationCurrencyErrorText: '',
      modifyCompensationFrequencyErrorText: '',
      modifyOneTimePaymentPayComponentErrorText: '',
      modifyOneTimePaymentAmountErrorText: '',
      modifyOneTimePaymentCurrencyErrorText: '',
      modifyOneTimePaymentPaymentDateErrorText: '',
      modifyRecurringPaymentPayComponentErrorText: '',
      modifyRecurringPaymentAmountErrorText: '',
      modifyRecurringPaymentCurrencyErrorText: '',
      modifyRecurringPaymentStartDateErrorText: '',
      modifyRecurringPaymentEndDateErrorText: '',
      markPaymentIsEligibleForEmployeeErrorText: '',
      markTaxDeductionAtSourceErrorText: '',
      markContributionForEmployerErrorText: '',
      socialContributionAllowanceErrorText: '',
      contributionFromEmployeeErrorText: '',
      markPaymentIsEligibleForEmployeeErrorText1: '',
      markTaxDeductionAtSourceErrorText1: '',
      markContributionForEmployerErrorText1: '',
      currentEmployee: [{ identify: { hireDate: new Date(), company: '', eventReason: '' }, personalInformation: { biographicalInformation: { DOB: new Date(), CountryOfBirth: '', DateOfDeath: new Date() }, personalInformation: { DOB: new Date(), CountryOfBirth: '', DateOfDeath: new Date() } } }],
      columnsForCompensationGrid: [{ key: 'payComponent', name: 'PayComponent', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'frequency', name: 'Frequency', resizable: true }, { key: 'markPaymentIsEligibleForEmployee', name: 'Payment Is Eligible For Employee', resizable: true }, { key: 'markTaxDeductionAtSource', name: 'Tax Deduction At Source', resizable: true }, { key: 'socialContributionRelevant', name: 'Social Contribution Relevant', resizable: true }, { key: 'contributionFromEmployee', name: 'Contribution From Employee', resizable: true }, { key: 'markContributionForEmployer', name: 'Contribution From Employer', resizable: true }],
      rowsForCompensationGrid: [],
      currentSelectedIndexForCompensation: [-1],
      columnsForOneTimePaymentGrid: [{ key: 'payComponent', name: 'PayComponent' }, { key: 'amount', name: 'Amount' }, { key: 'currency', name: 'Currency' }, { key: 'paymentDate', name: 'Payment Date' }],
      rowsForOneTimePaymentGrid: [],
      currentSelectedIndexForOneTimePayment: [-1],
      columnsForRecurringPaymentGrid: [{ key: 'payComponent', name: 'PayComponent', resizable: true }, { key: 'amount', name: 'Amount', resizable: true }, { key: 'currency', name: 'Currency', resizable: true }, { key: 'startDate', name: 'Start Date', resizable: true }, { key: 'endDate', name: 'End Date', resizable: true }, { key: 'markPaymentIsEligibleForEmployee', name: 'Payment Is Eligible For Employee', resizable: true }, { key: 'markTaxDeductionAtSource', name: 'Tax Deduction At Source', resizable: true }, { key: 'socialContributionRelevant', name: 'Social Contribution Relevant', resizable: true }, { key: 'contributionFromEmployee', name: 'Contribution From Employee', resizable: true }, { key: 'markContributionForEmployer', name: 'Contribution From Employer', resizable: true }],
      rowsForRecurringPaymentGrid: [],
      currentSelectedIndexForRecurringPayment: [-1],
      formTypeForOneTimePayment: undefined,
      formTypeForRecurringPayment: undefined,
      formTypeForCompensation: undefined,
      crrentGridDataObjectForCompensation: {},
      currentGridDataObjectForOneTimePayment: {},
      currentGridDataObjectForRecurringPayment: {}
    };
  }
  componentWillMount() {
    // this.props.dispatch(getCurrentEmployee());
    if (this.props.newEmployee) {
      //this.props.dispatch(emptyNewEmployee());
      // console.log('mountcheck', this.props.newEmployee);
    }
  }

  componentDidMount() {
    // console.log(findNewEmployee);
    getLastEmployeeData(true, this.props.dispatch);
    getLastTempEmployeeData(true, this.props.dispatch);
    document.getElementById('step2').style.display = 'none';
    // console.log('Employee Id', this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId);
    // if (this.props.newEmployee) {
    //   findNewEmployee({ employee: this.props.newEmployee }, true, this.props.dispatch);
    // }
    // getMasterDataInfo(true, this.props.dispatch);
  }
  componentWillReceiveProps(newprops) {
    if (this.state.companyServiceRender) {
      this.props.dispatch(fetchCompanyData(newprops.currentEmployee.identify.identify.identify.corporateCompany));
      this.setState({ companyServiceRender: false });
    }
    if (!this.state.companyServiceRender) {
      if (this.props.currentEmployee.identify.identify.identify.corporateCompany !== newprops.currentEmployee.identify.identify.identify.corporateCompany) {
        this.props.dispatch(fetchCompanyData(newprops.currentEmployee.identify.identify.identify.corporateCompany));
      } else {
        console.log('filter id', newprops.currentEmployee.identify.identify.identify.corporateCompany);
      }
    }
    const wpmtinfoRowSize = (newprops.newEmployee.personalInformation.workPermitInformation.workPermitInformation.length + 1) * 35;
    const addressRowSize = (newprops.newEmployee.personalInformation.addressInformation.addressInformation.length + 1) * 35;
    const nationalRowSize = (newprops.newEmployee.personalInformation.nationalIdInformation.length + 1) * 35;
    const emailRowSize = (newprops.newEmployee.personalInformation.contactInformation.emailInformation.length + 1) * 35;
    const phoneRowSize = (newprops.newEmployee.personalInformation.contactInformation.phoneInformation.length + 1) * 35;
    this.setState({ workPermitGridInfoHeight: wpmtinfoRowSize });
    this.setState({ addressGridHeight: addressRowSize });
    this.setState({ nationalIdGridHeight: nationalRowSize });
    this.setState({ emailInfoGridHeight: emailRowSize });
    this.setState({ phoneInfoGridHeight: phoneRowSize });
    // console.log('check', wpmtinfoRowSize, addressRowSize, nationalRowSize, emailRowSize, phoneRowSize);
    if (newprops.newEmployee) {
      // console.log('showworkpermitinfostatus', newprops.newEmployee.personalInformation.workPermitInformation.workPermitInformation);
      const workpermitinforows = [...newprops.newEmployee.personalInformation.workPermitInformation.workPermitInformation];
      const addressrows = [...newprops.newEmployee.personalInformation.addressInformation.addressInformation];
      const rows = [...newprops.newEmployee.personalInformation.nationalIdInformation];
      const emailInfoRows = [...newprops.newEmployee.personalInformation.contactInformation.emailInformation];
      const phoneInfoRows = [...newprops.newEmployee.personalInformation.contactInformation.phoneInformation];
      this.setState({ workpermitinforows: workpermitinforows.reverse() });
      this.setState({ addressrows: addressrows.reverse() });
      this.setState({ rows: rows.reverse() });
      this.setState({ emailInfoRows: emailInfoRows.reverse() });
      this.setState({ phoneInfoRows: phoneInfoRows.reverse() });
    }
    // compensation screen grids functionality
    const dateFormattedDataForOneTimePay = [];
    newprops.newEmployee.compensationInformation.oneTimePayment.oneTimePayment.map((obj) => {
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
    newprops.newEmployee.compensationInformation.recurringPayment.recurringPayment.map((obj) => {
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
    const compensationRows = newprops.newEmployee.compensationInformation.compensationInformation.compensation.length + 1;
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
    const nowRevConfCompensation = [...newprops.newEmployee.compensationInformation.compensationInformation.compensation];
    this.setState({ rowsForCompensationGrid: nowRevConfCompensation.reverse() });
    this.setState({ rowsForOneTimePaymentGrid: dateFormattedDataForOneTimePay.reverse() });
    this.setState({ rowsForRecurringPaymentGrid: dateFormattedDataForRecurringPay.reverse() });
    this.setState({ currentGridDataObjectForCompensationGroup: newprops.newEmployee.compensationInformation.compensationInformation.compensationGroup });
    // console.log('recurringRows', this.state.currentGridDataObjectForCompensationGroup, newprops.currentEmployee.compensationInformation.compensationInformation.compensationGroup);
  }
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
  setCompany = (value) => {
    // console.log(value, 'value');
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateCompany(
              value.companyId
          )
      );
      this.setState({ modifyCompanyErrorText: '' });
    }
  }

  setEventReason = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateEventReason(
              value.eventReasonId
          )
      );
      this.setState({ modifyEventReasonErrorText: '' });
    }
  }
  /* setCountryOfBirth = (value) => {
    console.log(value, 'value');
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateCountryOfBirth(
              value.CountryOfBirthId
          )
      );
      this.setState({ modifyCountryOfBirthText: '' });
    }
  }*/
  /* modifyDOB = (date) => {
    this.props.dispatch(
        modifyDOB(
            date
        )
    );
    this.setState({ modifyDOBErrorText: '' });
  }*/
  setSyncedWithServer = (value) => {
    // console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  getNewEmployeeId(id) {
    this.setState({ newEmployeeId: id });
  }
  counterValue = (counter) => {
    this.setState({ counter });
    // console.log(counter);
    const key = '_id';
    let idToBeDeleted = null;
    if (this.props.newEmployee[key]) {
      idToBeDeleted = this.props.newEmployee[key];
      delete this.props.newEmployee[key];
      // alert('option1');
    } else {
      idToBeDeleted = this.state.newEmployeeId;
      // alert('option2');
    }
    // audit code
    this.props.newEmployee.entityInformation.owner = counter;
    this.props.newEmployee.entityInformation.status = 'active';
    this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId = `HYD${counter}`;
    updateNewEmployee({ employee: this.props.newEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    this.props.auditData.entityInformation.employeeId = `HYD${counter}`;
    const compensationGroup = [...this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup];
    compensationGroup.insertedBy = 'bhasha';
    compensationGroup.insertedDate = new Date();
    compensationGroup.operation = 'INSERT';
    this.props.auditData.compensationInformation.compensationInformation.compensationGroup.push(compensationGroup);
    this.props.newEmployee.compensationInformation.compensationInformation.compensation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      data.operation = 'INSERT';
      this.props.auditData.compensationInformation.compensationInformation.compensation.push(data);
      return index;
    });
    this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.operation = 'INSERT';
      data.insertedDate = new Date();
      this.props.auditData.compensationInformation.oneTimePayment.oneTimePayment.push(data);
      return index;
    });
    this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      data.operation = 'INSERT';
      this.props.auditData.compensationInformation.recurringPayment.recurringPayment.push(data);
      return index;
    });
    const personalUs = [...this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us];
    personalUs.insertedBy = 'basha';
    personalUs.insertedDate = new Date();
    this.props.auditData.personalInformation.personalInformation.countrySpecificFields.us.push(personalUs);
    const biographicalInfo = [...this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation];
    biographicalInfo.insertedBy = 'basha';
    biographicalInfo.insertedDate = new Date();
    this.props.auditData.personalInformation.biographicalInformation.biographicalInformation.push(biographicalInfo);
    const personalInfo = [...this.props.newEmployee.personalInformation.personalInformation.personalInformation];
    personalInfo.insertedBy = 'basha';
    personalInfo.insertedDate = new Date();
    this.props.auditData.personalInformation.personalInformation.personalInformation.push(personalInfo);
    // this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.country.map((obj, index) => {
    //   const data = obj;
    //   data.insertedBy = 'bhasha';
    //   data.insertedDate = new Date();
    //   this.props.auditData.personalInformation.personalInformation.countrySpecificFields.country.push(data);
    //   return index;
    // });
    this.props.newEmployee.personalInformation.nationalIdInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.personalInformation.nationalIdInformation.push(data);
      return index;
    });
    this.props.newEmployee.personalInformation.addressInformation.addressInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.personalInformation.addressInformation.addressInformation.push(data);
      return index;
    });
    this.props.newEmployee.personalInformation.workPermitInformation.workPermitInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.personalInformation.workPermitInformation.workPermitInformation.push(data);
      return index;
    });
    this.props.newEmployee.personalInformation.contactInformation.emailInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.personalInformation.contactInformation.emailInformation.push(data);
      return index;
    });
    this.props.newEmployee.personalInformation.contactInformation.phoneInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.personalInformation.contactInformation.phoneInformation.push(data);
      return index;
    });
    // this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.map((obj, index) => {
    //   const data = { ...obj };
    //   data.insertedBy = 'bhasha';
    //   data.insertedDate = new Date();
    //   this.props.auditData.jobInformation.employmentDetail.keyJobAttribute.push(data);
    //   return index;
    // });
    this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.jobInformation.employmentDetail.organizationalInformation.push(data);
      return index;
    });
    this.props.newEmployee.jobInformation.employmentDetail.jobInformation.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.jobInformation.employmentDetail.jobInformation.push(data);
      return index;
    });
    const keyJobAttribute = [...this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute];
    keyJobAttribute.insertedBy = 'Prajith';
    keyJobAttribute.insertedDate = new Date();
    this.props.auditData.jobInformation.employmentDetail.keyJobAttribute.push(keyJobAttribute);
    const timeInformation = [...this.props.newEmployee.jobInformation.employmentDetail.timeInformation];
    timeInformation.insertedBy = 'basha';
    timeInformation.insertedDate = new Date();
    this.props.auditData.jobInformation.employmentDetail.timeInformation.push(timeInformation);
    const jobinfoCs = [...this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us];
    jobinfoCs.insertedBy = 'basha';
    jobinfoCs.insertedDate = new Date();
    this.props.auditData.jobInformation.employmentDetail.countrySpecificFields.us.push(jobinfoCs);

    this.props.newEmployee.jobInformation.jobRelationships.globalFields.map((obj, index) => {
      const data = { ...obj };
      data.insertedBy = 'bhasha';
      data.insertedDate = new Date();
      this.props.auditData.jobInformation.jobRelationships.globalFields.push(data);
      return index;
    });
    const empGf = [...this.props.newEmployee.jobInformation.employmentDetails.globalFields];
    empGf.insertedBy = 'basha';
    empGf.insertedDate = new Date();
    this.props.auditData.jobInformation.employmentDetails.globalFields.push(empGf);
    // audit data
    updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
    deleteTempNewEmployee(idToBeDeleted);
    this.props.router.push('/MyTeam');
  }
  toggleElement(elementID, actionsId) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    const y = document.getElementById(actionsId);
    y.classList.toggle('actionDisable');
  }
  modifyHireDate = (date) => {
    this.props.dispatch(
        modifyHireDate(
            date
        )
    );
    this.setState({ modifyHireDateErrorText: '' });
  }
  modifyEventReason = (e) => {
    // console.log(e.target.value);
    this.props.dispatch(modifyEventReason(e.target.value));
    this.setState({ modifyEventReasonErrorText: '' });
    this.setState({ syncedWithServer: false });
  }
  /* modifyDateOfDeath = (date) => {
    this.props.dispatch(
        modifyDateOfDeath(
            date
        )
    );
  }
  modifyCertificateStartDate = (date) => {
    this.props.dispatch(
        modifyCertificateStartDate(
            date
        )
    );
  }
  modifyCertificateEndDate = (date) => {
    this.props.dispatch(
        modifyCertificateEndDate(
            date
        )
    );
  }*/
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
  handleChangeCompanies(e) {
    let employeeId = '';
    if (this.props.lastTempEmployee.length === 0) {
      employeeId = 100;
    } else {
      employeeId = this.props.lastTempEmployee[0].personalInformation.biographicalInformation.biographicalInformation.employeeId;
    }
    this.props.newEmployee.entityInformation.owner = parseInt(employeeId, 10) + 1;
    this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId = parseInt(employeeId, 10) + 1;
    this.props.dispatch(
      updateCompany(
        { company: e.target.value, corporateCompany: this.props.currentEmployee.identify.identify.identify.corporateCompany }
      )
    );
    this.setState({ syncedWithServer: false });
    this.save();
    this.setState({ modifyCompanyErrorText: '' });
  }
  updateEmployeeData = (data) => {
    this.setSyncedWithServer(false);
    // console.log('Value', data.target.value);
    // console.log('Name', data.target.name);
    const field = data.target.name.split('.');
    // console.log('field is: ', field);
    const len = field.length;
    // console.log(len - 1);
    // console.log('field', field[len - 1]);
    this.props.dispatch(
        updateEmployeeData(
            { value: data.target.value, field: data.target.name }
        )
    );
    if (field[len - 1] === 'dob') {
      this.setState({ modifyDOBErrorText: '' });
    }
    if (field[len - 1] === 'countryOfBirth') {
      this.setState({ modifyCountryOfBirthErrorText: '' });
    }
    if (field[len - 1] === 'regionOfBirth') {
      this.setState({ modifyRegionOfBirthErrorText: '' });
    }
    if (field[len - 1] === 'dateOfDeath') {
      this.setState({ modifyDOBErrorText: '' });
    }
    if (field[len - 1] === 'firstName') {
      if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.firstName !== '') {
        this.setState({ modifyFirstNameErrorText: '' });
      } else {
        this.setState({ modifyFirstNameErrorText: 'First Name cannot be Empty' });
      }
    }
    if (field[len - 1] === 'lastName') {
      this.setState({ modifyLastNameErrorText: '' });
    }
    if (field[len - 1] === 'suffix') {
      this.setState({ modifySuffixErrorText: '' });
    }
    if (field[len - 1] === 'title') {
      this.setState({ modfiyTitleErrorText: '' });
    }
    if (field[len - 1] === 'prefix') {
      this.setState({ modifyPrefixErrorText: '' });
    }
    if (field[len - 1] === 'gender') {
      this.setState({ modifyGenderErrorText: '' });
    }
    if (field[len - 1] === 'maritalStatus') {
      this.setState({ modifyMaritalStatusErrorText: '' });
    }
    if (field[len - 1] === 'preferredLanguage') {
      this.setState({ modifyNativePreferredLanguage: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.jobCode !== '') {
      this.setState({ modifyJobCodeErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.position !== '') {
      this.setState({ modifyPositionErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].company !== '') {
      this.setState({ modifyOICompanyErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].businessUnit !== '') {
      this.setState({ modifyBusinessUnitErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].division !== '') {
      this.setState({ modifyDivisionErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].department !== '') {
      this.setState({ modifyDepartmentErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].location !== '') {
      this.setState({ modifyLocationErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].timeZone !== '') {
      this.setState({ modifyTimeZoneErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].costCenter !== '') {
      this.setState({ modifyCostCenterErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].employmentStatus !== '') {
      this.setState({ modifyEmployeeStatusErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].supervisor !== '') {
      this.setState({ modifySupervisorErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].jobClassification !== '') {
      this.setState({ modifyJobClassificationErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].jobTitle !== '') {
      this.setState({ modifyJobTitleErrorText: '' });
    }
    // if (field[len - 1] === 'localJobTitle') {
    //   this.setState({ modifyLocalJobTitleErrorText: '' });
    // }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].payGrade !== '') {
      this.setState({ modifyPayGradeErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].regularOrTemporary !== '') {
      this.setState({ modifyRegularTemporaryErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].standardWeeklyHours !== '') {
      this.setState({ modifyStandardWeeklyHoursErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.timeInformation.holidayCalendar !== '') {
      this.setState({ modifyHolidayCalendarErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.timeInformation.workSchedule !== '') {
      this.setState({ modifyWorkScheduleErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.timeInformation.timeProfile !== '') {
      this.setState({ modifyTimeProfileErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isFullTime !== '') {
      this.setState({ modifyISFullTimeErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.employeeClass !== '') {
      this.setState({ modifyEmployeeClassErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.flsaStatus !== '') {
      this.setState({ modifyFLSAtatusErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isShiftEmployee !== '') {
      this.setState({ modifyIsShiftEmployeeErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftCode !== '') {
      this.setState({ modifyShiftCodeErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isCrossBorderWorker !== '') {
      this.setState({ modifyIsCrossBorderWorkerErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoJobGroup !== '') {
      this.setState({ modifyEEOJobGroupErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.contractType !== '') {
      this.setState({ modifyContractErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayPeriod !== '') {
      this.setState({ modifyContinuedSicknessPayPeriodErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayMeasure !== '') {
      this.setState({ modifyConinuedSicknessPayMeasureErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.noticePeriod !== '') {
      this.setState({ modifyNoticePeriodErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory1 !== '') {
      this.setState({ modifyEEOCategeory1ErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory2 !== '') {
      this.setState({ modifyEEOCategeory2ErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory3 !== '') {
      this.setState({ modifyEEOCategeory3ErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory4 !== '') {
      this.setState({ modifyEEOCategeory4ErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory5 !== '') {
      this.setState({ modifyEEOCategeory5ErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory6 !== '') {
      this.setState({ modifyEEOCategeory6ErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.jobRelationships.globalFields[0].relationshipType !== '') {
      this.setState({ modifyRelationShipTypeErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.jobRelationships.globalFields[0].name !== '') {
      this.setState({ modifyNameErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetails.globalFields.hireDate !== null) {
      this.setState({ modifyJobInfoHireDateErrorText: '' });
    }
    if (this.props.newEmployee.jobInformation.employmentDetails.globalFields.originalStartDate !== null) {
      this.setState({ modifyOriginalStartDateErrorText: '' });
    }
    // if (field[len - 1] === 'payType') {
    //   this.setState({ modifyPayTypeErrorText: '' });
    // }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.payType !== '') {
      this.setState({ modifyPayTypeErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.payGroup !== '') {
      this.setState({ modifyPayGroupErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForBenefit !== '') {
      this.setState({ modifyIsEligibleForBenefitErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForCar !== '') {
      this.setState({ modifyIsEligibleForCarErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.benefitRate !== '') {
      this.setState({ modifyBenefitRateErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.compaRatio !== '') {
      this.setState({ modifyCompaRatioErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.rangePenetration !== '') {
      this.setState({ modifyRangePenetrationErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.annualizedSalary !== '') {
      this.setState({ modifyAnnualizedSalaryErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.teo !== '') {
      this.setState({ modifyteoErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].payComponent !== '') {
      this.setState({ modifyCompensationPayComponentErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].amount !== '') {
      this.setState({ modifyCompensationAmountErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].currency !== '') {
      this.setState({ modifyCompensationCurrencyErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].frequency !== '') {
      this.setState({ modifyCompensationFrequencyErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].payComponent !== '') {
      this.setState({ modifyOneTimePaymentPayComponentErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].amount !== '') {
      this.setState({ modifyOneTimePaymentAmountErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].currency !== '') {
      this.setState({ modifyOneTimePaymentCurrencyErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].paymentDate !== null) {
      this.setState({ modifyOneTimePaymentPaymentDateErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].payComponent !== '') {
      this.setState({ modifyRecurringPaymentPayComponentErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].amount !== '') {
      this.setState({ modifyRecurringPaymentAmountErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].currency !== '') {
      this.setState({ modifyRecurringPaymentCurrencyErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].startDate !== null) {
      this.setState({ modifyRecurringPaymentStartDateErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].endDate !== null) {
      this.setState({ modifyRecurringPaymentEndDateErrorText: '' });
    }
    if (this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.ethnicGroup !== '') {
      this.setState({ modifyEthnicGroupErrorText: '' });
    }
    if (this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.veteran !== '') {
      this.setState({ modifyVeteranErrorText: '' });
    }
    if (this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.challengedVeteran !== '') {
      this.setState({ modifyChallengedVeteranErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].markPaymentIsEligibleForEmployee !== '') {
      this.setState({ markPaymentIsEligibleForEmployeeErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].markTaxDeductionAtSource !== '') {
      this.setState({ markTaxDeductionAtSourceErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].markContributionForEmployer !== '') {
      this.setState({ markContributionForEmployerErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].markPaymentIsEligibleForEmployee !== '') {
      this.setState({ markPaymentIsEligibleForEmployeeErrorText1: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].markTaxDeductionAtSource !== '') {
      this.setState({ markTaxDeductionAtSourceErrorText1: '' });
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].markContributionForEmployer !== '') {
      this.setState({ markContributionForEmployerErrorText1: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].socialContributionAllowance !== '') {
      this.setState({ socialContributionAllowanceErrorText: '' });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].contributionFromEmployee !== '') {
      this.setState({ contributionFromEmployeeErrorText: '' });
    }
    this.save();
  }
  addNationalIdInformation() {
    this.setState({ nationalIdModalForm: true });
  }
  closeModal() {
    this.setState({ nationalIdModalForm: false });
  }
  formValidation(fieldValue, id, errorMessage) {
    if (fieldValue === '') {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).textContent = `${errorMessage} is required`;
      return true;
    }
    return false;
  }
  validationForCompensationTab() {
    let allow = true;
    // console.log(this.props.newEmployee.compensationInformation.compensationInformation.compensation);
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.payType === '') {
      this.setState({ modifyPayTypeErrorText: <span>CSCICG001: Pay type can not be empty {this.errorCodeHelper('CSCICG001')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.payGroup === '') {
      this.setState({ modifyPayGroupErrorText: <span>CSCICG002: pay group can not be empty {this.errorCodeHelper('CSCICG002')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForBenefit === '') {
      this.setState({ modifyIsEligibleForBenefitErrorText: <span>CSCICG003: is eligible for benefit can not be empty {this.errorCodeHelper('CSCICG003')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForCar === '') {
      this.setState({ modifyIsEligibleForCarErrorText: <span>CSCICG004: is eligible for car can not be empty {this.errorCodeHelper('CSCICG004')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.benefitRate === '') {
      this.setState({ modifyBenefitRateErrorText: <span>CSCICG005: benefit rate can not be empty {this.errorCodeHelper('CSCICG005')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.compaRatio === '') {
      this.setState({ modifyCompaRatioErrorText: <span>CSCICG006: compa ratio  can not be empty {this.errorCodeHelper('CSCICG006')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.rangePenetration === '') {
      this.setState({ modifyRangePenetrationErrorText: <span>CSCICG007: range penetration can not be empty {this.errorCodeHelper('CSCICG007')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.annualizedSalary === '') {
      this.setState({ modifyAnnualizedSalaryErrorText: <span>CSCICG008: annualized salary can not be empty {this.errorCodeHelper('CSCICG008')}</span> });
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.teo === '') {
      this.setState({ modifyteoErrorText: <span>CSCICG009: teo can not be empty {this.errorCodeHelper('CSCICG009')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].payComponent === '') {
      this.setState({ modifyCompensationPayComponentErrorText: <span>CSCICS010: pay component is required {this.errorCodeHelper('CSCICS010')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].amount === '') {
      this.setState({ modifyCompensationAmountErrorText: <span>CSCICS011: amount is required {this.errorCodeHelper('CSCICS011')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].currency === '') {
      this.setState({ modifyCompensationCurrencyErrorText: <span>CSCICS012: currency is required {this.errorCodeHelper('CSCICS012')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].frequency === '') {
      this.setState({ modifyCompensationFrequencyErrorText: <span>CSCICS013: frequency is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].payComponent === '') {
      this.setState({ modifyOneTimePaymentPayComponentErrorText: <span>CSOPOP017: pay component is required {this.errorCodeHelper('CSOPOP014')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].amount === '') {
      this.setState({ modifyOneTimePaymentAmountErrorText: <span>CSOPOP018: amount is required {this.errorCodeHelper('CSOPOP015')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].currency === '') {
      this.setState({ modifyOneTimePaymentCurrencyErrorText: <span>CSOPOP019: currency is required {this.errorCodeHelper('CSOPOP016')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.oneTimePayment.oneTimePayment[0].paymentDate === null) {
      this.setState({ modifyOneTimePaymentPaymentDateErrorText: <span>CSOPOP020: payment date is required {this.errorCodeHelper('CSOPOP017')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].payComponent === '') {
      this.setState({ modifyRecurringPaymentPayComponentErrorText: <span>CSRPRP021: pay component is required {this.errorCodeHelper('CSRPRP018')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].amount === '') {
      this.setState({ modifyRecurringPaymentAmountErrorText: <span>CSRPRP022: amount is required {this.errorCodeHelper('CSRPRP019')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].currency === '') {
      this.setState({ modifyRecurringPaymentCurrencyErrorText: <span>CSRPRP023: currency is required {this.errorCodeHelper('CSRPRP019')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].startDate === null) {
      this.setState({ modifyRecurringPaymentStartDateErrorText: <span>CSRPRP024: start date is required {this.errorCodeHelper('CSRPRP020')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].endDate === null) {
      this.setState({ modifyRecurringPaymentEndDateErrorText: <span>CSRPRP025: end date is required {this.errorCodeHelper('CSRPRP021')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].markPaymentIsEligibleForEmployee === '') {
      this.setState({ markPaymentIsEligibleForEmployeeErrorText: <span>CSCICS014: Mark Payment is Eligible For Employee is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].markTaxDeductionAtSource === '') {
      this.setState({ markTaxDeductionAtSourceErrorText: <span>CSCICS015: Tax Deduction At Source is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].markContributionForEmployer === '') {
      this.setState({ markContributionForEmployerErrorText: <span>CSCICS016: Contribution From Employer is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].socialContributionAllowance === '') {
      this.setState({ socialContributionAllowanceErrorText: <span>CSCICS016: Social Contribution Allowance is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.compensationInformation.compensation[0].contributionFromEmployee === '') {
      this.setState({ contributionFromEmployeeErrorText: <span>CSCICS016:  Contribution From Employee is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].markPaymentIsEligibleForEmployee === '') {
      this.setState({ markPaymentIsEligibleForEmployeeErrorText1: <span>CSCICS026: Payment is Eligible For Employee is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].markTaxDeductionAtSource === '') {
      this.setState({ markTaxDeductionAtSourceErrorText1: <span>CSCICS027: Tax Deduction At Source is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (this.props.newEmployee.compensationInformation.recurringPayment.recurringPayment[0].markContributionForEmployer === '') {
      this.setState({ markContributionForEmployerErrorText1: <span>CSCICS028: Contribution For Employer is required {this.errorCodeHelper('CSCICS013')}</span> });
      allow = false;
    }
    if (allow) {
      alert('new employee added successfully');
      const key = '_id';
      // let employeeId = null;
      let idToBeDeleted = null;
      if (this.props.newEmployee[key]) {
        idToBeDeleted = this.props.newEmployee[key];
        // alert('option1');
      } else {
        idToBeDeleted = this.state.newEmployeeId;
        // alert('option2');
      }
      // if (this.props.lastEmployee.length === 0) {
      //   employeeId = 100;
      // } else {
      //   employeeId = this.props.lastEmployee[0].personalInformation.biographicalInformation.biographicalInformation.employeeId;
      // }
      counterForNewEmployee({ employeeObjId: idToBeDeleted }, this.counterValue);
      // this.props.newEmployee.entityInformation.owner = this.state.coutner;
      // if (this.state.counter) {
      //   updateNewEmployee({ employee: this.props.newEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
      // }
      // deleteTempNewEmployee(idToBeDeleted);
      // this.props.router.push('/MyTeam');
    }
  }
  removeValidationMessage(e) {
    if (e.target.name === 'countryComponent') {
      this.setState({ modifyCountryNameErrorText: '' });
    }
    if (e.target.name === 'nationalIdCardType') {
      this.setState({ modifyNationalIdCardTypeErrorText: '' });
    }
    if (e.target.name === 'nationalId') {
      this.setState({ modifyNationalIdErrorText: '' });
    }
    if (e.target.name === 'isPrimary') {
      this.setState({ modifyNIIsPrimaryErrorText: '' });
    }
    if (e.target.name === 'emailType') {
      this.setState({ modifyEmailTypeErrorText: '' });
    }
    if (e.target.name === 'emailAddress') {
      this.setState({ modifyEmailAddressErrorText: '' });
    }
    if (e.target.name === 'isEmailPrimary') {
      this.setState({ modifyCIIsPrimaryErrorText: '' });
    }
    if (e.target.name === 'phoneType') {
      this.setState({ modifyPhoneTypeErrorText: '' });
    }
    if (e.target.name === 'phoneNumber') {
      this.setState({ modifyPhoneNumberErrorText: '' });
    }
    if (e.target.name === 'isPrimary') {
      this.setState({ modifyPIIsPrimaryErrorText: '' });
    }
  }
  submitNationalIdModalForm() {
    // formNationalIdInformation
    const formNationalId = document.forms.formNationalIdInformation;
    const formNationalIdInformationData = {};
    formNationalIdInformationData.country = formNationalId.countryComponent.value;
    formNationalIdInformationData.nationalIdCardType = formNationalId.nationalIdCardType.value;
    formNationalIdInformationData.nationalId = formNationalId.nationalId.value;
    formNationalIdInformationData.isPrimary = formNationalId.isPrimary.value;
    // console.log('Modal Form Data', formNationalIdInformationData);
    const newRows = Object.assign([], this.state.rows);
    // console.log(newRows);
    let isValid = true;
    if (formNationalIdInformationData.country === '') {
      this.setState({ modifyCountryNameErrorText: <span>PINIIF018: Country Name cannot be empty {this.errorCodeHelper('PINIIF018')} </span> });
      isValid = false;
    }
    if (formNationalIdInformationData.nationalIdCardType === '') {
      this.setState({ modifyNationalIdCardTypeErrorText: <span>PINIIF019: National Id Card Type cannot be empty {this.errorCodeHelper('PINIIF019')} </span> });
      isValid = false;
    }
    if (formNationalIdInformationData.nationalId === '') {
      this.setState({ modifyNationalIdErrorText: <span>PINIIF020: National ID cannot be empty {this.errorCodeHelper('PINIIF020')} </span> });
      isValid = false;
    }
    if (formNationalIdInformationData.isPrimary === '') {
      this.setState({ modifyNIIsPrimaryErrorText: <span>PINIIF021: Is Primary cannot be empty {this.errorCodeHelper('PINIIF021')} </span> });
      isValid = false;
    }
    if (isValid) {
      newRows.reverse();
      newRows.push(formNationalIdInformationData);
      this.props.dispatch(addNationalIdInformationData({ newRows }));
      this.setState({ nationalIdModalForm: false });
      this.saveNationalIdInfo();
    }
  }
  rowGetterTest(parameter) {
    // console.log(parameter);
    return this.state.rows[parameter];
  }
  rowGetterForCompensation(parameter) {
    // console.log(parameter);
    return this.state.rowsForCompensationGrid[parameter];
  }
  rowGetterForOneTimePayment(index) {
    return this.state.rowsForOneTimePaymentGrid[index];
  }
  mapDropDownValue(obj, helpArray) {
    console.log('help Array', obj, helpArray);
  }
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
  rowGetterForAddress(parameter) {
    return this.state.addressrows[parameter];
  }
  //Get email id information
  rowsEmailGetter(params) {
    return this.state.emailInfoRows[params];
  }
  addEmailIdInformation() {
    this.setState({ emailIdModalForm: true });
  }
  closeEmailIdModal() {
    this.setState({ emailIdModalForm: false });
  }

  // Save the email id information
  submitEmailIdModalForm() {
    // formNationalIdInformation
    const formEmaillId = document.forms.formEmailIdInformation;
    const formEmaillIdInformationData = {};
    formEmaillIdInformationData.emailType = formEmaillId.emailType.value;
    formEmaillIdInformationData.emailAddress = formEmaillId.emailAddress.value;
    formEmaillIdInformationData.isPrimary = formEmaillId.isEmailPrimary.value;
    // console.log('Modal Form Data', formEmaillIdInformationData);
    const newRows = Object.assign([], this.state.emailInfoRows);
    // console.log(newRows);
    let isValid = true;
    if (formEmaillIdInformationData.emailType === '') {
      this.setState({ modifyEmailTypeErrorText: <span>PICIEI037: Email type cannot be empty {this.errorCodeHelper('PICIEI037')} </span> });
      isValid = false;
    }
    if (formEmaillIdInformationData.emailAddress === '') {
      this.setState({ modifyEmailAddressErrorText: <span>PICIEI038: Email address cannot be empty {this.errorCodeHelper('PICIEI038')} </span> });
      isValid = false;
    }
    if (formEmaillIdInformationData.isPrimary === '') {
      this.setState({ modifyCIIsPrimaryErrorText: <span>PICIEI039: Is primary cannot be empty {this.errorCodeHelper('PICIEI039')} </span> });
      isValid = false;
    }
    if (isValid) {
      newRows.reverse();
      newRows.push(formEmaillIdInformationData);
      this.props.dispatch(addEmailIdInformationData({ newRows }));
      this.setState({ emailIdModalForm: false });
      this.saveNationalIdInfo();
    }
  }

  //Get Phone id information
  rowsPhoneGetter(params) {
    return this.state.phoneInfoRows[params];
  }
  addPhoneInformation() {
    this.setState({ phoneInfoIdModalForm: true });
  }
  closePhoneModal() {
    this.setState({ phoneInfoIdModalForm: false });
  }
  // Submit phone information pop-up form data
  submitPhoneInformation() {
    const formPhoneInfoId = document.forms.formPhoneInformation;
    const formPhoneInformationData = {};
    formPhoneInformationData.phoneType = formPhoneInfoId.phoneType.value;
    formPhoneInformationData.number = formPhoneInfoId.phoneNumber.value;
    formPhoneInformationData.extension = formPhoneInfoId.phoneExtension.value;
    formPhoneInformationData.isPrimary = formPhoneInfoId.isPrimary.value;
    // console.log('Modal Form Data', formPhoneInformationData);
    const newRows = Object.assign([], this.state.phoneInfoRows);
    // console.log(newRows);
    let isValid = true;
    if (formPhoneInformationData.phoneType === '') {
      this.setState({ modifyPhoneTypeErrorText: <span>PICIPI040: Phone type cannot be empty {this.errorCodeHelper('PICIPI040')} </span> });
      isValid = false;
    }
    if (formPhoneInformationData.number === '') {
      this.setState({ modifyPhoneNumberErrorText: <span>PICIPI041: Phone number cannot be empty {this.errorCodeHelper('PICIPI041')} </span> });
      isValid = false;
    }
    if (formPhoneInformationData.isPrimary === '') {
      this.setState({ modifyPIIsPrimaryErrorText: <span>PICIPI042: Is primary cannot be empty {this.errorCodeHelper('PICIPI042')} </span> });
      isValid = false;
    }
    if (isValid) {
      newRows.reverse();
      newRows.push(formPhoneInformationData);
      this.props.dispatch(addPhoneInformationData({ newRows }));
      this.setState({ phoneInfoIdModalForm: false });
      this.saveNationalIdInfo();
    }
  }
  SubmitForCompensation(submitData, hiddenType) {
    const newSubmitData = submitData;
    let newRows = Object.assign([], this.state.rowsForCompensationGrid);
    if (hiddenType === 'add') {
      newRows.unshift(submitData);
      newSubmitData.operation = 'INSERT';
    } else {
      newRows[this.state.crrentGridDataObjectForCompensation.rowNo] = submitData;
      newSubmitData.operation = 'UPDATE';
      this.setState({ currentSelectedIndexForCompensation: -1 });
    }
    newRows = newRows.reverse();
    console.log('new compensation rows', newRows, newSubmitData);
    this.props.dispatch(updateNewEmployeeCompensation({ newData: newRows, subsection: 'compensation' }));
    // this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'compensation' }));
    this.setState({ ShowingForCompensation: false });
    this.setSyncedWithServer(false);
    this.save();
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
    this.props.dispatch(updateNewEmployeeCompensation({ newData: newRows, subsection: 'oneTimePayment' }));
    // this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'oneTimePayment' }));
    this.setState({ currentGridDataObjectForOneTimePayment: {} });
    this.setState({ ShowingForOneTimePayment: false });
    this.setSyncedWithServer(false);
    this.save();
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
    this.props.dispatch(updateNewEmployeeCompensation({ newData: newRows, subsection: 'recurringPayment' }));
    // this.props.dispatch(updateAuditForCompensatonInfo({ newData: newSubmitData, subsection: 'recurringPayment' }));
    this.setState({ currentSelectedIndexForRecurringPayment: -1 });
    this.setState({ currentGridDataObjectForRecurringPayment: {} });
    this.setState({ ShowingForRecurringPayment: false });
    this.setSyncedWithServer(false);
    this.save();
  }
  closeForAddressForm() {
    this.setState({ showingAddressForm: false });
  }
  submitForAddressForm(submitData) {
    // console.log(should be there params hiddenType);
    const newRows = Object.assign([], this.state.addressrows);
    newRows.reverse();
    newRows.push(submitData);
    // console.log(newRows);
    this.props.dispatch(addAddressInfoData({ newRows }));
    this.saveNationalIdInfo();
    this.setState({ showingAddressForm: false });
  }
  openAddressForm() {
    this.setState({ showingAddressForm: true });
  }
  rowGetterForWorkPermitInfoTest(index) {
    return this.state.workpermitinforows[index];
  }
  openWorkPermitInfoForm() {
    this.setState({ showingWorkPermitFrom: true });
  }
  closeWorkPermitInfoForm() {
    this.setState({ showingWorkPermitFrom: false });
  }
  submitWorkPermitInfoForm(submitData) {
    // console.log(submitData, should be there in hiddenType);
    const newRows = Object.assign([], this.state.workpermitinforows);
    newRows.reverse();
    newRows.push(submitData);
    this.props.dispatch(addWorkPermitInfoData({ newRows }));
    this.setState({ showingWorkPermitFrom: false });
    this.saveNationalIdInfo();
  }
  saveNationalIdInfo() {
    // alert('hey leave me like this');
    updateTempNewEmployee({ employee: this.props.newEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
  }
  save() {
    // updateNewEmployee({ employee: this.props.newEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    if (!this.state.syncedWithServer) {
      // console.log('saving the employee data');
      // console.log({ employee: this.props.newEmployee });
      updateTempNewEmployee({ employee: this.props.newEmployee }, false, this.props.dispatch, this.setSyncedWithServer, this.getNewEmployeeId);
    }
  }
  // errorCodeHelperOnClick(errorCode) {
  //   console.log(errorCode);
  // }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  nextStep() {
    switch (this.state.breadcrumbPosition) {
      case 1: {
        // console.log(this.props, 'PROPS');
        let allow = true;
        //console.log('OPTIONS', this.props.newEmployee.identify.hireDate, this.props.newEmployee.identify.company, this.props.newEmployee.identify.eventReason);
       // window.dispatchEvent(new Event('resize'));
        if (this.props.newEmployee) {
          // console.log('', this.props.newEmployee.identify.identify.identify.company, this.props.newEmployee.identify.identify.identify.hireDate, this.props.newEmployee.identify.identify.identify.eventReason);
          if (this.props.newEmployee.identify.identify.identify.hireDate === '') {
            this.setState({ modifyHireDateErrorText: <span>AEIDID001: hire date cannot be Empty {this.errorCodeHelper('AEIDID001')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.identify.identify.identify.company === '') {
            this.setState({ modifyCompanyErrorText: <span>AEIDID002: company name cannot be Empty {this.errorCodeHelper('AEIDID002')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.identify.identify.identify.eventReason === '') {
            this.setState({ modifyEventReasonErrorText: <span>AEIDID003: event reason cannot be Empty {this.errorCodeHelper('AEIDID003')}</span> });
            allow = false;
          }
          if (allow) {
            const p = document.getElementById('identify');
            const n = document.getElementById('personalInfo');
            document.getElementById('step2').style.display = 'block';
            document.getElementById('prevButton').style.display = 'none';
            document.getElementById('step1').style.display = 'none';
            if (p.classList.contains('active')) {
              p.classList.remove('active');
              p.classList.add('done');
            }
            if (n.classList.contains('active')) {
              n.classList.remove('active');
            } else {
              n.classList.add('active');
            }
            this.setState({ breadcrumbPosition: 2 });
            window.dispatchEvent(new Event('resize'));
          }
        }
        break;
      }
      case 2: {
        let allow = true;
        if (this.props.newEmployee) {
          // console.log(this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.countryOfBirth);
          if (this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.dob === null) {
            this.setState({ modifyDOBErrorText: <span>PIBIBI004: Date Of Birth cannot be Empty {this.errorCodeHelper('PIBIBI004')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.countryOfBirth === '') {
            this.setState({ modifyCountryOfBirthErrorText: <span>PIBIBI005: Country Of Birth cannot be Empty {this.errorCodeHelper('PIBIBI005')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.regionOfBirth === '') {
            this.setState({ modifyRegionOfBirthErrorText: <span>PIBIBI006: Region Of Birth cannot be Empty {this.errorCodeHelper('PIBIBI006')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.firstName === '') {
            this.setState({ modifyFirstNameErrorText: <span>PIPIPI007: First Name cannot be Empty {this.errorCodeHelper('PIPIPI007')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.lastName === '') {
            this.setState({ modifyLastNameErrorText: <span>PIPIPI008: Last Name cannot be Empty {this.errorCodeHelper('PIPIPI008')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.suffix === '') {
            this.setState({ modifySuffixErrorText: <span>PIPIPI009:Suffix cannot be Empty {this.errorCodeHelper('PIPIPI009')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.title === '') {
            this.setState({ modfiyTitleErrorText: <span>PIPIPI010: Title cannot be Empty {this.errorCodeHelper('PIPIPI010')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.prefix === '') {
            this.setState({ modifyPrefixErrorText: <span>PIPIPI011: Prefix cannot be Empty {this.errorCodeHelper('PIPIPI011')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.gender === '') {
            this.setState({ modifyGenderErrorText: <span>PIPIPI012: Gender cannot be Empty {this.errorCodeHelper('PIPIPI012')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.maritalStatus === '') {
            this.setState({ modifyMaritalStatusErrorText: <span>PIPIPI013: Marital Status cannot be Empty {this.errorCodeHelper('PIPIPI013')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.personalInformation.preferredLanguage === '') {
            this.setState({ modifyNativePreferredLanguage: <span>PIPIPI014: Preferred Language cannot be Empty {this.errorCodeHelper('PIPIPI014')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.ethnicGroup === '') {
            this.setState({ modifyEthnicGroupErrorText: <span>PIPICS015: Ethnic Group cannot be Empty {this.errorCodeHelper('PIPICS015')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.veteran === '') {
            this.setState({ modifyVeteranErrorText: <span>PIPICS016: Veteran cannot be Empty {this.errorCodeHelper('PIPICS016')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.challengedVeteran === '') {
            this.setState({ modifyChallengedVeteranErrorText: <span>PIPICS017: Challenged Veteran cannot be Empty {this.errorCodeHelper('PIPICS017')}</span> });
            allow = false;
          }
          // if (this.props.newEmployee.personalInformation.workPermitInformation.workPermitInformation.length <= 0) {
          //   alert('workpermit info can be empty');
          // }
          if (this.props.newEmployee.personalInformation.addressInformation.addressInformation <= 0) {
            this.setState({ modifyAddressInfoErrorText: 'atleast one address is required' });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.nationalIdInformation <= 0) {
            this.setState({ modifyAddressInfoErrorText: 'atleast one Natioanl Id Info is required' });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.contactInformation.emailInformation <= 0) {
            this.setState({ modifyAddressInfoErrorText: 'atleast one email Info is required' });
            allow = false;
          }
          if (this.props.newEmployee.personalInformation.contactInformation.phoneInformation <= 0) {
            this.setState({ modifyAddressInfoErrorText: 'atleast one phone Info is required' });
            allow = false;
          }
          // if (this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.DateOfDeath === null) {
          //   this.setState({ modifyDateOfDeathErrorText: 'Date Of Death cannot be Empty' });
          //   allow = false;
          // }
          if (allow) {
            //alert('okay');
            const pi = document.getElementById('personalInfo');
            const ji = document.getElementById('jobInfo');
            document.getElementById('step3').style.display = 'block';
            document.getElementById('prevButton').style.display = 'block';
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'none';
            if (pi.classList.contains('active')) {
              pi.classList.remove('active');
              pi.classList.add('done');
            }
            if (ji.classList.contains('active')) {
              ji.classList.remove('active');
            } else {
              ji.classList.add('active');
            }
            this.setState({ breadcrumbPosition: 3 });
          }
        }
        break;
      }

      case 3: {
        let allow = true;
        if (this.props.newEmployee) {
          // console.log(this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0]);
          if (this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.jobCode === '') {
            this.setState({ modifyJobCodeErrorText: <span>JIEDKJ001: Job Code cannot be empty {this.errorCodeHelper('JIEDKJ001')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.position === '') {
            this.setState({ modifyPositionErrorText: <span>JIEDKJ002: Position cannot be empty {this.errorCodeHelper('JIEDKJ002')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].company === '') {
            this.setState({ modifyOICompanyErrorText: <span>JIEDOI003: Company cannot be empty {this.errorCodeHelper('JIEDOI003')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].businessUnit === '') {
            this.setState({ modifyBusinessUnitErrorText: <span>JIEDOI004: Business Unit cannot be empty {this.errorCodeHelper('JIEDOI004')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].division === '') {
            this.setState({ modifyDivisionErrorText: <span>JIEDOI005: Division cannot be empty {this.errorCodeHelper('JIEDOI005')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].department === '') {
            this.setState({ modifyDepartmentErrorText: <span>JIEDOI006: Department cannot be empty {this.errorCodeHelper('JIEDOI006')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].location === '') {
            this.setState({ modifyLocationErrorText: <span>JIEDOI007: Location cannot be empty {this.errorCodeHelper('JIEDOI007')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].timeZone === '') {
            this.setState({ modifyTimeZoneErrorText: <span>JIEDOI008: Timezone cannot be empty {this.errorCodeHelper('JIEDOI008')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].costCenter === '') {
            this.setState({ modifyCostCenterErrorText: <span>JIEDOI009: Cost Center cannot be empty {this.errorCodeHelper('JIEDOI009')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].employmentStatus === '') {
            this.setState({ modifyEmployeeStatusErrorText: <span>JIEDJI010: Employee Status cannot be empty {this.errorCodeHelper('JIEDJI010')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].supervisor === '') {
            this.setState({ modifySupervisorErrorText: <span>JIEDJI011: Supervisor cannot be empty {this.errorCodeHelper('JIEDJI011')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].jobClassification === '') {
            this.setState({ modifyJobClassificationErrorText: <span>JIEDJI012: Job Classification cannot be empty {this.errorCodeHelper('JIEDJI012')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].jobTitle === '') {
            this.setState({ modifyJobTitleErrorText: <span>JIEDJI013: Job Title cannot be emptym {this.errorCodeHelper('JIEDJI013')}</span> });
            allow = false;
          }
          // if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].localJobTitle === '') {
          //   this.setState({ modifyLocalJobTitleErrorText: 'Local Job Title cannot be empty' });
          //   allow = false;
          // }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].payGrade === '') {
            this.setState({ modifyPayGradeErrorText: <span>JIEDJI014: Pay Grade cannot be empty {this.errorCodeHelper('JIEDJI014')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].regularOrTemporary === '') {
            this.setState({ modifyRegularTemporaryErrorText: <span>JIEDJI015: Regular Or Temporary cannot be empty {this.errorCodeHelper('JIEDJI015')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].standardWeeklyHours === '') {
            this.setState({ modifyStandardWeeklyHoursErrorText: <span>JIEDJI016: Standard Weekly Hours cannot be empty {this.errorCodeHelper('JIEDJI016')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.timeInformation.holidayCalendar === '') {
            this.setState({ modifyHolidayCalendarErrorText: <span>JIEDTI017: Holiday Calendar cannot be empty {this.errorCodeHelper('JIEDTI017')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.timeInformation.workSchedule === '') {
            this.setState({ modifyWorkScheduleErrorText: <span>JIEDTI018: Work Schedule cannot be empty {this.errorCodeHelper('JIEDTI018')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.timeInformation.timeProfile === '') {
            this.setState({ modifyTimeProfileErrorText: <span>JIEDTI019: Time Profile cannot be empty {this.errorCodeHelper('JIEDTI019')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.jobRelationships.globalFields[0].relationshipType === '') {
            this.setState({ modifyRelationShipTypeErrorText: <span>JIJRGF037: Relationship cannot be empty {this.errorCodeHelper('JIJRGF037')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.jobRelationships.globalFields[0].name === '') {
            this.setState({ modifyNameErrorText: <span>JIJRGF038: Name cannot be empty {this.errorCodeHelper('JIJRGF038')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetails.globalFields.hireDate === null) {
            this.setState({ modifyJobInfoHireDateErrorText: <span>JIESGF039: Hire date cannot be empty {this.errorCodeHelper('JIESGF039')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetails.globalFields.originalStartDate === null) {
            this.setState({ modifyOriginalStartDateErrorText: <span>JIESGF040: Original start date cannot be empty {this.errorCodeHelper('JIESGF040')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isFullTime === '') {
            this.setState({ modifyISFullTimeErrorText: <span>JIEDCS020: Is full time employee cannot be empty {this.errorCodeHelper('JIEDCS020')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.employeeClass === '') {
            this.setState({ modifyEmployeeClassErrorText: <span>JIEDCS021: Employee class cannot be empty {this.errorCodeHelper('JIEDCS021')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.flsaStatus === '') {
            this.setState({ modifyFLSAtatusErrorText: <span>JIEDCS022: Flsa status cannot be empty {this.errorCodeHelper('JIEDCS022')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isShiftEmployee === '') {
            this.setState({ modifyIsShiftEmployeeErrorText: <span>JIEDCS023: Is shift employee cannot be empty {this.errorCodeHelper('JIEDCS023')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftCode === '') {
            this.setState({ modifyShiftCodeErrorText: <span>JIEDCS024: Shift code cannot be empty {this.errorCodeHelper('JIEDCS024')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isCrossBorderWorker === '') {
            this.setState({ modifyIsCrossBorderWorkerErrorText: <span>JIEDCS025: Is cross border worker cannot be empty {this.errorCodeHelper('JIEDCS025')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoJobGroup === '') {
            this.setState({ modifyEEOJobGroupErrorText: <span>JIEDCS026: EEO job group cannot be empty {this.errorCodeHelper('JIEDCS026')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.contractType === '') {
            this.setState({ modifyContractErrorText: <span>JIEDCS027: Contract type cannot be empty {this.errorCodeHelper('JIEDCS027')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayPeriod === '') {
            this.setState({ modifyContinuedSicknessPayPeriodErrorText: <span>JIEDCS028: Continued sickness pay period cannot be empty {this.errorCodeHelper('JIEDCS028')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayMeasure === '') {
            this.setState({ modifyConinuedSicknessPayMeasureErrorText: <span>JIEDCS029: Continued sickness pay measure cannot be empty {this.errorCodeHelper('JIEDCS029')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.noticePeriod === '') {
            this.setState({ modifyNoticePeriodErrorText: <span>JIEDCS030: Notice period  cannot be empty {this.errorCodeHelper('JIEDCS030')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory1 === '') {
            this.setState({ modifyEEOCategeory1ErrorText: <span>JIEDCS031: EEO category 1 cannot be empty {this.errorCodeHelper('JIEDCS031')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory2 === '') {
            this.setState({ modifyEEOCategeory2ErrorText: <span>JIEDCS032: EEO category 2 cannot be empty {this.errorCodeHelper('JIEDCS032')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory3 === '') {
            this.setState({ modifyEEOCategeory3ErrorText: <span>JIEDCS033: EEO category 3 cannot be empty {this.errorCodeHelper('JIEDCS033')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory4 === '') {
            this.setState({ modifyEEOCategeory4ErrorText: <span>JIEDCS034: EEO category 4 cannot be empty {this.errorCodeHelper('JIEDCS034')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory5 === '') {
            this.setState({ modifyEEOCategeory5ErrorText: <span>JIEDCS035: EEO category 5 cannot be empty {this.errorCodeHelper('JIEDCS035')}</span> });
            allow = false;
          }
          if (this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory6 === '') {
            this.setState({ modifyEEOCategeory6ErrorText: <span>JIEDCS036: EEO category 6 cannot be empty {this.errorCodeHelper('JIEDCS036')}</span> });
            allow = false;
          }
          if (allow) {
            const jin = document.getElementById('jobInfo');
            const c = document.getElementById('compensationInfo');
            document.getElementById('step4').style.display = 'block';
            document.getElementById('prevButton').style.display = 'block';
            document.getElementById('nextButton').style.display = 'none';
            document.getElementById('saveButton').style.display = 'block';
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'none';
            document.getElementById('step3').style.display = 'none';
            if (jin.classList.contains('active')) {
              jin.classList.remove('active');
              jin.classList.add('done');
            }
            if (c.classList.contains('active')) {
              c.classList.remove('active');
            } else {
              c.classList.add('active');
            }
            this.setState({ breadcrumbPosition: 4 });
            window.dispatchEvent(new Event('resize'));
          }
        }
        break;
      }

      default: {
        const i = document.getElementById('identify');
        document.getElementById('step1').style.display = 'block';
        document.getElementById('prevButton').style.display = 'block';
        document.getElementById('nextButton').style.display = 'block';
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
        i.classList.remove('done');
        // this.setState({ breadcrumbPosition: 1 });
        break;
      }
    }
  }
  prevStep() {
    switch (this.state.breadcrumbPosition) {
      case 4: {
        const jin = document.getElementById('jobInfo');
        const c = document.getElementById('compensationInfo');
        document.getElementById('step3').style.display = 'block';
        document.getElementById('prevButton').style.display = 'block';
        document.getElementById('nextButton').style.display = 'block';
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
        if (jin.classList.contains('done')) {
          jin.classList.remove('done');
          jin.classList.add('active');
        }
        if (c.classList.contains('active')) {
          c.classList.remove('active');
        }
        this.setState({ breadcrumbPosition: 3 });
        break;
      }
      case 3: {
        const p = document.getElementById('personalInfo');
        const ji = document.getElementById('jobInfo');
        document.getElementById('step2').style.display = 'block';
        document.getElementById('prevButton').style.display = 'block';
        document.getElementById('nextButton').style.display = 'block';
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
        if (p.classList.contains('done')) {
          p.classList.remove('done');
          p.classList.add('active');
        }
        if (ji.classList.contains('active')) {
          ji.classList.remove('active');
        }
        this.setState({ breadcrumbPosition: 2 });
        window.dispatchEvent(new Event('resize'));
        break;
      }
      case 2: {
        const i = document.getElementById('identify');
        const pi = document.getElementById('personalInfo');
        document.getElementById('step1').style.display = 'block';
        document.getElementById('prevButton').style.display = 'none';
        document.getElementById('nextButton').style.display = 'block';
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
        if (i.classList.contains('done')) {
          i.classList.remove('done');
          i.classList.add('active');
        }
        if (pi.classList.contains('active')) {
          pi.classList.remove('active');
        }
        this.setState({ breadcrumbPosition: 1 });
        break;
      }
      default: {
        break;
      }
    }
  }
  formatHireDateUserFriendly(inputDate) {
    const formattedHireDateDay = (inputDate)
        ? moment(inputDate).format('DD-MMM-YYYY')
        : '';
    return formattedHireDateDay;
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
  renderCorporateAddress(data) {
    const key = '_id';
    const option = [];
    if (data[key]) {
      option.push(<option value={data[key]}>{data.companyName}</option>);
    }
    return option;
  }
  render() {
    // console.log('rendering');
    //console.log(this.props.newEmployee);
    // const styles = {
    //   overlay: {
    //     position: 'fixed',
    //     top: 50,
    //     left: 380,
    //     right: 380,
    //     bottom: 50
    //   },
    //   content: {
    //     position: 'absolute',
    //     top: '40px',
    //     left: '40px',
    //     right: '40px',
    //     bottom: '40px',
    //     border: '1px solid #ccc',
    //     background: '#fff',
    //     overflow: 'auto',
    //     WebkitOverflowScrolling: 'touch',
    //     borderRadius: '4px',
    //     outline: 'none',
    //     padding: '20px'
    //   }
    // };
    /* const hireDateDay = (this.props.newEmployee.identify.identify.identify.hireDate)
     ? this.props.newEmployee.identify.identify.identify.hireDate
     : new Date();*/
    const hireDateDay = (this.props.newEmployee.identify.identify.identify.hireDate);
    const formattedHireDateDay = (hireDateDay)
        ? moment(hireDateDay).format('DD-MMM-YYYY')
        : '';
    /* const DOBDay = (this.props.newEmployee.personalInformation.biographicalInformation.DOB)
     ? this.props.newEmployee.personalInformation.biographicalInformation.DOB
     : new Date(); */
    /* const DOBDay = (this.props.newEmployee.personalInformation.biographicalInformation.dob);
    const formattedDOB = (DOBDay)
        ? moment(DOBDay).format('DD-MMM-YYYY')
        : '';*/
    /* const DateOfDeathDay = (this.props.newEmployee.personalInformation.biographicalInformation.DateOfDeath)
     ? this.props.newEmployee.personalInformation.biographicalInformation.DateOfDeath
     : new Date(); */
    /* const DateOfDeathDay = (this.props.newEmployee.personalInformation.biographicalInformation.dateOfDeath);
    const formattedDateOfDeath = (DateOfDeathDay)
        ? moment(DateOfDeathDay).format('DD-MMM-YYYY')
        : '';*/
    /* const CertificateStartDateDay = (this.props.newEmployee.personalInformation.biographicalInformation.CertificateStartDate)
     ? this.props.newEmployee.personalInformation.biographicalInformation.CertificateStartDate
     : new Date(); */
    // const CertificateStartDateDay = new Date();
    // const formattedCertificateStartDate = (CertificateStartDateDay)
    //     ? moment(CertificateStartDateDay).format('DD-MMM-YYYY')
    //     : '';
    /* const CertificateEndDateDay = (this.props.newEmployee.personalInformation.biographicalInformation.CertificateEndDate)
     ? this.props.newEmployee.personalInformation.biographicalInformation.CertificateEndDate
     : new Date(); */
    // const CertificateEndDateDay = new Date();
    // const formattedCertificateEndDate = (CertificateEndDateDay)
    //     ? moment(CertificateEndDateDay).format('DD-MMM-YYYY')
    //     : '';

    const maritalStatusSinceDate = (this.props.newEmployee.personalInformation.personalInformation.personalInformation.maritalStatusSinceDate);
    const formattedMaritalStatusSinceDate = (maritalStatusSinceDate)
        ? moment(maritalStatusSinceDate).format('DD-MMM-YYYY')
        : '';

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div id="steps-add-employee" className="steps-wrapper">
              <div >
                {/* <button
                  id="saveButtonTop"
                  onClick={() => this.save()}
                >
                  Save
                </button>
                <button
                  id="resetButtonTop"
                  onClick={() => this.save()}
                >
                  Reset
                </button> */}
              </div>
              <div className="steps">
                <div className="step-app">
                  <div className="steps-placeholder">
                    <div className="steps-nav panel">
                      <ul className="step-steps cd-multi-steps text-top">
                        <li className="active" id="identify">
                          {' '}
                          <a href="#step1">
                            {' '}
                            <span className="step-text">Identify</span>
                            {' '}
                          </a>
                          {' '}
                        </li>
                        <li className="" id="personalInfo">
                          {' '}
                          <a href="#step2">
                            {' '}
                            <span className="step-text">
                            Personal Information
                          </span>
                            {' '}
                          </a>
                          {' '}
                        </li>
                        <li className="" id="jobInfo">
                          {' '}
                          <a href="#step3">
                            {' '}
                            <span className="step-text">Job Information</span>
                            {' '}
                          </a>
                          {' '}
                        </li>
                        <li className="" id="compensationInfo">
                          {' '}
                          <a href="#step4">
                            {' '}
                            <span className="step-text">
                            Compensation Information
                          </span>
                            {' '}
                          </a>
                          {' '}
                        </li>
                      </ul>
                      <div className="step-footer">
                        <button
                          className="step-prev"
                          data-direction="prev"
                          id="prevButton"
                          onClick={() => this.prevStep()}
                        >
                          Previous
                        </button>
                        <button
                          className="step-next"
                          data-direction="next"
                          id="nextButton"
                          onClick={() => this.nextStep()}
                        >
                          Next
                        </button>
                        <button
                          className="step-save"
                          id="saveButton"
                          data-direction="finish"
                          onClick={() => this.validationForCompensationTab()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="step-content">
                    <div className="step-tab-panel" id="step1">
                      <div className="fields-inline panel">
                        <Row>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-field">
                              <label htmlFor="addemp-hire-date">* Hire Date</label>
                              <DayPickerInput
                                className="form-control textBoxStyle entry-input"
                                placeholder="MM/DD/YYYY"
                                onDayChange={this.modifyHireDate}
                                value={formattedHireDateDay}
                              />
                              {/* <DatePickerCustom
                                targetName="identify.identify.identify.hireDate"
                                onDayChange={this.updateEmployeeData}
                                value={formattedHireDateDay}
                              /> */}
                              <p className="dangerError">
                                {this.state.modifyHireDateErrorText !== '' ? this.state.modifyHireDateErrorText : ''}
                              </p>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-field">
                              <label htmlFor="addemp-company">* Company</label>
                              <select value={this.props.newEmployee.identify.identify.identify.company} onChange={this.handleChangeCompanies} className="custom-select" onBlur={() => this.save()}>
                                <option value="" selected disabled >select</option>
                                {/* {this.bindDataToDropDownList(this.props.masterInfo, 'Company')} */}
                                {
                                  this.renderCorporateAddress(this.props.companyData.corporateAddress)
                                }
                                {
                                  this.props.companyData.branches.map((data) => {
                                    const key = '_id';
                                    return <option value={data[key]}>{data.companyName}</option>;
                                  })
                                }
                              </select>
                              {/* <ReactSuperSelect
                                className="custom-select"
                                placeholder="Select Company"
                                // dataSource={this.props.newEmployee.companyList}
                                optionValueKey="companyId"
                                optionLabelKey="companyName"
                                clearable={false}
                                onChange={this.setCompany}
                              /> */}
                              <p className="dangerError">
                                {this.state.modifyCompanyErrorText !== '' ? this.state.modifyCompanyErrorText : ''}
                              </p>
                            </div>
                          </Col>
                          <Col lg={4} md={4} sm={4}>
                            <div className="form-field">
                              <label htmlFor="addemp-reason">* Event Reason</label>
                              <select value={this.props.newEmployee.identify.identify.identify.eventReason} className="custom-select" onChange={this.modifyEventReason} onBlur={() => this.save()}>
                                <option value="" selected disabled >select</option>
                                {this.bindDataToDropDownList(this.props.masterInfo, 'Event Reason')}
                              </select>
                              {/* <ReactSuperSelect
                                className="custom-select"
                                placeholder="Select Event Reason"
                                // dataSource={this.props.newEmployee.eventReasonList}
                                optionValueKey="eventReasonId"
                                optionLabelKey="eventReasonName"
                                clearable={false}
                                onChange={this.setEventReason}
                              /> */}
                              <p className="dangerError">
                                {this.state.modifyEventReasonErrorText !== '' ? this.state.modifyEventReasonErrorText : ''}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="step-tab-panel" id="step2">
                      <div className="box">
                        {/* <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.49 43">
                                <title>Zasób 3</title>
                                <polygon
                                  points="39.99 5.24 36.25 1.5 16.84 20.91 15.1 26.39 20.58 24.65 39.99 5.24 39.99 5.24"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="33.22"
                                  y1="4.58"
                                  x2="36.96"
                                  y2="8.32"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <polyline
                                  points="32.1 14.08 32.1 41.5 1.5 41.5 1.5 6.62 31.07 6.62"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="6.75"
                                  y1="14.75"
                                  x2="21.98"
                                  y2="14.75"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="6.75"
                                  y1="20.65"
                                  x2="16.84"
                                  y2="20.65"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="6.75"
                                  y1="26.55"
                                  x2="14.73"
                                  y2="26.55"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">
                              Biographical Information
                            </h2>
                            <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="box-content">
                          <div className="box-tab active">
                            <div className="box-inner--no-pad">
                              <div className="toggler active" id="biographicalInfo" >
                                <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                                  <div className="box-icon">
                                    {' '}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.49 43">
                                      <title>Zasób 3</title>
                                      <polygon
                                        points="39.99 5.24 36.25 1.5 16.84 20.91 15.1 26.39 20.58 24.65 39.99 5.24 39.99 5.24"
                                        fill="none"
                                        stroke="#3487CA"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                      />
                                      <line
                                        x1="33.22"
                                        y1="4.58"
                                        x2="36.96"
                                        y2="8.32"
                                        fill="none"
                                        stroke="#3487CA"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                      />
                                      <polyline
                                        points="32.1 14.08 32.1 41.5 1.5 41.5 1.5 6.62 31.07 6.62"
                                        fill="none"
                                        stroke="#3487CA"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                      />
                                      <line
                                        x1="6.75"
                                        y1="14.75"
                                        x2="21.98"
                                        y2="14.75"
                                        fill="none"
                                        stroke="#3487CA"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                      />
                                      <line
                                        x1="6.75"
                                        y1="20.65"
                                        x2="16.84"
                                        y2="20.65"
                                        fill="none"
                                        stroke="#3487CA"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                      />
                                      <line
                                        x1="6.75"
                                        y1="26.55"
                                        x2="14.73"
                                        y2="26.55"
                                        fill="none"
                                        stroke="#3487CA"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                      />
                                    </svg>{' '}
                                  </div>
                                  <h2 className="toggler-title mgn-left">
                                    Biographical Information
                                  </h2>
                                  <div className="actionEnable" >
                                    <ul className="box-actions" >
                                      {/* <li>
                                        <a onClick={this.openAddressForm}>
                                          <i className="fas fa-plus addIco" aria-hidden="true" />
                                        </a>
                                      </li> */}
                                      {/* <li>
                                        <a onClick={this.EditOpenForCompensation}>
                                          <i className="far fa-edit editIco" aria-hidden="true" />
                                        </a>
                                      </li>
                                      <li>
                                        <a>
                                          <i className="fas fa-history historyIco" aria-hidden="true" />
                                        </a>
                                      </li> */}
                                      <li>
                                        <Link to={`/Help/${'PIBIBI000'}`} target="_blank" >
                                          <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                  <span onClick={() => this.toggleElement('biographicalInfo')} className="box-filter-arrow" />{' '}
                                </div>
                                <div className="toggler-content">
                                  <table className="table table--stripes">
                                    <tbody>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Date of Birth
                                          </span>
                                        </td>
                                        <td>
                                          {/* <DayPickerInput
                                            className="js-datepicker entry-input"
                                            placeholder="MM/DD/YYYY"
                                            onDayChange={this.modifyDOB}
                                            value={formattedDOB}
                                          />*/}
                                          <DatePickerCustom
                                            targetName="personalInformation.biographicalInformation.biographicalInformation.dob"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.dob}
                                          />
                                          <p className="dangerError">
                                            {this.state.modifyDOBErrorText !== '' ? this.state.modifyDOBErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Country of Birth
                                          </span>
                                        </td>
                                        <td>
                                          {/* <ReactSuperSelect
                                            className="custom-select"
                                            placeholder="Select Country of Birth"
                                            // dataSource={this.props.newEmployee.personalInformation.biographicalInformation.countryList}
                                            optionValueKey="CountryOfBirthId"
                                            optionLabelKey="CountryOfBirthName"
                                            clearable={false}
                                            onChange={this.setCountryOfBirth}
                                          />*/}
                                          <select className="custom-select" name="personalInformation.biographicalInformation.biographicalInformation.countryOfBirth" onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                            <option value="" selected disabled >select</option>
                                            { this.bindDataToDropDownList(this.props.masterInfo, 'Country') }
                                          </select>
                                          <p className="dangerError">
                                            {this.state.modifyCountryOfBirthErrorText !== '' ? this.state.modifyCountryOfBirthErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Region of Birth
                                          </span>
                                        </td>
                                        <td>
                                          <input name="personalInformation.biographicalInformation.biographicalInformation.regionOfBirth" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.regionOfBirth} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                          <p className="dangerError">
                                            {this.state.modifyRegionOfBirthErrorText !== '' ? this.state.modifyRegionOfBirthErrorText : ''}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Date of Death
                                          </span>
                                        </td>
                                        <td>
                                          {/* <DayPickerInput
                                            className="js-datepicker entry-input"
                                            placeholder="MM/DD/YYYY"
                                            onDayChange={this.modifyDateOfDeath}
                                            value={formattedDateOfDeath}
                                          />*/}
                                          <DatePickerCustom
                                            targetName="personalInformation.biographicalInformation.biographicalInformation.dateOfDeath"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.dateOfDeath}
                                          />
                                          {/* <p className="danger">
                                            {this.state.modifyDateOfDeathErrorText !== '' ? this.state.modifyDateOfDeathErrorText : ''}
                                          </p> */}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Employee Id
                                          </span>
                                        </td>
                                        <td>
                                          <input name="personalInformation.biographicalInformation.biographicalInformation.employeeId" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId} onChange={this.updateEmployeeData} onBlur={() => this.save()} disabled />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Employee Global Id
                                          </span>
                                        </td>
                                        <td>
                                          <input name="personalInformation.biographicalInformation.biographicalInformation.employeeGlobalId" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeGlobalId} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
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
                      <div className="box">
                        {/* <ul className="box-headings">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 47.78 43"
                              >
                                <title>Zasób 1</title>
                                <path
                                  d="M35.08,5.12h11.2V41.5H1.5V5.12H12.7m.84-3.62h20.7V8.37H13.54ZM28.29,18H40.17M28.29,22.76H40.17M28.29,27.57H40.17M28.29,32.38h7.49M14.19,25.32A4.45,4.45,0,0,1,11,20.62a3.31,3.31,0,0,1,3.08-3.52h.14a3.31,3.31,0,0,1,3.23,3.39s0,.09,0,.14c0,2.08-.66,3.85-3.22,4.7Zm-3,.55h5.93a3.63,3.63,0,0,1,3.61,3.61v2.88H7.61V29.49a3.62,3.62,0,0,1,3.61-3.61Z"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">Personal Information</h2>
                            <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="box-inner--no-pad">
                          <div className="toggler active" id="personalInfoDiv">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <div className="box-icon">
                                {' '}<svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 47.78 43"
                                >
                                  <title>Zasób 1</title>
                                  <path
                                    d="M35.08,5.12h11.2V41.5H1.5V5.12H12.7m.84-3.62h20.7V8.37H13.54ZM28.29,18H40.17M28.29,22.76H40.17M28.29,27.57H40.17M28.29,32.38h7.49M14.19,25.32A4.45,4.45,0,0,1,11,20.62a3.31,3.31,0,0,1,3.08-3.52h.14a3.31,3.31,0,0,1,3.23,3.39s0,.09,0,.14c0,2.08-.66,3.85-3.22,4.7Zm-3,.55h5.93a3.63,3.63,0,0,1,3.61,3.61v2.88H7.61V29.49a3.62,3.62,0,0,1,3.61-3.61Z"
                                    fill="none"
                                    stroke="#3487CA"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                </svg>{' '}
                              </div>
                              <h2 className="toggler-title mgn-left">
                                Personal Information
                              </h2>
                              <div id="personalInfoActionsToggle" className="actionEnable" >
                                <ul className="box-actions" >
                                  {/* <li>
                                    <a onClick={this.openAddressForm}>
                                      <i className="fas fa-plus addIco" aria-hidden="true" />
                                    </a>
                                  </li> */}
                                  {/* <li>
                                    <a onClick={this.EditOpenForCompensation}>
                                      <i className="far fa-edit editIco" aria-hidden="true" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="fas fa-history historyIco" aria-hidden="true" />
                                    </a>
                                  </li> */}
                                  <li>
                                    <Link to={`/Help/${'PIPIPI000'}`} target="_blank" >
                                      <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" onClick={ () => this.toggleElement('personalInfoDiv', 'personalInfoActionsToggle') } />{' '}
                            </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * First Name:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.firstName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.firstName} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                      <p className="dangerError">
                                        {this.state.modifyFirstNameErrorText !== '' ? this.state.modifyFirstNameErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Last Name:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.lastName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.lastName} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                      <p className="dangerError">
                                        {this.state.modifyLastNameErrorText !== '' ? this.state.modifyLastNameErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Middle Name:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.middleName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.middleName} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Suffix:
                                      </span>
                                    </td>
                                    <td>
                                      <select name="personalInformation.personalInformation.personalInformation.suffix" className="custom-select" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.suffix} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        { this.bindDataToDropDownList(this.props.masterInfo, 'Suffix') }
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modifySuffixErrorText !== '' ? this.state.modifySuffixErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Display Name:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.displayName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.displayName} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Formal Name:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.formalName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.formalName} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Title:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.title" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.title} onChange={this.updateEmployeeData} onBlur={() => this.save()}>
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Title')}
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modfiyTitleErrorText !== '' ? this.state.modfiyTitleErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Birth Name:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.birthName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.birthName} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Initials:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.initials" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.initials} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Prefix:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.prefix" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.prefix} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Prefix')}
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modifyPrefixErrorText !== '' ? this.state.modifyPrefixErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Gender:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.gender" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.gender} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Gender')}
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modifyGenderErrorText !== '' ? this.state.modifyGenderErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Marital Status
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.maritalStatus" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.maritalStatus} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        { this.bindDataToDropDownList(this.props.masterInfo, 'Marital Status') }
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modifyMaritalStatusErrorText !== '' ? this.state.modifyMaritalStatusErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Number of Children:
                                      </span>
                                    </td>
                                    <td>
                                      {/* <input name="personalInformation.personalInformation.personalInformation.numberOfChildren" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.numberOfChildren} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.numberOfChildren" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.numberOfChildren} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        {/* <option value="" selected disabled >select</option> */}
                                        <option selected>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Marital Status Since:
                                      </span>
                                    </td>
                                    <td>
                                      {/* <DayPickerInput
                                        className="js-datepicker entry-input"
                                        placeholder="MM/DD/YYYY"
                                        onDayChange={this.updateEmployeeData}
                                        value={formattedMaritalStatusSinceDate}
                                      />*/}
                                      <DatePickerCustom
                                        targetName="personalInformation.personalInformation.personalInformation.maritalStatusSinceDate"
                                        onDayChange={this.updateEmployeeData}
                                        value={formattedMaritalStatusSinceDate}
                                      />
                                      <p className="dangerError">
                                        {this.state.modifyMaritalStatusSinceDateErrorText !== '' ? this.state.modifyMaritalStatusSinceDateErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Second Nationality:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.secondNationality" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.secondNationality} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Second Nationality') }
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Third Nationality:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.thirdNationality" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.thirdNationality} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Third Nationality') }
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Native Preferred Language:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.preferredLanguage" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.preferredLanguage} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        { this.bindDataToDropDownList(this.props.masterInfo, 'NATIVE PREFERRED LANGUAGE') }
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modifyNativePreferredLanguage !== '' ? this.state.modifyNativePreferredLanguage : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Challenge Status:
                                      </span>
                                    </td>
                                    <td>
                                      <input name="personalInformation.personalInformation.personalInformation.challengeStatus" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.challengeStatus} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                    </td>
                                  </tr>
                                  {/* <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Certificate Start Date:
                                      </span>
                                    </td>
                                    <td>
                                      <DayPickerInput
                                        className="js-datepicker entry-input"
                                        placeholder="MM/DD/YYYY"
                                        onDayChange={this.modifyCertificateStartDate}
                                        value={formattedCertificateStartDate}
                                      />
                                      <p className="danger">
                                        {this.state.modifyCertificateStartDateErrorText !== '' ? this.state.modifyCertificateStartDateErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Certificate End Date:
                                      </span>
                                    </td>
                                    <td>
                                      <DayPickerInput
                                        className="js-datepicker entry-input"
                                        placeholder="MM/DD/YYYY"
                                        onDayChange={this.modifyCertificateEndDate}
                                        value={formattedCertificateEndDate}
                                      />
                                      <p className="danger">
                                        {this.state.modifyCertificateEndDateErrorText !== '' ? this.state.modifyCertificateEndDateErrorText : ''}
                                      </p>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="toggler active" id="countrySpecificFields" >
                            <div className="toggler-bar js-toggler-bar" >
                              <h2 className="toggler-title">
                                Country Specific Fields
                              </h2>
                              <div className="actionEnable" >
                                <ul className="box-actions" >
                                  {/* <li>
                                    <a onClick={this.openAddressForm}>
                                      <i className="fas fa-plus addIco" aria-hidden="true" />
                                    </a>
                                  </li> */}
                                  {/* <li>
                                    <a onClick={this.EditOpenForCompensation}>
                                      <i className="far fa-edit editIco" aria-hidden="true" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="fas fa-history historyIco" aria-hidden="true" />
                                    </a>
                                  </li> */}
                                  <li>
                                    <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                      <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('countrySpecificFields')} />{' '}
                            </div>
                            <div className="toggler-content">
                              <div className="toggler-content-inner">
                                <div className="table-additional-info">
                                  <div className="table-additional-info-ico">
                                    {' '}<svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      xlink="http://www.w3.org/1999/xlink"
                                      viewBox="0 0 29.79 20"
                                    >
                                      <image
                                        width="70"
                                        height="47"
                                        transform="scale(0.43)"
                                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAwCAYAAABDl2dmAAAACXBIWXMAABn9AAAZ/QEDysJxAAACfElEQVRoQ+2bzWsTQRTAe7T/WCwWixcRT16sZ71Uz4KIiIhoq0hFaMBWsYkfICgFEam0SimIF7FpG2q7MZ+lTROzm+zzzeDUJKbvjTZh2tl58AuEffN478fuzhySPgDoUxy7tjSAJBEPCRHoFYWTwweBEPGQJDLQ7EKgpBxBpriBuolG4yaYQvrb5cS5YbqNRqOmiO/KwUZj3CC9QKNJk8SUnGlukF6g0aBJEkpOjhukF2g0aBJPyWEH6cTZ+2n4lNph8w6pnMa+5Dx8lwcRQhKXewjlwL7kfFmrSjnx9wU2N1JyTt1ahkYo3cB60WfzIyXn5qsf0BwXH62za9rZqfoHmv+Sc248DfntoEVOZjOACxPf2bVWyXmxsAmzX8uwuFqRLGV+Ql09Tx2iUmvAdrUB2a0AvJIPn9MVe+U8nS/tKYILvx7ClaRnrxzBvZkcEDdLx9jCu2eEeQ9xzZkGdOQILic8COp6hnL4SIn3EleTa840oCtHMP42z3mRwd0xVso5M7bKeZEvY66OnXLu8nJqQQhD11NsLevkXH2e4dzIuDSp91hxJ1TTwL/IeYlnHhXFch3uvM7C+Yk1eVreKPm716Y/ltha1slZydbk8HPfynD69krLtRM3UjD5oSh3tGXM42pZJ0ds0aNvsjBI5Igt/AHualwt6+R0G6450zg5BE4OgZND4OQQODkEUg53jI4qTg6Bk0Pg5BA4OQRODoGTQ+DkEEg53GEoqjg5BE4OgZNDoOTkuMQIkldyEhrJUSOh5MQ0kqPGUSlHfOCXuMaCqPDnF+y/5fQjjzUW2s6TQvt/HxR44TjyDMloFLIFMauYeajZxV9yHK38Ah02myc3C1moAAAAAElFTkSuQmCC"
                                      />
                                    </svg>{' '}
                                  </div>
                                  United States{' '}
                                </div>
                                <table className="table table--stripes">
                                  <tbody>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Country:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.veteran" value={this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.veteran} onChange={this.updateEmployeeData} onBlur={() => this.save()} disabled>
                                          <option selected disabled>United States</option>
                                          {/* {this.bindDataToDropDownList(this.props.masterInfo, 'Veteran')} */}
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Ethnic Group:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.ethnicGroup" value={this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.ethnicGroup} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                          <option selected disabled>select</option>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Ethnic Group')}
                                        </select>
                                        <p className="dangerError">
                                          {this.state.modifyEthnicGroupErrorText !== '' ? this.state.modifyEthnicGroupErrorText : ''}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Veteran:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.veteran" value={this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.veteran} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                          <option selected disabled>select</option>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Veteran')}
                                        </select>
                                        <p className="dangerError">
                                          {this.state.modifyVeteranErrorText !== '' ? this.state.modifyVeteranErrorText : ''}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Challenged Veteran:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.challengedVeteran" value={this.props.newEmployee.personalInformation.personalInformation.countrySpecificFields.us.challengedVeteran} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                          <option selected disabled>select</option>
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Challenged Veteran')}
                                        </select>
                                        <p className="dangerError">
                                          {this.state.modifyChallengedVeteranErrorText !== '' ? this.state.modifyChallengedVeteranErrorText : ''}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        {/* <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 43 43"
                              >
                                <title>Zasób 4</title>
                                <path
                                  d="M21.5,1.5a20,20,0,1,1-20,20,20,20,0,0,1,20-20Z"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="21.5"
                                  y1="1.5"
                                  x2="21.5"
                                  y2="41.48"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="1.51"
                                  y1="21.5"
                                  x2="41.49"
                                  y2="21.5"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M35.63,7.57c-3.05,2.76-8.25,4.57-14.14,4.57S10.42,10.34,7.37,7.59"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M35.63,35.43c-3.05-2.76-8.25-4.57-14.14-4.57S10.42,32.66,7.37,35.41"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M21.32,41.27a24.07,24.07,0,0,1-10-19.73,24.08,24.08,0,0,1,10-19.71"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M22,41.27A24.07,24.07,0,0,0,32,21.54,24.08,24.08,0,0,0,22,1.83"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">
                              National ID Information
                            </h2>
                            <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                              <li>
                                <i className="far fa-edit editIco" aria-hidden="true" />
                              </li>
                              <li onClick={this.addNationalIdInformation}>
                                <i className="fas fa-plus addIco" aria-hidden="true" /> &nbsp;
                              </li>
                              <li>
                                <i className="fas fa-history historyIco" aria-hidden="true" />
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="toggler active" id="NationalIdInfo" >
                          <div className="toggler-bar js-toggler-bar" >
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 43 43"
                              >
                                <title>Zasób 4</title>
                                <path
                                  d="M21.5,1.5a20,20,0,1,1-20,20,20,20,0,0,1,20-20Z"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="21.5"
                                  y1="1.5"
                                  x2="21.5"
                                  y2="41.48"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="1.51"
                                  y1="21.5"
                                  x2="41.49"
                                  y2="21.5"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M35.63,7.57c-3.05,2.76-8.25,4.57-14.14,4.57S10.42,10.34,7.37,7.59"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M35.63,35.43c-3.05-2.76-8.25-4.57-14.14-4.57S10.42,32.66,7.37,35.41"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M21.32,41.27a24.07,24.07,0,0,1-10-19.73,24.08,24.08,0,0,1,10-19.71"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M22,41.27A24.07,24.07,0,0,0,32,21.54,24.08,24.08,0,0,0,22,1.83"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="toggler-title mgn-left">National Id Information</h2>
                            <div className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addNationalIdInformation}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                {/* <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i className="fas fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <Link to={`/Help/${'PINIIF000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('NationalIdInfo')} />
                          </div>
                          <div className="toggler-content">
                            <div className="box-content">
                              <div className="box-tab active">
                                <div className="box-inner--no-pad">
                                  <div className="grid-wrapper nationalIdInfoGrid">
                                    <div>
                                      <ReactDataGrid
                                        className="tableWidth"
                                        columns={this.state.columns}
                                        rowGetter={this.rowGetterTest}
                                        rowsCount={this.state.rows.length}
                                        minHeight={this.state.nationalIdGridHeight}
                                        enableCellSelect
                                        onCellSelected={this.getRowID}
                                        showCheckbox={false}
                                        emptyRowsView={EmptyRowsView}
                                        rowSelection={{
                                          showCheckbox: false,
                                          selectBy: {
                                            indexes: this.state.selectedIndexes
                                          }
                                        }}
                                        enableRowSelect={false}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Modal
                                    open={this.state.nationalIdModalForm}
                                  >
                                    <div className="card">
                                      <div className="card-header">
                                        Add Details
                                        <button type="button" onClick={this.closeModal} id="close" className="close" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div className="card-footer">
                                        <form name="formNationalIdInformation">
                                          <div>
                                            <label className="custom-label">* Country</label>
                                            <select className="custom-select" name="countryComponent" id="nationalIDCountry" onChange={this.removeValidationMessage} >
                                              <option value="" selected disabled >select</option>
                                              { this.bindDataToDropDownList(this.props.masterInfo, 'Country') }
                                            </select>
                                            <div className="custom-error">
                                              {this.state.modifyCountryNameErrorText ? this.state.modifyCountryNameErrorText : ''}
                                            </div>
                                          </div>
                                          <div>
                                            <label className="custom-label">* National Id Card Type</label>
                                            <input type="text" name="nationalIdCardType" id="nationalIdCardType" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
                                            <div className="custom-error">
                                              {this.state.modifyNationalIdCardTypeErrorText ? this.state.modifyNationalIdCardTypeErrorText : ''}
                                            </div>
                                          </div>
                                          <div>
                                            <label className="custom-label">* National ID</label>
                                            <input type="text" name="nationalId" id="nationalId" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
                                            <div className="custom-error">
                                              {this.state.modifyNationalIdErrorText ? this.state.modifyNationalIdErrorText : ''}
                                            </div>
                                          </div>
                                          <div>
                                            <label className="custom-label">* Is Primary</label>
                                            <select className="custom-select" name="isPrimary" id="nationalIsPrimary" onChange={this.removeValidationMessage}>
                                              <option value="" selected disabled >select</option>
                                              {this.bindDataToDropDownList(this.props.masterInfo, 'Is Primary')}
                                            </select>
                                            <div className="custom-error">
                                              {this.state.modifyNIIsPrimaryErrorText ? this.state.modifyNIIsPrimaryErrorText : ''}
                                            </div>
                                          </div>
                                          <div>
                                            <input type="button" name="Submit" onClick={this.submitNationalIdModalForm} id="submit" value="submit  " className="form-control btn-primary" />
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </Modal>
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
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 42.52 43"
                              >
                                <title>Zasób 5</title>
                                <path
                                  d="M5.71,1.5H36.82A4.22,4.22,0,0,1,41,5.71V27a4.22,4.22,0,0,1-4.21,4.21H26.51L21.26,41.5,16,31.26H5.71A4.22,4.22,0,0,1,1.5,27V5.71A4.22,4.22,0,0,1,5.71,1.5Z"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <polyline
                                  points="15.76 12.89 15.76 24.41 26.91 24.41 26.91 13.71"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <polyline
                                  points="12.84 15.69 12.91 15.63 12.84 15.54 21.19 8.09 21.26 8.16 21.34 8.09 29.68 15.54 29.61 15.63 29.68 15.69"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">Address</h2>
                            <ul className="box-actions" >
                              <li>
                                <a onClick={this.openAddressForm}>
                                  <i className="fas fa-plus addIco" aria-hidden="true" />
                                </a>
                              </li>
                              <li>
                                <a>
                                  <i className="far fa-question-circle helpIco" aria-hidden="true" />
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="toggler active" id="AddressInfo" >
                          <div className="toggler-bar js-toggler-bar" >
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 42.52 43"
                              >
                                <title>Zasób 5</title>
                                <path
                                  d="M5.71,1.5H36.82A4.22,4.22,0,0,1,41,5.71V27a4.22,4.22,0,0,1-4.21,4.21H26.51L21.26,41.5,16,31.26H5.71A4.22,4.22,0,0,1,1.5,27V5.71A4.22,4.22,0,0,1,5.71,1.5Z"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <polyline
                                  points="15.76 12.89 15.76 24.41 26.91 24.41 26.91 13.71"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <polyline
                                  points="12.84 15.69 12.91 15.63 12.84 15.54 21.19 8.09 21.26 8.16 21.34 8.09 29.68 15.54 29.61 15.63 29.68 15.69"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="toggler-title mgn-left">Address</h2>
                            <div className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddressForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                {/* <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i className="fas fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <Link to={`/Help/${'PIADIF000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('AddressInfo')} />
                          </div>
                          <div className="toggler-content">
                            <div className="box-content">
                              <div className="box-tab active">
                                <ReactDataGrid
                                  className="tableWidth"
                                  columns={this.state.addresscols}
                                  rowGetter={this.rowGetterForAddress}
                                  rowsCount={this.state.addressrows.length}
                                  minHeight={this.state.addressGridHeight}
                                  enableCellSelect
                                  onCellSelected={this.getRowID}
                                  showCheckbox={false}
                                  emptyRowsView={EmptyRowsView}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.selectedIndexes
                                    }
                                  }}
                                  enableRowSelect={false}
                                />
                                {/* <CustomModal Form={<OneTimePaymentModalForm formType={this.state.formTypeForOneTimePayment} data={this.state.currentGridDataObjectForOneTimePayment} closeEvent={this.editCloseForOneTimePaymentModalForm} submitEvent={this.addSubmitForOneTimePayment} />} show={this.state.ShowingForOneTimePayment} /> */}
                                <CustomMoal Form={<AddressForm closeEvent={this.closeForAddressForm} submitEvent={this.submitForAddressForm} />} show={this.state.showingAddressForm} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        {/* <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 41.46 43"
                              >
                                <title>Zasób 6</title>
                                <path
                                  d="M4,1.5H31.46A2.49,2.49,0,0,1,33.94,4V39a2.49,2.49,0,0,1-2.48,2.48H4A2.49,2.49,0,0,1,1.5,39V4A2.49,2.49,0,0,1,4,1.5Z"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M34.94,4.83h4.31a.74.74,0,0,1,.71.75V31.46a.74.74,0,0,1-.71.75H34.94"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="39.25"
                                  y1="11.68"
                                  x2="34.94"
                                  y2="11.68"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="39.25"
                                  y1="18.52"
                                  x2="34.94"
                                  y2="18.52"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="39.25"
                                  y1="25.37"
                                  x2="34.94"
                                  y2="25.37"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M20.17,20.62a14.12,14.12,0,0,1-.6,3.29A14.79,14.79,0,0,0,19,26.8q0,.67.26.67a3.61,3.61,0,0,0,1-.24l.22-.1.43,1.2a8.45,8.45,0,0,1-2,1.1,6,6,0,0,1-2.2.48,1.94,1.94,0,0,1-2.11-2.15,13.5,13.5,0,0,1,.59-3.19,14.6,14.6,0,0,0,.59-2.72,2.67,2.67,0,0,0-.62-1.68l-.19-.26.07-.41a19.69,19.69,0,0,1,4.85-.38,2.27,2.27,0,0,1,.38,1.5Zm-1.79-3.37a2.39,2.39,0,0,1-1.7-.58,1.94,1.94,0,0,1-.61-1.48,1.87,1.87,0,0,1,.76-1.51,2.82,2.82,0,0,1,1.84-.61,2.54,2.54,0,0,1,1.68.5,1.75,1.75,0,0,1,.6,1.42,2.08,2.08,0,0,1-.73,1.58,2.59,2.59,0,0,1-1.82.67Z"
                                  fill="#f4f7fa"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">Work Permit Info</h2>
                            <ul className="box-actions" >
                              <li>
                                <a onClick={this.openWorkPermitInfoForm}>
                                  <i className="fas fa-plus addIco" aria-hidden="true" />
                                </a>
                              </li>
                              <li>
                                <a>
                                  <i className="far fa-question-circle helpIco" aria-hidden="true" />
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="toggler active" id="WorkPermintInfo" >
                          <div className="toggler-bar js-toggler-bar" >
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 41.46 43"
                              >
                                <title>Zasób 6</title>
                                <path
                                  d="M4,1.5H31.46A2.49,2.49,0,0,1,33.94,4V39a2.49,2.49,0,0,1-2.48,2.48H4A2.49,2.49,0,0,1,1.5,39V4A2.49,2.49,0,0,1,4,1.5Z"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M34.94,4.83h4.31a.74.74,0,0,1,.71.75V31.46a.74.74,0,0,1-.71.75H34.94"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="39.25"
                                  y1="11.68"
                                  x2="34.94"
                                  y2="11.68"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="39.25"
                                  y1="18.52"
                                  x2="34.94"
                                  y2="18.52"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="39.25"
                                  y1="25.37"
                                  x2="34.94"
                                  y2="25.37"
                                  fill="none"
                                  stroke="#3487CA"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M20.17,20.62a14.12,14.12,0,0,1-.6,3.29A14.79,14.79,0,0,0,19,26.8q0,.67.26.67a3.61,3.61,0,0,0,1-.24l.22-.1.43,1.2a8.45,8.45,0,0,1-2,1.1,6,6,0,0,1-2.2.48,1.94,1.94,0,0,1-2.11-2.15,13.5,13.5,0,0,1,.59-3.19,14.6,14.6,0,0,0,.59-2.72,2.67,2.67,0,0,0-.62-1.68l-.19-.26.07-.41a19.69,19.69,0,0,1,4.85-.38,2.27,2.27,0,0,1,.38,1.5Zm-1.79-3.37a2.39,2.39,0,0,1-1.7-.58,1.94,1.94,0,0,1-.61-1.48,1.87,1.87,0,0,1,.76-1.51,2.82,2.82,0,0,1,1.84-.61,2.54,2.54,0,0,1,1.68.5,1.75,1.75,0,0,1,.6,1.42,2.08,2.08,0,0,1-.73,1.58,2.59,2.59,0,0,1-1.82.67Z"
                                  fill="#3487CA"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="toggler-title mgn-left">Work Permit Info</h2>
                            <div className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openWorkPermitInfoForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                {/* <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <i className="fas fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <Link to={`/Help/${'PIWPIF000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('WorkPermintInfo')} />
                          </div>
                          <div className="toggler-content">
                            <div className="box-content">
                              <div className="box-tab active">
                                <div className="box-inner--no-pad">
                                  <ReactDataGrid
                                    className="tableWidth"
                                    columns={this.state.workpermitinfocols}
                                    rowGetter={this.rowGetterForWorkPermitInfoTest}
                                    rowsCount={this.state.workpermitinforows.length}
                                    minHeight={this.state.workPermitGridInfoHeight}
                                    enableCellSelect
                                    onCellSelected={this.getRowID}
                                    showCheckbox={false}
                                    emptyRowsView={EmptyRowsView}
                                    rowSelection={{
                                      showCheckbox: false,
                                      selectBy: {
                                        indexes: this.state.selectedIndexes
                                      }
                                    }}
                                    enableRowSelect={false}
                                  />
                                  <CustomMoal Form={<WorkPermitInfoForm closeEvent={this.closeWorkPermitInfoForm} submitEvent={this.submitWorkPermitInfoForm} />} show={this.state.showingWorkPermitFrom} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 43.93 43"
                              >
                                <title>Zasób 7</title>
                                <polygon
                                  points="1.5 41.5 42.43 41.5 42.43 16.5 21.96 1.5 1.5 16.5 1.5 41.5 1.5 41.5"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <polyline
                                  points="42.43 41.5 21.96 24.74 1.5 41.5"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="1.93"
                                  y1="17.1"
                                  x2="16.82"
                                  y2="28.38"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                                <line
                                  x1="42"
                                  y1="17.1"
                                  x2="27.11"
                                  y2="28.38"
                                  fill="none"
                                  stroke="#f4f7fa"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                />
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">Contact Information</h2>
                            {/* <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul> */}
                          </li>
                        </ul>
                        <div className="box-content">
                          <div className="box-tab active">
                            <div className="box-inner--no-pad">
                              <div className="toggler active" id="emailInfo">
                                <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                                  <h2 className="toggler-title">
                                    Email information
                                  </h2>
                                  <div className="actionEnable" >
                                    <ul className="box-actions">
                                      {/* <li onClick={this.addEmailIdInformation}>
                                        <i className="fas fa-plus addIco" aria-hidden="true" />
                                      </li> */}
                                      <li>
                                        <a onClick={this.addEmailIdInformation}>
                                          <i className="fas fa-plus addIco" aria-hidden="true" />
                                        </a>
                                      </li>
                                      {/* <li>
                                        <a onClick={() => this.toggleElement('emailInfo')}>
                                          <span className="box-filter-arrow" />{' '}
                                        </a>
                                      </li> */}
                                      <li>
                                        <Link to={`/Help/${'PICIEI000'}`} target="_blank" >
                                          <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                  <span className="box-filter-arrow" onClick={() => this.toggleElement('emailInfo')} />
                                </div>
                                <div className="toggler-content">
                                  <div className="box-content">
                                    <div className="box-tab active">
                                      <div className="box-inner--no-pad">
                                        <div className="grid-wrapper emailInfoGrid">
                                          <div>
                                            <ReactDataGrid
                                              className="tableWidth"
                                              columns={this.state.emailInfoCols}
                                              rowGetter={this.rowsEmailGetter}
                                              rowsCount={this.state.emailInfoRows.length}
                                              minHeight={this.state.emailInfoGridHeight}
                                              enableCellSelect
                                              onCellSelected={this.getRowID}
                                              showCheckbox={false}
                                              emptyRowsView={EmptyRowsView}
                                              rowSelection={{
                                                showCheckbox: false,
                                                selectBy: {
                                                  indexes: this.state.selectedIndexes
                                                }
                                              }}
                                              enableRowSelect={false}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <Modal
                                          open={this.state.emailIdModalForm}
                                        >
                                          <div className="card">
                                            <div className="card-header">
                                              Add Email Id Details
                                              <button type="button" onClick={this.closeEmailIdModal} id="close" className="close" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                              </button>
                                            </div>
                                            <div className="card-footer">
                                              <form name="formEmailIdInformation">
                                                <div>
                                                  <label className="custom-label">Email type</label>
                                                  <select className="custom-select" name="emailType" onChange={this.removeValidationMessage} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'Email Type')}
                                                  </select>
                                                  <div className="custom-error">
                                                    {this.state.modifyEmailTypeErrorText ? this.state.modifyEmailTypeErrorText : ''}
                                                  </div>
                                                </div>
                                                <div>
                                                  <label className="custom-label">Email Address</label>
                                                  <input type="text" name="emailAddress" id="emailAddress" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
                                                  <div className="custom-error">
                                                    {this.state.modifyEmailAddressErrorText ? this.state.modifyEmailAddressErrorText : ''}
                                                  </div>
                                                </div>
                                                <div>
                                                  <label className="custom-label">Is Primary</label>
                                                  <select className="custom-select" name="isEmailPrimary" onChange={this.removeValidationMessage} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'Is Primary')}
                                                  </select>
                                                  <div className="custom-error">
                                                    {this.state.modifyCIIsPrimaryErrorText ? this.state.modifyCIIsPrimaryErrorText : ''}
                                                  </div>
                                                </div>
                                                <div>
                                                  <input type="button" name="submit" onClick={this.submitEmailIdModalForm} id="submit" value="submit  " className="form-control btn-primary" />
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </Modal>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="toggler-content">
                                  <div className="toggler-content-inner toggler-content-inner--nopad">
                                    <table className="table table--stripes table--typeb">
                                      <thead>
                                        <tr>
                                          <th>Email type</th>
                                          <th>Email address</th>
                                          <th>Is primary</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <input name="personalInformation.contactInformation.emailInformation.emailType" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.contactInformation.emailInformation.emailType} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                          </td>
                                          <td>
                                            <input name="personalInformation.contactInformation.emailInformation.emailAddress" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.contactInformation.emailInformation.emailAddress} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                          </td>
                                          <td>
                                            <select className="custom-select" name="personalInformation.contactInformation.emailInformation.isPrimary" value={this.props.newEmployee.personalInformation.contactInformation.emailInformation.isPrimary} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                              <option value="v-1">
                                                Drop-down
                                              </option>
                                              <option value="v-2">
                                                Drop-down2
                                              </option>
                                            </select>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div> */}
                              </div>
                              {/* <div className="toggler active" id="phoneInfo">
                                <div className="toggler-bar js-toggler-bar" >
                                  <h2 className="toggler-title">
                                    Phone information
                                  </h2>
                                  <div className="actionEnable" >
                                    <ul className="box-actions">
                                      <li>
                                        <a onClick={this.addPhoneInformation}>
                                          <i className="fas fa-plus addIco" aria-hidden="true" />
                                        </a>
                                      </li>
                                      <li>
                                        <a>
                                          <i className="far fa-question-circle helpIco" aria-hidden="true" />
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <span className="box-filter-arrow" onClick={() => this.toggleElement('phoneInfo')} />
                                </div>
                                <div className="toggler-content">
                                  <div className="box-content">
                                    <div className="box-tab active">
                                      <div className="box-inner--no-pad">
                                        <ReactDataGrid
                                          className="tableWidth"
                                          columns={this.state.phoneInfoCols}
                                          rowGetter={this.rowsPhoneGetter}
                                          rowsCount={this.state.phoneInfoRows.length}
                                          minHeight={this.state.phoneInfoGridHeight}
                                          enableCellSelect
                                          onCellSelected = {this.getRowID}
                                          showCheckbox = {false}
                                          emptyRowsView={EmptyRowsView}
                                          rowSelection={{
                                            showCheckbox: false,
                                            selectBy: {
                                              indexes: this.state.selectedIndexes
                                            }
                                          }}
                                          enableRowSelect ={false}
                                        />
                                      </div>
                                      <div>
                                        <Modal
                                          isOpen={this.state.phoneInfoIdModalForm}
                                          style={styles}
                                          contentLabel="Modal"
                                        >
                                          <div className="card card-success">
                                            <div className="card-header">
                                              Add Phone Details
                                              <button type="button" onClick={this.closePhoneModal} id="close" className="close" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                              </button>
                                            </div>
                                            <div className="card-footer">
                                              <form name="formPhoneInformation">
                                                <div className="form-group">
                                                  <label htmlFor="phoneType">Phone Type</label>
                                                  <select className="form-control" name="phoneType" onChange={() => this.removeValidationMessage('piPhoneType')} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'Phone Type')}
                                                  </select>
                                                  <div id="piPhoneType" className="custom-error" />
                                                </div>
                                                <div>
                                                  <label htmlFor="phoneNumber">Phone Number</label>
                                                  <input type="text" name="phoneNumber" id="phoneNumber" className="form-control" onChange={() => this.removeValidationMessage('piPhoneNumber')} />
                                                  <div id="piPhoneNumber" className="custom-error" />
                                                </div>
                                                <div>
                                                  <label htmlFor="phoneExtension">Extension (optional)</label>
                                                  <input type="text" name="phoneExtension" id="phoneExtension" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="isPrimary">Is Primary</label>
                                                  <select className="form-control" name="isPrimary" onChange={() => this.removeValidationMessage('piIsPrimary')} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'Is Primary')}
                                                  </select>
                                                  <div id="piIsPrimary" className="custom-error" />
                                                </div>
                                                <div className="form-group">
                                                  <input type="button" name="submit" onClick={this.submitPhoneInformation} id="submit" value="submit  " className="form-control btn-primary" />
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </Modal>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        <div className="box-content">
                          <div className="row-no-padding">
                            <div className="col-xs-12 col-lg-12 no-padding">
                              <div className="box-tab active">
                                <div className="toggler active" id="phoneInfo">
                                  <div className="toggler-bar js-toggler-bar" >
                                    <h2 className="toggler-title">
                                      Phone information
                                    </h2>
                                    <div className="actionEnable" >
                                      <ul className="box-actions">
                                        <li>
                                          <a onClick={this.addPhoneInformation}>
                                            <i className="fas fa-plus addIco" aria-hidden="true" />
                                          </a>
                                        </li>
                                        <li>
                                          <Link to={`/Help/${'PICIPI000'}`} target="_blank" >
                                            <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                    <span className="box-filter-arrow" onClick={() => this.toggleElement('phoneInfo')} />
                                  </div>
                                  <div className="toggler-content">
                                    <div className="box-content">
                                      <div className="box-tab active">
                                        <div className="box-inner--no-pad">
                                          <ReactDataGrid
                                            className="tableWidth"
                                            columns={this.state.phoneInfoCols}
                                            rowGetter={this.rowsPhoneGetter}
                                            rowsCount={this.state.phoneInfoRows.length}
                                            minHeight={this.state.phoneInfoGridHeight}
                                            enableCellSelect
                                            onCellSelected = {this.getRowID}
                                            showCheckbox = {false}
                                            emptyRowsView={EmptyRowsView}
                                            rowSelection={{
                                              showCheckbox: false,
                                              selectBy: {
                                                indexes: this.state.selectedIndexes
                                              }
                                            }}
                                            enableRowSelect ={false}
                                          />
                                        </div>
                                        <div>
                                          <Modal
                                            open={this.state.phoneInfoIdModalForm}
                                          >
                                            <div className="card">
                                              <div className="card-header">
                                                Add Phone Details
                                                <button type="button" onClick={this.closePhoneModal} id="close" className="close" aria-label="Close">
                                                  <span aria-hidden="true">&times;</span>
                                                </button>
                                              </div>
                                              <div className="card-footer">
                                                <form name="formPhoneInformation">
                                                  <div>
                                                    <label className="custom-label">Phone Type</label>
                                                    <select className="custom-select" name="phoneType" onChange={this.removeValidationMessage} >
                                                      <option value="" selected disabled >select</option>
                                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Phone Type')}
                                                    </select>
                                                    <div className="custom-error">
                                                      {this.state.modifyPhoneTypeErrorText ? this.state.modifyPhoneTypeErrorText : ''}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <label className="custom-label">Phone Number</label>
                                                    <input type="text" name="phoneNumber" id="phoneNumber" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
                                                    <div className="custom-error">
                                                      {this.state.modifyPhoneNumberErrorText ? this.state.modifyPhoneNumberErrorText : ''}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <label className="custom-label">Extension (optional)</label>
                                                    <input type="text" name="phoneExtension" id="phoneExtension" className="textBoxStyle entry-input" />
                                                  </div>
                                                  <div>
                                                    <label className="custom-label">Is Primary</label>
                                                    <select className="custom-select" name="isPrimary" onChange={this.removeValidationMessage} >
                                                      <option value="" selected disabled >select</option>
                                                      {this.bindDataToDropDownList(this.props.masterInfo, 'Is Primary')}
                                                    </select>
                                                    <div className="custom-error">
                                                      {this.state.modifyPIIsPrimaryErrorText ? this.state.modifyPIIsPrimaryErrorText : ''}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <input type="button" name="submit" onClick={this.submitPhoneInformation} id="submit" value="submit  " className="form-control btn-primary" />
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </Modal>
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
                    <div className="step-tab-panel" id="step3">
                      <div className="box">
                        <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 40 40"
                              >
                                <g id="Warstwa_2" data-name="Warstwa 2">
                                  <g id="dashboard">
                                    <path
                                      d="M38.91,9.93a3.74,3.74,0,0,0-5.28,0l-1,1V1.11A1.11,1.11,0,0,0,31.56,0H4.26A4.26,4.26,0,0,0,0,4.26V35.74A4.26,4.26,0,0,0,4.26,40h27.3a1.11,1.11,0,0,0,1.11-1.11V21.45l6.24-6.24a3.73,3.73,0,0,0,0-5.28ZM16.47,2.22h4.07V6.61l-1.37-1a1.11,1.11,0,0,0-1.34,0l-1.37,1ZM6,37.78H4.26a2,2,0,0,1-2-2V4.26a2,2,0,0,1,2-2H6Zm24.43,0H8.24V23.21H9.75a1.11,1.11,0,0,0,0-2.22H8.24V19h4.14a1.11,1.11,0,0,0,0-2.22H8.24V2.22h6V8.85A1.11,1.11,0,0,0,16,9.73l2.48-1.88L21,9.73a1.31,1.31,0,0,0,1.17.11,1.12,1.12,0,0,0,.62-1V2.22h7.68V13.11L18,25.56a1.11,1.11,0,0,0-.33.79v3.71a1.11,1.11,0,0,0,1.11,1.11H22.5a1.11,1.11,0,0,0,.79-.33l7.16-7.16ZM22,28.94H19.9V26.8L33.47,13.23l2.14,2.14Zm15.3-15.3-.16.16L35,11.66l.16-.16a1.55,1.55,0,0,1,2.14,0A1.57,1.57,0,0,1,37.34,13.64Z"
                                      fill="#f4f7fa"
                                    />
                                  </g>
                                </g>
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">Employment Detail</h2>
                            {/* <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul> */}
                          </li>
                        </ul>
                        <div className="box-content">
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="box-tab active">
                                <div className="box-inner--no-pad">
                                  <div
                                    className="toggler active"
                                    id="keyJobAttribute"
                                  >
                                    <div
                                      className="toggler-bar toggler-bar--no-top js-toggler-bar"
                                      onClick={() =>
                                          this.toggleElement('keyJobAttribute')}
                                    >
                                      <h2 className="toggler-title">
                                        Key Job Attribute
                                      </h2>
                                      <div className="actionEnable" >
                                        <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'JIEDKJ000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
                                      <table className="table table--stripes">
                                        <tbody>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Job Code
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" value={this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.jobCode} name="jobInformation.employmentDetail.keyJobAttribute.jobCode" onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Job Code') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyJobCodeErrorText !== '' ? this.state.modifyJobCodeErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Position
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" value={this.props.newEmployee.jobInformation.employmentDetail.keyJobAttribute.position} name="jobInformation.employmentDetail.keyJobAttribute.position" onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Position') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyPositionErrorText !== '' ? this.state.modifyPositionErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="toggler active"
                                    id="orgnlInfo"
                                  >
                                    <div
                                      className="toggler-bar js-toggler-bar"
                                      onClick={() =>
                                          this.toggleElement('orgnlInfo')}
                                    >
                                      <h2 className="toggler-title">
                                        Organizational Information
                                      </h2>
                                      <div className="actionEnable" >
                                        <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'JIEDOI000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="box-filter-arrow" />{' '}
                                    </div>

                                    <div className="toggler-content">
                                      <table className="table table--stripes">
                                        <tbody>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Company
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].company} name="jobInformation.employmentDetail.organizationalInformation.company" onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Company') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyOICompanyErrorText !== '' ? this.state.modifyOICompanyErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Business Unit
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.organizationalInformation.businessUnit" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].businessUnit} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Business Unit') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyBusinessUnitErrorText !== '' ? this.state.modifyBusinessUnitErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Division
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.organizationalInformation.division" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].division} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Division') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyDivisionErrorText !== '' ? this.state.modifyDivisionErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                               * Department
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.organizationalInformation.department" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].department} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Department') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyDepartmentErrorText !== '' ? this.state.modifyDepartmentErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Location
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.organizationalInformation.location" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].location} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Country') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyLocationErrorText !== '' ? this.state.modifyLocationErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Timezone
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.organizationalInformation.timeZone" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].timeZone} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'TimeZone') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyTimeZoneErrorText !== '' ? this.state.modifyTimeZoneErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Cost Center
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.organizationalInformation.costCenter" value={this.props.newEmployee.jobInformation.employmentDetail.organizationalInformation[0].costCenter} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Cost Center') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyCostCenterErrorText !== '' ? this.state.modifyCostCenterErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12">
                              <div className="box-tab active">
                                <div className="box-inner--no-pad">
                                  <div className="toggler active" id="JobInformation">
                                    <div
                                      className="toggler-bar toggler-bar--no-top js-toggler-bar"
                                      onClick={() =>
                                          this.toggleElement('JobInformation')}
                                    >
                                      <h2 className="toggler-title">
                                        Job Information
                                      </h2>
                                      <div className="actionEnable" >
                                        <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'JIEDJI000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
                                      <table className="table table--stripes">
                                        <tbody>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Employee Status
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.jobInformation.employmentStatus" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].employmentStatus} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                {this.bindDataToDropDownList(this.props.masterInfo, 'Employee Status') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyEmployeeStatusErrorText !== '' ? this.state.modifyEmployeeStatusErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Supervisor
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.jobInformation.supervisor" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].supervisor} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Supervisor') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifySupervisorErrorText !== '' ? this.state.modifySupervisorErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Job Classification
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.jobInformation.jobClassification" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].jobClassification} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Job Classification') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyJobClassificationErrorText !== '' ? this.state.modifyJobClassificationErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Job Title
                                              </span>
                                            </td>
                                            <td>
                                              <input name="jobInformation.employmentDetail.jobInformation.jobTitle" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].jobTitle} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                {this.state.modifyJobTitleErrorText !== '' ? this.state.modifyJobTitleErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Local Job Title
                                              </span>
                                            </td>
                                            <td>
                                              <input name="jobInformation.employmentDetail.jobInformation.localJobTitle" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].localJobTitle} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              {/* <div className="dangerError">
                                                {this.state.modifyLocalJobTitleErrorText !== '' ? this.state.modifyLocalJobTitleErrorText : ''}
                                              </div> */}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Pay Grade
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.jobInformation.payGrade" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].payGrade} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Pay Grade') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyPayGradeErrorText !== '' ? this.state.modifyPayGradeErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Regular / Temporary
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.jobInformation.regularOrTemporary" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].regularOrTemporary} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled>Select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Regular Or Temporary') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyRegularTemporaryErrorText !== '' ? this.state.modifyRegularTemporaryErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Standard Weekly Hours
                                              </span>
                                            </td>
                                            <td>
                                              <input name="jobInformation.employmentDetail.jobInformation.standardWeeklyHours" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].standardWeeklyHours} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                {this.state.modifyStandardWeeklyHoursErrorText !== '' ? this.state.modifyStandardWeeklyHoursErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                FTE
                                              </span>
                                            </td>
                                            <td>
                                              <input name="jobInformation.employmentDetail.jobInformation.fte" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.jobInformation[0].fte} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div className="toggler active" id="timeInfo">
                                    <div
                                      className="toggler-bar js-toggler-bar"
                                      onClick={() =>
                                          this.toggleElement('timeInfo')}
                                    >
                                      <h2 className="toggler-title">
                                        Time Information
                                      </h2>
                                      <div className="actionEnable" >
                                        <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'JIEDTI000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
                                      <table className="table table--stripes">
                                        <tbody>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Holiday Calendar
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.timeInformation.holidayCalendar" value={this.props.newEmployee.jobInformation.employmentDetail.timeInformation.holidayCalendar} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyHolidayCalendarErrorText !== '' ? this.state.modifyHolidayCalendarErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Work Schedule
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.timeInformation.workSchedule" value={this.props.newEmployee.jobInformation.employmentDetail.timeInformation.workSchedule} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Work Schedule') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyWorkScheduleErrorText !== '' ? this.state.modifyWorkScheduleErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Time Profile
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="jobInformation.employmentDetail.timeInformation.timeProfile" value={this.props.newEmployee.jobInformation.employmentDetail.timeInformation.timeProfile} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'Time Profile') }
                                              </select>
                                              <div className="dangerError">
                                                {this.state.modifyTimeProfileErrorText !== '' ? this.state.modifyTimeProfileErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12">
                              <div className="box-tab active">
                                <div className="box-inner--top">
                                  <div
                                    className="toggler active"
                                    id="countrySpecific"
                                  >
                                    <div
                                      className="toggler-bar toggler-bar--no-top js-toggler-bar"
                                      onClick={() =>
                                          this.toggleElement('countrySpecific')}
                                    >
                                      <h2 className="toggler-title">
                                        Country Specific - USA
                                      </h2>
                                      <div className="actionEnable" >
                                        <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'JIEDCS000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
                                      <div className="row">
                                        <div className="col-xs-12">
                                          <table className="table table--stripes">
                                            <tbody>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Country
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.isFullTime" onChange={this.updateEmployeeData} onBlur={() => this.save()} disabled>
                                                    <option value="" selected disabled >United States</option>
                                                    {/* { this.bindDataToDropDownList(this.props.masterInfo, 'Is Full Time') } */}
                                                  </select>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Is Fulltime Employee
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.isFullTime" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isFullTime} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Is Full Time') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyISFullTimeErrorText !== '' ? this.state.modifyISFullTimeErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    Notes
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.notes" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.notes} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Employee Class
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.employeeClass" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.employeeClass} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Employee Class') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEmployeeClassErrorText !== '' ? this.state.modifyEmployeeClassErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * FLSA Status
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.flsaStatus" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.flsaStatus} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Flsa Status') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyFLSAtatusErrorText !== '' ? this.state.modifyFLSAtatusErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Is Shift Employee
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.isShiftEmployee" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isShiftEmployee} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Is Shift Employee') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyIsShiftEmployeeErrorText !== '' ? this.state.modifyIsShiftEmployeeErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Shift Code
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.shiftCode" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftCode} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Shift Code') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyShiftCodeErrorText !== '' ? this.state.modifyShiftCodeErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    Shift Rate
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.shiftRate" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftRate} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    Shift Percent
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.shiftPercent" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.shiftPercent} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Is Cross Border Worker
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.isCrossBorderWorker" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.isCrossBorderWorker} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Is Cross Border Worker') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyIsCrossBorderWorkerErrorText !== '' ? this.state.modifyIsCrossBorderWorkerErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * EEO Job Group
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoJobGroup" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoJobGroup} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'EEO Job Group') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOJobGroupErrorText !== '' ? this.state.modifyEEOJobGroupErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Contract Type
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.contractType" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.contractType} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'Contract Type') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyContractErrorText !== '' ? this.state.modifyContractErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div className="col-xs-12">
                                          <table className="table table--stripes table--side-left">
                                            <tbody>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Continued Sickness Pay Period
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayPeriod" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayPeriod} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                  <div className="dangerError">
                                                    {this.state.modifyContinuedSicknessPayPeriodErrorText !== '' ? this.state.modifyContinuedSicknessPayPeriodErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Continued Sickness Pay Measure
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayMeasure" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.continuedSicknessPayMeasure} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                  <div className="dangerError">
                                                    {this.state.modifyConinuedSicknessPayMeasureErrorText !== '' ? this.state.modifyConinuedSicknessPayMeasureErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * Notice Period
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.noticePeriod" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.noticePeriod} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                  <div className="dangerError">
                                                    {this.state.modifyNoticePeriodErrorText !== '' ? this.state.modifyNoticePeriodErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    Initial Entry
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.initialEntry" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.initialEntry} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    Entry into Group
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.entryIntoGroup" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.entryIntoGroup} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    Corporation
                                                  </span>
                                                </td>
                                                <td>
                                                  <input name="jobInformation.employmentDetail.countrySpecificFields.us.corporation" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.corporation} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                    * EEO Category 1
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory1" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory1} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    { this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 1') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOCategeory1ErrorText !== '' ? this.state.modifyEEOCategeory1ErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                   * EEO Category 2
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory2" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory2} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 2') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOCategeory2ErrorText !== '' ? this.state.modifyEEOCategeory2ErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                   * EEO Category 3
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory3" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory3} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 3') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOCategeory3ErrorText !== '' ? this.state.modifyEEOCategeory3ErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                   * EEO Category 4
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory4" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory4} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 4') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOCategeory4ErrorText !== '' ? this.state.modifyEEOCategeory4ErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                   * EEO Category 5
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory5" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory5} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 5') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOCategeory5ErrorText !== '' ? this.state.modifyEEOCategeory5ErrorText : ''}
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="table-align">
                                                  <span className="table-label">
                                                   * EEO Category 6
                                                  </span>
                                                </td>
                                                <td>
                                                  <select className="custom-select" name="jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory6" value={this.props.newEmployee.jobInformation.employmentDetail.countrySpecificFields.us.eeoCategory6} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                    <option value="" selected disabled >select</option>
                                                    {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 6') }
                                                  </select>
                                                  <div className="dangerError">
                                                    {this.state.modifyEEOCategeory6ErrorText !== '' ? this.state.modifyEEOCategeory6ErrorText : ''}
                                                  </div>
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
                      <div className="box">
                        <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
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
                              </svg>{' '}s
                            </div>
                            <h2 className="box-title">Job Relationships</h2>
                            {/* <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul> */}
                          </li>
                        </ul>
                        <div className="box-content">
                          <div className="box-tab active">
                            <div className="box-inner box-inner--no-pad">
                              <div className="toggler active" id="globalFields">
                                <div
                                  className="toggler-bar toggler-bar--no-top js-toggler-bar"
                                  onClick={() =>
                                      this.toggleElement('globalFields')}
                                >
                                  <h2 className="toggler-title">
                                    Global fields
                                  </h2>
                                  <div className="actionEnable" >
                                    <ul className="box-actions">
                                      <li>
                                        <Link to={`/Help/${'JIJRGF000'}`} target="_blank" >
                                          <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                  <span className="box-filter-arrow" />{' '}
                                </div>
                                <div className="toggler-content">
                                  <table className="table table--stripes">
                                    <tbody>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Relationship Type
                                          </span>
                                        </td>
                                        <td>
                                          <select className="custom-select" name="jobInformation.jobRelationships.globalFields.relationshipType" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields[0].relationshipType} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                            <option value="" selected disabled >select</option>
                                            { this.bindDataToDropDownList(this.props.masterInfo, 'Relationship Type') }
                                          </select>
                                          <div className="dangerError">
                                            {this.state.modifyRelationShipTypeErrorText !== '' ? this.state.modifyRelationShipTypeErrorText : ''}
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Name
                                          </span>
                                        </td>
                                        <td>
                                          <input name="jobInformation.jobRelationships.globalFields.name" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields[0].name} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                          <div className="dangerError">
                                            {this.state.modifyNameErrorText !== '' ? this.state.modifyNameErrorText : ''}
                                          </div>
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
                      <div className="box">
                        <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
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
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">Employment Details</h2>
                            {/* <ul className="box-actions">
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul> */}
                          </li>
                        </ul>
                        <div className="box-content">
                          <div className="box-tab active">
                            <div className="box-inner box-inner--no-pad">
                              <div
                                className="toggler active"
                                id="globalFields2"
                              >
                                <div
                                  className="toggler-bar toggler-bar--no-top js-toggler-bar"
                                  onClick={() =>
                                      this.toggleElement('globalFields2')}
                                >
                                  <h2 className="toggler-title">
                                    Global fields
                                  </h2>
                                  <div className="actionEnable" >
                                    <ul className="box-actions">
                                      <li>
                                        <Link to={`/Help/${'JIESGF000'}`} target="_blank" >
                                          <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                  <span className="box-filter-arrow" />{' '}
                                </div>
                                <div className="toggler-content">
                                  <table className="table table--stripes">
                                    <tbody>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Hire Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            className="textBoxStyle entry-input"
                                            targetName="jobInformation.employmentDetails.globalFields.hireDate"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.formatHireDateUserFriendly(this.props.newEmployee.jobInformation.employmentDetails.globalFields.hireDate)}
                                          />
                                          <div className="dangerError">
                                            {this.state.modifyJobInfoHireDateErrorText !== '' ? this.state.modifyJobInfoHireDateErrorText : ''}
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            * Original Start Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="jobInformation.employmentDetails.globalFields.originalStartDate"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.formatHireDateUserFriendly(this.props.newEmployee.jobInformation.employmentDetails.globalFields.originalStartDate)}
                                          />
                                          <div className="dangerError">
                                            {this.state.modifyOriginalStartDateErrorText !== '' ? this.state.modifyOriginalStartDateErrorText : ''}
                                          </div>
                                          {/* <input name="" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields.originalStartDate} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Seniority Start Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="jobInformation.employmentDetails.globalFields.seniorityStartDate"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.formatHireDateUserFriendly(this.props.newEmployee.jobInformation.employmentDetails.globalFields.seniorityStartDate)}
                                          />
                                          {/* <input name="jobInformation.employmentDetails.globalFields.seniorityStartDate" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields.seniorityStartDate} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Service Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="jobInformation.employmentDetails.globalFields.serviceDate"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.formatHireDateUserFriendly(this.props.newEmployee.jobInformation.employmentDetails.globalFields.serviceDate)}
                                          />
                                          {/* <input name="jobInformation.employmentDetails.globalFields.serviceDate" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields.serviceDate} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Professional Service Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="jobInformation.employmentDetails.globalFields.professionalServiceDate"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.formatHireDateUserFriendly(this.props.newEmployee.jobInformation.employmentDetails.globalFields.professionalServiceDate)}
                                          />
                                          {/* <input name="jobInformation.employmentDetails.globalFields.professionalServiceDate" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields.professionalServiceDate} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Retire Date
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="jobInformation.employmentDetails.globalFields.retireDate"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.formatHireDateUserFriendly(this.props.newEmployee.jobInformation.employmentDetails.globalFields.retireDate)}
                                          />
                                          {/* <input name="jobInformation.employmentDetails.globalFields.retireDate" className="textBoxStyle entry-input" value={this.props.newEmployee.jobInformation.jobRelationships.globalFields.retireDate} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
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
                    <div className="step-tab-panel" id="step4">
                      <div className="box">
                        <ul className="box-headings js-tabs">
                          <li className="box-heading active">
                            <div className="box-icon">
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 38.5 38.5"
                              >
                                <g id="Warstwa_2" data-name="Warstwa 2">
                                  <g id="dashboard">
                                    <polygon
                                      points="0 0 0 38.5 38.5 38.5 38.5 36 34.5 36 34.5 12 32 12 32 36 26.5 36 26.5 16 24 16 24 36 18.5 36 18.5 20 16 20 16 36 10.5 36 10.5 24 8 24 8 36 2.5 36 2.5 0 0 0"
                                      fill="#f4f7fa"
                                    />
                                    <polygon
                                      points="24 4.27 24 8.5 26.5 8.5 26.5 0 18 0 18 2.5 22.23 2.5 10.29 14.44 12.06 16.2 24 4.27"
                                      fill="#f4f7fa"
                                    />
                                  </g>
                                </g>
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">
                              Compensation Information
                            </h2>
                            {/* <ul className="box-actions">
                              <li> <a href="">Edit</a> </li>
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul> */}
                          </li>
                        </ul>
                        <div className="box-content">
                          <div className="row-no-padding">
                            <div className="col-xs-12 col-lg-12 no-padding">
                              <div className="box-tab active">
                                <div className="box-inner box-inner--no-pad">
                                  <div
                                    className="toggler active"
                                    id="compensationGroup"
                                  >
                                    <div
                                      className="toggler-bar toggler-bar--no-top js-toggler-bar"
                                      onClick={() =>
                                          this.toggleElement('compensationGroup')}
                                    >
                                      <h2 className="toggler-title">
                                        Compensation Group
                                      </h2>
                                      <div className="actionEnable" >
                                        <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'CSCICG000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
                                      <table className="table table--stripes">
                                        <tbody>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Pay Type
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="compensationInformation.compensationInformation.compensationGroup.payType" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.payType} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'PAY TYPE') }
                                              </select>
                                              <div className="dangerError">
                                                { this.state.modifyPayTypeErrorText ? this.state.modifyPayTypeErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Pay Group
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="compensationInformation.compensationInformation.compensationGroup.payGroup" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.payGroup} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                { this.bindDataToDropDownList(this.props.masterInfo, 'PAY GROUP') }
                                              </select>
                                              <div className="dangerError">
                                                { this.state.modifyPayGroupErrorText ? this.state.modifyPayGroupErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Is Eligible For Benefit
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="compensationInformation.compensationInformation.compensationGroup.isEligibleForBenefit" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForBenefit} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                {this.bindDataToDropDownList(this.props.masterInfo, 'IS ELIGIBLE FOR BENEFIT')}
                                              </select>
                                              <div className="dangerError">
                                                { this.state.modifyIsEligibleForBenefitErrorText ? this.state.modifyIsEligibleForBenefitErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Is Eligible For Car
                                              </span>
                                            </td>
                                            <td>
                                              <select className="custom-select" name="compensationInformation.compensationInformation.compensationGroup.isEligibleForCar" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.isEligibleForCar} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                                <option value="" selected disabled >select</option>
                                                {this.bindDataToDropDownList(this.props.masterInfo, 'IS ELIGIBLE FOR CAR')}
                                              </select>
                                              <div className="dangerError">
                                                { this.state.modifyIsEligibleForCarErrorText ? this.state.modifyIsEligibleForCarErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Benefit Rate
                                              </span>
                                            </td>
                                            <td>
                                              <input name="compensationInformation.compensationInformation.compensationGroup.benefitRate" className="textBoxStyle entry-input" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.benefitRate} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                { this.state.modifyBenefitRateErrorText ? this.state.modifyBenefitRateErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Compa Ratio
                                              </span>
                                            </td>
                                            <td>
                                              <input name="compensationInformation.compensationInformation.compensationGroup.compaRatio" className="textBoxStyle entry-input" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.compaRatio} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                { this.state.modifyCompaRatioErrorText ? this.state.modifyCompaRatioErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Range Penetration
                                              </span>
                                            </td>
                                            <td>
                                              <input name="compensationInformation.compensationInformation.compensationGroup.rangePenetration" className="textBoxStyle entry-input" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.rangePenetration} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                { this.state.modifyRangePenetrationErrorText ? this.state.modifyRangePenetrationErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * AnnualizedSalary (AnnualizedSalary)
                                              </span>
                                            </td>
                                            <td>
                                              <input name="compensationInformation.compensationInformation.compensationGroup.annualizedSalary" className="textBoxStyle entry-input" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.annualizedSalary} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                { this.state.modifyAnnualizedSalaryErrorText ? this.state.modifyAnnualizedSalaryErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="table-align">
                                              <span className="table-label">
                                                * Total Earning Opportunity (TEO)
                                              </span>
                                            </td>
                                            <td>
                                              <input name="compensationInformation.compensationInformation.compensationGroup.teo" className="textBoxStyle entry-input" value={this.props.newEmployee.compensationInformation.compensationInformation.compensationGroup.teo} onChange={this.updateEmployeeData} onBlur={() => this.save()} />
                                              <div className="dangerError">
                                                { this.state.modifyteoErrorText ? this.state.modifyteoErrorText : ''}
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="toggler active"
                                    id="compensation"
                                  >
                                    <div className="toggler-bar js-toggler-bar" >
                                      <h2 className="toggler-title">
                                        Compensation
                                      </h2>
                                      <div className="actionEnable" >
                                        {/* <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                              <i title="Help" className="fa fa-question-circle-o helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul> */}
                                        <ul className="box-actions" >
                                          <li>
                                            <a onClick={this.addOpenForCompensation}>
                                              <i title="Add" className="fa fa-plus addIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <a onClick={this.EditOpenForCompensation}>
                                              <i title="Edit" className="fa fa-pencil-square-o editIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <i title="History" onClick={this.showHistoryForCompensation} className="fa fa-history historyIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span onClick={() => this.toggleElement('compensation')} className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
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
                                      <CustomMoal Form={<CompensationModalForm formType={this.state.formTypeForCompensation} data={this.state.crrentGridDataObjectForCompensation} closeEvent={this.addCloseForCompensation} submitEvent={this.SubmitForCompensation} />} show={this.state.ShowingForCompensation} />
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
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 37.99 37.97"
                              >
                                <g id="Warstwa_2" data-name="Warstwa 2">
                                  <g id="dashboard">
                                    <path
                                      d="M24.39.85a3.08,3.08,0,0,0-4.24,0L7,14H3a3,3,0,0,0-3,3V35a3,3,0,0,0,3,3H31a3,3,0,0,0,3-3v-14l3.12-3.12a3,3,0,0,0,0-4.24h0ZM2,16H32V28H2ZM32,36H2V30H32Zm5.18-19.51L36.11,16l-1.78,1.79-.47-1.63a2.8,2.8,0,0,0-.13-.39l-.47-1.05-1-.47A3,3,0,0,0,31,14H9.85L22.26,1.56Z"
                                      fill="#f4f7fa"
                                    />
                                    <rect
                                      x="6.98"
                                      y="20.97"
                                      width="6"
                                      height="4"
                                      fill="#f4f7fa"
                                    />
                                  </g>
                                </g>
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">One Time Payment</h2>
                            <ul className="box-actions">
                              <li> <a href="">Edit</a> </li>
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                      fill="#ddd"
                                    />
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="box-content">
                          <div className="row-no-padding">
                            <div className="col-xs-12 col-lg-12 no-padding">
                              <div className="box-tab active">
                                <div className="box-inner box-inner--no-pad">
                                  <div
                                    className="toggler active"
                                    id="timePayment"
                                  >
                                    <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                                      <h2 className="toggler-title">
                                        One Time Payment
                                      </h2>
                                      <div className="actionEnable" >
                                        {/* <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'CSOPOP000'}`} target="_blank" >
                                              <i title="Help" className="fa fa-question-circle-o helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul> */}
                                        <ul className="box-actions" >
                                          <li>
                                            <a onClick={this.addOpenForOneTimePaymentModalForm}>
                                              <i title="Add" className="fa fa-plus addIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <a onClick={this.editOpenForOneTimePaymentModalForm}>
                                              <i title="Edit" className="fa fa-pencil-square-o editIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <i title="History" onClick={this.showHistoryForOneTimePayment} className="fa fa-history historyIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <Link to={`/Help/${'CSOPOP000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span onClick={() => this.toggleElement('timePayment')} className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
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
                                      <CustomMoal Form={<OneTimePaymentModalForm formType={this.state.formTypeForOneTimePayment} data={this.state.currentGridDataObjectForOneTimePayment} closeEvent={this.editCloseForOneTimePaymentModalForm} submitEvent={this.addSubmitForOneTimePayment} />} show={this.state.ShowingForOneTimePayment} />
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
                              {' '}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32.07 37.59"
                              >
                                <g id="Warstwa_2" data-name="Warstwa 2">
                                  <g id="dashboard">
                                    <path
                                      d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z"
                                      fill="#f4f7fa"
                                    />
                                    <polygon
                                      points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02"
                                      fill="#f4f7fa"
                                    />
                                  </g>
                                </g>
                              </svg>{' '}
                            </div>
                            <h2 className="box-title">
                              Recurring Deduction / Payment
                            </h2>
                            <ul className="box-actions">
                              <li> <a href="">Edit</a> </li>
                              <li>
                                {' '}<a href="" title="Help">
                                  {' '}<svg
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
                                  </svg>{' '}
                                </a>{' '}
                              </li>
                            </ul>
                          </li>
                        </ul> */}
                        <div className="box-content">
                          <div className="row-no-padding">
                            <div className="col-xs-12 col-lg-12 no-padding">
                              <div className="box-tab active">
                                <div className="box-inner box-inner--no-pad">
                                  <div
                                    className="toggler active"
                                    id="recurringDeduction"
                                  >
                                    <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                                      <h2 className="toggler-title">
                                        Recurring Deduction / Payment
                                      </h2>
                                      <div className="actionEnable" >
                                        {/* <ul className="box-actions">
                                          <li>
                                            <Link to={`/Help/${'CSRPRP000'}`} target="_blank" >
                                              <i title="Help" className="fa fa-question-circle-o helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul> */}
                                        <ul className="box-actions" >
                                          <li>
                                            <a onClick={this.addOpenForRecurringPaymentModalForm}>
                                              <i title="Add" className="fa fa-plus addIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <a onClick={this.editOpenForRecurringPaymentModalForm}>
                                              <i title="Edit" className="fa fa-pencil-square-o editIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <i title="History" onClick={this.showHistoryForRecurringPayment} className="fa fa-history historyIco" aria-hidden="true" />
                                            </a>
                                          </li>
                                          <li>
                                            <Link to={`/Help/${'CSRPRP000'}`} target="_blank" >
                                              <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <span onClick={() => this.toggleElement('recurringDeduction')} className="box-filter-arrow" />{' '}
                                    </div>
                                    <div className="toggler-content">
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
                                      <CustomMoal Form={<RecurringPaymentModalForm formType={this.state.formTypeForRecurringPayment} data={this.state.currentGridDataObjectForRecurringPayment} closeEvent={this.editCloseForRecurringPaymentForm} submitEvent={this.addSubmitForRecurringPaymentForm} />} show={this.state.ShowingForRecurringPayment} />
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
        </div>
      </div>
    );
  }
}
// export default AddEmployee;
function mapStateToProps(state) {
  // console.log('Data ', state);
  // console.log('Test Da ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    newEmployee: state.employee.newEmployee,
    masterInfo: state.masterData.currentMasterData,
    lastTempEmployee: state.employee.lastTempEmployee,
    lastEmployee: state.employee.lastEmployee,
    auditData: state.auditTrail.currentEmployee,
    currentEmployee: state.employee.currentEmployee,
    companyData: state.companyData.companyData
  };
}

export default connect(mapStateToProps)(AddEmployee);

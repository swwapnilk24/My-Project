/**
 * @file Add Employee Component.
 * @author Sunny
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router';
import moment from 'moment';
import CustomModal from './CustomModal';
import './PersonalInfo.scss';
import './PersonalInfoExtra.scss';
import {
    modifyHireDate,
    getCurrentEmployee,
    updateCompany,
    updateEventReason,
    modifyEventReason,
    addFieldsForArray,
    updateEmployeeData, updatePersonalInformationData } from '../../actions/EmployeeActions';

import { updateNewEmployee,
    getLastEmployeeData } from '../../services/Employee.service';
import { auditForPersonalInfo } from '../../actions/AuditActions';
import { updateAuditInfo } from '../../services/Audit.service';
import DatePickerCustom from './DatePickerCustom';
import AddressForm from './AddressForm';
import WorkPermitInfoForm from './WorkPermitInfoForm';
import EmptyRowsView from './EmptyRowsView';
import PersonalInformation from './PersonalInfoModalForm';
import CountrySpecific from './CountrySpecificFieldModalForm';
import BiographicalInformation from './BiographicalInformationModalForm';
import NationalIdInformation from './NationalIdInfoModalForm';
import EmailInformation from './EmailInformationModalForm';
import PhoneInformation from './PhoneInformationModalForm';
import EmergencyDetailsForm from './EmergencyContactDetailsModalForm';
import EducationalInformationForm from './EducationalInformationModalForm';
import WorkExperienceForm from './WorkExperienceModalForm';
import AuditTable from './AuditTable';

class PersonalInfo extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    //formValidations
    this.formValidation = this.formValidation.bind(this);
    //personal info
    this.closeForPersonalInformation = this.closeForPersonalInformation.bind(this);
    this.submitForPersonalInformation = this.submitForPersonalInformation.bind(this);
    this.handleEditForPersonalInformationFields = this.handleEditForPersonalInformationFields.bind(this);
    this.openPersonalInfoAudit = this.openPersonalInfoAudit.bind(this);
    this.closePersonalInfoAudit = this.closePersonalInfoAudit.bind(this);
    // country specific fields
    this.closeForCountrySpecificFields = this.closeForCountrySpecificFields.bind(this);
    this.submitForCountrySpecificFields = this.submitForCountrySpecificFields.bind(this);
    this.handleEditForCountrySpecificFields = this.handleEditForCountrySpecificFields.bind(this);
    this.openCountrySpecificFieldsAudit = this.openCountrySpecificFieldsAudit.bind(this);
    this.closeCountrySpecificFieldsAudit = this.closeCountrySpecificFieldsAudit.bind(this);
    //Biographical Info
    this.closeForBiographicalInformation = this.closeForBiographicalInformation.bind(this);
    this.submitForBiographicalInformation = this.submitForBiographicalInformation.bind(this);
    this.handleEditForBiographicalInformationFields = this.handleEditForBiographicalInformationFields.bind(this);
    this.openBiographicalInfoAudit = this.openBiographicalInfoAudit.bind(this);
    this.closeBiographicalInfoAudit = this.closeBiographicalInfoAudit.bind(this);
    //NationalId Info
    this.closeForNationalIdInformation = this.closeForNationalIdInformation.bind(this);
    this.submitForNationalIdInformation = this.submitForNationalIdInformation.bind(this);
    this.openAddForNationalIdInformation = this.openAddForNationalIdInformation.bind(this);
    this.handleEditForNationalIdInformation = this.handleEditForNationalIdInformation.bind(this);
    this.getRowIdForNationalIdInformation = this.getRowIdForNationalIdInformation.bind(this);
    this.closeNationalIdInfoAudit = this.closeNationalIdInfoAudit.bind(this);
    this.openNationalIdInfoAudit = this.openNationalIdInfoAudit.bind(this);
     // address modal infor
    this.rowGetterForAddress = this.rowGetterForAddress.bind(this);
    this.closeForAddress = this.closeForAddress.bind(this);
    this.openAddForAddressForm = this.openAddForAddressForm.bind(this);
    this.submitForAddressForm = this.submitForAddressForm.bind(this);
    this.getRowIdForAddress = this.getRowIdForAddress.bind(this);
    this.handleEditForAddress = this.handleEditForAddress.bind(this);
    this.closeAddressAudit = this.closeAddressAudit.bind(this);
    this.openAddressAudit = this.openAddressAudit.bind(this);
    // work permit info modal form
    this.rowGetterForWorkPermitInfo = this.rowGetterForWorkPermitInfo.bind(this);
    this.openAddForWorkPermitInfoForm = this.openAddForWorkPermitInfoForm.bind(this);
    this.closeForWorkPermitInfo = this.closeForWorkPermitInfo.bind(this);
    this.getRowIdForWorkPermitInfo = this.getRowIdForWorkPermitInfo.bind(this);
    this.submitForWorkPermitInfoForm = this.submitForWorkPermitInfoForm.bind(this);
    this.handleEditForWorkPermitInfoForm = this.handleEditForWorkPermitInfoForm.bind(this);
    this.closeWorkPermitInfoAudit = this.closeWorkPermitInfoAudit.bind(this);
    this.openWorkPermitInfoAudit = this.openWorkPermitInfoAudit.bind(this);
    // Email Information
    this.submitForEmailForm = this.submitForEmailForm.bind(this);
    this.closeForEmailInfo = this.closeForEmailInfo.bind(this);
    this.rowsEmailGetter = this.rowsEmailGetter.bind(this);
    this.getRowIdForEmailInfo = this.getRowIdForEmailInfo.bind(this);
    this.openAddForEmailIdInformation = this.openAddForEmailIdInformation.bind(this);
    this.handleEditForEmailIdInformation = this.handleEditForEmailIdInformation.bind(this);
    this.closeEmailInfoAudit = this.closeEmailInfoAudit.bind(this);
    this.openEmailInfoAudit = this.openEmailInfoAudit.bind(this);
    // Phone Information
    this.submitForPhoneForm = this.submitForPhoneForm.bind(this);
    this.closeForPhoneInfo = this.closeForPhoneInfo.bind(this);
    this.getRowIdForPhoneInfo = this.getRowIdForPhoneInfo.bind(this);
    this.openAddForPhoneInformation = this.openAddForPhoneInformation.bind(this);
    this.handleEditForPhoneInformation = this.handleEditForPhoneInformation.bind(this);
    this.rowsPhoneGetter = this.rowsPhoneGetter.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.handleChangeCompanies = this.handleChangeCompanies.bind(this);
    this.closePhoneInfoAudit = this.closePhoneInfoAudit.bind(this);
    this.openPhoneInfoAudit = this.openPhoneInfoAudit.bind(this);
    // Phone modal information
    this.closePhoneModal = this.closePhoneModal.bind(this);
    this.rowGetterForNationalIdInformation = this.rowGetterForNationalIdInformation.bind(this);
    // Emergency Contact Details
    this.rowGetterForEmergencyDetails = this.rowGetterForEmergencyDetails.bind(this);
    this.getRowIdForEmergencyDetails = this.getRowIdForEmergencyDetails.bind(this);
    this.closeForEmergencyDetails = this.closeForEmergencyDetails.bind(this);
    this.submitForEmergencyDetailsForm = this.submitForEmergencyDetailsForm.bind(this);
    this.openAddForEmergencyContactDetails = this.openAddForEmergencyContactDetails.bind(this);
    this.handleEditForEmergencyContactDetails = this.handleEditForEmergencyContactDetails.bind(this);
    this.openEmergencyContactDetailsAudit = this.openEmergencyContactDetailsAudit.bind(this);
    this.closeEmergencyDetailsAudit = this.closeEmergencyDetailsAudit.bind(this);
    // Educational Information
    this.openAddForEducationalInformation = this.openAddForEducationalInformation.bind(this);
    this.handleEditForEducationalInformation = this.handleEditForEducationalInformation.bind(this);
    this.rowGetterForEducationalInfo = this.rowGetterForEducationalInfo.bind(this);
    this.getRowIdForEducationalInfo = this.getRowIdForEducationalInfo.bind(this);
    this.closeForEducationalInfo = this.closeForEducationalInfo.bind(this);
    this.submitForEducationalInfo = this.submitForEducationalInfo.bind(this);
    this.openEducationalInformationAudit = this.openEducationalInformationAudit.bind(this);
    this.closeEducationalInformationAudit = this.closeEducationalInformationAudit.bind(this);
    // Work Experienxe Details
    this.openAddForPriorWorkExperienceDetails = this.openAddForPriorWorkExperienceDetails.bind(this);
    this.handleEditForPriorWorkExperienceDetails = this.handleEditForPriorWorkExperienceDetails.bind(this);
    this.rowGetterForPriorWorkExperienceDetails = this.rowGetterForPriorWorkExperienceDetails.bind(this);
    this.getRowIdForPriorWorkExperienceDetails = this.getRowIdForPriorWorkExperienceDetails.bind(this);
    this.closeForPriorWorkExperienceDetails = this.closeForPriorWorkExperienceDetails.bind(this);
    this.submitForPriorWorkExperienceDetailsForm = this.submitForPriorWorkExperienceDetailsForm.bind(this);
    this.openPriorWorkExperienceDetailsAudit = this.openPriorWorkExperienceDetailsAudit.bind(this);
    this.closePriorWorkExperienceDetailsAudit = this.closePriorWorkExperienceDetailsAudit.bind(this);
    this.empId = 1;
    this.state = {
      nationalIdGridHeight: 35,
      addressGridHeight: 35,
      workPermitGridInfoHeight: 35,
      emailInfoGridHeight: 35,
      phoneInfoGridHeight: 35,
      emergencyDetailsGridHeight: 35,
      educationalInfoGridHeight: 35,
      priorWorkExperienceDetailsGridHeight: 35,
      syncedWithServer: true,
      scrollPosition: undefined,
      currentSelectedIndexForNationalIdInformation: [-1],
      currentSelectedIndexForAddress: [-1],
      currentSelectedIndexForWorkPermitInfo: [-1],
      currentSelectedIndexForEmailInfo: [-1],
      currentSelectedIndexForPhoneInfo: [-1],
      currentSelectedIndexForEmergencyDetails: [-1],
      currentSelectedIndexForEducationalInfo: [-1],
      currentSelectedIndexForPriorWorkExperienceDetails: [-1],
      personalInfoAuditRows: [],
      countrySpecificFieldsAuditRows: [],
      biographicalInfoAuditRows: [],
      nationalIdInfoAuditRows: [],
      addressAuditRows: [],
      workPermitInfoAuditRows: [],
      emailInfoAuditRows: [],
      phoneInfoAuditRows: [],
      emergencyDetailsAuditRows: [],
      educationalInformationAuditRows: [],
      priorWorkExperienceDetailsAuditRows: [],
      rowsForNationalIdInfo: [],
      emailInfoRows: [],
      phoneInfoRows: [],
      addressrows: [],
      workpermitinforows: [],
      emergencyDetailsrows: [],
      educationalInforows: [],
      priorWorkExperienceDetailsrows: [],
      columnsForNationalIdInformation: [{ key: 'country', name: 'Country Name', resizable: false, width: 264.75 }, { key: 'nationalIdCardType', name: 'National Id Card Type', resizable: false, width: 264.75 }, { key: 'nationalId', name: 'National Id', resizable: false, width: 264.75 }, { key: 'isPrimary', name: 'Is Primary', resizable: false, width: 264.75 }],
      emailInfoCols: [{ key: 'emailType', name: 'Email type', resizable: false, width: 353 }, { key: 'emailAddress', name: 'Email Address', resizable: false, width: 353 }, { key: 'isPrimary', name: 'Is Primary', resizable: false, width: 353 }],
      emailIdModalForm: false,
      phoneInfoCols: [{ key: 'phoneType', name: 'Phone Type', resizable: false, width: 264.75 }, { key: 'number', name: 'Phone Number', resizable: false, width: 264.75 }, { key: 'extension', name: 'Extension', resizable: false, width: 264.75 }, { key: 'isPrimary', name: 'Is Primary', resizable: false, width: 264.75 }],
      workpermitinfocols: [{ key: 'country', name: 'Country', resizable: false, width: 105.9 }, { key: 'documentType', name: 'Document Type', resizable: false, width: 105.9 }, { key: 'documentTitle', name: 'Document Title', resizable: false, width: 105.9 }, { key: 'documentNumber', name: 'Document Number', resizable: false, width: 105.9 }, { key: 'issueDate', name: 'Issue Date', resizable: false, width: 105.9 }, { key: 'issuePlace', name: 'Issue Place', resizable: false, width: 105.9 }, { key: 'issuingAuthority', name: 'Issuing Authority', resizable: false, width: 105.9 }, { key: 'expirationDate', name: 'Expiration  Date', resizable: false, width: 105.9 }, { key: 'validated', name: 'validated', resizable: false, width: 105.9 }, { key: 'attachments', name: 'Attachments', resizable: false, width: 105.9 }],
      addresscols: [{ key: 'addressType', name: 'Address Type', resizable: false, width: 151.285 }, { key: 'country', name: 'Country', resizable: false, width: 151.285 }, { key: 'state', name: 'State', resizable: false, width: 151.285 }, { key: 'city', name: 'City', resizable: false, width: 151.285 }, { key: 'line1', name: 'Address Line 1', resizable: false, width: 151.285 }, { key: 'line2', name: 'Address Line 2', resizable: false, width: 151.285 }, { key: 'zip', name: 'ZIP', resizable: false, width: 151.285 }],
      emergencyDetailscols: [{ key: 'firstName', name: 'First Name', resizable: false, width: 264.75 }, { key: 'lastName', name: 'Last Name', resizable: false, width: 264.75 }, { key: 'phoneNumber', name: 'Phone Number', resizable: false, width: 264.75 }, { key: 'address', name: 'Address', resizable: false, width: 264.75 }],
      educationalInfocols: [{ key: 'degreeName', name: 'Degree Name', resizable: false, width: 264.75 }, { key: 'yearFrom', name: 'Year(From)', resizable: false, width: 264.75 }, { key: 'yearTo', name: 'Year(To)', resizable: false, width: 264.75 }, { key: 'percentage', name: 'Percentage', resizable: false, width: 264.75 }],
      priorWorkExperienceDetailscols: [{ key: 'totalExperience', name: 'Total Experience(Years)', resizable: false, width: 527 }, { key: 'relevantWorkExperience', name: 'Relevant Work Experience(Years)', resizable: false, width: 527 }],
      personalInfoAuditColumns: [{ accessor: 'firstName', Header: 'First Name' }, { accessor: 'lastName', Header: 'Last Name' }, { accessor: 'middleName', Header: 'Middle Name' }, { accessor: 'suffix', Header: 'Suffix' }, { accessor: 'displayName', Header: 'Display Name' }, { accessor: 'formalName', Header: 'Formal Name' }, { accessor: 'title', Header: 'Title' }, { accessor: 'birthName', Header: 'Birth Name' }, { accessor: 'initials', Header: 'Initials' }, { accessor: 'prefix', Header: 'Prefix' }, { accessor: 'gender', Header: 'Gender' }, { accessor: 'maritalStatus', Header: 'Marital Status' }, { accessor: 'maritalStatusSinceDate', Header: 'Marital Status Since' }, { accessor: 'secondNationality', Header: 'Second Nationality' }, { accessor: 'thirdNationality', Header: 'Third Nationality' }, { accessor: 'preferredLanguage', Header: 'Native Preferred Language' }, { accessor: 'challengeStatus', Header: 'Challenge Status' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      countrySpecificFieldsAuditColumns: [{ accessor: 'ethnicGroup', Header: 'Ethnic Group' }, { accessor: 'veteran', Header: 'Veteran' }, { accessor: 'challengedVeteran', Header: 'Challenged Veteran' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      biographicalInfoAuditColumns: [{ accessor: 'dob', Header: 'Date of Birth' }, { accessor: 'countryOfBirth', Header: 'Country of Birth' }, { accessor: 'regionOfBirth', Header: 'Region of Birth' }, { accessor: 'dateOfDeath', Header: 'Date of Death' }, { accessor: 'employeeId', Header: 'Employee Id' }, { accessor: 'employeeGlobalId', Header: 'Employee Global Id' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      nationalIdInfoAuditColumns: [{ accessor: 'country', Header: 'Country Name' }, { accessor: 'nationalIdCardType', Header: 'National Id Card Type' }, { accessor: 'nationalId', Header: 'National Id' }, { accessor: 'isPrimary', Header: 'Is Primary' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      addressAuditColumns: [{ accessor: 'addressType', Header: 'Address Type' }, { accessor: 'country', Header: 'Country' }, { accessor: 'state', Header: 'State' }, { accessor: 'city', Header: 'City' }, { accessor: 'line1', Header: 'Address Line 1' }, { accessor: 'line2', Header: 'Address Line 2' }, { accessor: 'zip', Header: 'ZIP' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      workPermitInfoAuditColumns: [{ accessor: 'country', Header: 'Country' }, { accessor: 'documentType', Header: 'Document Type' }, { accessor: 'documentTitle', Header: 'Document Title' }, { accessor: 'documentNumber', Header: 'Document Number' }, { accessor: 'issueDate', Header: 'Issue Date' }, { accessor: 'issuePlace', Header: 'Issue Place' }, { accessor: 'issuingAuthority', Header: 'Issuing Authority' }, { accessor: 'expirationDate', Header: 'Expiration Date' }, { accessor: 'validated', Header: 'Validated' }, { accessor: 'attachments', Header: 'Attachments' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      emailInfoAuditColumns: [{ accessor: 'emailType', Header: 'Email Type' }, { accessor: 'emailAddress', Header: 'Email Address' }, { accessor: 'isPrimary', Header: 'Is Primary' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      phoneInfoAuditColumns: [{ accessor: 'phoneType', Header: 'Phone Type' }, { accessor: 'number', Header: 'Phone Number' }, { accessor: 'extension', Header: 'Extension' }, { accessor: 'isPrimary', Header: 'Is Primary' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      emergencyDetailsAuditColumns: [{ accessor: 'firstName', Header: 'First Name' }, { accessor: 'lastName', Header: 'Last Name' }, { accessor: 'phoneNumber', Header: 'Phone Number' }, { accessor: 'address', Header: 'Address' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      educationalInformationAuditColumns: [{ accessor: 'degreeName', Header: 'Degree Name' }, { accessor: 'yearFrom', Header: 'Year(From)' }, { accessor: 'yearTo', Header: 'Year(To)' }, { accessor: 'percentage', Header: 'Percentage' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      priorWorkExperienceDetailsAuditColumns: [{ accessor: 'totalExperience', Header: 'Total Experience(Years)' }, { accessor: 'relevantWorkExperience', Header: 'Relevant Work Experience(Years)' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      phoneInfoIdModalForm: false,
      closeModalForm: false,
      formTypeForPersonalInformation: 'edit',
      formTypeForCountrySpecificFields: 'edit',
      formTypeForBiographicalInformation: 'edit',
      formTypeForNationalIdInformation: undefined,
      formTypeForAddress: undefined,
      formTypeForWorkPermitInfo: undefined,
      formTypeForEmailInfo: undefined,
      formTypeForPhoneInfo: undefined,
      formTypeForEmergencyDetails: undefined,
      formTypeForEducationalInfo: undefined,
      formTypeForPriorWorkExperienceDetails: undefined,
      currentGridDataObjectForPersonalInformation: {},
      currentGridDataObjectForCountrySpecificFields: {},
      currentGridDataObjectForNationalIdInformation: {},
      currentGridDataObjectForAddress: {},
      currentGridDataObjectForWorkPermitInfo: {},
      currentGridDataObjectForEmailInfo: {},
      currentGridDataObjectForPhoneInfo: {},
      currentGridDataObjectForEmergencyDetails: {},
      currentGridDataObjectForEducationalInfo: {},
      currentGridDataObjectForPriorWorkExperienceDetails: {},
      showingForPersonalInformation: false,
      showingForCountrySpecificFields: false,
      showingForBiographicalInformation: false,
      showingForNationalIdInformation: false,
      showingForAddress: false,
      showingForWorkPermitInfo: false,
      showingForEmailInfo: false,
      showingForPhoneInfo: false,
      showingForEmergencyDetails: false,
      showingForEducationalInfo: false,
      showingForPriorWorkExperienceDetails: false,
      personalInfoAuditIsOpen: false,
      countrySpecificFieldsAuditIsOpen: false,
      biographicalInfoAuditIsOpen: false,
      nationalIdInfoAuditIsOpen: false,
      addressAuditIsOpen: false,
      workPermitInfoAuditIsOpen: false,
      emailInfoAuditIsOpen: false,
      phoneInfoAuditIsOpen: false,
      emergencyDetailsAuditIsOpen: false,
      educationalInformationAuditIsOpen: false,
      priorWorkExperienceDetailsAuditIsOpen: false,
      breadcrumbPosition: 1,
      currentEmployee: [{ identify: { hireDate: new Date(), company: '', eventReason: '' }, personalInformation: { biographicalInformation: { DOB: new Date(), CountryOfBirth: '', DateOfDeath: new Date() }, personalInformation: { DOB: new Date(), CountryOfBirth: '', DateOfDeath: new Date() } } }]
    };
  }
  componentWillMount() {
    this.props.dispatch(getCurrentEmployee());
  }

  componentDidMount() {
    // console.log(findNewEmployee);
    getLastEmployeeData(true, this.props.dispatch);
    // const p = document.getElementById('identify');
    // const n = document.getElementById('personalInfo');
    document.getElementById('step2').style.display = 'block';
    // n.classList.add('active');
    // document.getElementById('prevButton').style.display = 'none';
    // document.getElementById('step1').style.display = 'none';
    // if (p.classList.contains('active')) {
    //   p.classList.remove('active');
    //   p.classList.add('done');
    // }
    // if (n.classList.contains('active')) {
    //   n.classList.remove('active');
    // } else {
    //   n.classList.add('active');
    // }
    // console.log('Employee Id', this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId);
    // if (this.props.newEmployee) {
    //   findNewEmployee({ employee: this.props.newEmployee }, true, this.props.dispatch);
    // }
    // getMasterDataInfo(true, this.props.dispatch);
  }
  componentWillReceiveProps(newprops) {
    console.log(newprops);
    const wpmtinfoRowSize = (newprops.currentEmployee.personalInformation.workPermitInformation.workPermitInformation.length + 1) * 35;
    const addressRowSize = (newprops.currentEmployee.personalInformation.addressInformation.addressInformation.length + 1) * 35;
    const nationalRowSize = (newprops.currentEmployee.personalInformation.nationalIdInformation.length + 1) * 35;
    const emailRowSize = (newprops.currentEmployee.personalInformation.contactInformation.emailInformation.length + 1) * 35;
    const phoneRowSize = (newprops.currentEmployee.personalInformation.contactInformation.phoneInformation.length + 1) * 35;
    const emergencyDetailsRowSize = (newprops.currentEmployee.personalInformation.emergencyContactDetails.emergencyContactDetails.length + 1) * 35;
    const educationalInfoRowSize = (newprops.currentEmployee.personalInformation.educationalInformation.educationalInformation.length + 1) * 35;
    const priorWorkExperienceDetailsRowSize = (newprops.currentEmployee.personalInformation.priorWorkExperienceDetails.priorWorkExperienceDetails.length + 1) * 35;
    this.setState({ workPermitGridInfoHeight: wpmtinfoRowSize });
    this.setState({ addressGridHeight: addressRowSize });
    this.setState({ nationalIdGridHeight: nationalRowSize });
    this.setState({ emailInfoGridHeight: emailRowSize });
    this.setState({ phoneInfoGridHeight: phoneRowSize });
    this.setState({ emergencyDetailsGridHeight: emergencyDetailsRowSize });
    this.setState({ educationalInfoGridHeight: educationalInfoRowSize });
    this.setState({ priorWorkExperienceDetailsGridHeight: priorWorkExperienceDetailsRowSize });
    const newRowsForNationalIdInfo = Object.assign([], newprops.currentEmployee.personalInformation.nationalIdInformation);
    const newRowsForAddress = Object.assign([], newprops.currentEmployee.personalInformation.addressInformation.addressInformation);
    const newRowsForWorkPermitInfo = Object.assign([], newprops.currentEmployee.personalInformation.workPermitInformation.workPermitInformation);
    const newRowsForEmailInfo = Object.assign([], newprops.currentEmployee.personalInformation.contactInformation.emailInformation);
    const newRowsForPhoneInfo = Object.assign([], newprops.currentEmployee.personalInformation.contactInformation.phoneInformation);
    const newRowsForEmergencyDetails = Object.assign([], newprops.currentEmployee.personalInformation.emergencyContactDetails.emergencyContactDetails);
    const newRowsForEducationalInfo = Object.assign([], newprops.currentEmployee.personalInformation.educationalInformation.educationalInformation);
    const newRowsForPriorWorkExperienceDetails = Object.assign([], newprops.currentEmployee.personalInformation.priorWorkExperienceDetails.priorWorkExperienceDetails);
    console.log('check', wpmtinfoRowSize, addressRowSize, nationalRowSize, emailRowSize, phoneRowSize, newRowsForAddress);
    if (newprops.currentEmployee) {
      console.log('showworkpermitinfostatus', newprops.currentEmployee.personalInformation.workPermitInformation.workPermitInformation);
      this.setState({ workpermitinforows: newRowsForWorkPermitInfo.reverse() });
      this.setState({ addressrows: newRowsForAddress.reverse() });
      this.setState({ rowsForNationalIdInfo: newRowsForNationalIdInfo.reverse() });
      this.setState({ emailInfoRows: newRowsForEmailInfo.reverse() });
      this.setState({ phoneInfoRows: newRowsForPhoneInfo.reverse() });
      this.setState({ emergencyDetailsrows: newRowsForEmergencyDetails.reverse() });
      this.setState({ educationalInforows: newRowsForEducationalInfo.reverse() });
      this.setState({ priorWorkExperienceDetailsrows: newRowsForPriorWorkExperienceDetails.reverse() });
    }
    const personalInfoFormattedData = newprops.auditData.personalInformation.personalInformation.personalInformation.map((data) => this.getFormattedDate(data));
    const biographicalInfoFormattedData = newprops.auditData.personalInformation.biographicalInformation.biographicalInformation.map((data) => this.getFormattedDate(data));
    const countrySpecificFieldsFormattedData = newprops.auditData.personalInformation.personalInformation.countrySpecificFields.us.map((data) => this.getFormattedDate(data));
    const nationalIdInfoFormattedData = newprops.auditData.personalInformation.nationalIdInformation.map((data) => this.getFormattedDate(data));
    const addressFormattedData = newprops.auditData.personalInformation.addressInformation.addressInformation.map((data) => this.getFormattedDate(data));
    const workPermitInfoFormattedData = newprops.auditData.personalInformation.workPermitInformation.workPermitInformation.map((data) => this.getFormattedDate(data));
    const emailInfoFormattedData = newprops.auditData.personalInformation.contactInformation.emailInformation.map((data) => this.getFormattedDate(data));
    const phoneInfoFormattedData = newprops.auditData.personalInformation.contactInformation.phoneInformation.map((data) => this.getFormattedDate(data));
    const emergencyDetailsFormattedData = newprops.auditData.personalInformation.emergencyContactDetails.emergencyContactDetails.map((data) => this.getFormattedDate(data));
    const educationalInformationFormattedData = newprops.auditData.personalInformation.educationalInformation.educationalInformation.map((data) => this.getFormattedDate(data));
    const priorWorkExperienceDetailsFormattedData = newprops.auditData.personalInformation.priorWorkExperienceDetails.priorWorkExperienceDetails.map((data) => this.getFormattedDate(data));
    console.log('hey', personalInfoFormattedData);
    this.setState({ personalInfoAuditRows: personalInfoFormattedData });
    this.setState({ biographicalInfoAuditRows: biographicalInfoFormattedData });
    this.setState({ countrySpecificFieldsAuditRows: countrySpecificFieldsFormattedData });
    this.setState({ nationalIdInfoAuditRows: nationalIdInfoFormattedData });
    this.setState({ addressAuditRows: addressFormattedData });
    this.setState({ workPermitInfoAuditRows: workPermitInfoFormattedData });
    this.setState({ emailInfoAuditRows: emailInfoFormattedData });
    this.setState({ phoneInfoAuditRows: phoneInfoFormattedData });
    this.setState({ emergencyDetailsAuditRows: emergencyDetailsFormattedData });
    this.setState({ educationalInformationAuditRows: educationalInformationFormattedData });
    this.setState({ priorWorkExperienceDetailsAuditRows: priorWorkExperienceDetailsFormattedData });
  }
  componentDidUpdate() {
    window.scrollTo(0, this.state.scrollPosition);
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
  setCompany = (value) => {
    console.log(value, 'value');
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
  getRowIdForNationalIdInformation(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForNationalIdInformation: rowID });
    console.log(this.state.currentSelectedIndexForNationalIdInformation);
    console.log(this.state.rowsForNationalIdInfo);
    const object = this.state.rowsForNationalIdInfo[temp];
    console.log(this.state.rowsForNationalIdInfo[temp]);
    object.uniqueID = temp;
    console.log(object);
    this.setState({ currentGridDataObjectForNationalIdInformation: object }, () => {
      console.log(this.state.currentGridDataObjectForNationalIdInformation);
    });
    console.log(this.state.currentGridDataObjectForNationalIdInformation);
  }
  getRowIdForAddress(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForAddress = rowID;
    console.log(this.state.currentSelectedIndexForAddress);
    const object = this.state.addressrows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForAddress = object;
    console.log(this.state.currentGridDataObjectForAddress);
  }
  getRowIdForEmergencyDetails(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForEmergencyDetails = rowID;
    console.log(this.state.currentSelectedIndexForEmergencyDetails);
    const object = this.state.emergencyDetailsrows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForEmergencyDetails = object;
    console.log(this.state.currentGridDataObjectForEmergencyDetails);
  }
  getRowIdForEducationalInfo(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForEducationalInfo = rowID;
    console.log(this.state.currentSelectedIndexForEducationalInfo);
    const object = this.state.educationalInforows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForEducationalInfo = object;
    console.log(this.state.currentGridDataObjectForEducationalInfo);
  }
  getRowIdForPriorWorkExperienceDetails(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForPriorWorkExperienceDetails = rowID;
    console.log(this.state.currentSelectedIndexForPriorWorkExperienceDetails);
    const object = this.state.priorWorkExperienceDetailsrows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForPriorWorkExperienceDetails = object;
    console.log(this.state.currentGridDataObjectForPriorWorkExperienceDetails);
  }
  getRowIdForWorkPermitInfo(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForWorkPermitInfo = rowID;
    console.log(this.state.currentSelectedIndexForWorkPermitInfo);
    const object = this.state.workpermitinforows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForWorkPermitInfo = object;
    console.log(this.state.currentGridDataObjectForWorkPermitInfo);
  }
  getRowIdForEmailInfo(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForEmailInfo = rowID;
    console.log(this.state.currentSelectedIndexForEmailInfo);
    const object = this.state.emailInfoRows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForEmailInfo = object;
    console.log(this.state.currentGridDataObjectForEmailInfo);
  }
  getRowIdForPhoneInfo(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    console.log(temp);
    const rowID = [temp];
    console.log(rowID);
    this.state.currentSelectedIndexForPhoneInfo = rowID;
    console.log(this.state.currentSelectedIndexForPhoneInfo);
    const object = this.state.phoneInfoRows[temp];
    object.uniqueID = temp;
    console.log(object);
    this.state.currentGridDataObjectForPhoneInfo = object;
    console.log(this.state.currentGridDataObjectForPhoneInfo);
  }
  setSyncedWithServer = (value) => {
    console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  toggleElement(elementID) {
    // window.dispatchEvent(new Event('resize'));
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    // const y = document.getElementById(actionsId);
    // y.classList.toggle('actionDisable');
  }
  toggleOnError(elementID) {
    const x = document.getElementById(elementID);
    if (!x.classList.contains('active')) {
      x.classList.toggle('active');
    }
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
    console.log(e.target.value);
    this.props.dispatch(modifyEventReason(e.target.value));
    this.setState({ modifyEventReasonErrorText: '' });
    this.setState({ syncedWithServer: false });
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
  handleChangeCompanies(e) {
    console.log(e.target.value);
    let employeeId = '';
    console.log('EmployeeID', this.props.lastEmployee.length);
   // console.log('EmployeeID', this.props.lastEmployee[0].personalInformation.biographicalInformation.employeeId);
    if (this.props.lastEmployee.length === 0) {
      employeeId = 100;
    } else {
      employeeId = this.props.lastEmployee[0].personalInformation.biographicalInformation.biographicalInformation.employeeId;
    }
    this.props.newEmployee.entityInformation.owner = parseInt(employeeId, 10) + 1;
    console.log('owner');
    console.log('EmployeeID', employeeId);
    this.props.newEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId = parseInt(employeeId, 10) + 1;
    //this.props.newEmployee.identify.identify.identify.company = e.target.value;
    this.props.dispatch(
      updateCompany(
        e.target.value
      )
    );
    this.setState({ syncedWithServer: false });
    this.props.dispatch(addFieldsForArray({}));
    this.save();
    // findNewEmployee({ employee: this.props.newEmployee }, true, this.props.dispatch);
    // createNewEmployeeData({ employee: this.props.newEmployee }, true, this.props.dispatch);
    this.setState({ modifyCompanyErrorText: '' });
  }
  submitForPersonalInformation(data, hiddenType) {
    console.log('Updating Country Specific Fields...');
    console.log(data, hiddenType);
    if (hiddenType === 'edit') {
      const fields = [data.firstNameField, data.middleNameField, data.lastNameField, data.suffixField, data.displayNameField, data.formalNameField, data.titleField, data.birthNameField, data.initialsField, data.prefixField, data.genderField, data.maritalStatusField, data.maritalStatusSinceDateField, data.secondNationalityField, data.thirdNationalityField, data.preferredLanguageField, data.challengeStatusField, data.insertedByField, data.insertedDateField];
      const values = [data.firstName, data.middleName, data.lastName, data.suffix, data.displayName, data.formalName, data.title, data.birthName, data.initials, data.prefix, data.gender, data.maritalStatus, data.maritalStatusSinceDate, data.secondNationality, data.thirdNationality, data.preferredLanguage, data.challengeStatus, data.insertedBy, data.insertedDate];
      this.props.dispatch(
        updatePersonalInformationData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
      this.save();
      this.setState({ showingForPersonalInformation: false });
    }
  }
  submitForCountrySpecificFields(data, hiddenType) {
    console.log('Updating Country Specific Fields...');
    console.log(data, hiddenType);
    if (hiddenType === 'edit') {
      const fields = [data.ethnicGroupField, data.veteranField, data.challengedVeteranField, data.insertedByField, data.insertedDateField];
      const values = [data.ethnicGroup, data.veteran, data.challengedVeteran, data.insertedBy, data.insertedDate];
      console.log(values);
      this.props.dispatch(
        updatePersonalInformationData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
      this.save();
      this.setState({ showingForCountrySpecificFields: false });
    }
  }
  submitForBiographicalInformation(data, hiddenType) {
    console.log('Updating Country Specific Fields...');
    console.log(data, hiddenType);
    if (hiddenType === 'edit') {
      const fields = [data.dobField, data.countryOfBirthField, data.regionOfBirthField, data.dateOfDeathField, data.employeeIdField, data.employeeGlobalIdField, data.insertedByField, data.insertedDateField];
      const values = [data.dob, data.countryOfBirth, data.regionOfBirth, data.dateOfDeath, data.employeeId, data.employeeGlobalId, data.insertedBy, data.insertedDate, data.insertedBy, data.insertedDate];
      console.log(values);
      this.props.dispatch(
        updatePersonalInformationData(
          { value: values, field: fields, type: hiddenType }
        )
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
      this.save();
      this.setState({ showingForBiographicalInformation: false });
    }
  }
  submitForNationalIdInformation(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.countryField, data.nationalIdCardTypeField, data.nationalIdField, data.isPrimaryField, data.insertedByField, data.insertedDateField];
    const values = [data.country, data.nationalIdCardType, data.nationalId, data.isPrimary, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForNationalIdInformation: -1 });
    this.setState({ currentGridDataObjectForNationalIdInformation: {} });
    this.setState({ showingForNationalIdInformation: false });
  }
  submitForAddressForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.addressTypeField, data.countryField, data.stateField, data.cityField, data.line1Field, data.line2Field, data.zipField, data.insertedByField, data.insertedDateField];
    const values = [data.addressType, data.country, data.state, data.city, data.line1, data.line2, data.zip, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForAddress: -1 });
    this.setState({ currentGridDataObjectForAddress: {} });
    this.setState({ showingForAddress: false });
  }
  submitForEmergencyDetailsForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.firstNameField, data.lastNameField, data.phoneNumberField, data.addressField, data.insertedByField, data.insertedDateField];
    const values = [data.firstName, data.lastName, data.phoneNumber, data.address, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForEmergencyDetails: -1 });
    this.setState({ currentGridDataObjectForEmergencyDetails: {} });
    this.setState({ showingForEmergencyDetails: false });
  }
  submitForEducationalInfo(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.degreeNameField, data.yearFromField, data.yearToField, data.percentageField, data.insertedByField, data.insertedDateField];
    const values = [data.degreeName, data.yearFrom, data.yearTo, data.percentage, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForEducationalInfo: -1 });
    this.setState({ currentGridDataObjectForEducationalInfo: {} });
    this.setState({ showingForEducationalInfo: false });
  }
  submitForPriorWorkExperienceDetailsForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.totalExperienceField, data.relevantWorkExperienceField, data.insertedByField, data.insertedDateField];
    const values = [data.totalExperience, data.relevantWorkExperience, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForPriorWorkExperienceDetails: -1 });
    this.setState({ currentGridDataObjectForPriorWorkExperienceDetails: {} });
    this.setState({ showingForPriorWorkExperienceDetails: false });
  }
  submitForWorkPermitInfoForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.countryField, data.documentTypeField, data.documentTitleField, data.documentNumberField, data.issueDateField, data.issuePlaceField, data.issuingAuthorityField, data.expirationDateField, data.validatedField, data.attachmentsField, data.insertedByField, data.insertedDateField];
    const values = [data.country, data.documentType, data.documentTitle, data.documentNumber, data.issueDate, data.issuePlace, data.issuingAuthority, data.expirationDate, data.validated, data.attachments, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForWorkPermitInfo: -1 });
    this.setState({ currentGridDataObjectForWorkPermitInfo: {} });
    this.setState({ showingForWorkPermitInfo: false });
  }
  submitForEmailForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.emailTypeField, data.emailAddressField, data.isPrimaryField, data.insertedByField, data.insertedDateField];
    const values = [data.emailType, data.emailAddress, data.isPrimary, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForEmailInfo: -1 });
    this.setState({ currentGridDataObjectForEmailInfo: {} });
    this.setState({ showingForEmailInfo: false });
  }
  submitForPhoneForm(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.phoneTypeField, data.numberField, data.extensionField, data.isPrimaryField, data.insertedByField, data.insertedDateField];
    const values = [data.phoneType, data.number, data.extension, data.isPrimary, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePersonalInformationData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        auditForPersonalInfo({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForPhoneInfo: -1 });
    this.setState({ currentGridDataObjectForPhoneInfo: {} });
    this.setState({ showingForPhoneInfo: false });
  }
  handleEditForPersonalInformationFields() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForPersonalInformation: true });
    const editData = this.props.currentEmployee.personalInformation.personalInformation.personalInformation;
    this.setState({ currentGridDataObjectForPersonalInformation: editData });
  }
  handleEditForCountrySpecificFields() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForCountrySpecificFields: true });
    const editData = this.props.currentEmployee.personalInformation.personalInformation.countrySpecificFields.us;
    console.log(editData);
    this.setState({ currentGridDataObjectForCountrySpecificFields: editData });
  }
  handleEditForBiographicalInformationFields() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ showingForBiographicalInformation: true });
    const editData = this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation;
    this.setState({ currentGridDataObjectForBiographicalInformation: editData });
  }
  handleEditForNationalIdInformation() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForNationalIdInformation.country) {
      this.setState({ formTypeForNationalIdInformation: 'edit' });
      const editData = this.state.currentGridDataObjectForNationalIdInformation;
      console.log('editData is: ', editData);
      this.setState({ showingForNationalIdInformation: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForAddress() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForAddress.country) {
      this.setState({ formTypeForAddress: 'edit' });
      const editData = this.state.currentGridDataObjectForAddress;
      console.log('editData is: ', editData);
      this.setState({ showingForAddress: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForEmergencyContactDetails() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForEmergencyDetails.firstName) {
      this.setState({ formTypeForEmergencyDetails: 'edit' });
      const editData = this.state.currentGridDataObjectForEmergencyDetails;
      console.log('editData is: ', editData);
      this.setState({ showingForEmergencyDetails: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForEducationalInformation() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForEducationalInfo.degreeName) {
      this.setState({ formTypeForEducationalInfo: 'edit' });
      const editData = this.state.currentGridDataObjectForEducationalInfo;
      console.log('editData is: ', editData);
      this.setState({ showingForEducationalInfo: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForPriorWorkExperienceDetails() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForPriorWorkExperienceDetails.totalExperience) {
      this.setState({ formTypeForPriorWorkExperienceDetails: 'edit' });
      const editData = this.state.currentGridDataObjectForPriorWorkExperienceDetails;
      console.log('editData is: ', editData);
      this.setState({ showingForPriorWorkExperienceDetails: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForWorkPermitInfoForm() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForWorkPermitInfo.country) {
      this.setState({ formTypeForWorkPermitInfo: 'edit' });
      const editData = this.state.currentGridDataObjectForWorkPermitInfo;
      console.log('editData is: ', editData);
      this.setState({ showingForWorkPermitInfo: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForEmailIdInformation() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForEmailInfo.emailType) {
      this.setState({ formTypeForEmailInfo: 'edit' });
      const editData = this.state.currentGridDataObjectForEmailInfo;
      console.log('editData is: ', editData);
      this.setState({ showingForEmailInfo: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForPhoneInformation() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForPhoneInfo.phoneType) {
      this.setState({ formTypeForPhoneInfo: 'edit' });
      const editData = this.state.currentGridDataObjectForPhoneInfo;
      console.log('editData is: ', editData);
      this.setState({ showingForPhoneInfo: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  closeForPersonalInformation() {
    this.setState({ showingForPersonalInformation: false });
  }
  closeForCountrySpecificFields() {
    this.setState({ showingForCountrySpecificFields: false });
  }
  closeForBiographicalInformation() {
    this.setState({ showingForBiographicalInformation: false });
  }
  closeForNationalIdInformation() {
    this.setState({ currentSelectedIndexForNationalIdInformation: -1 });
    this.setState({ currentGridDataObjectForNationalIdInformation: {} });
    this.setState({ showingForNationalIdInformation: false });
  }
  closeForAddress() {
    this.setState({ currentSelectedIndexForAddress: -1 });
    this.setState({ currentGridDataObjectForAddress: {} });
    this.setState({ showingForAddress: false });
  }
  closeForEmergencyDetails() {
    this.setState({ currentSelectedIndexForEmergencyDetails: -1 });
    this.setState({ currentGridDataObjectForEmergencyDetails: {} });
    this.setState({ showingForEmergencyDetails: false });
  }
  closeForEducationalInfo() {
    this.setState({ currentSelectedIndexForEducationalInfo: -1 });
    this.setState({ currentGridDataObjectForEducationalInfo: {} });
    this.setState({ showingForEducationalInfo: false });
  }
  closeForPriorWorkExperienceDetails() {
    this.setState({ currentSelectedIndexForPriorWorkExperienceDetails: -1 });
    this.setState({ currentGridDataObjectForPriorWorkExperienceDetails: {} });
    this.setState({ showingForPriorWorkExperienceDetails: false });
  }
  closeForWorkPermitInfo() {
    this.setState({ currentSelectedIndexForWorkPermitInfo: -1 });
    this.setState({ currentGridDataObjectForWorkPermitInfo: {} });
    this.setState({ showingForWorkPermitInfo: false });
  }
  closeForEmailInfo() {
    this.setState({ currentSelectedIndexForEmailInfo: -1 });
    this.setState({ currentGridDataObjectForEmailInfo: {} });
    this.setState({ showingForEmailInfo: false });
  }
  closeForPhoneInfo() {
    this.setState({ currentSelectedIndexForPhoneInfo: -1 });
    this.setState({ currentGridDataObjectForPhoneInfo: {} });
    this.setState({ showingForPhoneInfo: false });
  }
  closePersonalInfoAudit() {
    this.setState({ personalInfoAuditIsOpen: false });
  }
  closeCountrySpecificFieldsAudit() {
    this.setState({ countrySpecificFieldsAuditIsOpen: false });
  }
  closeBiographicalInfoAudit() {
    this.setState({ biographicalInfoAuditIsOpen: false });
  }
  closeNationalIdInfoAudit() {
    this.setState({ nationalIdInfoAuditIsOpen: false });
  }
  closeAddressAudit() {
    this.setState({ addressAuditIsOpen: false });
  }
  closeEmergencyDetailsAudit() {
    this.setState({ emergencyDetailsAuditIsOpen: false });
  }
  closeEducationalInformationAudit() {
    this.setState({ educationalInformationAuditIsOpen: false });
  }
  closePriorWorkExperienceDetailsAudit() {
    this.setState({ priorWorkExperienceDetailsAuditIsOpen: false });
  }
  closeWorkPermitInfoAudit() {
    this.setState({ workPermitInfoAuditIsOpen: false });
  }
  closeEmailInfoAudit() {
    this.setState({ emailInfoAuditIsOpen: false });
  }
  closePhoneInfoAudit() {
    this.setState({ phoneInfoAuditIsOpen: false });
  }
  openAddForNationalIdInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForNationalIdInformation: 'add' });
    this.setState({ currentGridDataObjectForNationalIdInformation: {} });
    this.setState({ showingForNationalIdInformation: true });
  }
  openAddForAddressForm() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForAddress: 'add' });
    this.setState({ currentGridDataObjectForAddress: {} });
    this.setState({ showingForAddress: true });
  }
  openAddForEmergencyContactDetails() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForEmergencyDetails: 'add' });
    this.setState({ currentGridDataObjectForEmergencyDetails: {} });
    this.setState({ showingForEmergencyDetails: true });
  }
  openAddForEducationalInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForEducationalInfo: 'add' });
    this.setState({ currentGridDataObjectForEducationalInfo: {} });
    this.setState({ showingForEducationalInfo: true });
  }
  openAddForPriorWorkExperienceDetails() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForPriorWorkExperienceDetails: 'add' });
    this.setState({ currentGridDataObjectForPriorWorkExperienceDetails: {} });
    this.setState({ showingForPriorWorkExperienceDetails: true });
  }
  openAddForWorkPermitInfoForm() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForWorkPermitInfo: 'add' });
    this.setState({ currentGridDataObjectForWorkPermitInfo: {} });
    this.setState({ showingForWorkPermitInfo: true });
  }
  openAddForEmailIdInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForEmailInfo: 'add' });
    this.setState({ currentGridDataObjectForEmailInfo: {} });
    this.setState({ showingForEmailInfo: true });
  }
  openAddForPhoneInformation() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForPhoneInfo: 'add' });
    this.setState({ currentGridDataObjectForPhoneInfo: {} });
    this.setState({ showingForPhoneInfo: true });
  }
  openPersonalInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ personalInfoAuditIsOpen: true });
  }
  openCountrySpecificFieldsAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ countrySpecificFieldsAuditIsOpen: true });
  }
  openBiographicalInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ biographicalInfoAuditIsOpen: true });
  }
  openNationalIdInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ nationalIdInfoAuditIsOpen: true });
  }
  openAddressAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ addressAuditIsOpen: true });
  }
  openEmergencyContactDetailsAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ emergencyDetailsAuditIsOpen: true });
  }
  openEducationalInformationAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ educationalInformationAuditIsOpen: true });
  }
  openPriorWorkExperienceDetailsAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ priorWorkExperienceDetailsAuditIsOpen: true });
  }
  openWorkPermitInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ workPermitInfoAuditIsOpen: true });
  }
  openEmailInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ emailInfoAuditIsOpen: true });
  }
  openPhoneInfoAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ phoneInfoAuditIsOpen: true });
  }
  updateEmployeeData = (data) => {
    this.setSyncedWithServer(false);
    console.log('Value', data.target.value);
    console.log('Name', data.target.name);
    const field = data.target.name.split('.');
    // console.log('field is: ', field);
    const len = field.length;
    console.log(len - 1);
    console.log('field', field[len - 1]);
    this.props.dispatch(
        updateEmployeeData(
            { value: data.target.value, field: data.target.name }
        )
    );
    this.save();
  }
  formValidation(fieldValue, id, errorMessage) {
    if (fieldValue === '') {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).textContent = `${errorMessage} is required`;
      return true;
    }
    return false;
  }
  rowGetterForNationalIdInformation(parameter) {
    // console.log(parameter);
    return this.state.rowsForNationalIdInfo[parameter];
  }
  rowGetterForAddress(parameter) {
    return this.state.addressrows[parameter];
  }
  rowGetterForWorkPermitInfo(index) {
    return this.state.workpermitinforows[index];
  }
  //Get email id information
  rowsEmailGetter(params) {
    return this.state.emailInfoRows[params];
  }
  //Get Phone id information
  rowsPhoneGetter(params) {
    return this.state.phoneInfoRows[params];
  }
  rowGetterForEmergencyDetails(parameter) {
    return this.state.emergencyDetailsrows[parameter];
  }
  rowGetterForEducationalInfo(parameter) {
    return this.state.educationalInforows[parameter];
  }
  rowGetterForPriorWorkExperienceDetails(parameter) {
    return this.state.priorWorkExperienceDetailsrows[parameter];
  }
  closePhoneModal() {
    this.setState({ phoneInfoIdModalForm: false });
  }
  // Submit phone information pop-up form data
  saveNationalIdInfo() {
    // alert('hey leave me like this');
    updateNewEmployee({ employee: this.props.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
  }
  save() {
    // updateNewEmployee({ employee: this.props.newEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    // if (!this.state.syncedWithServer) {
    console.log('saving the employee data');
    console.log({ employee: this.props.currentEmployee });
    updateNewEmployee({ employee: this.props.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
    // }
  }
  // errorCodeHelperOnClick(errorCode) {
  //   console.log(errorCode);
  // }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  nextStep() {
    switch (this.state.breadcrumbPosition) {
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
  render() {
    console.log('rendering');
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div id="steps-add-employee" className="steps-wrapper">
              <div className="steps">
                <div className="step-app">
                  <div className="step-content">
                    <div className="row row--panel margin-top">
                      <div className="col-xs-12 col-md-12 col-lg-3">
                        <div className="panel key">
                          <div className="key-icon">
                            <img src="/assets/images/icons/key-money.svg" alt="" />
                          </div>
                          <div className="key-data">
                            <div className="key-title">Salary</div>
                            <div className="key-value key-value--salary">15 000</div>
                          </div>
                          <div
                            className="panel-edit"
                            id="salary"
                            onClick={() => this.toggleElement('salary')}
                          >
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
                            <div className="key-title">Target Total</div>
                            <div className="key-value key-value--bonus">10 000</div>
                          </div>
                          <div
                            className="panel-edit"
                            id="targetTotal"
                            onClick={() => this.toggleElement('targetTotal')}
                          >
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
                            <div className="key-title">Planwork Time</div>
                            <div className="key-value key-value--docs">12</div>
                          </div>
                          <div
                            className="panel-edit"
                            id="planworkTime"
                            onClick={() => this.toggleElement('planworkTime')}
                          >
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
                            <div className="key-title">Company Ratio</div>
                            <div className="key-value key-value--docs">10</div>
                          </div>
                          <div
                            className="panel-edit"
                            id="companyRatio"
                            onClick={() => this.toggleElement('companyRatio')}
                          >
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
                    <div className="step-tab-panel act" id="step2">
                      <div className="person person--horizontal margin-top">
                        <div className="person-photo">
                          <img
                            src="/assets/images/global/sample-avatar.jpg"
                            alt="Samruddhi Vairat"
                            title="Samruddhi Vairat"
                          />
                        </div>
                        <div className="person-data">
                          <h3 className="person-name">Samruddhi Vairat</h3>
                          <div className="person-position">Lorem ipsum dolor</div>
                        </div>
                      </div>
                      <div className="box">
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
                                        <a onClick={this.handleEditForBiographicalInformationFields}>
                                          <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                        </a>
                                      </li>
                                      <li>
                                        <a onClick={this.openBiographicalInfoAudit}>
                                          <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                        </a>
                                      </li>
                                      <li>
                                        <Link to={`/Help/${'PIBIBI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                            value={this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation.dob}
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
                                          <select className="custom-select" name="personalInformation.biographicalInformation.biographicalInformation.countryOfBirth" value={this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation.countryOfBirth} onChange={this.updateEmployeeData} onBlur={() => this.save()}>
                                            {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
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
                                          { this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation.regionOfBirth }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Date of Death
                                          </span>
                                        </td>
                                        <td>
                                          <DatePickerCustom
                                            targetName="personalInformation.biographicalInformation.biographicalInformation.dateOfDeath"
                                            onDayChange={this.updateEmployeeData}
                                            value={this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation.dateOfDeath}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Employee Id
                                          </span>
                                        </td>
                                        <td>
                                          { this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="table-align">
                                          <span className="table-label">
                                            Employee Global Id
                                          </span>
                                        </td>
                                        <td>
                                          { this.props.currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeGlobalId }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <CustomModal Form={<BiographicalInformation formType={this.state.formTypeForBiographicalInformation} data={this.state.currentGridDataObjectForBiographicalInformation} closeEvent={this.closeForBiographicalInformation} submitEvent={this.submitForBiographicalInformation} />} show={this.state.showingForBiographicalInformation} />
                                  <CustomModal Form={<AuditTable headerName={'Biographical Information'} auditData={this.state.biographicalInfoAuditRows} auditColumns={this.state.biographicalInfoAuditColumns} close={this.closeBiographicalInfoAudit} />} show={this.state.biographicalInfoAuditIsOpen} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
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
                                  <li>
                                    <a onClick={this.handleEditForPersonalInformationFields}>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.openPersonalInfoAudit}>
                                      <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                    </a>
                                  </li>
                                  <li>
                                    <Link to={`/Help/${'PIPIPI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.firstName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Last Name:
                                      </span>
                                    </td>
                                    <td>
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.lastName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Middle Name:
                                      </span>
                                    </td>
                                    <td>
                                      {/* <input name="personalInformation.personalInformation.personalInformation.middleName" className="textBoxStyle entry-input" value={this.props.newEmployee.personalInformation.personalInformation.personalInformation.middleName} onChange={this.updateEmployeeData} onBlur={() => this.save()} /> */}
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.middleName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Suffix:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.suffix" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.suffix} onChange={this.updateEmployeeData} onBlur={() => this.save()}>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Suffix')}
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
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.displayName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Formal Name:
                                      </span>
                                    </td>
                                    <td>
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.formalName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Title:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation_personalInformation_personalInformation_title" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.title} onChange={this.removeValidationMessage} >
                                        <option value="" selected disabled>Select</option>
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
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.birthName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Initials:
                                      </span>
                                    </td>
                                    <td>
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.initials}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        * Prefix:
                                      </span>
                                    </td>
                                    <td>
                                      <select className="custom-select" name="personalInformation_personalInformation_personalInformation_prefix" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.prefix} onChange={this.removeValidationMessage} >
                                        <option value="" selected disabled>Select</option>
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
                                      <select className="custom-select" name="personalInformation_personalInformation_personalInformation_gender" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.gender} onChange={this.removeValidationMessage} >
                                        <option value="" selected disabled>Select</option>
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
                                      <select className="custom-select" name="personalInformation_personalInformation_personalInformation_maritalStatus" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.maritalStatus} onChange={this.removeValidationMessage} >
                                        <option value="" selected disabled>Select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Marital Status')}
                                      </select>
                                      <p className="dangerError">
                                        {this.state.modifyMaritalStatusErrorText !== '' ? this.state.modifyMaritalStatusErrorText : ''}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">
                                        Marital Status Since:
                                      </span>
                                    </td>
                                    <td>
                                      <DatePickerCustom
                                        targetName="personalInformation.personalInformation.personalInformation.maritalStatusSinceDate"
                                        onDayChange={this.updateEmployeeData}
                                        value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.maritalStatusSinceDate}
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
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.secondNationality" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.secondNationality} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Nationality') }
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
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.thirdNationality" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.thirdNationality} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        {this.bindDataToDropDownList(this.props.masterInfo, 'Nationality') }
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
                                      <select className="custom-select" name="personalInformation.personalInformation.personalInformation.preferredLanguage" value={this.props.currentEmployee.personalInformation.personalInformation.personalInformation.preferredLanguage} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                        <option value="" selected disabled >select</option>
                                        { this.bindDataToDropDownList(this.props.masterInfo, 'Native Preferred Language') }
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
                                      {this.props.currentEmployee.personalInformation.personalInformation.personalInformation.challengeStatus}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <CustomModal Form={<PersonalInformation formType={this.state.formTypeForPersonalInformation} data={this.state.currentGridDataObjectForPersonalInformation} closeEvent={this.closeForPersonalInformation} submitEvent={this.submitForPersonalInformation} />} show={this.state.showingForPersonalInformation} />
                              <CustomModal Form={<AuditTable headerName={'Personal Information'} auditData={this.state.personalInfoAuditRows} auditColumns={this.state.personalInfoAuditColumns} close={this.closePersonalInfoAudit} />} show={this.state.personalInfoAuditIsOpen} />
                            </div>
                          </div>
                          <div className="toggler active" id="countrySpecificFields" >
                            <div className="toggler-bar js-toggler-bar" >
                              <h2 className="toggler-title">
                                Country Specific Fields
                              </h2>
                              <div className="actionEnable" >
                                <ul className="box-actions" >
                                  <li>
                                    <a onClick={this.handleEditForCountrySpecificFields}>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.openCountrySpecificFieldsAudit}>
                                      <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                    </a>
                                  </li>
                                  <li>
                                    <Link to={`/Help/${'PIPICSF000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                          Ethnic Group:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.ethnicGroup" value={this.props.currentEmployee.personalInformation.personalInformation.countrySpecificFields.us.ethnicGroup} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Ethnic Group')}
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Veteran:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.veteran" value={this.props.currentEmployee.personalInformation.personalInformation.countrySpecificFields.us.veteran} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Veteran')}
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="table-align">
                                        <span className="table-label">
                                          Challenged Veteran:
                                        </span>
                                      </td>
                                      <td>
                                        <select className="custom-select" name="personalInformation.personalInformation.countrySpecificFields.us.challengedVeteran" value={this.props.currentEmployee.personalInformation.personalInformation.countrySpecificFields.us.challengedVeteran} onChange={this.updateEmployeeData} onBlur={() => this.save()} >
                                          {this.bindDataToDropDownList(this.props.masterInfo, 'Challenged Veteran')}
                                        </select>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <CustomModal Form={<CountrySpecific formType={this.state.formTypeForCountrySpecificFields} data={this.state.currentGridDataObjectForCountrySpecificFields} closeEvent={this.closeForCountrySpecificFields} submitEvent={this.submitForCountrySpecificFields} />} show={this.state.showingForCountrySpecificFields} />
                                <CustomModal Form={<AuditTable headerName={'Country Specific Fields'} auditData={this.state.countrySpecificFieldsAuditRows} auditColumns={this.state.countrySpecificFieldsAuditColumns} close={this.closeCountrySpecificFieldsAudit} />} show={this.state.countrySpecificFieldsAuditIsOpen} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
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
                                  <a onClick={this.openAddForNationalIdInformation}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForNationalIdInformation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openNationalIdInfoAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'PINII000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                        columns={this.state.columnsForNationalIdInformation}
                                        rowGetter={this.rowGetterForNationalIdInformation}
                                        rowsCount={this.state.rowsForNationalIdInfo.length}
                                        minHeight={this.state.nationalIdGridHeight}
                                        enableCellSelect
                                        onCellSelected={this.getRowIdForNationalIdInformation}
                                        showCheckbox={false}
                                        emptyRowsView={EmptyRowsView}
                                        rowSelection={{
                                          showCheckbox: false,
                                          selectBy: {
                                            indexes: this.state.currentSelectedIndexForNationalIdInformation
                                          }
                                        }}
                                        enableRowSelect={false}
                                      />
                                    </div>
                                    <CustomModal Form={<NationalIdInformation formType={this.state.formTypeForNationalIdInformation} data={this.state.currentGridDataObjectForNationalIdInformation} closeEvent={this.closeForNationalIdInformation} submitEvent={this.submitForNationalIdInformation} />} show={this.state.showingForNationalIdInformation} />
                                    <CustomModal Form={<AuditTable headerName={'National Id Information'} auditData={this.state.nationalIdInfoAuditRows} auditColumns={this.state.nationalIdInfoAuditColumns} close={this.closeNationalIdInfoAudit} />} show={this.state.nationalIdInfoAuditIsOpen} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
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
                                  <a onClick={this.openAddForAddressForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForAddress}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openAddressAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'PIADIF000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                  onCellSelected={this.getRowIdForAddress}
                                  showCheckbox={false}
                                  emptyRowsView={EmptyRowsView}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.currentSelectedIndexForAddress
                                    }
                                  }}
                                  enableRowSelect={false}
                                />
                                {/* <CustomModal Form={<OneTimePaymentModalForm formType={this.state.formTypeForOneTimePayment} data={this.state.currentGridDataObjectForOneTimePayment} closeEvent={this.editCloseForOneTimePaymentModalForm} submitEvent={this.addSubmitForOneTimePayment} />} show={this.state.ShowingForOneTimePayment} /> */}
                                <CustomModal Form={<AddressForm formType={this.state.formTypeForAddress} data={this.state.currentGridDataObjectForAddress} closeEvent={this.closeForAddress} submitEvent={this.submitForAddressForm} />} show={this.state.showingForAddress} />
                                <CustomModal Form={<AuditTable headerName={'Address'} auditData={this.state.addressAuditRows} auditColumns={this.state.addressAuditColumns} close={this.closeAddressAudit} />} show={this.state.addressAuditIsOpen} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
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
                                  <a onClick={this.openAddForWorkPermitInfoForm}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForWorkPermitInfoForm}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openWorkPermitInfoAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'PIWPIF046'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                    rowGetter={this.rowGetterForWorkPermitInfo}
                                    rowsCount={this.state.workpermitinforows.length}
                                    minHeight={this.state.workPermitGridInfoHeight}
                                    enableCellSelect
                                    onCellSelected={this.getRowIdForWorkPermitInfo}
                                    showCheckbox={false}
                                    emptyRowsView={EmptyRowsView}
                                    rowSelection={{
                                      showCheckbox: false,
                                      selectBy: {
                                        indexes: this.state.currentSelectedIndexForWorkPermitInfo
                                      }
                                    }}
                                    enableRowSelect={false}
                                  />
                                  <CustomModal Form={<WorkPermitInfoForm formType={this.state.formTypeForWorkPermitInfo} data={this.state.currentGridDataObjectForWorkPermitInfo} closeEvent={this.closeForWorkPermitInfo} submitEvent={this.submitForWorkPermitInfoForm} />} show={this.state.showingForWorkPermitInfo} />
                                  <CustomModal Form={<AuditTable headerName={'Work Permit Info'} auditData={this.state.workPermitInfoAuditRows} auditColumns={this.state.workPermitInfoAuditColumns} close={this.closeWorkPermitInfoAudit} />} show={this.state.workPermitInfoAuditIsOpen} />
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
                                      <li>
                                        <a onClick={this.openAddForEmailIdInformation}>
                                          <i className="fas fa-plus addIco" aria-hidden="true" />
                                        </a>
                                      </li>
                                      <li>
                                        <a onClick={this.handleEditForEmailIdInformation}>
                                          <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                        </a>
                                      </li>
                                      <li>
                                        <a onClick={this.openEmailInfoAudit}>
                                          <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                        </a>
                                      </li>
                                      <li>
                                        <Link to={`/Help/${'PICIEI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                              onCellSelected={this.getRowIdForEmailInfo}
                                              showCheckbox={false}
                                              emptyRowsView={EmptyRowsView}
                                              rowSelection={{
                                                showCheckbox: false,
                                                selectBy: {
                                                  indexes: this.state.currentSelectedIndexForEmailInfo
                                                }
                                              }}
                                              enableRowSelect={false}
                                            />
                                          </div>
                                          <CustomModal Form={<EmailInformation formType={this.state.formTypeForEmailInfo} data={this.state.currentGridDataObjectForEmailInfo} closeEvent={this.closeForEmailInfo} submitEvent={this.submitForEmailForm} />} show={this.state.showingForEmailInfo} />
                                          <CustomModal Form={<AuditTable headerName={'Email Information'} auditData={this.state.emailInfoAuditRows} auditColumns={this.state.emailInfoAuditColumns} close={this.closeEmailInfoAudit} />} show={this.state.emailInfoAuditIsOpen} />
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
                                          <a onClick={this.openAddForPhoneInformation}>
                                            <i className="fas fa-plus addIco" aria-hidden="true" />
                                          </a>
                                        </li>
                                        <li>
                                          <a onClick={this.handleEditForPhoneInformation}>
                                            <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                          </a>
                                        </li>
                                        <li>
                                          <a onClick={this.openPhoneInfoAudit}>
                                            <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                          </a>
                                        </li>
                                        <li>
                                          <Link to={`/Help/${'PICIPI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
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
                                            onCellSelected = {this.getRowIdForPhoneInfo}
                                            showCheckbox = {false}
                                            emptyRowsView={EmptyRowsView}
                                            rowSelection={{
                                              showCheckbox: false,
                                              selectBy: {
                                                indexes: this.state.currentSelectedIndexForPhoneInfo
                                              }
                                            }}
                                            enableRowSelect ={false}
                                          />
                                        </div>
                                        <CustomModal Form={<PhoneInformation formType={this.state.formTypeForPhoneInfo} data={this.state.currentGridDataObjectForPhoneInfo} closeEvent={this.closeForPhoneInfo} submitEvent={this.submitForPhoneForm} />} show={this.state.showingForPhoneInfo} />
                                        <CustomModal Form={<AuditTable headerName={'Email Information'} auditData={this.state.phoneInfoAuditRows} auditColumns={this.state.phoneInfoAuditColumns} close={this.closePhoneInfoAudit} />} show={this.state.phoneInfoAuditIsOpen} />
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
                        <div className="toggler active" id="EmergencyContactDetails" >
                          <div className="toggler-bar js-toggler-bar" >
                            <h2 className="toggler-title mgn-left">Emergency Contact Details</h2>
                            <div className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForEmergencyContactDetails}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForEmergencyContactDetails}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openEmergencyContactDetailsAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'PIEMCD000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('EmergencyContactDetails')} />
                          </div>
                          <div className="toggler-content">
                            <div className="box-content">
                              <div className="box-tab active">
                                <ReactDataGrid
                                  className="tableWidth"
                                  columns={this.state.emergencyDetailscols}
                                  rowGetter={this.rowGetterForEmergencyDetails}
                                  rowsCount={this.state.emergencyDetailsrows.length}
                                  minHeight={this.state.emergencyDetailsGridHeight}
                                  enableCellSelect
                                  onCellSelected={this.getRowIdForEmergencyDetails}
                                  showCheckbox={false}
                                  emptyRowsView={EmptyRowsView}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.currentSelectedIndexForEmergencyDetails
                                    }
                                  }}
                                  enableRowSelect={false}
                                />
                                <CustomModal Form={<EmergencyDetailsForm formType={this.state.formTypeForEmergencyDetails} data={this.state.currentGridDataObjectForEmergencyDetails} closeEvent={this.closeForEmergencyDetails} submitEvent={this.submitForEmergencyDetailsForm} />} show={this.state.showingForEmergencyDetails} />
                                <CustomModal Form={<AuditTable headerName={'Emergency Contact Details'} auditData={this.state.emergencyDetailsAuditRows} auditColumns={this.state.emergencyDetailsAuditColumns} close={this.closeEmergencyDetailsAudit} />} show={this.state.emergencyDetailsAuditIsOpen} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        <div className="toggler active" id="EducationalInformation" >
                          <div className="toggler-bar js-toggler-bar" >
                            <h2 className="toggler-title mgn-left">Educational Information</h2>
                            <div className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForEducationalInformation}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForEducationalInformation}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openEducationalInformationAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'PIEDIF000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('EducationalInformation')} />
                          </div>
                          <div className="toggler-content">
                            <div className="box-content">
                              <div className="box-tab active">
                                <ReactDataGrid
                                  className="tableWidth"
                                  columns={this.state.educationalInfocols}
                                  rowGetter={this.rowGetterForEducationalInfo}
                                  rowsCount={this.state.educationalInforows.length}
                                  minHeight={this.state.educationalInfoGridHeight}
                                  enableCellSelect
                                  onCellSelected={this.getRowIdForEducationalInfo}
                                  showCheckbox={false}
                                  emptyRowsView={EmptyRowsView}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.currentSelectedIndexForEducationalInfo
                                    }
                                  }}
                                  enableRowSelect={false}
                                />
                                <CustomModal Form={<EducationalInformationForm formType={this.state.formTypeForEducationalInfo} data={this.state.currentGridDataObjectForEducationalInfo} closeEvent={this.closeForEducationalInfo} submitEvent={this.submitForEducationalInfo} />} show={this.state.showingForEducationalInfo} />
                                <CustomModal Form={<AuditTable headerName={'Educational Information'} auditData={this.state.educationalInformationAuditRows} auditColumns={this.state.educationalInformationAuditColumns} close={this.closeEducationalInformationAudit} />} show={this.state.educationalInformationAuditIsOpen} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        <div className="toggler active" id="PriorWorkExperienceDetails" >
                          <div className="toggler-bar js-toggler-bar" >
                            <h2 className="toggler-title mgn-left">Prior Work Experience Details</h2>
                            <div className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForPriorWorkExperienceDetails}>
                                    <i className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.handleEditForPriorWorkExperienceDetails}>
                                    <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openPriorWorkExperienceDetailsAudit}>
                                    <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'PIEDIF000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('PriorWorkExperienceDetails')} />
                          </div>
                          <div className="toggler-content">
                            <div className="box-content">
                              <div className="box-tab active">
                                <ReactDataGrid
                                  className="tableWidth"
                                  columns={this.state.priorWorkExperienceDetailscols}
                                  rowGetter={this.rowGetterForPriorWorkExperienceDetails}
                                  rowsCount={this.state.priorWorkExperienceDetailsrows.length}
                                  minHeight={this.state.priorWorkExperienceDetailsGridHeight}
                                  enableCellSelect
                                  onCellSelected={this.getRowIdForPriorWorkExperienceDetails}
                                  showCheckbox={false}
                                  emptyRowsView={EmptyRowsView}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.currentSelectedIndexForPriorWorkExperienceDetails
                                    }
                                  }}
                                  enableRowSelect={false}
                                />
                                <CustomModal Form={<WorkExperienceForm formType={this.state.formTypeForPriorWorkExperienceDetails} data={this.state.currentGridDataObjectForPriorWorkExperienceDetails} closeEvent={this.closeForPriorWorkExperienceDetails} submitEvent={this.submitForPriorWorkExperienceDetailsForm} />} show={this.state.showingForPriorWorkExperienceDetails} />
                                <CustomModal Form={<AuditTable headerName={'Address'} auditData={this.state.priorWorkExperienceDetailsAuditRows} auditColumns={this.state.priorWorkExperienceDetailsAuditColumns} close={this.closePriorWorkExperienceDetailsAudit} />} show={this.state.priorWorkExperienceDetailsAuditIsOpen} />
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
// export default PersonalInfo;
function mapStateToProps(state) {
  console.log('Data ', state);
  return { newEmployee: state.employee.newEmployee, currentEmployee: state.employee.currentEmployee, masterInfo: state.masterData.currentMasterData, lastEmployee: state.employee.lastEmployee, auditData: state.auditTrail.currentEmployee };
}

export default connect(mapStateToProps)(PersonalInfo);

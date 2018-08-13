/**
 * @file PersonalInfo Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactDataGrid from 'react-data-grid';
import Modal from 'react-responsive-modal';
import SnackBar from 'react-material-snackbar';
import './CompanyInfo.scss';
import { getCurrentEmployee, updateAddressData, addressInGridEdited, totalAddressInGridonLoad, addedNewAddress } from '../../actions/EmployeeActions';
// import { updateCompanyInfo } from '../../services/CompanyInfo.service';
import CustomModal from './customModal';
import BranchesForm from './BranchesForm';
import AuditTable from './AuditTable';
import { updateEmployee, fetchCompanyData, sendCompnayData, fetchCompanyAudit, sendCompnayAudit } from '../../actions/CompanyActions';

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.addressDetails1 = this.addressDetails1.bind(this);
    this.addressDetails2 = this.addressDetails2.bind(this);
    this.getAddressInGrid2 = this.getAddressInGrid2.bind(this);
    this.expandCompanyAddressModal = this.expandCompanyAddressModal.bind(this);
    this.collapseCompanyAddress = this.collapseCompanyAddress.bind(this);
    this.editCompanyAddressForm = this.editCompanyAddressForm.bind(this);
    this.collapseCompanyAddressEdit = this.collapseCompanyAddressEdit.bind(this);
    this.AddCompanyAddressForm = this.AddCompanyAddressForm.bind(this);
    this.collapseCompanyAddressAdd = this.collapseCompanyAddressAdd.bind(this);
    this.submitEditcaForm = this.submitEditcaForm.bind(this);
    this.selectCityEdit = this.selectCityEdit.bind(this);
    this.totalAddressInGridFunction = this.totalAddressInGridFunction.bind(this);
    this.selectCountryEdit = this.selectCountryEdit.bind(this);
    this.selectStateEdit = this.selectStateEdit.bind(this);
    this.submitAddcaForm = this.submitAddcaForm.bind(this);
    this.selectAddressType = this.selectAddressType.bind(this);
    this.getRowIDForCompanyAddress = this.getRowIDForCompanyAddress.bind(this);
    this.hideErrorMsg = this.hideErrorMsg.bind(this);
    // methods for adding , editing
    this.addBranchesAddressForm = this.addBranchesAddressForm.bind(this);
    this.editBranchesAddressForm = this.editBranchesAddressForm.bind(this);
    this.closeCurrentBranchesForm = this.closeCurrentBranchesForm.bind(this);
    this.submitBranchesForm = this.submitBranchesForm.bind(this);
    this.getRowIdForBranchAddress = this.getRowIdForBranchAddress.bind(this);
    this.editHomeAddressForm = this.editHomeAddressForm.bind(this);
    this.hideHistoryForBranches = this.hideHistoryForBranches.bind(this);
    this.showHistoryForBranches = this.showHistoryForBranches.bind(this);
    this.showHistoryForHomeBranch = this.showHistoryForHomeBranch.bind(this);
    this.hideHistoryForHomeBranch = this.hideHistoryForHomeBranch.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      syncedWithServer: true,
      columnsForCompanyAddress: [{ key: 'Address_Line_1', name: 'Address Line 1', resizable: true }, { key: 'Address_Line_2', name: 'Address Line 2', resizable: true }, { key: 'City', name: 'City', resizable: true }, { key: 'Country', name: 'Country', resizable: true }, { key: 'State', name: 'State', resizable: true }, { key: 'ZIP', name: 'ZIP', resizable: true }],
      rowsForReactDataGrid: [],
      columnsForBranchesGrid: [{ key: 'companyName', name: 'Branch Name' }, { key: 'country', name: 'Country' }, { key: 'state', name: 'State' }, { key: 'city', name: 'City' }, { key: 'addressLine1', name: 'AddressLine1' }, { key: 'addressLine2', name: 'AddressLine2' }, { key: 'zip', name: 'ZIP' }, { key: 'numberOfEmployees', name: 'Number of Employees' }, { key: 'phoneNumber', name: 'phone Number' }, { key: 'faxNumber', name: 'Fax number' }, { key: 'mailId', name: 'Email' }, { key: 'website', name: 'Website' }],
      rowsForBranchesGrid: [],
      showingForBranchesForm: false,
      companyServiceRender: true,
      currentSelectedIndexForBranchAddress: [-1],
      currentDataForBranchesForm: {},
      formTypeForBranchesForm: '',
      showingHistoryForBranches: false,
      columnsForBranches: [{ accessor: 'companyName', Header: 'Branch Name' }, { accessor: 'country', Header: 'Country' }, { accessor: 'state', Header: 'State' }, { accessor: 'city', Header: 'City' }, { accessor: 'addressLine1', Header: 'AddressLine1' }, { accessor: 'addressLine2', Header: 'AddressLine2' }, { accessor: 'zip', Header: 'ZIP' }, { accessor: 'numberOfEmployees', Header: 'Number of Employees' }, { accessor: 'phoneNumber', Header: 'phone Number' }, { accessor: 'faxNumber', Header: 'Fax number' }, { accessor: 'mailId', Header: 'Email' }, { accessor: 'website', Header: 'Website' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Date' }, { accessor: 'operationType', Header: 'Operation Type' }],
      caGridSize: 35,
      caGridWidth: 1250,
      showingHistoryForHomeBranch: false,
      currentSelectedIndexForCurrentAddress: [-1],
      isActive: false,
      isActiveEdit: false,
      isActiveAdd: false,
      scrollPosition: undefined,
      currentSelectedIndexForCompanyAddress: [-1],
      currentGridDataObjectForCompanyAddress: {}
    };
   // this.updateAddressData = this.updateAddressData.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getCurrentEmployee());
    this.props.dispatch(fetchCompanyAudit());
    // this.props.dispatch(fetchCompanyData('5a7434715bb78c3900840c73'));
  }
  componentDidMount() {
    this.props.dispatch(totalAddressInGridonLoad(this.totalAddressInGridFunction()));
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.currentEmployee.identify.identify.identify.corporateCompany !== '' && nextProps.currentEmployee.identify.identify.identify.corporateCompany !== undefined) {
      if (this.state.companyServiceRender) {
        this.props.dispatch(fetchCompanyData(nextProps.currentEmployee.identify.identify.identify.corporateCompany));
        this.setState({ companyServiceRender: false });
      }
      if (!this.state.companyServiceRender) {
        if (this.props.currentEmployee.identify.identify.identify.corporateCompany !== nextProps.currentEmployee.identify.identify.identify.corporateCompany) {
          this.props.dispatch(fetchCompanyData(nextProps.currentEmployee.identify.identify.identify.corporateCompany));
        } else {
          console.log('filter id', nextProps.currentEmployee.identify.identify.identify.corporateCompany);
        }
      }
    }
    console.log('company id', nextProps.currentEmployee.identify.identify.identify.corporateCompany);
    console.log('company data', nextProps.companyData);
    this.setState({ caGridSize: (nextProps.companyData.branches.length * 35) + 35 });
    this.setState({ rowsForBranchesGrid: nextProps.companyData.branches });
    console.log(nextProps.totalAddressInGridonLoad);
    const addressArray = [];
    nextProps.totalAddressInGridonLoad.map((values) => {
      addressArray.push(values);
      return null;
    });
    this.state.rowsForReactDataGrid = addressArray;
    console.log(this.state);
  }
  setSyncedWithServer = (value) => {
    console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  // getAddressInGrid(data) {
  //   return data.map((val) => {
  //     console.log(val);
  //     return (
  //       <tr>
  //         <td>{val.Address_Line_1}</td>
  //         <td>{val.Address_Line_2}</td>
  //         <td>{val.City}</td>
  //         <td>{val.Country}</td>
  //         <td>{val.State}</td>
  //         <td>{val.ZIP}</td>
  //       </tr>
  //     );
  //   });
  // }
  getAddressInGrid2(index) {
    console.log(this.state.rowsForReactDataGrid[index]);
    return this.state.rowsForBranchesGrid[index];
  }
  getRowIDForCompanyAddress(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const selectedRowIndex = data.rowIdx;
    const rowID = [selectedRowIndex];
    this.setState({ currentSelectedIndexForCompanyAddress: rowID });
    console.log(this.state.rowsForReactDataGrid);
    const object = this.state.rowsForReactDataGrid[selectedRowIndex];
    console.log('object for JI is: ', object);
    object.uniqueID = selectedRowIndex;
    this.state.currentGridDataObjectForCompanyAddress = object;
    // this.setState({ currentGridDataObjectForCompanyAddress: object });
    console.log(this.state);
  }
  getRowIdForBranchAddress(data) {
    const selectedRowIndex = data.rowIdx;
    const rowID = [selectedRowIndex];
    this.setState({ currentSelectedIndexForBranchAddress: rowID });
    this.setState({ currentDataForBranchesForm: this.state.rowsForBranchesGrid[rowID] });
  }
  selectAddressType() {
    return this.props.totalAddressInGridonLoad.map((values) => {
      console.log(values);
      return (
        <option defaultValue={values.Address_Type}>{values.Address_Type}</option>
      );
    });
  }
  AddCompanyAddressForm() {
    this.setState({ isActiveAdd: true });
  }
  expandCompanyAddressModal() {
    this.setState({ isActive: true });
  }
  collapseCompanyAddress() {
    this.setState({ isActive: false });
  }
  collapseCompanyAddressEdit() {
    this.setState({ isActiveEdit: false });
  }
  collapseCompanyAddressAdd() {
    this.setState({ isActiveAdd: false });
  }
  submitEditcaForm() {
    const selectedForm = document.forms.companyAddressEditForm;
    const addressLine1Data = selectedForm.addressLine1.value;
    const addressLine2Data = selectedForm.addressLine2.value;
    const addressCityData = selectedForm.addressCity.value;
    const addressCountryData = selectedForm.addressCountry.value;
    const addressStateData = selectedForm.addressState.value;
    const addressZipData = selectedForm.addressZip.value;
    // validation for zip code in edit form
    const zipBox = document.getElementById('zipBox');
    const zipValidationPattern = /^\d{6}$/;
    const zipPattern = RegExp(zipValidationPattern);
    if (zipPattern.test(addressZipData) !== true) {
      // alert('ZIP code should only contain 6 numbers');
      const editZIPErrorMsg = document.getElementById('editZIPErrorMsg');
      editZIPErrorMsg.innerHTML = 'Sorry, ZIP code should only contain 6 numbers';
      zipBox.focus();
      zipBox.style.border = 'solid 1px red';
    } else if (zipPattern.test(addressZipData) === true) {
      const x = Number(addressZipData);
      const editedAddressDetailsArray = [];
      const editedAddressDetailsObj = {
        Address_Type: this.state.currentGridDataObjectForCompanyAddress.Address_Type,
        Address_Line_1: addressLine1Data,
        Address_Line_2: addressLine2Data,
        City: addressCityData,
        Country: addressCountryData,
        State: addressStateData,
        ZIP: x
      };
      // editing data in totalAddressInGridonLoad
      this.props.totalAddressInGridonLoad.map((values) => {
        if (values.Address_Type === editedAddressDetailsObj.Address_Type) {
          // do nothing
        } else {
          editedAddressDetailsArray.push(values);
        }
        return null;
      });
      editedAddressDetailsArray.push(editedAddressDetailsObj);
      console.log(editedAddressDetailsArray);
      this.props.dispatch(addressInGridEdited(editedAddressDetailsArray));
      this.collapseCompanyAddressEdit();
    }
  }
  submitAddcaForm() {
    const selectedForm = document.forms.companyAddressAddForm;
    const addressTypeData = selectedForm.addressType.value;
    const addressLine1Data = selectedForm.addressLine1.value;
    const addressLine2Data = selectedForm.addressLine2.value;
    const addressCityData = selectedForm.addressCity.value;
    const addressCountryData = selectedForm.addressCountry.value;
    const addressStateData = selectedForm.addressState.value;
    const addressZipData = selectedForm.addressZip.value;
    const addressTypeBox = document.getElementById('addressTypeBoxAdd');
    const address1Box = document.getElementById('address1BoxAdd');
    const address2Box = document.getElementById('address2BoxAdd');
    const cityBox = document.getElementById('cityBoxAdd');
    const countryBox = document.getElementById('countryBoxAdd');
    const stateBox = document.getElementById('stateBoxAdd');
    const zipBox = document.getElementById('zipBoxAdd');
    // validation for add form
    if (addressTypeData === '' || addressLine1Data === '' || addressLine2Data === '' || addressCityData === '' || addressCountryData === '' || addressStateData === '') {
      // alert('All fields are mandatory');
      const addZIPErrorMsg = document.getElementById('addZIPErrorMsg');
      addZIPErrorMsg.innerHTML = 'All fields are Mandatory';
      addressTypeBox.focus();
      addressTypeBox.style.border = 'solid 1px red';
      address1Box.style.border = 'solid 1px red';
      address2Box.style.border = 'solid 1px red';
      cityBox.style.border = 'solid 1px red';
      countryBox.style.border = 'solid 1px red';
      stateBox.style.border = 'solid 1px red';
      // zipBox.style.border = 'solid 1px red';
    } else {
      // validation for zip code in add form
      const zipValidationPattern = /^\d{6}$/;
      const zipPattern = RegExp(zipValidationPattern);
      if (zipPattern.test(addressZipData) !== true) {
        // alert('ZIP code should only contain 6 numbers');
        const addZIPErrorMsg = document.getElementById('addZIPErrorMsg');
        addZIPErrorMsg.innerHTML = 'Sorry, ZIP code should only contain 6 numbers';
        zipBox.focus();
        zipBox.style.border = 'solid 1px red';
      } else if (zipPattern.test(addressZipData) === true) {
        const x = Number(addressZipData);
        const addedAddressObject = {
          Address_Type: addressTypeData,
          Address_Line_1: addressLine1Data,
          Address_Line_2: addressLine2Data,
          City: addressCityData,
          Country: addressCountryData,
          State: addressStateData,
          ZIP: x
        };
        console.log(addressTypeData);
        console.log(addedAddressObject);
        const onloadAddress = this.totalAddressInGridFunction();
        onloadAddress.push(addedAddressObject);
        console.log(onloadAddress);
        this.props.dispatch(addedNewAddress(onloadAddress));
        this.collapseCompanyAddressAdd();
      }
    }
  }
  selectCityEdit() {
    return this.props.totalAddressInGridonLoad.map((values) => {
      console.log(values);
      return (
        <option defaultValue={values.City}>{values.City}</option>
      );
    });
  }
  selectCountryEdit() {
    return this.props.totalAddressInGridonLoad.map((values) => {
      console.log(values);
      return (
        <option defaultValue={values.Country}>{values.Country}</option>
      );
    });
  }
  selectStateEdit() {
    return this.props.totalAddressInGridonLoad.map((values) => {
      console.log(values);
      return (
        <option defaultValue={values.State}>{values.State}</option>
      );
    });
  }
  toggleElement(elementID) {
    console.log(elementID);
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'CompanyAddress') {
      const ca = document.getElementById('CompanyAddressToggle');
      ca.classList.toggle('actionDisable');
    }
    if (elementID === 'homeAddress') {
      const ca = document.getElementById('branchAddressToggle');
      ca.classList.toggle('actionDisable');
    }
  }
  countriesList(countrieslist) {
    console.log('Json Keys ', Object.keys(countrieslist));
    const countriesListOptions = countrieslist.map((countriesListValue) => <option value={countriesListValue.code}>{countriesListValue.name}</option>);
    return countriesListOptions;
  }
  addressChange = (data) => {
    console.log('Data =', data);
    // console.log('Updat', updateAddressData);
    // this.setSyncedWithServer(false);
    // this.props.dispatch(
    //     updateAddressData(
    //         { value: data.target.value, field: data.target.name }
    //     )
    // );
  }
  addressDetails1() {
    const addressDetailsArray = [];
    const addressDetailsObj = {
      Address_Type: 'Home Address',
      Address_Line_1: 'abc',
      Address_Line_2: 'def',
      City: 'ghi',
      Country: 'jkl',
      State: 'mno',
      ZIP: 123
    };
    addressDetailsArray.push(addressDetailsObj);
    console.log(addressDetailsArray);
    return addressDetailsArray;
    // return addressDetailsObj;
  }
  addressDetails2() {
    const addressDetailsArray = [];
    const addressDetailsObj = {
      Address_Type: 'Mailing Address',
      Address_Line_1: 'pqr',
      Address_Line_2: 'stu',
      City: 'vwx',
      Country: 'yza',
      State: 'bcd',
      ZIP: 456
    };
    addressDetailsArray.push(addressDetailsObj);
    console.log(addressDetailsArray);
    return addressDetailsArray;
  }
  totalAddressInGridFunction() {
    const address1 = this.addressDetails1();
    const address2 = this.addressDetails2();
    const address1Obj = address1[0];
    const address2Obj = address2[0];
    const addressArray = [];
    addressArray.push(address1Obj);
    addressArray.push(address2Obj);
    console.log(addressArray);
    return addressArray;
  }
  hideErrorMsg() {
    document.getElementById('errorMsgs').innerHTML = '';
  }
  editCompanyAddressForm() {
    console.log(this.props.addressInGrid2);
    console.log(this.state);
    if (this.state.currentGridDataObjectForCompanyAddress.Address_Line_1) {
      this.setState({ isActiveEdit: true });
    } else {
      // alert('Select a Row Before Editing');
      const errorMsgs = document.getElementById('errorMsgs');
      errorMsgs.innerHTML = 'You need to select any below row first';
      setTimeout(() => {
        this.hideErrorMsg();
        console.log('in timeout');
      }, 4000);
    }
  }
  updateCompanyData = (data) => {
    console.log('Dataval =', data.target.value);
    console.log('Name ', data.target.name);
    this.setSyncedWithServer(false);
    this.props.dispatch(
      updateAddressData(
        { value: data.target.value, field: data.target.name }
      )
    );
  }
  save() {
    setTimeout(() => {
      console.log('data is waiting', this.props.companyData);
      this.props.dispatch(sendCompnayData(this.props.companyData));
      this.props.dispatch(sendCompnayAudit(this.props.auditData));
    }, 0);
  }
  // save() {
  //   console.log('saving the employee data');
  //   // console.log({ companyInfo: this.props.companyInfo });
  //   updateCompanyInfo({ employee: this.props.companyInfo }, false, this.props.dispatch, this.setSyncedWithServer);
  // }
  // save = () => {
  //   console.log('Welcome Save ', this.state.syncedWithServer);
  //  // if (!this.state.syncedWithServer) {
  //   console.log('saving the employee data');
  //   console.log({ companyInfo: this.props.companyInfo });
  //   updateCompanyInfo({ companyInfo: this.props.companyInfo }, false, this.props.dispatch, this.setSyncedWithServer);
  //  // }
  // }
  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  addBranchesAddressForm() {
    this.setState({ formTypeForBranchesForm: 'add' });
    this.setState({ showingForBranchesForm: true });
  }
  editBranchesAddressForm() {
    if (this.state.currentDataForBranchesForm.companyName) {
      this.setState({ formTypeForBranchesForm: 'edit' });
      this.setState({ showingForBranchesForm: true });
    } else {
      alert('please select a row');
    }
  }
  closeCurrentBranchesForm() {
    this.setState({ currentDataForBranchesForm: {} });
    this.setState({ currentSelectedIndexForBranchAddress: [-1] });
    this.setState({ showingForBranchesForm: false });
  }
  submitBranchesForm(data, type) {
    console.log(data, type);
    if (type === 'add') {
      // alert('add');
      let newRows = [];
      newRows = [...this.state.rowsForBranchesGrid];
      newRows.push(data);
      this.setState({ rowsForBranchesGrid: newRows });
      console.log('newrowsadd', newRows);
      this.props.dispatch(updateEmployee({ newRows, section: 'branches' }));
      const auditData = { ...data };
      auditData.insertedBy = 'Admin';
      auditData.insertedDate = new Date();
      auditData.operationType = 'ADD';
      this.props.auditData.branches.push(auditData);
    }
    if (type === 'edit') {
      // alert('edit');
      let newRows = [];
      this.state.rowsForBranchesGrid[this.state.currentSelectedIndexForBranchAddress] = data;
      newRows = this.state.rowsForBranchesGrid;
      this.props.dispatch(updateEmployee({ newRows, section: 'branches' }));
      const auditData = { ...data };
      auditData.insertedBy = 'Admin';
      auditData.insertedDate = new Date();
      auditData.operationType = 'UPDATE';
      this.props.auditData.branches.push(auditData);
    }
    if (type === 'editHome') {
      // alert('edit home');
      let newRows = {};
      newRows = { ...data };
      this.props.dispatch(updateEmployee({ newRows, section: 'corporateAddress' }));
      const auditData = { ...data };
      auditData.insertedBy = 'Admin';
      auditData.insertedDate = new Date();
      auditData.operationType = 'UPDATE';
      this.props.auditData.corporateAddress.push(auditData);
    }
    this.setState({ showingForBranchesForm: false });
    this.setState({ currentDataForBranchesForm: {} });
    this.save();
  }
  editHomeAddressForm() {
    this.setState({ currentDataForBranchesForm: this.props.companyData.corporateAddress });
    this.setState({ formTypeForBranchesForm: 'editHome' });
    this.setState({ showingForBranchesForm: true });
  }
  showHistoryForBranches() {
    this.setState({ showingHistoryForBranches: true });
  }
  hideHistoryForBranches() {
    this.setState({ showingHistoryForBranches: false });
  }
  showHistoryForHomeBranch() {
    this.setState({ showingHistoryForHomeBranch: true });
  }
  hideHistoryForHomeBranch() {
    this.setState({ showingHistoryForHomeBranch: false });
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
        <div className="row row--panel">
          <div className="col-xs-12 col-md-12">
            <div className="box">
              <ul className="box-headings">
                <li className="box-heading active">
                  <div className="box-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 47.78 43"
                    >
                      <title>Zasób 1</title>
                      <path
                        d="M35.08,5.12h11.2V41.5H1.5V5.12H12.7m.84-3.62h20.7V8.37H13.54ZM28.29,18H40.17M28.29,22.76H40.17M28.29,27.57H40.17M28.29,32.38h7.49M14.19,25.32A4.45,4.45,0,0,1,11,20.62a3.31,3.31,0,0,1,3.08-3.52h.14a3.31,3.31,0,0,1,3.23,3.39s0,.09,0,.14c0,2.08-.66,3.85-3.22,4.7Zm-3,.55h5.93a3.63,3.63,0,0,1,3.61,3.61v2.88H7.61V29.49a3.62,3.62,0,0,1,3.61-3.61Z"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <h2 className="box-title">Company Information</h2>
                  {/* <ul className="box-actions">
                    <li>
                      <a onClick={this.handleClick}>Edit</a>
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
                <div className="box-tab active">
                  <div className="box-inner box-inner--no-pad">
                    <div className="toggler active" id="homeAddress">
                      <div
                        className="toggler-bar toggler-bar--no-top js-toggler-bar"
                      >
                        <h2 className="toggler-title">Corporate Information</h2>
                        <div id="branchAddressToggle" className="toggleAction">
                          <ul className="box-actions">
                            {/* <li>
                              <a onClick={this.expandCompanyAddressModal}>
                                <i className="fa fa-expand expandIco" aria-hidden="true" title="Expand" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.addBranchesAddressForm}>
                                <i className="fa fa-plus addIco" aria-hidden="true" title="Add" />
                              </a>
                            </li> */}
                            <li>
                              <a onClick={this.editHomeAddressForm}>
                                <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.showHistoryForHomeBranch}>
                                <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                              </a>
                            </li>
                            <li>
                              <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                            </li>
                          </ul>
                        </div>
                        <span onClick={() => this.toggleElement('homeAddress')} className="box-filter-arrow" />
                      </div>
                      <div className="toggler-content">
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="person person--horizontal margin-top padding-top">
                              <div className="person-photo">
                                <img
                                  src="/assets/images/global/sample-logo.png"
                                  alt="Samruddhi Vairat"
                                  title="Samruddhi Vairat"
                                />
                              </div>
                              <div className="person-data">
                                <h3 className="person-name">Company Name</h3>
                                <div className="person-position">{this.props.companyData.corporateAddress.companyName}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-7">
                            <table className="table table--stripes">
                              <tbody>
                                {/* <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                          Address Type1:
                                        </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" onChange={this.save} >
                                      <option value="v-11"> Home Address1 </option>
                                      <option value="v-21"> Mailing Address 1</option>
                                    </select>
                                  </td>
                                </tr> */}
                                {/* <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                          Address Type:
                                        </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" id="addressSelect" name="companyInformation.companyInformation.add1" onChange={this.addressChange} >
                                      <option value="v-1"> Home Address </option>
                                      <option value="v-2"> Mailing Address </option>
                                      {this.selectAddressType()}
                                    </select>
                                  </td>
                                </tr> */}
                                {/* <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                          Country:
                                        </span>
                                  </td>
                                  <td>
                                    <select className="custom-select" name="companyInformation.companyInformation.countriesList" onChange={this.addressChange} >
                                      {this.countriesList(this.props.masterInfo.masterDataInformation.countriesList)}
                                    </select>
                                  </td>
                                </tr> */}
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">Country</span>
                                  </td>
                                  <td>{ this.props.companyData.corporateAddress.country }</td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">State</span>
                                  </td>
                                  <td>{ this.props.companyData.corporateAddress.state }</td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">City</span>
                                  </td>
                                  <td>{ this.props.companyData.corporateAddress.city }</td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                          Address Line 1
                                        </span>
                                  </td>
                                  <td>{ this.props.companyData.corporateAddress.addressLine1 }</td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                          Address Line 2
                                        </span>
                                  </td>
                                  <td>{ this.props.companyData.corporateAddress.addressLine2 }</td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">ZIP</span>
                                  </td>
                                  <td>{ this.props.companyData.corporateAddress.zip }</td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">Number Of Employees </span>
                                  </td>
                                  <td>
                                    {/* <input type="text" name="companyInformation.companyInformation.numberOfEmployees" value={this.props.companyInfo.companyInformation.companyInformation.numberOfEmployees} id="noOfEmployee" onChange={this.updateCompanyData} onBlur={() => this.save()} /> */}
                                    { this.props.companyData.corporateAddress.numberOfEmployees }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">Phone Number</span>
                                  </td>
                                  <td>
                                    {/* <input type="text" name="companyInformation.companyInformation.numberOfEmployees" value={this.props.companyInfo.companyInformation.companyInformation.numberOfEmployees} id="noOfEmployee" onChange={this.updateCompanyData} onBlur={() => this.save()} /> */}
                                    { this.props.companyData.corporateAddress.phoneNumber }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">Fax Number</span>
                                  </td>
                                  <td>
                                    {/* <input type="text" name="companyInformation.companyInformation.numberOfEmployees" value={this.props.companyInfo.companyInformation.companyInformation.numberOfEmployees} id="noOfEmployee" onChange={this.updateCompanyData} onBlur={() => this.save()} /> */}
                                    { this.props.companyData.corporateAddress.faxNumber }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">Email</span>
                                  </td>
                                  <td>
                                    {/* <input type="text" name="companyInformation.companyInformation.numberOfEmployees" value={this.props.companyInfo.companyInformation.companyInformation.numberOfEmployees} id="noOfEmployee" onChange={this.updateCompanyData} onBlur={() => this.save()} /> */}
                                    { this.props.companyData.corporateAddress.mailId }
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">Website</span>
                                  </td>
                                  <td>
                                    {/* <input type="text" name="companyInformation.companyInformation.numberOfEmployees" value={this.props.companyInfo.companyInformation.companyInformation.numberOfEmployees} id="noOfEmployee" onChange={this.updateCompanyData} onBlur={() => this.save()} /> */}
                                    { this.props.companyData.corporateAddress.website }
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td className="table-align">&nbsp; </td>
                                  <td>
                                    <input type="submit" value="submit" />
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
            <div className="box">
              {/* <ul className="box-headings">
                <li className="box-heading active">
                  <div className="box-icon">
                    <svg
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
                    </svg>
                  </div>
                  <h2 className="box-title">Branches Information</h2>
                  <ul className="box-actions">
                    <li>
                      <a onClick={this.handleClick}>Edit</a>
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
                  </ul>
                </li>
              </ul> */}
              <div className="box-content" >
                <div className="gridsPlacing">
                  <div className="toggler active" id="CompanyAddress">

                    <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                      {/* <div className="box-icon">
                        <svg
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
                        </svg>
                      </div> */}
                      <h2 className="toggler-title">Branches Information</h2>
                      <div id="CompanyAddressToggle" className="toggleAction">
                        <ul className="box-actions">
                          <li>
                            <a onClick={this.expandCompanyAddressModal}>
                              <i className="fas fa-expand expandIco" aria-hidden="true" title="Expand" />
                            </a>
                          </li>
                          <li>
                            <a onClick={this.addBranchesAddressForm}>
                              <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                            </a>
                          </li>
                          <li>
                            <a onClick={this.editBranchesAddressForm}>
                              <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                            </a>
                          </li>
                          <li>
                            <a onClick={this.showHistoryForBranches}>
                              <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                            </a>
                          </li>
                          <li>
                            <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="fas fa-question-circle-o helpIco" aria-hidden="true" title="Help" /></Link>
                          </li>
                        </ul>
                      </div>
                      <span className="box-filter-arrow" onClick={() => this.toggleElement('CompanyAddress')} />
                    </div>
                    <div className="toggler-content ca-padding-bottom">
                      <Modal open={this.state.isActive}>
                        <div className="card-expandModalWidth">
                          <div className="card-header">
                            Branches Information
                            <button type="button" onClick={this.collapseCompanyAddress} className="close" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div>
                            <form name="companyAddress">
                              <div>
                                <ReactDataGrid
                                  columns={this.state.columnsForBranchesGrid}
                                  rowGetter={this.getAddressInGrid2}
                                  rowsCount={this.state.rowsForBranchesGrid.length}
                                  minHeight={this.state.caGridSize}
                                  minWidth={this.state.caGridWidth}
                                  enableCellSelect
                                  // onCellSelected={this.getRowIDForJobInformation}
                                  showCheckbox={false}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.currentSelectedIndexForCurrentAddress
                                    }
                                  }}
                                  enableRowSelect={false}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal>
                      <Modal open={this.state.isActiveEdit}>
                        <div className="form-group snackBar">
                          <SnackBar
                            show={false}
                            // timer={6000}
                            // style={snackbarStyle}
                            className="form-group"
                          >
                            <p id="editZIPErrorMsg" type="hidden" />
                          </SnackBar>
                        </div>
                        <div className="card-expandModalWidth">
                          <div className="card-header">
                            Company Address Edit Form
                            <button type="button" onClick={this.collapseCompanyAddressEdit} className="close" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div>
                            <form name="companyAddressEditForm" className="caEditForm">
                              <label className="custom-label">* Address Line 1: </label>
                              <input type="text" className="textBoxStyle entry-input" defaultValue={this.state.currentGridDataObjectForCompanyAddress.Address_Line_1} name="addressLine1" />
                              <label className="custom-label">* Address Line 2: </label>
                              <input type="text" className="textBoxStyle entry-input" defaultValue={this.state.currentGridDataObjectForCompanyAddress.Address_Line_2} name="addressLine2" />
                              <label className="custom-label">* City: </label>
                              <select name="addressCity" className="custom-select">
                                <option defaultValue={this.state.currentGridDataObjectForCompanyAddress.City}>{this.state.currentGridDataObjectForCompanyAddress.City}</option>
                                {this.selectCityEdit()}
                              </select>
                              <label className="custom-label">* Country: </label>
                              <select name="addressCountry" className="custom-select">
                                <option defaultValue={this.state.currentGridDataObjectForCompanyAddress.Country}>{this.state.currentGridDataObjectForCompanyAddress.Country}</option>
                                {this.selectCountryEdit()}
                              </select>
                              <label className="custom-label">* State: </label>
                              <select name="addressState" className="custom-select">
                                <option defaultValue={this.state.currentGridDataObjectForCompanyAddress.State}>{this.state.currentGridDataObjectForCompanyAddress.State}</option>
                                {this.selectStateEdit()}
                              </select>
                              <label className="custom-label">* ZIP: </label>
                              <input type="text" className="textBoxStyle entry-input" defaultValue={this.state.currentGridDataObjectForCompanyAddress.ZIP} name="addressZip" id="zipBox" />
                              <input type="button" value="Submit" id="submit" className="form-control btn-primary custom-submit" onClick={this.submitEditcaForm} />
                            </form>
                          </div>
                        </div>
                      </Modal>
                      <Modal open={this.state.isActiveAdd}>
                        <div className="form-group snackBar">
                          <SnackBar
                            show={false}
                            // timer={6000}
                            // style={snackbarStyle}
                            className="form-group"
                          >
                            <p id="addZIPErrorMsg" type="hidden" />
                          </SnackBar>
                        </div>
                        <div className="card-expandModalWidth">
                          <div className="card-header">
                            Add New Company Address Form
                            <button type="button" onClick={this.collapseCompanyAddressAdd} className="close" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div>
                            <form name="companyAddressAddForm" className="caEditForm">
                              <label className="custom-label">* Address Type: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressType" id="addressTypeBoxAdd" />
                              <label className="custom-label">* Address Line 1: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressLine1" id="address1BoxAdd" />
                              <label className="custom-label">* Address Line 2: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressLine2" id="address2BoxAdd" />
                              <label className="custom-label">* City: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressCity" id="cityBoxAdd" />
                              <label className="custom-label">* Country: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressCountry" id="countryBoxAdd" />
                              <label className="custom-label">* State: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressState" id="stateBoxAdd" />
                              <label className="custom-label">* ZIP: </label>
                              <input type="text" className="textBoxStyle entry-input" name="addressZip" id="zipBoxAdd" placeholder="ZIP code should contain 6 numbers" />
                              <input type="button" value="Submit" id="submit" className="form-control btn-primary custom-submit" onClick={this.submitAddcaForm} />
                            </form>
                          </div>
                        </div>
                      </Modal>
                      {/* <div className="form-group snackBar">
                        <SnackBar
                          show={false}
                          // timer={4000}
                          // style={snackbarStyle}
                          className="form-group"
                        >
                          <p id="errorMsgs" type="hidden" />
                        </SnackBar>
                      </div> */}
                      <div>
                        <ReactDataGrid
                          columns={this.state.columnsForBranchesGrid}
                          rowGetter={this.getAddressInGrid2}
                          rowsCount={this.state.rowsForBranchesGrid.length}
                          minHeight={this.state.caGridSize}
                          enableCellSelect
                          onCellSelected={this.getRowIdForBranchAddress}
                          showCheckbox={false}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.currentSelectedIndexForBranchAddress
                            }
                          }}
                          enableRowSelect={false}
                        />
                        <CustomModal Form={<BranchesForm formType={this.state.formTypeForBranchesForm} data={this.state.currentDataForBranchesForm} closeEvent={this.closeCurrentBranchesForm} submitEvent={this.submitBranchesForm} />} show={this.state.showingForBranchesForm} />
                        <CustomModal Form={<AuditTable headerName="Branches Information Audit" auditData={this.props.auditData.branches} auditColumns={this.state.columnsForBranches} close={this.hideHistoryForBranches} />} show={this.state.showingHistoryForBranches} />
                        <CustomModal Form={<AuditTable headerName="Corporate Information Audit" auditData={this.props.auditData.corporateAddress} auditColumns={this.state.columnsForBranches} close={this.hideHistoryForHomeBranch} />} show={this.state.showingHistoryForHomeBranch} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="gridsPlacing">
            <div className="toggler active" id="CompanyAddress">

              <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                <h2 className="toggler-title">Company Address</h2>
                <div id="CompanyAddressToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <a onClick={this.expandCompanyAddressModal}>
                        <i className="fa fa-expand expandIco" aria-hidden="true" title="Expand" />
                      </a>
                    </li>
                    <li>
                      <a onClick={this.AddCompanyAddressForm}>
                        <i className="fa fa-plus addIco" aria-hidden="true" title="Add" />
                      </a>
                    </li>
                    <li>
                      <a onClick={this.editCompanyAddressForm}>
                        <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fa fa-history historyIco" aria-hidden="true" title="History" />
                      </a>
                    </li>
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span className="box-filter-arrow" onClick={() => this.toggleElement('CompanyAddress')} />
              </div>
              <div className="toggler-content ca-padding-bottom">
                <Modal open={this.state.isActive}>
                  <div className="card-expandModalWidth">
                    <div className="card-header">
                      Company Address
                      <button type="button" onClick={this.collapseCompanyAddress} className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div>
                      <form name="companyAddress">
                        <div>
                          <ReactDataGrid
                            columns={this.state.columnsForCompanyAddress}
                            rowGetter={this.getAddressInGrid2}
                            rowsCount={this.state.rowsForReactDataGrid.length}
                            minHeight={this.state.caGridSize}
                            minWidth={this.state.caGridWidth}
                            enableCellSelect
                            // onCellSelected={this.getRowIDForJobInformation}
                            showCheckbox={false}
                            rowSelection={{
                              showCheckbox: false,
                              selectBy: {
                                indexes: this.state.currentSelectedIndexForCurrentAddress
                              }
                            }}
                            enableRowSelect={false}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal>
                <Modal open={this.state.isActiveEdit}>
                  <div className="form-group snackBar">
                    <SnackBar
                      show="true"
                      // timer={6000}
                      // style={snackbarStyle}
                      className="form-group"
                    >
                      <p id="editZIPErrorMsg" type="hidden" />
                    </SnackBar>
                  </div>
                  <div className="card-expandModalWidth">
                    <div className="card-header">
                      Company Address Edit Form
                      <button type="button" onClick={this.collapseCompanyAddressEdit} className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div>
                      <form name="companyAddressEditForm" className="caEditForm">
                        <label className="custom-label">* Address Line 1: </label>
                        <input type="text" className="textBoxStyle entry-input" defaultValue={this.state.currentGridDataObjectForCompanyAddress.Address_Line_1} name="addressLine1" />
                        <label className="custom-label">* Address Line 2: </label>
                        <input type="text" className="textBoxStyle entry-input" defaultValue={this.state.currentGridDataObjectForCompanyAddress.Address_Line_2} name="addressLine2" />
                        <label className="custom-label">* City: </label>
                        <select name="addressCity" className="custom-select">
                          <option defaultValue={this.state.currentGridDataObjectForCompanyAddress.City}>{this.state.currentGridDataObjectForCompanyAddress.City}</option>
                          {this.selectCityEdit()}
                        </select>
                        <label className="custom-label">* Country: </label>
                        <select name="addressCountry" className="custom-select">
                          <option defaultValue={this.state.currentGridDataObjectForCompanyAddress.Country}>{this.state.currentGridDataObjectForCompanyAddress.Country}</option>
                          {this.selectCountryEdit()}
                        </select>
                        <label className="custom-label">* State: </label>
                        <select name="addressState" className="custom-select">
                          <option defaultValue={this.state.currentGridDataObjectForCompanyAddress.State}>{this.state.currentGridDataObjectForCompanyAddress.State}</option>
                          {this.selectStateEdit()}
                        </select>
                        <label className="custom-label">* ZIP: </label>
                        <input type="text" className="textBoxStyle entry-input" defaultValue={this.state.currentGridDataObjectForCompanyAddress.ZIP} name="addressZip" id="zipBox" />
                        <input type="button" value="Submit" id="submit" className="form-control btn-primary custom-submit" onClick={this.submitEditcaForm} />
                      </form>
                    </div>
                  </div>
                </Modal>
                <Modal open={this.state.isActiveAdd}>
                  <div className="form-group snackBar">
                    <SnackBar
                      show="true"
                      // timer={6000}
                      // style={snackbarStyle}
                      className="form-group"
                    >
                      <p id="addZIPErrorMsg" type="hidden" />
                    </SnackBar>
                  </div>
                  <div className="card-expandModalWidth">
                    <div className="card-header">
                      Add New Company Address Form
                      <button type="button" onClick={this.collapseCompanyAddressAdd} className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div>
                      <form name="companyAddressAddForm" className="caEditForm">
                        <label className="custom-label">* Address Type: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressType" id="addressTypeBoxAdd" />
                        <label className="custom-label">* Address Line 1: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressLine1" id="address1BoxAdd" />
                        <label className="custom-label">* Address Line 2: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressLine2" id="address2BoxAdd" />
                        <label className="custom-label">* City: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressCity" id="cityBoxAdd" />
                        <label className="custom-label">* Country: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressCountry" id="countryBoxAdd" />
                        <label className="custom-label">* State: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressState" id="stateBoxAdd" />
                        <label className="custom-label">* ZIP: </label>
                        <input type="text" className="textBoxStyle entry-input" name="addressZip" id="zipBoxAdd" placeholder="ZIP code should contain 6 numbers" />
                        <input type="button" value="Submit" id="submit" className="form-control btn-primary custom-submit" onClick={this.submitAddcaForm} />
                      </form>
                    </div>
                  </div>
                </Modal>
                <div className="form-group snackBar">
                  <SnackBar
                    show="true"
                    // timer={4000}
                    // style={snackbarStyle}
                    className="form-group"
                  >
                    <p id="errorMsgs" type="hidden" />
                  </SnackBar>
                </div>
                <div>
                  <ReactDataGrid
                    columns={this.state.columnsForCompanyAddress}
                    rowGetter={this.getAddressInGrid2}
                    rowsCount={this.state.rowsForReactDataGrid.length}
                    minHeight={this.state.caGridSize}
                    minWidth={this.state.caGridWidth}
                    enableCellSelect
                    onCellSelected={this.getRowIDForCompanyAddress}
                    showCheckbox={false}
                    rowSelection={{
                      showCheckbox: false,
                      selectBy: {
                        indexes: this.state.currentSelectedIndexForCurrentAddress
                      }
                    }}
                    enableRowSelect={false}
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('company data', state.companyData);
  // console.log(state.employee.currentEmployee);
  // console.log('Job Title = ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    companyData: state.companyData.companyData,
    auditData: state.companyData.auditData,
    companyInfo: state.employee.currentEmployee,
    masterInfo: state.masterData.currentMasterData,
    addressInGrid: state.employee.addressInGrid,
    addressInGrid2: state.employee.addressInGrid2,
    totalAddressInGridonLoad: state.employee.totalAddressInGridonLoad,
    currentEmployee: state.employee.currentEmployee
  };
}

export default connect(mapStateToProps)(CompanyInfo);

import React from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router';
import moment from 'moment';
import CustomModal from './CustomModal';
import EmptyRowsView from './EmptyRowsView';
import PublicHolidaysForm from './PublicHolidaysModalForm';
import { updateAuditInfo } from '../../services/Audit.service';
import { upPublicHolidaysData } from '../../services/PublicHolidays.service';
import { updatePublicHolidaysData } from '../../actions/PublicHolidaysActions';
import { updatePublicHolidaysAuditData } from '../../actions/AuditActions';
import AuditTable from './AuditTable';

class PublicHolidays extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.rowGetterForPublicHolidays = this.rowGetterForPublicHolidays.bind(this);
    this.getRowIdForPublicHolidays = this.getRowIdForPublicHolidays.bind(this);
    this.closeForPublicHolidays = this.closeForPublicHolidays.bind(this);
    this.submitForPublicHolidays = this.submitForPublicHolidays.bind(this);
    this.openAddForPublicHolidays = this.openAddForPublicHolidays.bind(this);
    this.handleEditForPublicHolidays = this.handleEditForPublicHolidays.bind(this);
    this.closePublicHolidaysAudit = this.closePublicHolidaysAudit.bind(this);
    this.openPublicHolidaysAudit = this.openPublicHolidaysAudit.bind(this);
    this.state = {
      publicHolidaysrows: [],
      publicHolidaysAuditRows: [],
      publicHolidaysGridHeight: 35,
      currentSelectedIndexForPublicHolidays: [-1],
      formTypeForPublicHolidays: undefined,
      currentGridDataObjectForPublicHolidays: {},
      showingForPublicHolidays: false,
      publicHolidaysAuditIsOpen: false,
      publicHolidayscols: [{ key: 'company', name: 'Company' }, { key: 'country', name: 'Country' }, { key: 'city', name: 'City' }, { key: 'holidayDescription', name: 'Holiday Description' }, { key: 'date', name: 'Date' }, { key: 'createdBy', name: 'Created By' }, { key: 'createdDate', name: 'Created Date' }, { key: 'approvedBy', name: 'Approved By' }, { key: 'approvedDate', name: 'Approved Date' }],
      publicHolidaysAuditColumns: [{ accessor: 'company', Header: 'Company' }, { accessor: 'country', Header: 'Country' }, { accessor: 'city', Header: 'city' }, { accessor: 'holidayDescription', Header: 'Holiday Description' }, { accessor: 'date', Header: 'Date' }, { accessor: 'createdBy', Header: 'Created By' }, { accessor: 'createdDate', Header: 'Created Date' }, { accessor: 'approvedBy', Header: 'Approved By' }, { accessor: 'approvedDate', Header: 'Approved Date' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }]
    };
  }

  componentWillReceiveProps(newprops) {
    console.log('newprops', newprops);
    const publicHolidaysRowSize = (newprops.publicHolidaysInfo.publicHolidays.length + 1) * 35;
    this.setState({ publicHolidaysGridHeight: publicHolidaysRowSize });
    console.log(this.state.publicHolidaysGridHeight);
    const newRowsForPublicHolidays = Object.assign([], newprops.publicHolidaysInfo.publicHolidays);
    this.setState({ publicHolidaysrows: newRowsForPublicHolidays.reverse() });
    console.log(this.state.publicHolidaysrows);
    const publicHolidaysFormattedData = newprops.auditData.publicHolidays.map((data) => this.getFormattedDate(data));
    this.setState({ publicHolidaysAuditRows: publicHolidaysFormattedData });
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
  getRowIdForPublicHolidays(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    console.log(rowID);
    this.setState({ currentSelectedIndexForPublicHolidays: rowID });
    console.log(this.state.currentSelectedIndexForPublicHolidays);
    console.log(this.state.publicHolidaysrows);
    const object = this.state.publicHolidaysrows[temp];
    console.log(this.state.publicHolidaysrows[temp]);
    object.uniqueID = temp;
    console.log(object);
    // this.setState({ currentGridDataObjectForPublicHolidays: object }, () => {
    //   console.log(this.state.currentGridDataObjectForPublicHolidays);
    // });
    this.setState({ currentGridDataObjectForPublicHolidays: object });
    console.log(this.state.currentGridDataObjectForPublicHolidays);
  }
  rowGetterForPublicHolidays(parameter) {
    console.log(parameter);
    console.log(this.state.publicHolidaysrows[parameter], 'value ff');
    return this.state.publicHolidaysrows[parameter];
  }
  toggleElement(elementID) {
    // window.dispatchEvent(new Event('resize'));
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    // const y = document.getElementById(actionsId);
    // y.classList.toggle('actionDisable');
  }
  openAddForPublicHolidays() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ formTypeForPublicHolidays: 'add' });
    this.setState({ currentGridDataObjectForPublicHolidays: {} });
    this.setState({ showingForPublicHolidays: true });
  }
  handleEditForPublicHolidays() {
    console.log(this.state.currentGridDataObjectForPublicHolidays);
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForPublicHolidays.company) {
      this.setState({ formTypeForPublicHolidays: 'edit' });
      const editData = this.state.currentGridDataObjectForPublicHolidays;
      console.log('editData is: ', editData);
      this.setState({ showingForPublicHolidays: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  submitForPublicHolidays(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.companyField, data.countryField, data.cityField, data.holidayDescriptionField, data.dateField, data.createdByField, data.createdDateField, data.approvedByField, data.approvedDateField, data.insertedByField, data.insertedDateField];
    const values = [data.company, data.country, data.city, data.holidayDescription, data.date, data.createdBy, data.createdDate, data.approvedBy, data.approvedDate, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updatePublicHolidaysData({ value: values, field: fields, type: hiddenType })
      );
      this.props.dispatch(
        updatePublicHolidaysAuditData({ value: values, field: fields })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePublicHolidaysData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
      this.props.dispatch(
        updatePublicHolidaysAuditData({ value: values, field: fields })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForPublicHolidays: -1 });
    this.setState({ currentGridDataObjectForPublicHolidays: {} });
    this.setState({ showingForPublicHolidays: false });
  }
  closeForPublicHolidays() {
    this.setState({ currentSelectedIndexForPublicHolidays: -1 });
    this.setState({ currentGridDataObjectForPublicHolidays: {} });
    this.setState({ showingForPublicHolidays: false });
  }
  closePublicHolidaysAudit() {
    this.setState({ publicHolidaysAuditIsOpen: false });
  }
  openPublicHolidaysAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ publicHolidaysAuditIsOpen: true });
  }
  save() {
    console.log(this.props.publicHolidaysInfo);
    upPublicHolidaysData(this.props.publicHolidaysInfo, false, this.props.dispatch);
    updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
  }
  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="toggler active" id="PublicHolidays" >
            <div className="toggler-bar js-toggler-bar" >
              <h2 className="toggler-title mgn-left">Public Holidays</h2>
              <div className="actionEnable" >
                <ul className="box-actions" >
                  <li>
                    <a onClick={this.openAddForPublicHolidays}>
                      <i className="fas fa-plus addIco" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleEditForPublicHolidays}>
                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.openPublicHolidaysAudit}>
                      <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                    </a>
                  </li>
                  <li>
                    <Link to={`/Help/${'PBLHLD000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                  </li>
                </ul>
              </div>
              <span className="box-filter-arrow" onClick={() => this.toggleElement('PublicHolidays')} />
            </div>
            <div className="toggler-content">
              <div className="box-content">
                <div className="box-tab active">
                  <ReactDataGrid
                    className="tableWidth"
                    columns={this.state.publicHolidayscols}
                    rowGetter={this.rowGetterForPublicHolidays}
                    rowsCount={this.state.publicHolidaysrows.length}
                    minHeight={this.state.publicHolidaysGridHeight}
                    enableCellSelect
                    onCellSelected={this.getRowIdForPublicHolidays}
                    showCheckbox={false}
                    emptyRowsView={EmptyRowsView}
                    rowSelection={{
                      showCheckbox: false,
                      selectBy: {
                        indexes: this.state.currentSelectedIndexForPublicHolidays
                      }
                    }}
                    enableRowSelect={false}
                  />
                  <CustomModal Form={<PublicHolidaysForm formType={this.state.formTypeForPublicHolidays} data={this.state.currentGridDataObjectForPublicHolidays} closeEvent={this.closeForPublicHolidays} submitEvent={this.submitForPublicHolidays} />} show={this.state.showingForPublicHolidays} />
                  <CustomModal Form={<AuditTable headerName={'Public Holidays'} auditData={this.state.publicHolidaysAuditRows} auditColumns={this.state.publicHolidaysAuditColumns} close={this.closePublicHolidaysAudit} />} show={this.state.publicHolidaysAuditIsOpen} />
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
  console.log('Data ', state);
  return { publicHolidaysInfo: state.publicHolidaysReducer.publicHolidaysInfo, masterInfo: state.masterData.currentMasterData, auditData: state.auditTrail.currentEmployee };
}

export default connect(mapStateToProps)(PublicHolidays);


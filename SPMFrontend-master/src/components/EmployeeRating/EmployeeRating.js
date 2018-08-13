import React from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import CustomModal from './CustomModal';
import EmptyRowsView from './EmptyRowsView';
import IndividualGoals from './IndividualGoalsModalForm';
import KnowledgeManagement from './KnowledgeManagementModalForm';
// import { updateAuditInfo } from '../../services/Audit.service';
// import { updatePerformanceManagementAuditData } from '../../actions/AuditActions';
import { upPerformanceManagementData } from '../../services/PerformanceManagement.service';
import { updatePerformanceManagementData } from '../../actions/PerformanceManagementActions';
import './EmployeeRating.scss';

class EmployeeRating extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.onDrop = this.onDrop.bind(this);
    //Individual Goals
    this.handleEditForIndividualGoals = this.handleEditForIndividualGoals.bind(this);
    this.rowsGetterForIndividualGoals = this.rowsGetterForIndividualGoals.bind(this);
    this.getRowIdForIndividualGoals = this.getRowIdForIndividualGoals.bind(this);
    this.closeForIndividualGoals = this.closeForIndividualGoals.bind(this);
    this.submitForIndividualGoals = this.submitForIndividualGoals.bind(this);
    this.openIndividualGoalsAudit = this.openIndividualGoalsAudit.bind(this);
    this.closeIndividualGoalsAudit = this.closeIndividualGoalsAudit.bind(this);
    //Knowledge Management
    this.handleEditForKnowledgeManagement = this.handleEditForKnowledgeManagement.bind(this);
    this.rowGetterForKnowledgeManagement = this.rowGetterForKnowledgeManagement.bind(this);
    this.getRowIdForKnowledgeManagement = this.getRowIdForKnowledgeManagement.bind(this);
    this.closeForKnowledgeManagement = this.closeForKnowledgeManagement.bind(this);
    this.submitForKnowledgeManagement = this.submitForKnowledgeManagement.bind(this);
    this.openKnowledgeManagementAudit = this.openKnowledgeManagementAudit.bind(this);
    this.closeKnowledgeManagementAudit = this.closeKnowledgeManagementAudit.bind(this);
    this.state = {
      overallRating: 0,
      acceptedFile: [],
      rejectedFile: [],
      rowsForIndividualGoals: [],
      rowsForKnowledgeManagement: [],
      individualGoalsAuditRows: [],
      knowledgeManagementAuditRows: [],
      individualGoalsGridHeight: 35,
      knowledgeManagementGridHeight: 35,
      currentSelectedIndexForIndividualGoals: [-1],
      currentSelectedIndexForKnowledgeManagement: [-1],
      scrollPosition: undefined,
      formTypeForIndividualGoals: undefined,
      formTypeForKnowledgeManagement: undefined,
      currentGridDataObjectForIndividualGoals: {},
      currentGridDataObjectForKnowledgeManagement: {},
      showingForIndividualGoals: false,
      showingForKnowledgeManagement: false,
      individualGoalsAuditIsOpen: false,
      knowledgeManagementAuditIsOpen: false,
      columnsForIndividualGoals: [{ key: 'goalText', name: 'Goal Text' }, { key: 'startDate', name: 'Start Date' }, { key: 'endDate', name: 'End Date' }, { key: 'expectedOutcome', name: 'Expected Outcome' }, { key: 'weightage', name: 'Weightage(%)' }, { key: 'addedBy', name: 'Added By' }, { key: 'performanceRating', name: 'Performance Rating' }, { key: 'comments', name: 'Self-Appraisal' }],
      columnsForKnowledgeManagement: [{ key: 'goalText', name: 'Goal Text' }, { key: 'startDate', name: 'Start Date' }, { key: 'endDate', name: 'End Date' }, { key: 'expectedOutcome', name: 'Expected Outcome' }, { key: 'weightage', name: 'Weightage(%)' }, { key: 'addedBy', name: 'Added By' }, { key: 'performanceRating', name: 'Performance Rating' }, { key: 'comments', name: 'Self-Appraisal' }],
      individualGoalsAuditColumns: [{ accessor: 'goalText', Header: 'Goal Text' }, { accessor: 'startDate', Header: 'Start Date' }, { accessor: 'endDate', Header: 'End Date' }, { accessor: 'expectedOutcome', Header: 'Expected Outcome' }, { accessor: 'weightage', Header: 'Weightage(%)' }, { accessor: 'addedBy', Header: 'Added By' }, { accessor: 'performanceRating', Header: 'Performance Rating' }, { accessor: 'comments', Header: 'Self-Appraisal' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }],
      knowledgeManagementAuditColumns: [{ accessor: 'goalText', Header: 'Goal Text' }, { accessor: 'startDate', Header: 'Start Date' }, { accessor: 'endDate', Header: 'End Date' }, { accessor: 'expectedOutcome', Header: 'Expected Outcome' }, { accessor: 'weightage', Header: 'Weightage(%)' }, { accessor: 'addedBy', Header: 'Added By' }, { accessor: 'performanceRating', Header: 'Performance Rating' }, { accessor: 'comments', Header: 'Self-Appraisal' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Inserted Date' }]
    };
  }
  componentWillReceiveProps(newprops) {
    const individualGoalsRowSize = (newprops.performanceManagementInfo.goalSettingScreen.individualGoals.length + 1) * 35;
    const knowledgeManagementRowSize = (newprops.performanceManagementInfo.goalSettingScreen.knowledgeManagement.length + 1) * 35;
    this.setState({ individualGoalsGridHeight: individualGoalsRowSize });
    this.setState({ knowledgeManagementGridHeight: knowledgeManagementRowSize });
    const newRowsForIndividualGoals = Object.assign([], newprops.performanceManagementInfo.goalSettingScreen.individualGoals);
    this.setState({ rowsForIndividualGoals: newRowsForIndividualGoals });
    let overall = {};
    console.log(this.state.overallRating);
    newRowsForIndividualGoals.map((values, index) => {
      overall = values;
      const rating = (overall.expectedOutcome + overall.weightage) / 100;
      this.state.overallRating += rating;
      return index;
    });
    const newRowForKnowledgeManagement = Object.assign([], newprops.performanceManagementInfo.goalSettingScreen.knowledgeManagement);
    this.setState({ rowsForKnowledgeManagement: newRowForKnowledgeManagement });
    console.log(newRowForKnowledgeManagement);
    let over = {};
    newRowForKnowledgeManagement.map((values, index) => {
      over = values;
      const rating = (over.expectedOutcome + over.weightage) / 100;
      this.state.overallRating += rating;
      console.log(this.state.overallRating);
      return index;
    });
    // const individualGoalsFormattedData = newprops.auditData.goalSettingScreen.individualGoals.map((data) => this.getFormattedDate(data));
    // this.setState({ individualGoalsAuditRows: individualGoalsFormattedData });
    // const knowledgeManagementFormattedData = newprops.auditData.goalSettingScreen.knowledgeManagement.map((data) => this.getFormattedDate(data));
    // this.setState({ knowledgeManagementAuditRows: knowledgeManagementFormattedData });
  }
  componentDidUpdate() {
    window.scrollTo(0, this.state.scrollPosition);
  }
  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ scrollPosition: window.scrollY });
    console.log(acceptedFiles, rejectedFiles);
    this.setState({ acceptedFile: acceptedFiles });
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
  getRowIdForIndividualGoals(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    console.log(rowID);
    this.setState({ currentSelectedIndexForIndividualGoals: rowID });
    console.log(this.state.currentSelectedIndexForIndividualGoals);
    console.log(this.state.rowsForIndividualGoals);
    const object = this.state.rowsForIndividualGoals[temp];
    console.log(this.state.rowsForIndividualGoals[temp]);
    object.uniqueID = temp;
    console.log(object);
    this.setState({ currentGridDataObjectForIndividualGoals: object });
    console.log(this.state.currentGridDataObjectForIndividualGoals);
  }
  getRowIdForKnowledgeManagement(data) {
    this.setState({ scrollPosition: window.scrollY });
    console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForKnowledgeManagement: rowID });
    console.log(this.state.currentSelectedIndexForKnowledgeManagement);
    console.log(this.state.rowsForKnowledgeManagement);
    const object = this.state.rowsForKnowledgeManagement[temp];
    console.log(this.state.rowsForKnowledgeManagement[temp]);
    object.uniqueID = temp;
    console.log(object);
    this.setState({ currentGridDataObjectForKnowledgeManagement: object }, () => {
      console.log(this.state.currentGridDataObjectForKnowledgeManagement);
    });
    this.setState({ currentGridDataObjectForKnowledgeManagement: object });
    console.log(this.state.currentGridDataObjectForKnowledgeManagement);
  }
  // addedData(data) {
  //   console.log(data);
  // }
  toggleElement(elementID) {
    // window.dispatchEvent(new Event('resize'));
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    // const y = document.getElementById(actionsId);
    // y.classList.toggle('actionDisable');
  }
  rowsGetterForIndividualGoals(parameter) {
    console.log(parameter);
    console.log(this.state.rowsForIndividualGoals[parameter], 'value ff');
    return this.state.rowsForIndividualGoals[parameter];
  }
  rowGetterForKnowledgeManagement(parameter) {
    console.log(this.state.rowsForKnowledgeManagement[parameter]);
    return this.state.rowsForKnowledgeManagement[parameter];
  }
  handleEditForIndividualGoals() {
    console.log(this.state.currentGridDataObjectForIndividualGoals);
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForIndividualGoals.goalText) {
      this.setState({ formTypeForIndividualGoals: 'edit' });
      const editData = this.state.currentGridDataObjectForIndividualGoals;
      console.log('editData is: ', editData);
      this.setState({ showingForIndividualGoals: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  handleEditForKnowledgeManagement() {
    this.setState({ scrollPosition: window.scrollY });
    if (this.state.currentGridDataObjectForKnowledgeManagement.goalText) {
      this.setState({ formTypeForKnowledgeManagement: 'edit' });
      const editData = this.state.currentGridDataObjectForKnowledgeManagement;
      console.log('editData is: ', editData);
      this.setState({ showingForKnowledgeManagement: true });
    } else {
      alert('Please select a row to edit');
    }
  }
  submitForIndividualGoals(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.performanceRatingField, data.commentsField, data.insertedByField, data.insertedDateField];
    const values = [data.performanceRating, data.comments, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updatePerformanceManagementData({ value: values, field: fields, type: hiddenType })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePerformanceManagementData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForIndividualGoals: -1 });
    this.setState({ currentGridDataObjectForIndividualGoals: {} });
    this.setState({ showingForIndividualGoals: false });
  }
  submitForKnowledgeManagement(data, hiddenType) {
    console.log(data, hiddenType);
    const fields = [data.goalTextField, data.startDateField, data.endDateField, data.expectedOutcomeField, data.addedByField, data.weightageField, data.performanceYearField, data.performanceRatingField, data.commentsField, data.insertedByField, data.insertedDateField];
    const values = [data.goalText, data.startDate, data.endDate, data.expectedOutcome, data.addedBy, data.weightage, data.performanceYear, data.performanceRating, data.comments, data.insertedBy, data.insertedDate];
    if (hiddenType === 'add') {
      console.log(values, fields);
      this.props.dispatch(
        updatePerformanceManagementData({ value: values, field: fields, type: hiddenType })
      );
    }
    if (hiddenType === 'edit') {
      const rowID = data.id;
      console.log(values, fields);
      this.props.dispatch(
        updatePerformanceManagementData({ value: values, field: fields, id: rowID, type: hiddenType })
      );
    }
    this.save();
    this.setState({ currentSelectedIndexForKnowledgeManagement: -1 });
    this.setState({ currentGridDataObjectForKnowledgeManagement: {} });
    this.setState({ showingForKnowledgeManagement: false });
  }
  save() {
    console.log(this.props.performanceManagementInfo);
    setTimeout(() => {
      upPerformanceManagementData(this.props.performanceManagementInfo, false, this.props.dispatch);
      // updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
    }, 0);
  }
  closeForIndividualGoals() {
    this.setState({ currentSelectedIndexForIndividualGoals: -1 });
    this.setState({ currentGridDataObjectForIndividualGoals: {} });
    this.setState({ showingForIndividualGoals: false });
  }
  closeForKnowledgeManagement() {
    this.setState({ currentSelectedIndexForKnowledgeManagement: -1 });
    this.setState({ currentGridDataObjectForKnowledgeManagement: {} });
    this.setState({ showingForKnowledgeManagement: false });
  }
  closeIndividualGoalsAudit() {
    this.setState({ individualGoalsAuditIsOpen: false });
  }
  closeKnowledgeManagementAudit() {
    this.setState({ knowledgeManagementAuditIsOpen: false });
  }
  openIndividualGoalsAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ individualGoalsAuditIsOpen: true });
  }
  openKnowledgeManagementAudit() {
    this.setState({ scrollPosition: window.scrollY });
    this.setState({ knowledgeManagementAuditIsOpen: true });
  }
  render() {
    const fullWidth = {
      width: '100%'
    };
    return (
      <div className="container">
        <div className="box">
          <ul className="box-headings js-tabs">
            <li className="box-heading active">
              <Row style={fullWidth}>
                <Col lg={6} md={6}><h2 className="box-title">Goal Setting Screen</h2></Col>
                <Col lg={6} md={6}><h2 className="box-title right-title">Overall-Rating: {this.state.overallRating}</h2></Col>
              </Row>
              {/* <h2 className="box-title">Goal Setting Screen Overall-Rating: {this.state.overallRating}</h2> */}
            </li>
          </ul>
          <div className="box-content">
            <div className="box-tab active">
              <div className="box-inner--no-pad">
                <div className="toggler active" id="individualGoals">
                  <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                    <h2 className="toggler-title">
                      Individual Goals
                    </h2>
                    <div className="actionEnable" >
                      <ul className="box-actions" >
                        <li>
                          <a onClick={this.handleEditForIndividualGoals}>
                            <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                          </a>
                        </li>
                        {/* <li>
                          <a onClick={this.openIndividualGoalsAudit}>
                            <i className="fa fa-history historyIco" aria-hidden="true" title="History" />
                          </a>
                        </li> */}
                        <li>
                          <Link to={`/Help/${'PMGSIG000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                        </li>
                      </ul>
                    </div>
                    <span className="box-filter-arrow" onClick={() => this.toggleElement('individualGoals')} />
                  </div>
                  <div className="toggler-content">
                    <div className="box-content">
                      <div className="box-tab active">
                        <div className="box-inner--no-pad">
                          <div className="grid-wrapper individualGoalsGrid">
                            <div>
                              <ReactDataGrid
                                columns={this.state.columnsForIndividualGoals}
                                rowGetter={this.rowsGetterForIndividualGoals}
                                rowsCount={this.state.rowsForIndividualGoals.length}
                                minHeight={this.state.individualGoalsGridHeight}
                                enableCellSelect
                                onCellSelected = {this.getRowIdForIndividualGoals}
                                showCheckbox = {false}
                                emptyRowsView={EmptyRowsView}
                                rowSelection={{
                                  showCheckbox: false,
                                  selectBy: {
                                    indexes: this.state.currentSelectedIndexForIndividualGoals
                                  }
                                }}
                                enableRowSelect ={false}
                              />
                            </div>
                            <CustomModal Form={<IndividualGoals formType={this.state.formTypeForIndividualGoals} data={this.state.currentGridDataObjectForIndividualGoals} closeEvent={this.closeForIndividualGoals} submitEvent={this.submitForIndividualGoals} />} show={this.state.showingForIndividualGoals} />
                            {/* <CustomModal Form={<AuditTable headerName={'Individual Goals'} auditData={this.state.individualGoalsAuditRows} auditColumns={this.state.individualGoalsAuditColumns} close={this.closeIndividualGoalsAudit} />} show={this.state.individualGoalsAuditIsOpen} /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="toggler active" id="knowledgeManagement">
            <div className="toggler-bar js-toggler-bar" >
              <h2 className="toggler-title">
                Knowledge Management
              </h2>
              <div className="actionEnable" >
                <ul className="box-actions" >
                  <li>
                    <a onClick={this.handleEditForKnowledgeManagement}>
                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                    </a>
                  </li>
                  {/* <li>
                    <a onClick={this.openKnowledgeManagementAudit}>
                      <i className="fa fa-history historyIco" aria-hidden="true" title="History" />
                    </a>
                  </li> */}
                  <li>
                    <Link to={`/Help/${'PMGSKM000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                  </li>
                </ul>
              </div>
              <span className="box-filter-arrow" onClick={() => this.toggleElement('knowledgeManagement')} />
            </div>
            <div className="toggler-content">
              <div className="box-content">
                <div className="box-tab active">
                  <div className="box-inner--no-pad">
                    <div className="grid-wrapper nationalIdInfoGrid">
                      <div>
                        <ReactDataGrid
                          columns={this.state.columnsForKnowledgeManagement}
                          rowGetter={this.rowGetterForKnowledgeManagement}
                          rowsCount={this.state.rowsForKnowledgeManagement.length}
                          minHeight={this.state.knowledgeManagementGridHeight}
                          enableCellSelect
                          onCellSelected = {this.getRowIdForKnowledgeManagement}
                          showCheckbox = {false}
                          emptyRowsView={EmptyRowsView}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.currentSelectedIndexForKnowledgeManagement
                            }
                          }}
                          enableRowSelect ={false}
                        />
                      </div>
                      <CustomModal Form={<KnowledgeManagement formType={this.state.formTypeForKnowledgeManagement} data={this.state.currentGridDataObjectForKnowledgeManagement} closeEvent={this.closeForKnowledgeManagement} submitEvent={this.submitForKnowledgeManagement} />} show={this.state.showingForKnowledgeManagement} />
                      {/* <CustomModal Form={<AuditTable headerName={'Knowledge Management'} auditData={this.state.knowledgeManagementAuditRows} auditColumns={this.state.knowledgeManagementAuditColumns} close={this.closeKnowledgeManagementAudit} />} show={this.state.knowledgeManagementAuditIsOpen} /> */}
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
              <h2 className="box-title">Attach Documents(Optional)</h2>
            </li>
          </ul>
          <section>
            <div className="dropzone">
              <Dropzone
                className="dropzone"
                multiple
                onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
              >
                <p>Click here to upload documents.</p>
              </Dropzone>
              <aside>
                <ul>
                  {this.state.acceptedFile.map(data =>
                    <li>{data.name}</li>
                  )}
                </ul>
              </aside>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('Data ', state);
  return { performanceManagementInfo: state.performanceManagementReducer.performanceManagementInfo, currentEmployee: state.employee.currentEmployee, masterInfo: state.masterData.currentMasterData, auditData: state.auditTrail.currentEmployee };
}

export default connect(mapStateToProps)(EmployeeRating);

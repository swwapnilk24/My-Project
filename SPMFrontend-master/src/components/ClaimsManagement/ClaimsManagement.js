import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import CommentSave from './CommentSave';
import EnrollmentSave from './EnrollmentSave';
import CustomModal from '../JobInfo/CustomModal';
import './ClaimsManagement.scss';
import { approveClaims, approveEnrollments } from '../../actions/ClaimsManagementActions';

class ClaimsManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsForBranchesGrid: [{ key: 'claimType', name: 'Type' },
      { key: 'amount', name: 'Amount' },
      { key: 'currency', name: 'Currency' },
      { key: 'frequency', name: 'Frequency' },
      { key: 'requestedDate', name: 'Requested Date' },
      { key: 'status', name: 'Status' }],
      columnsForCommentGrid: [{ key: 'claimType', name: 'Type' },
      { key: 'amount', name: 'Amount' },
      { key: 'currency', name: 'Currency' },
      { key: 'frequency', name: 'Frequency' },
      { key: 'requestedDate', name: 'Requested Date' },
      { key: 'status', name: 'Status' },
      { key: 'comment', name: 'Comment' }],
      columnsForEnrollmentsGrid: [{ key: 'enrollmentType', name: 'Type' },
      { key: 'startDate', name: 'Start Date' },
      { key: 'endDate', name: 'End Date' },
      { key: 'amount', name: 'Amount' },
      { key: 'frequency', name: 'Frequency' },
      { key: 'status', name: 'Status' }],
      columnsForEnrollmentCommentsGrid: [{ key: 'enrollmentType', name: 'Type' },
      { key: 'startDate', name: 'Start Date' },
      { key: 'endDate', name: 'End Date' },
      { key: 'amount', name: 'Amount' },
      { key: 'frequency', name: 'Frequency' },
      { key: 'status', name: 'Status' },
      { key: 'comment', name: 'Comment' }],
      selectedApproveClaims: [],
      selectedRejectClaims: [],
      selectedApproveEnrollments: [],
      saveCommentIsOpen: false,
      saveEnrollmentDataIsOpen: false,
      approveClaimRows: [],
      rejectClaimRows: [],
      approveEnrollmentRows: [],
      rejectEnrollmentRows: [],
      drop_enrollmentType_names: []
    };
    this.submitComment = this.submitComment.bind(this);
    this.submitEnrollments = this.submitEnrollments.bind(this);
    this.closeTimeOffCalendar = this.closeTimeOffCalendar.bind(this);
    this.closeTimeOffCalendarNew = this.closeTimeOffCalendarNew.bind(this);
  }
  onRowsSelectedApproveClaims = (rows) => {
    this.setState({ selectedApproveClaims: this.state.selectedApproveClaims.concat(rows.map(r => r.rowIdx)) });
  };

  onRowsDeselectedApproveClaims = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedApproveClaims: this.state.selectedApproveClaims.filter(i => rowIndexes.indexOf(i) === -1) });
  };

  onRowsSelectedApproveEnrollments = (rows) => {
    this.setState({ selectedApproveEnrollments: this.state.selectedApproveEnrollments.concat(rows.map(r => r.rowIdx)) });
  };

  onRowsDeselectedApproveEnrollments = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedApproveEnrollments: this.state.selectedApproveEnrollments.filter(i => rowIndexes.indexOf(i) === -1) });
  };

  // onRowsSelectedApproveEnrollments = (rows) => {
  //   this.setState({ selectedRejectClaims: this.state.selectedRejectClaims.concat(rows.map(r => r.rowIdx)) });
  // };

  // onRowsDeselectedRejectClaims = (rows) => {
  //   const rowIndexes = rows.map(r => r.rowIdx);
  //   this.setState({ selectedRejectClaims: this.state.selectedRejectClaims.filter(i => rowIndexes.indexOf(i) === -1) });
  // };

  approveEnrollment = (rows, data, type) => {
    const EnrollmentsIndexArray = this.state.selectedApproveEnrollments;
    const EnrollmentsEmpArray = [];
    for (let i = 0; i < EnrollmentsIndexArray.length; i += 1) {
      const EnrollmentsIndexArrayObject = EnrollmentsIndexArray[i];
      const currentEmployee = rows[EnrollmentsIndexArrayObject];
      currentEmployee.approvalDate = new Date();
      currentEmployee.approvedBy = 'sp';
      currentEmployee.status = type;
      currentEmployee.comment = data.comment;
      currentEmployee.amount = data.amount;
      currentEmployee.startDate = data.startDate;
      currentEmployee.endDate = data.endDate;
      EnrollmentsEmpArray.push(currentEmployee);
    }
    this.props.dispatch(approveEnrollments({ result: EnrollmentsEmpArray }));
  };

  approveClaim = (rows, comment, type) => {
    const claimsIndexArray = this.state.selectedApproveClaims;
    const claimEmpArray = [];
    for (let i = 0; i < claimsIndexArray.length; i += 1) {
      const claimsIndexArrayObject = claimsIndexArray[i];
      const currentEmployee = rows[claimsIndexArrayObject];
      currentEmployee.approvalDate = new Date();
      currentEmployee.approvedBy = 'sp';
      currentEmployee.status = type;
      currentEmployee.comment = comment;
      claimEmpArray.push(currentEmployee);
    }
    this.props.dispatch(approveClaims({ result: claimEmpArray }));
  };

  // rejectClaim = (rows, comment) => {
  //   const claimsIndexArray = this.state.selectedRejectClaims;
  //   const claimEmpArray = [];
  //   for (let i = 0; i < claimsIndexArray.length; i += 1) {
  //     const claimsIndexArrayObject = claimsIndexArray[i];
  //     const currentEmployee = rows[claimsIndexArrayObject];
  //     currentEmployee.approvalDate = new Date();
  //     currentEmployee.approvedBy = 'sp';
  //     currentEmployee.status = 'Pending';
  //     currentEmployee.comment = comment;
  //     claimEmpArray.push(currentEmployee);
  //   }
  //   this.props.dispatch(rejectClaims({ result: claimEmpArray }));
  // };
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  submitComment(data) {
    if (this.state.isSet === 'Approved') {
      this.approveClaim(this.state.approveClaimRows, data, 'Approved');
    }
    if (this.state.isSet === 'Rejected') {
      // this.rejectClaim(this.state.rejectClaimRows, data);
      this.approveClaim(this.state.approveClaimRows, data, 'Rejected');
    }
    this.setState({ saveCommentIsOpen: false });
  }
  submitEnrollments(data) {
    console.log(this.state.isSet, 'Approvedsubmit==');
    if (this.state.isSet === 'Approved') {
      this.approveEnrollment(this.state.approveEnrollmentRows, data, 'Approved');
    }
    if (this.state.isSet === 'Rejected') {
      // this.rejectClaim(this.state.rejectClaimRows, data);
      this.approveEnrollment(this.state.approveEnrollmentRows, data, 'Rejected');
    }
    this.setState({ saveEnrollmentDataIsOpen: false });
  }
  closeTimeOffCalendar() {
    this.setState({ saveCommentIsOpen: false });
  }
  saveCommentOpen(rowsApprovedClaims, rowsRejectedClaims, type) {
    const claimsApproveIndexArray = this.state.selectedApproveClaims;
    // const claimsIndexArray = this.state.selectedRejectClaims;
    if (claimsApproveIndexArray.length > 0 && type === 'Rejected') {
      this.setState({ approveClaimRows: rowsApprovedClaims });
      this.setState({ isSet: 'Rejected' });
      this.setState({ saveCommentIsOpen: true });
    } else if (claimsApproveIndexArray.length > 0 && type === 'Approved') {
      this.setState({ approveClaimRows: rowsApprovedClaims });
      this.setState({ isSet: 'Approved' });
      this.setState({ saveCommentIsOpen: true });
    } else {
      alert('Please Select a row');
    }
  }
  closeTimeOffCalendarNew() {
    this.setState({ saveEnrollmentDataIsOpen: false });
  }
  saveEnrollmentsCommentOpen(rowsApprovedEnrollments, rowsRejectedEnrollments, type) {
    const enrollmentsApproveIndexArray = this.state.selectedApproveEnrollments;
    // const claimsIndexArray = this.state.selectedRejectClaims;
    if (enrollmentsApproveIndexArray.length === 1 && type === 'Rejected') {
      this.setState({ approveEnrollmentRows: rowsApprovedEnrollments });
      this.setState({ isSet: 'Rejected' });
      this.setState({ saveEnrollmentDataIsOpen: true });
    } else if (enrollmentsApproveIndexArray.length === 1 && type === 'Approved') {
      this.setState({ approveEnrollmentRows: rowsRejectedEnrollments });
      this.setState({ isSet: 'Approved' });
      this.setState({ saveEnrollmentDataIsOpen: true });
    } else {
      alert('Please Select a row');
    }
  }

  render() {
    // Storing DropdownNames from masterdata at Once to show it in datagrid
    if (this.props.masterInfo.length > 0) {
      this.props.masterInfo.map((obj) => {
        if (obj.masterDataType.code === 'ENROLLMENT TYPE') {
          this.state.drop_enrollmentType_names = obj.masterDataType.names;
        }
        return null;
      });
    }
    const myFilteredWorkers = this.props.ClaimsData;
    const approvedClaims = [];
    const rejectedClaims = [];
    const approvedEnrollments = [];
    const rejectedEnrollments = [];
    for (let k = 0; k < myFilteredWorkers.length; k += 1) {
      // inprocessClaims
      const inprocessClaimsInformationArray = myFilteredWorkers[k].benefits.claims.inprocessClaims;
      for (let i = 0; i < inprocessClaimsInformationArray.length; i += 1) {
        // const newObject = {};
        const currentEmployee = myFilteredWorkers[k];
        const inprocessClaimsInformation = inprocessClaimsInformationArray[i];
        const id = '_id';
        inprocessClaimsInformation.empObjectId = (currentEmployee) ? currentEmployee[id] : '';
        this.state.drop_enrollmentType_names.map((obj) => {
          if (obj.status === 'Active' && obj.code === inprocessClaimsInformation.claimType) {
            inprocessClaimsInformation.claimType = obj.name;
          }
          return null;
        });
        inprocessClaimsInformation.requestedDate = (inprocessClaimsInformation.requestedDate) ? moment(inprocessClaimsInformation.requestedDate).format('DD-MMM-YYYY') : '';
        inprocessClaimsInformation.comment = (inprocessClaimsInformation.comment) ? inprocessClaimsInformation.comment : '';
        inprocessClaimsInformation.claimObjectId = (inprocessClaimsInformation) ? inprocessClaimsInformation[id] : '';
        approvedClaims.push(inprocessClaimsInformation);
      }
      // processedClaims
      const processedClaimsInformationArray = myFilteredWorkers[k].benefits.claims.processedClaims;
      for (let i = 0; i < processedClaimsInformationArray.length; i += 1) {
        const currentEmployee = myFilteredWorkers[k];
        const processedClaimsInformation = processedClaimsInformationArray[i];
        const id = '_id';
        processedClaimsInformation.empObjectId = (currentEmployee) ? currentEmployee[id] : '';
        // processedClaimsInformation.claimType = 'test';
        this.state.drop_enrollmentType_names.map((obj) => {
          if (obj.status === 'Active' && obj.code === processedClaimsInformation.claimType) {
            processedClaimsInformation.claimType = obj.name;
          }
          return null;
        });
        processedClaimsInformation.requestedDate = (processedClaimsInformation.requestedDate) ? moment(processedClaimsInformation.requestedDate).format('DD-MMM-YYYY') : '';
        processedClaimsInformation.comment = (processedClaimsInformation.comment) ? processedClaimsInformation.comment : '';
        processedClaimsInformation.claimObjectId = (processedClaimsInformation) ? processedClaimsInformation[id] : '';
        rejectedClaims.push(processedClaimsInformation);
      }
      // inprocessEnrollments
      const inprocessEnrollmentsInformationArray = filter(myFilteredWorkers[k].benefits.enrollments, ['status', 'Pending']);
      for (let i = 0; i < inprocessEnrollmentsInformationArray.length; i += 1) {
        // const newObject = {};
        const currentEmployee = myFilteredWorkers[k];
        const inprocessEnrollmentsInformation = inprocessEnrollmentsInformationArray[i];
        const id = '_id';
        inprocessEnrollmentsInformation.empObjectId = (currentEmployee) ? currentEmployee[id] : '';
        this.state.drop_enrollmentType_names.map((obj) => {
          if (obj.status === 'Active' && obj.code === inprocessEnrollmentsInformation.enrollmentType) {
            inprocessEnrollmentsInformation.enrollmentType = obj.name;
          }
          return null;
        });
        inprocessEnrollmentsInformation.startDate = (inprocessEnrollmentsInformation.startDate) ? moment(inprocessEnrollmentsInformation.startDate).format('DD-MMM-YYYY') : '';
        inprocessEnrollmentsInformation.endDate = (inprocessEnrollmentsInformation.endDate) ? moment(inprocessEnrollmentsInformation.endDate).format('DD-MMM-YYYY') : '';
        inprocessEnrollmentsInformation.comment = (inprocessEnrollmentsInformation.comment) ? inprocessEnrollmentsInformation.comment : '';
        inprocessEnrollmentsInformation.enrollmentObjectId = (inprocessEnrollmentsInformation) ? inprocessEnrollmentsInformation[id] : '';
        approvedEnrollments.push(inprocessEnrollmentsInformation);
      }
      // processedEnrollments
      const processedEnrollmentsInformationArray = myFilteredWorkers[k].benefits.enrollments.filter(filterObject => filterObject.status !== 'Pending');
      for (let i = 0; i < processedEnrollmentsInformationArray.length; i += 1) {
        const currentEmployee = myFilteredWorkers[k];
        const processedEnrollmentsInformation = processedEnrollmentsInformationArray[i];
        const id = '_id';
        processedEnrollmentsInformation.empObjectId = (currentEmployee) ? currentEmployee[id] : '';
        // processedClaimsInformation.claimType = 'test';
        this.state.drop_enrollmentType_names.map((obj) => {
          if (obj.status === 'Active' && obj.code === processedEnrollmentsInformation.enrollmentType) {
            processedEnrollmentsInformation.enrollmentType = obj.name;
          }
          return null;
        });
        processedEnrollmentsInformation.startDate = (processedEnrollmentsInformation.startDate) ? moment(processedEnrollmentsInformation.startDate).format('DD-MMM-YYYY') : '';
        processedEnrollmentsInformation.endDate = (processedEnrollmentsInformation.endDate) ? moment(processedEnrollmentsInformation.endDate).format('DD-MMM-YYYY') : '';
        processedEnrollmentsInformation.comment = (processedEnrollmentsInformation.comment) ? processedEnrollmentsInformation.comment : '';
        processedEnrollmentsInformation.enrollmentObjectId = (processedEnrollmentsInformation) ? processedEnrollmentsInformation[id] : '';
        rejectedEnrollments.push(processedEnrollmentsInformation);
      }
    }
    console.log(approvedEnrollments, 'approvedClaims');
    const rowsApprovedClaims = approvedClaims;
    const rowGetterApproved = rowNumber => rowsApprovedClaims[rowNumber];
    const rowsRejectedClaims = rejectedClaims;
    const rowGetterRejected = rowNumber => rowsRejectedClaims[rowNumber];
    const rowsApprovedEnrollments = approvedEnrollments;
    const rowGetterApprovedEnrollments = rowNumber => rowsApprovedEnrollments[rowNumber];
    const rowsRejectedEnrollments = rejectedEnrollments;
    const rowGetterRejectedEnrollments = rowNumber => rowsRejectedEnrollments[rowNumber];

    return (
      <div className="row">
        <div className="col-xs-12 col-lg-12">
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
              <h2 className="box-title">Enrollments Management</h2>
            </li>

          </ul>
          <div className="box-content">

            <div className="row-no-padding">
              <div className="col-xs-12 col-lg-12 no-padding">

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="keyJobAttribute">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                        <h2 className="toggler-title-new">In-process Enrollments</h2>
                        <div id="keyJobAttributeToggle" className="toggleAction">
                          <ul className="box-actions" >
                            <li className="marge">
                              <input
                                type="button"
                                name="Submit"
                                id="submit"
                                value="Approve"
                                className="form-control btn-primary btn-primary1 custom-submit"
                                // onClick={() => this.approveClaim(rowsApprovedClaims)}
                                onClick={() => this.saveEnrollmentsCommentOpen(rowsApprovedEnrollments, rowsRejectedEnrollments, 'Approved')}
                              />
                            </li>
                            <li>
                              <input
                                type="button"
                                name="Submit"
                                id="submit"
                                value="Rejected"
                                className="form-control btn-primary btn-primary1 custom-submit"
                                onClick={() => this.saveEnrollmentsCommentOpen(rowsApprovedEnrollments, rowsRejectedEnrollments, 'Rejected')}
                              // onClick={() => this.rejectClaim(rowsRejectedClaims)}
                              />
                            </li>
                          </ul>
                        </div>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute')} />
                      </div>

                      <div className="toggler-content ji-padding-bottom">
                        <div id="kJASnackBar" className="snackBarStyle actionDisable">
                          {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForEnrollmentsGrid}
                          rowGetter={rowGetterApprovedEnrollments}
                          rowsCount={rowsApprovedEnrollments.length}
                          minHeight={200}
                          rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: true,
                            onRowsSelected: this.onRowsSelectedApproveEnrollments,
                            onRowsDeselected: this.onRowsDeselectedApproveEnrollments,
                            selectBy: {
                              indexes: this.state.selectedApproveEnrollments
                            }
                          }}
                        />
                      </div>

                    </div>
                  </div>
                </div>
                <CustomModal form={<EnrollmentSave approveEnrollmentRows={this.state.approveEnrollmentRows} selectedApproveEnrollments={this.state.selectedApproveEnrollments} isSet={this.state.isSet} submit={this.submitEnrollments} close={this.closeTimeOffCalendarNew} />} show={this.state.saveEnrollmentDataIsOpen} />

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="keyJobAttribute1">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                        <h2 className="toggler-title-new">Processed Enrollements</h2>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute1')} />
                      </div>

                      <div className="toggler-content ji-padding-bottom">
                        <div id="kJASnackBar" className="snackBarStyle actionDisable">
                          {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForEnrollmentCommentsGrid}
                          rowGetter={rowGetterRejectedEnrollments}
                          rowsCount={rowsRejectedEnrollments.length}
                          minHeight={300}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-12">
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
              <h2 className="box-title">Claims Management</h2>
            </li>

          </ul>
          <div className="box-content">

            <div className="row-no-padding">
              <div className="col-xs-12 col-lg-12 no-padding">

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="keyJobAttribute">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                        <h2 className="toggler-title-new">In-process Claims</h2>
                        <div id="keyJobAttributeToggle" className="toggleAction">
                          <ul className="box-actions" >
                            <li className="marge">
                              <input
                                type="button"
                                name="Submit"
                                id="submit"
                                value="Approve"
                                className="form-control btn-primary btn-primary1 custom-submit"
                                // onClick={() => this.approveClaim(rowsApprovedClaims)}
                                onClick={() => this.saveCommentOpen(rowsApprovedClaims, rowsRejectedClaims, 'Approved')}
                              />
                            </li>
                            <li>
                              <input
                                type="button"
                                name="Submit"
                                id="submit"
                                value="Rejected"
                                className="form-control btn-primary btn-primary1 custom-submit"
                                onClick={() => this.saveCommentOpen(rowsApprovedClaims, rowsRejectedClaims, 'Rejected')}
                              // onClick={() => this.rejectClaim(rowsRejectedClaims)}
                              />
                            </li>
                          </ul>
                        </div>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute')} />
                      </div>

                      <div className="toggler-content ji-padding-bottom">
                        <div id="kJASnackBar" className="snackBarStyle actionDisable">
                          {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForBranchesGrid}
                          rowGetter={rowGetterApproved}
                          rowsCount={rowsApprovedClaims.length}
                          minHeight={200}
                          rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: true,
                            onRowsSelected: this.onRowsSelectedApproveClaims,
                            onRowsDeselected: this.onRowsDeselectedApproveClaims,
                            selectBy: {
                              indexes: this.state.selectedApproveClaims
                            }
                          }}
                        />
                      </div>

                    </div>
                  </div>
                </div>
                <CustomModal form={<CommentSave isSet={this.state.isSet} submit={this.submitComment} close={this.closeTimeOffCalendar} />} show={this.state.saveCommentIsOpen} />

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="keyJobAttribute1">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                        <h2 className="toggler-title-new">Processed Claims</h2>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute1')} />
                      </div>

                      <div className="toggler-content ji-padding-bottom">
                        <div id="kJASnackBar" className="snackBarStyle actionDisable">
                          {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForCommentGrid}
                          rowGetter={rowGetterRejected}
                          rowsCount={rowsRejectedClaims.length}
                          minHeight={400}
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
    );
  }
}

function mapStateToProps(state) {
  return {
    masterInfo: state.masterData.currentMasterData,
    ClaimsData: state.employee.myEmployees
  };
}

export default connect(mapStateToProps)(ClaimsManagement);

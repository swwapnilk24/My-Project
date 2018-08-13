/**
 * @file TimeOff Component.
 * @author Mahesh
 */
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import './TimeOff.scss';
// import DatePickerCustom from '../Compensation/datePickerCustom';
import CustomReactTable from '../JobInfo/CustomReactTable';
import CustomModal from '../JobInfo/CustomModal';
import CancelComments from './CancelComments';
import TimeOffCalendar from './TimeOffCalendarForm';
import TimeOffCalendarComments from './TimeOffCalendarComments';
import { updateTimeOff, approveorRejectTimeOff, updateTimeOffComments } from '../../actions/EmployeeActions';
import { updateNewEmployee } from '../../services/Employee.service';
import AuthorizedComponent from '../Routes/AuthorizedComponent';

class TimeOff extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.setTimeOffType = this.setTimeOffType.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDaysCount = this.getDaysCount.bind(this);
    this.displayTimeOffDays = this.displayTimeOffDays.bind(this);
    this.showTeamCalendar = this.showTeamCalendar.bind(this);
    this.showComments = this.showComments.bind(this);
    this.showCancelComments = this.showCancelComments.bind(this);
    this.showAllComments = this.showAllComments.bind(this);
    this.closeTimeOffCalendarComments = this.closeTimeOffCalendarComments.bind(this);
    this.closeTeamCalendar = this.closeTeamCalendar.bind(this);
    this.closeTimeOffCalendar = this.closeTimeOffCalendar.bind(this);
    this.closeComments = this.closeComments.bind(this);
    this.closeCancelComments = this.closeCancelComments.bind(this);
    this.submitTimeOffCalendar = this.submitTimeOffCalendar.bind(this);
    this.submitCancelComments = this.submitCancelComments.bind(this);
    this.state = {
      comments: '',
      timeOffType: '',
      index: '',
      flag: true,
      startDate: '',
      endDate: '',
      syncedWithServer: true,
      teamCalendarIsOpen: false,
      timeOffCalendarIsOpen: false,
      cancelCommentsIsOpen: false,
      commentsIsOpen: false,
      teamCalendarColumns: [{ accessor: 'name', Header: 'Name', minWidth: 178 }, { accessor: 'timeOffType', Header: 'Time Off Type', minWidth: 118 }, { accessor: 'startDate', Header: 'From', minWidth: 92 }, { accessor: 'endDate', Header: 'To', minWidth: 92 }, { id: 'comment', accessor: ({ comments }) => (comments.length > 1 ? <div className="Comment-Sec" onClick={() => this.showAllComments(comments)}>{comments[0].comment} <div className="comment-wrap"><div className="commentCount">{comments.length}</div><i className="fas fa-comments commentsIco" aria-hidden="true" title="Show all comments" /></div></div> : comments[0].comment), Header: 'Comments', minWidth: 204 }],
      commentsColumns: [{ accessor: 'role', Header: 'Name' }, { accessor: 'comment', Header: 'Comment' }],
      finalTeamCalendarColumns: [],
      teamCalendarRows: [],
      commentsRows: [],
      cancelRowId: '',
      showCommentsIsOpen: false
    };
  }
  componentWillReceiveProps(newProps) {
    console.log('time off new props', newProps);
    const teamCalendarFormattedData = newProps.currentEmployee.timeOff.timeOffOverview.myRequests.map((data) => this.getFormattedDate(data));
    this.setState({ teamCalendarRows: teamCalendarFormattedData.reverse() });
    const teamCalendarColumns = this.state.teamCalendarColumns.slice(0);
    console.log(teamCalendarColumns);
    const newData = {
      accessor: 'status',
      Header: 'Status',
      minWidth: 140,
      Cell: ({ index, value }) => (
        this.getActions(index, value)
      ),
      filterable: false
      // minWidth: '10%'
    };
    teamCalendarColumns.push(newData);
    this.setState({ finalTeamCalendarColumns: teamCalendarColumns });
  }
  getActions(index, value) {
    console.log(index, value);
    if (value === 'Approved') {
      return (
        <div className="row">
          <div className="col-lg-3 approveReject np-left">
            <Button disabled><i className="fas fa-check actionButtons" title="Approve" /></Button>
            <Button><i className="fas fa-times actionButtons" title="Reject" onClick={() => { this.handleReject(index); }} /></Button>
          </div>
          <div className="col-lg-12 no-padding">
            <textarea id={`rejectedComment${index}`} className="entry-textarea disable" placeholder="Add a comment..." />
          </div>
        </div>
      );
    }
    if (value === 'Rejected') {
      return (
        <div className="row">
          <div className="col-lg-3 approveReject np-left">
            <Button><i className="fas fa-check actionButtons" title="Approve" onClick={() => { this.handleApprove(index); }} /></Button>
            <Button disabled><i className="fas fa-times actionButtons" title="Reject" /></Button>
          </div>
        </div>
      );
    }
    if (value === 'Cancelled') {
      return 'Cancelled';
    }
    return (
      <div className="row">
        <div className="col-lg-3 approveReject np-left">
          <Button><i className="fas fa-check actionButtons" title="Approve" onClick={() => { this.handleApprove(index); }} /></Button>
          <Button><i className="fas fa-times actionButtons" title="Reject" onClick={() => { this.handleReject(index); }} /></Button>
        </div>
        <div className="col-lg-12 no-padding">
          <textarea id={`rejectedComment${index}`} className="entry-textarea disable" placeholder="Add a comment..." />
        </div>
      </div>
    );
  }
  setSyncedWithServer = (value) => {
    // console.log(value, 'setSyncedWithServer');
    this.state.syncedWithServer = value;
  }
  setTimeOffType(type, index) {
    console.log(type, index);
    this.setState({ timeOffType: type });
    this.setState({ index });
    this.setState({ timeOffCalendarIsOpen: true });
  }
  getFormattedDate(row) {
    const tempRow = {};
    Object.keys(row).forEach((key) => {
      if (key === 'startDate') {
        const formattedStartDate = (row.startDate) ? moment(row.startDate).format('DD-MMM-YYYY') : '';
        tempRow.startDate = formattedStartDate;
      } else {
        tempRow[key] = row[key];
      }
      if (key === 'endDate') {
        const formattedEndDate = (row.endDate) ? moment(row.endDate).format('DD-MMM-YYYY') : '';
        tempRow.endDate = formattedEndDate;
      }
    });
    return tempRow;
  }
  getDaysCount(request) {
    const startDate = moment(request.startDate, 'DD-MMM-YYYY');
    const endDate = moment(request.endDate, 'DD-MMM-YYYY');
    const days = endDate.diff(startDate, 'days');
    console.log(endDate, startDate, days);
    if (days >= 0 && request.fullOrHalf === 'Full day') {
      return (days + 1);
    }
    if (days === 0 && request.fullOrHalf === 'Half day') {
      return 'Half';
    }
    return null;
  }
  getMyRequests() {
    const myRequest = this.state.teamCalendarRows.map((request, index) =>
      <div className="toggler-content">

        <div className="time-requests">

          <div className="single-request">

            <div className="single-request-details">
              <div className="single-request-data">
                <strong>{request ? `${this.getDaysCount(request)} day` : ''} {request.timeOffType}</strong> planned from <strong>{this.displayTimeOffDays(request.startDate)}</strong> to <strong>{this.displayTimeOffDays(request.endDate)}</strong>
              </div>
              <div className="single-request-meta">
                <a className="single-request-comments" onClick={() => this.showComments(index)}>{request.comments[0].comment !== '' ? request.comments.length : 0} Comments</a>
                <a className="single-request-cancel">{request.status !== 'Pending' ? '' : <span onClick={() => this.showCancelComments(index)}>Cancel</span> }</a>
                {/* request.status === 'Approved' || request.status === 'Rejected' || request.status === 'Cancelled' */}
                {/* <a className="single-request-edit">Edit</a> */}
              </div>
            </div>

            <div className="single-request-status">
              <div className="request-status">{request.status ? request.status : 'Pending' }</div>
              <div className="request-approver">Approver: Alexander Thompson</div>
            </div>

          </div>

        </div>

      </div>
    );
    return myRequest;
  }
  getTimeOffTypes(types) {
    // console.log(types);
    return types.map((data, index) =>
      <div onClick={() => this.setTimeOffType(data.timeOffType, index)}>
        <div className="time-off-type type-casual js-time-off-type" onClick={() => this.toggleElement('time-off-entry')}>
          <div className="type-name">{data.timeOffType}</div>
          <div className="type-counter">{data.days} days</div>
        </div>
      </div>
    );
    // {
    //   // console.log(data);
    //   return (
    //     <div onClick={() => this.setTimeOffType(data.timeOffType, index)}>
    //       <div className="time-off-type type-casual js-time-off-type" onClick={() => this.toggleElement('time-off-entry')}>
    //         <div className="type-name">{data.timeOffType}</div>
    //         <div className="type-counter">{data.days} days</div>
    //       </div>
    //     </div>
    //   );
    // });
  }
  getOtherTimeOffTypes() {
    const otherTimeOffTypes = this.props.currentEmployee.timeOff.timeOffOverview.balanceAsOfSection.other.otherTypes.map((typeName) =>
      <li onClick={() => this.handleOtherTimeOffType('time-off-entry', 'take-action')}>
        <a className="js-time-off-type" data-type="to-unpaid" onClick={() => this.setTimeOffType(typeName.type)}>{typeName.type}</a>
      </li>
   );
    return otherTimeOffTypes;
  }
  showAllComments(comments) {
    console.log(comments);
    this.setState({ comments });
    this.setState({ showCommentsIsOpen: true });
  }
  showComments(index) {
    const newCommentRows = Object.assign([], this.props.currentEmployee.timeOff.timeOffOverview.myRequests);
    this.setState({ commentsRows: newCommentRows.reverse()[index].comments }, () => {
      console.log(this.state.commentsRows);
    });
    this.setState({ commentsIsOpen: true });
  }
  showCancelComments(index) {
    console.log(index);
    this.setState({ cancelCommentsIsOpen: true });
    this.setState({ cancelRowId: index });
  }
  closeTimeOffCalendarComments() {
    this.setState({ showCommentsIsOpen: false });
  }
  closeComments() {
    this.setState({ commentsIsOpen: false });
  }
  closeCancelComments() {
    this.setState({ cancelCommentsIsOpen: false });
  }
  save() {
    console.log('Saving the employee time information data');
    updateNewEmployee({ employee: this.props.currentEmployee }, false, this.props.dispatch, this.setSyncedWithServer);
    // updateAuditInfo({ employee: this.props.auditData }, this.props.dispatch);
  }
  showTeamCalendar() {
    // const grey = document.getElementsByClassName('approveButton');
    // console.log(grey);
    // grey.setAttribute('disabled', 'disabled');
    this.setState({ teamCalendarIsOpen: true });
  }
  closeTeamCalendar() {
    this.setState({ teamCalendarIsOpen: false });
  }
  closeTimeOffCalendar() {
    this.setState({ timeOffCalendarIsOpen: false });
  }
  handleApprove(index) {
    const comment = {};
    comment.comment = 'Approved';
    comment.role = 'Manager';
    comment.insertedDate = new Date();
    this.props.dispatch(
      approveorRejectTimeOff({ rowId: index, status: 'Approved', comments: comment })
    );
    this.save();
    // this.setState({ teamCalendarIsOpen: false });
  }
  handleReject(index) {
    console.log(index);
    const element = document.getElementById(`rejectedComment${index}`);
    console.log('reason', element.value);
    if (element.value === '') {
      // alert('Valid');
      element.classList.remove('disable');
      element.classList.add('enable');
    }
    const comment = {};
    comment.comment = element.value;
    comment.role = 'Manager';
    comment.insertedDate = new Date();
    if (element.value !== '') {
      element.classList.toggle('enable');
      this.props.dispatch(
        approveorRejectTimeOff({ rowId: index, status: 'Rejected', comments: comment })
      );
      this.save();
      // this.setState({ teamCalendarIsOpen: false });
      element.value = '';
    }
  }
  captureRejectMessage(e) {
    console.log(e.target);
  }
  displayTimeOffDays(date) {
    const displayDate = moment(date, 'DD-MMM-YYYY').format('dddd, MMMM Do');
    console.log(displayDate);
    return displayDate;
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    if (elementID === 'take-action') {
      x.classList.toggle('active');
    } else if (elementID === 'balanceSection' || elementID === 'timeoffCalendar' || elementID === 'myRequest' || elementID === 'viewTeamCalndar') {
      x.classList.toggle('active');
    }
  }
  submitTimeOffCalendar(data) {
    console.log('submitting', data);
    const newData = data;
    let daysCount = this.getDaysCount(data);
    if (daysCount === 'Half') {
      daysCount = 0.5;
      newData.days = daysCount;
    } else {
      daysCount = parseInt(daysCount, 10);
      newData.days = daysCount;
    }
    console.log(typeof daysCount, daysCount);
    this.props.dispatch(
      updateTimeOff({ newData, daysCount, index: this.state.index, subSection: 'timeOffCalendar' })
    );
    this.save();
    this.setState({ timeOffCalendarIsOpen: false });
  }
  submitCancelComments(data) {
    const newData = Object.assign({}, data);
    newData.status = 'Cancelled';
    console.log(newData);
    this.props.dispatch(
      updateTimeOffComments(newData)
    );
    this.save();
    this.setState({ cancelCommentsIsOpen: false });
  }
  handleOtherTimeOffType(timeOffEntry, takeAction) {
    this.toggleElement(timeOffEntry);
    this.toggleElement(takeAction);
  }
  handleChange(e) {
    this.setState({ timeOffType: e.target.value });
  }
  render() {
    return (
      <div className="container">

        <div className="row">

          <div className="col-xs-12">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.99 72"><defs /><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M70,28a10.58,10.58,0,0,0-9-4.3A17,17,0,0,0,54.79,25,43.21,43.21,0,0,0,52,18.43a2,2,0,0,0-1.77-1.06H7.05a2,2,0,0,0-1.77,1.06A47.5,47.5,0,0,0,0,40.65C0,52.9,4.2,64.11,11.53,71.42a2,2,0,0,0,1.41.58H44.34a2,2,0,0,0,1.41-.58,38.63,38.63,0,0,0,9.4-16.17C62,53.46,68.5,47.42,71,40.43,72.62,35.76,72.26,31.24,70,28ZM43.5,68H13.79C8.46,62.36,5,54,4.19,44.85H7.34a2,2,0,0,0,0-4H4a18.45,18.45,0,0,1,.16-4h8.17a2,2,0,0,0,0-4H4.65A41.7,41.7,0,0,1,8.28,21.37H49a43.86,43.86,0,0,1,4.28,19.28C53.29,51.35,49.64,61.5,43.5,68ZM67.2,39.1A20.83,20.83,0,0,1,56.31,50.63a51.32,51.32,0,0,0,1-10,50.46,50.46,0,0,0-1.37-11.78A13.23,13.23,0,0,1,61,27.73a6.61,6.61,0,0,1,5.69,2.62C68.24,32.48,68.41,35.67,67.2,39.1Z" /><path className="cls-1" d="M28.64,9.59a2,2,0,0,0,2-2V2a2,2,0,1,0-4,0V7.59A2,2,0,0,0,28.64,9.59Z" /><path className="cls-1" d="M17.56,13.59a2,2,0,0,0,2-2V6a2,2,0,1,0-4,0v5.59A2,2,0,0,0,17.56,13.59Z" /><path className="cls-1" d="M39.72,13.59a2,2,0,0,0,2-2V6a2,2,0,1,0-4,0v5.59A2,2,0,0,0,39.72,13.59Z" /></g></g></svg>
                  </div>
                  <h2 className="box-title">Time-Off Overview</h2>
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

                      <div className="box-inner box-inner--no-pad">

                        <div className="toggler active" id="balanceSection">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('balanceSection')}>
                            <h2 className="toggler-title">Balance as of Section</h2>
                            <span className="box-filter-arrow" />
                          </div>

                          <div className="toggler-content">

                            <div className="time-off-nav">

                              <div className="time-off-balance">
                                Balance as of <br />
                                <div className="time-off-balance-date">{moment(Date()).format('DD-MMM-YYYY')}: </div>
                              </div>

                              <div className="time-off-types">

                                {
                                  this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance.length !== 0 ?
                                    this.getTimeOffTypes(this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance) :
                                    <span className="my-balance">No leaves credited yet</span>
                                }

                              </div>

                            </div>

                          </div>

                        </div>

                        <CustomModal form={<TimeOffCalendar timeOffType={this.state.timeOffType} timeOffIndex={this.state.index} submit={this.submitTimeOffCalendar} close={this.closeTimeOffCalendar} />} show={this.state.timeOffCalendarIsOpen} />
                        <CustomModal form={<TimeOffCalendarComments data={this.state.comments} close={this.closeTimeOffCalendarComments} />} show={this.state.showCommentsIsOpen} />

                        <div className="toggler active" id="viewTeamCalndar">

                          <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('viewTeamCalndar')}>
                            <h2 className="toggler-title">View Team Calendar</h2>
                            <span className="box-filter-arrow" />
                          </div>

                          <div className="toggler-content">

                            <div className="team-absence">
                              <a className="team-absence-link" onClick={this.showTeamCalendar}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M29.33,3H25V1a1,1,0,0,0-2,0V3H17V1a1,1,0,0,0-2,0V3H9V1A1,1,0,0,0,7,1V3H2.67A2.67,2.67,0,0,0,0,5.67V29.33A2.67,2.67,0,0,0,2.67,32H29.33A2.67,2.67,0,0,0,32,29.33V5.67A2.67,2.67,0,0,0,29.33,3ZM30,29.33a.67.67,0,0,1-.67.67H2.67A.67.67,0,0,1,2,29.33V5.67A.67.67,0,0,1,2.67,5H7V7A1,1,0,0,0,9,7V5h6V7a1,1,0,0,0,2,0V5h6V7a1,1,0,0,0,2,0V5h4.33a.67.67,0,0,1,.67.67Z" fill="#4f81bd" /><rect x="7" y="12" width="4" height="3" fill="#4f81bd" /><rect x="7" y="17" width="4" height="3" fill="#4f81bd" /><rect x="7" y="22" width="4" height="3" fill="#4f81bd" /><rect x="14" y="22" width="4" height="3" fill="#4f81bd" /><rect x="14" y="17" width="4" height="3" fill="#4f81bd" /><rect x="14" y="12" width="4" height="3" fill="#4f81bd" /><rect x="21" y="22" width="4" height="3" fill="#4f81bd" /><rect x="21" y="17" width="4" height="3" fill="#4f81bd" /><rect x="21" y="12" width="4" height="3" fill="#4f81bd" /></svg>
                                View Team Absence Calendar
                              </a>
                            </div>

                            <CustomModal form={<CustomReactTable headerName={'View Team Absence Calendar'} auditData={this.state.teamCalendarRows} auditColumns={this.state.finalTeamCalendarColumns} close={this.closeTeamCalendar} customWidth={'modal-width'} />} show={this.state.teamCalendarIsOpen} />

                          </div>

                        </div>

                        <div className="toggler active" id="myRequest">

                          <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('myRequest')}>
                            <h2 className="toggler-title">My Request</h2>
                            <span className="box-filter-arrow" />
                          </div>

                          {this.state.teamCalendarRows.length >= 1 ? this.getMyRequests() : <span className="my-requests">No requests to display</span> }

                          <CustomModal form={<CancelComments rowId={this.state.cancelRowId} submit={this.submitCancelComments} close={this.closeCancelComments} />} show={this.state.cancelCommentsIsOpen} />
                          {/* <CustomModal form={<CustomReactTable headerName={'Comments'} auditData={this.state.commentsRows} auditColumns={this.state.commentsColumns} close={this.closeComments} />} show={this.state.commentsIsOpen} /> */}
                          <CustomModal form={<TimeOffCalendarComments data={this.state.commentsRows} close={this.closeComments} />} show={this.state.commentsIsOpen} />

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
  console.log('From Time Off: ', state.employee.currentEmployee);
  return {
    currentEmployee: state.employee.currentEmployee,
    myEmployees: state.employee.myEmployees
  };
}

export default connect(mapStateToProps)(TimeOff);

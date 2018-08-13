import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class RolesApprovalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyCommentsErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  removeValidationMessage(e) {
    if (e.target.name === 'rolesApproval_comments') {
      this.setState({ modifyCommentsErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.rolesApproval;
    const newRows = {};
    newRows.comments = form.rolesApproval_comments.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.commentsField = 'rolesApproval_comments';
    newRows.insertedByField = 'rolesApproval_insertedBy';
    newRows.insertedDateField = 'rolesApproval_insertedDate';
    // newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    const type1 = form.type1.value;
    const type2 = form.type2.value;
    console.log(newRows);
    let isValid = true;
    if (newRows.company === '') {
      this.setState({ modifyCommentsErrorText: <span>RLSAPR001:  Comments is required {this.errorCodeHelper('RLSAPR001')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submitEvent(newRows, hiddenType, type1, type2);
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Public Holidays Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="rolesApproval" >
            <div>
              <label className="custom-label" htmlFor="usr">* Comments:</label>
              <textarea className="entry-textarea" name="rolesApproval_comments" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyCommentsErrorText ? this.state.modifyCommentsErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" name="type1" value="Approved" />
            <input type="hidden" name="type2" value="Rejected" />
            {/* <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} /> */}
            <div>
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('Here is the master data', state.masterData.currentMasterData);
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(RolesApprovalForm);

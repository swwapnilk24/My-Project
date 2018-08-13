import React from 'react';
import Dropzone from 'react-dropzone';

class HRQueriesModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.saveHRBenefitsModalForm = this.saveHRBenefitsModalForm.bind(this);
    this.onDrop = this.onDrop.bind();
    this.state = {
      // modalFormData: '',
      // requestDate: props.data.requestDate,
      acceptedFile: [],
      rejectedFile: [],
      //ErrorMessages
      modifyCancelCommentsErrorText: '',
      modifyIssueTypeErrorText: ''
    };
  }
  componentWillReceiveProps() {
    console.log('selected props, HRQueries', this.props.data);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles, rejectedFiles);
    this.setState({ acceptedFile: acceptedFiles });
  }

  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  requestDateChange(evnt) {
    console.log('evnt', evnt.target.value);
    this.setState({ requestDate: evnt.target.value });
  }

  saveHRBenefitsModalForm() {
    const form = document.forms.frmHRQueries;
    const newRow = {};
    newRow.issueType = form.issueType.value;
    newRow.requestDate = new Date(); // change to moment
    newRow.subject = form.txtSubject.value;
    newRow.issueDesc = form.txtDescription.value;
    newRow.status = 'Open';// form.drpStatus.value;
    newRow.notification = form.drpNotification.value;
    newRow.comments = form.entryComment.value;
    // Field Names
    newRow.issueTypeField = 'hrqueries_hrqueries_issueType';
    newRow.requestDateField = 'hrqueries_hrqueries_requestDate';
    newRow.txtSubjectField = 'hrqueries_hrqueries_subject';
    newRow.txtDescriptionField = 'hrqueries_hrqueries_issueDesc';
    newRow.statusField = 'hrqueries_hrqueries_status';
    newRow.drpNotification = 'hrqueries_hrqueries_notification';
    newRow.id = form.hdnId.value;
    console.log('hdn', newRow);
    const hiddenType = form.hiddenType.value;
    if (hiddenType === 'add') {
      newRow.status = 'Open';
    } else if (hiddenType === 'edit') {
      newRow.status = 'Open';
    } else newRow.status = '';

    const isValid = true;
    if (isValid) {
      this.props.submitEvent(newRow, hiddenType);
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          HRQueries
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="frmHRQueries" className="form-fields">
            {/* <div className="form-group"> */}
            {/* <div className="form-group" >
              <label className="custom-label" htmlFor="requestDate">Request Date:</label>
              <CustomDatePicker
                onDayChange={this.requestDateChange}
                targetName=""
                value=""
                className="custom-date"
              />
            </div> */}
            <div className="form-group">
              <label className="custom-label" htmlFor="txtSubject">* Subject:</label>
              <input type="text" className="entry-input" name="txtSubject" />
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="Category">* Category</label>
              <select className="custom-select" name="Category" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="leave">Leave</option>
                <option value="Payroll">Payroll</option>
                <option value="Peers Data">Peers Data</option>
              </select>
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="issueType">* Issue Type:</label>
              <select className="custom-select" name="issueType" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Incident">Incident</option>
              </select>
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="txtDescription">* Issue Description:</label>
              <input type="text" className="entry-input" name="txtDescription" />
            </div>
            {/* <div className="form-group">
              <label className="custom-label" htmlFor="drpStatus">* Status:</label>
              <select className="custom-select" name="drpStatus" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="active">Active</option>
                <option value="inactive">In-Active</option>
              </select>
            </div> */}
            <div className="form-group">
              <label className="custom-label" htmlFor="drpNotification">* Notifications:</label>
              <select className="custom-select" name="drpNotification" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="dropzone">
              <Dropzone
                className="dropzone"
                // accept="image/jpeg, image/png, application/pdf, application/msword"
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
            <div>
              <label className="custom-label" htmlFor="entryComment">* Comments</label>
              <textarea className="entry-textarea mgn-bottom" name="entryComment" placeholder="Add a comment..." onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyCancelCommentsErrorText ? this.state.modifyCancelCommentsErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddenType" value={this.props.formType} />
            <input type="hidden" name="hdnId" value="" />
            <div className="form-group">
              <input type="button" name="Submit" onClick={this.saveHRBenefitsModalForm} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
            {/* <div className="custom-error">
              {this.state.modifyAmountErrorText ? this.state.modifyAmountErrorText : '' }
            </div> */}
          </form>
        </div>
      </div>
    );
  }
}

export default HRQueriesModal;

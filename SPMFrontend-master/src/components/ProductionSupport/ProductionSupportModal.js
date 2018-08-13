import React from 'react';
import DatePickerCustom from '../Compensation/datePickerCustom';

class ProductionSupportModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.requestDateChange = this.requestDateChange.bind(this);
    this.saveProdSupportModalForm = this.saveProdSupportModalForm.bind(this);
    this.state = {
      modalFormData: '',
      requestDate: props.data.requestDate
    };
  }
  componentWillReceiveProps() {
    console.log('selected props, ProdSupport', this.props.data);
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  requestDateChange(evnt) {
    console.log('evnt', evnt.target.value);
    this.setState({ requestDate: evnt.target.value });
  }
  saveProdSupportModalForm() {
    const form = document.forms.frmProductionSupport;
    const newRow = {};
    newRow.issueType = form.issueType.value;
    newRow.requestDate = this.state.requestDate;
    newRow.subject = form.txtSubject.value;
    newRow.issueDesc = form.txtDescription.value;
    newRow.status = form.drpStatus.value;
    newRow.notification = form.drpNotification.value;
    // Field Names
    // newRow.issueTypeField = 'issueType';
    // newRow.requestDateField = 'requestDate';
    // newRow.txtSubjectField = 'txtSubject';
    // newRow.txtDescriptionField = 'txtDescription';
    // newRow.drpStatusField = 'drpStatus';
    // newRow.drpNotification = 'drpNotification';
    // newRow.id = form.hdnId.value;
    console.log('hdn', newRow);
    const hiddenType = form.hiddenType.value;
    if (hiddenType === 'add') {
      newRow.status = 'Active';
    } else if (hiddenType === 'edit') {
      newRow.status = 'Pending';
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
          Production SupportModal
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="frmProductionSupport" className="form-fields">
            <div className="form-group">
              <label className="custom-label" htmlFor="issueType">* Issue Type:</label>
              <select className="custom-select" name="issueType" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="Dev">Development</option>
                <option value="Testing">Testing</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <div className="form-group" >
              <label className="custom-label" htmlFor="requestDate">Request Date:</label>
              <DatePickerCustom
                onDayChange={this.requestDateChange}
                targetName=""
                value=""
                className="custom-date"
              />
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="txtSubject">* Subject:</label>
              <input type="text" className="entry-input" name="txtSubject" />
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="txtDescription">* Description:</label>
              <input type="text" className="entry-input" name="txtDescription" />
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="drpStatus">* Status:</label>
              <select className="custom-select" name="drpStatus" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="active">Active</option>
                <option value="inactive">In-Active</option>
              </select>
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="drpNotification">* Notifications:</label>
              <select className="custom-select" name="drpNotification" defaultValue= "" onChange="">
                <option value="" disabled selected>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <input type="hidden" name="hiddenType" value={this.props.formType} />
            <input type="hidden" name="hdnId" value="" />
            <div className="form-group">
              <input type="button" name="Submit" onClick={this.saveProdSupportModalForm} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
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

export default ProductionSupportModal;

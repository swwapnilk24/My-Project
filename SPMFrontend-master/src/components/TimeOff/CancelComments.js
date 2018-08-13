import React from 'react';
import { Link } from 'react-router';

class CancelComments extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.state = {
      modifyCancelCommentsErrorText: ''
    };
  }
  close() {
    this.props.close();
  }
  submit() {
    const cancelComments = document.forms.cancelComments;
    const newRows = {};
    const comments = {};
    comments.comment = cancelComments.entryCancelComment.value;
    comments.role = 'Prajith';
    comments.insertedDate = new Date();
    newRows.comments = comments;
    newRows.rowId = cancelComments.rowId.value;
    let isValid = true;
    if (newRows.comments === '') {
      this.setState({ modifyCancelCommentsErrorText: <span>TOTVCC001: Reason for cancellation is required {this.errorCodeHelper('TOTVCC001')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submit(newRows);
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  removeValidationMessage(e) {
    console.log(e.target.name);
    if (e.target.name === 'entryCancelComment') {
      this.setState({ modifyCancelCommentsErrorText: '' });
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Comments
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="cancelComments" >
            <div>
              <label className="custom-label" htmlFor="entryCancelComment">* Reason for cancellation</label>
              <textarea className="entry-textarea mgn-bottom" name="entryCancelComment" placeholder="Add a comment..." onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyCancelCommentsErrorText ? this.state.modifyCancelCommentsErrorText : ''}
              </div>
            </div>
            <div>
              <input type="hidden" name="rowId" value={this.props.rowId} />
            </div>
            <div>
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CancelComments;

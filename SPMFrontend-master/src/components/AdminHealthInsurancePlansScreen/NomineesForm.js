import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactFileReader from 'react-file-reader';
// import DatePickerCustom from './datePickerCustom';

class Form extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    // this.toUpper = this.toUpper.bind(this);
    this.state = {
      pdfData: '',
      planErrorText: '',
      amountErrorText: '',
      contributionfromemployeeErrorText: '',
      contributionfromemployerErrorText: '',
      pdfErrorText: '',
      frequencyErrorText: ''
    };
  }
  uploadFile(files) {
    console.log(files[0]);
    this.setState({ pdfData: files[0] });
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
  close() {
    this.props.closeEvent();
  }
  handleChange(e) {
    if (e.target.name === 'plan') {
      this.setState({ planErrorText: '' });
    }
    if (e.target.name === 'amount') {
      this.setState({ amountErrorText: '' });
    }
    if (e.target.name === 'contributionfromemployee') {
      this.setState({ contributionfromemployeeErrorText: '' });
    }
    if (e.target.name === 'contributionfromemployer') {
      this.setState({ contributionfromemployerErrorText: '' });
    }
    if (e.target.name === 'frequency') {
      this.setState({ contributionfromemployerErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  existError() {
    alert('already exist');
  }
  submit() {
    // console.log('submit');
    const form = document.forms.formMaster;
    // console.log(form);
    // console.log(this.props.data);
    const newObject = {};
    newObject.plan = form.plan.value;
    newObject.amount = form.amount.value;
    newObject.frequency = form.frequency.value;
    newObject.contributionFromEmployee = form.contributionfromemployee.value;
    newObject.contributionFromEmployer = form.contributionfromemployer.value;
    newObject.pdfData = this.state.pdfData;
    const hiddenType = form.formhidden.value;
    let allow = true;
    if (newObject.plan === '') {
      this.setState({ planErrorText: <span>CTCTCT001: plan is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.amount === '') {
      this.setState({ amountErrorText: <span>CTCTCT001: Amount  is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.frequency === '') {
      this.setState({ frequencyErrorText: <span>CTCTCT001: Frequency  is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.contributionFromEmployee === '') {
      this.setState({ contributionfromemployeeErrorText: <span>CTCTCT001: Contribution From Employee is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.contributionFromEmployee !== '') {
      if (parseInt(newObject.contributionFromEmployee, 10) > 100 || parseInt(newObject.contributionFromEmployee, 10) < 0) {
        this.setState({ contributionfromemployeeErrorText: <span>CTCTCT001: Invalid Value for contribution from employee, Must be in percentages {this.errorCodeHelper('CTCTCT001')}</span> });
        allow = false;
      }
    }
    if (newObject.contributionFromEmployer === '') {
      this.setState({ contributionfromemployerErrorText: <span>CTCTCT001: Contribution From Employer is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.contributionFromEmployer !== '') {
      if (parseInt(newObject.contributionFromEmployer, 10) > 100 || parseInt(newObject.contributionFromEmployer, 10) < 0) {
        this.setState({ contributionfromemployerErrorText: <span>CTCTCT001: Invalid Value for contribution from employer, Must be in percentages {this.errorCodeHelper('CTCTCT001')}</span> });
        allow = false;
      }
    }
    if (newObject.contributionFromEmployee !== '' && newObject.contributionFromEmployer !== '') {
      const sum = parseInt(newObject.contributionFromEmployee, 10) + parseInt(newObject.contributionFromEmployer, 10);
      if (sum > 100) {
        this.setState({ contributionfromemployerErrorText: <span>CTCTCT001: Sum Of Contribution shouled not be greater than 100 {this.errorCodeHelper('CTCTCT001')}</span> });
        allow = false;
      }
    }
    if (newObject.pdfData === '') {
      this.setState({ pdfErrorText: <span>CICICA009: Please Upload File {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (allow) {
      this.props.submitEvent(newObject, hiddenType, this.existError);
    }
  }
  render() {
    return (
      <div className="card" >
        <div className="card-header">
            Nominee Information
          <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="formMaster" >
            <div>
              <label className="custom-label" >* Plan</label>
              <input className="textBoxStyle entry-input" name="plan" onChange={this.handleChange} defaultValue={this.props.data.plan} />
              <div className="dangerError">
                { this.state.planErrorText ? this.state.planErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >* Amount</label>
              <input type="text" name="amount" onChange={this.handleChange} defaultValue={this.props.data.amount} className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.amountErrorText ? this.state.amountErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Frequency</label>
              <select className="custom-select" name="frequency" onChange={this.handleChange} defaultValue={this.props.data.frequency} id="paycomponent" >
                <option selected disabled value="">select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'FREQUENCY')}
              </select>
              <div className="dangerError">
                { this.state.frequencyErrorText ? this.state.frequencyErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >* Contribution From Employee(%)</label>
              <input type="text" name="contributionfromemployee" onChange={this.handleChange} defaultValue={this.props.data.contributionfromemployee} className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.contributionfromemployeeErrorText ? this.state.contributionfromemployeeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >* Contribution From Employer(%)</label>
              <input type="text" name="contributionfromemployer" onChange={this.handleChange} defaultValue={this.props.data.contributionfromemployer} className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.contributionfromemployerErrorText ? this.state.contributionfromemployerErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Upload Pdf:</label>
              <ReactFileReader fileTypes={['.pdf']} handleFiles={this.uploadFile}>
                Upload File
              </ReactFileReader>
              <div className="dangerError">
                { this.state.pdfErrorText ? this.state.pdfErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="formhidden" value={this.props.formType} />
            <div className="form-group">
              <input type="button" name="submit" onClick={this.submit} id="submit" value="submit" className="form-control custom-submit btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
 }
function mapStateToProps(state) {
  //console.log(state.masterData.currentMasterData);
  //console.log('hiii welocme again');
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(Form);

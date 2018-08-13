import React, { Component } from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-material-snackbar';
import { Link } from 'react-router';


class AddCantonForm extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.alreadyExist = this.alreadyExist.bind(this);
    this.state = {
      CantonErrorText: '',
      MonthlyGrossFromErrorText: '',
      MonthlyGrossToErrorText: '',
      B0NErrorText: '',
      B1NErrorText: '',
      B2NErrorText: '',
      B3NErrorText: '',
      B4NErrorText: '',
      B5NErrorText: '',
      B6NErrorText: '',
      snackBarShowing: false
    };
  }
  close() {
    this.props.closeEvent();
  }
  bindDataToDropDownList(masterData, fields) {
    const field = fields;
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
  handleChange(e) {
    if (e.target.name === 'Canton') {
      this.setState({ CantonErrorText: '' });
    }
    if (e.target.name === 'MonthlyGrossTo') {
      this.setState({ MonthlyGrossToErrorText: '' });
    }
    if (e.target.name === 'MonthlyGrossFrom') {
      this.setState({ MonthlyGrossFromErrorText: '' });
    }
    if (e.target.name === 'B0N') {
      this.setState({ B0NErrorText: '' });
    }
    if (e.target.name === 'B1N') {
      this.setState({ B1NErrorText: '' });
    }
    if (e.target.name === 'B2N') {
      this.setState({ B2NErrorText: '' });
    }
    if (e.target.name === 'B3N') {
      this.setState({ B3NErrorText: '' });
    }
    if (e.target.name === 'B4N') {
      this.setState({ B4NErrorText: '' });
    }
    if (e.target.name === 'B5N') {
      this.setState({ B5NErrorText: '' });
    }
    if (e.target.name === 'B6N') {
      this.setState({ B6NErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  alreadyExist() {
    this.setState({ snackBarShowing: true });
    setTimeout(() => {
      this.setState({ snackBarShowing: false });
    }, 2000);
  }
  submit() {
    const form = document.forms.CantonTaxes;
    const newRows = {};
    newRows.Canton = form.Canton.value;
    newRows.MonthlyGrossFrom = form.MonthlyGrossFrom.value;
    newRows.MonthlyGrossTo = form.MonthlyGrossTo.value;
    newRows.B0N = form.B0N.value;
    newRows.B1N = form.B1N.value;
    newRows.B2N = form.B2N.value;
    newRows.B3N = form.B3N.value;
    newRows.B4N = form.B4N.value;
    newRows.B5N = form.B5N.value;
    newRows.B6N = form.B6N.value;
    newRows.status = 'Active';
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.Canton === '') {
      this.setState({ CantonErrorText: <span>CTCTCT001: Canton is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newRows.MonthlyGrossFrom === '') {
      this.setState({ MonthlyGrossFromErrorText: <span>CTCTCT002: Monthly Gross From is required {this.errorCodeHelper('CTCTCT002')}</span> });
      allow = false;
    }
    if (newRows.MonthlyGrossTo === '') {
      this.setState({ MonthlyGrossToErrorText: <span>CTCTCT003: Monthly Gross To is required {this.errorCodeHelper('CTCTCT003')}</span> });
      allow = false;
    }
    if (newRows.B0N === '') {
      this.setState({ B0NErrorText: <span>CTCTCT004: B0N  is required {this.errorCodeHelper('CTCTCT004')}</span> });
      allow = false;
    }
    if (newRows.B1N === '') {
      this.setState({ B1NErrorText: <span>CTCTCT005: B1N is required {this.errorCodeHelper('CTCTCT005')}</span> });
      allow = false;
    }
    if (newRows.B2N === '') {
      this.setState({ B2NErrorText: <span>CTCTCT006: B2N is required {this.errorCodeHelper('CTCTCT006')}</span> });
      allow = false;
    }
    if (newRows.B3N === '') {
      this.setState({ B3NErrorText: <span>CTCTCT007: B3N is required {this.errorCodeHelper('CTCTCT007')}</span> });
      allow = false;
    }
    if (newRows.B4N === '') {
      this.setState({ B4NErrorText: <span>CTCTCT008: B4N is required {this.errorCodeHelper('CTCTCT008')}</span> });
      allow = false;
    }
    if (newRows.B5N === '') {
      this.setState({ B5NErrorText: <span>CTCTCT009: B5N is required {this.errorCodeHelper('CTCTCT009')}</span> });
      allow = false;
    }
    if (newRows.B6N === '') {
      this.setState({ B6NErrorText: <span>CTCTCT010: B6N is required {this.errorCodeHelper('CTCTCT010')}</span> });
      allow = false;
    }
    if (allow) {
      console.log(newRows, hiddenType);
      this.props.submitEvent(newRows, this.alreadyExist, hiddenType);
    }
  }
  render() {
    const snackbarStyle = {
      position: 'relative',
      background: '#404040',
      color: '#fff',
      padding: '14px',
      WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      fontWeight: '500',
      textTransform: 'initial',
      willChange: 'transform',
      whiteSpace: 'nowrap',
      transform: 'translateY(20px)',
      WebkitTransform: 'translateY(20px)',
      boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
      fontSize: '14px',
      opacity: 0,
      borderRadius: '3px',
      display: '-webkit-box, -ms-flexbox, flex',
      // display: '-ms-flexbox',
      // display: 'flex',
      WebkitBoxAlign: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxPack: 'justify',
      msFlexPack: 'justify',
      justifyContent: 'space-between',
      lineHeight: '20px'
    };
    console.log('data', this.props.data);
    return (
      <div className="card" >
        <div className="card-header">
           Canton Taxes
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="CantonTaxes" >
            <div className="snackbar-wrap non-scrollable">
              { this.state.snackBarShowing ?
                <SnackBar
                  show={this.state.snackBarShowing}
                  style={snackbarStyle}
                  className="form-group"
                >
              This Data Already Exist In The Records
              </SnackBar> :
              ''
              }
            </div>
            <div>
              <label className="custom-label" htmlFor="payComponent">* Canton</label>
              {
                this.props.formType === 'Edit' ?
                  <input className="textBoxStyle entry-input" name="Canton" onChange={this.handleChange} defaultValue={this.props.data.Canton} id="paycomponent" disabled />
                    :
                  <input className="textBoxStyle entry-input" name="Canton" onChange={this.handleChange} defaultValue={this.props.data.Canton} id="paycomponent" disabled />
              }
              <div className="dangerError">
                { this.state.CantonErrorText ? this.state.CantonErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Monthly Gross From</label>
              <input type="text" name="MonthlyGrossFrom" defaultValue={this.props.data.MonthlyGrossFrom} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.MonthlyGrossFromErrorText ? this.state.MonthlyGrossFromErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Monthly Gross To</label>
              <input type="text" name="MonthlyGrossTo" defaultValue={this.props.data.MonthlyGrossTo} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.MonthlyGrossToErrorText ? this.state.MonthlyGrossToErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B0N</label>
              <input type="text" name="B0N" defaultValue={this.props.data.B0N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B0NErrorText ? this.state.B0NErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B1N</label>
              <input type="text" name="B1N" defaultValue={this.props.data.B1N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B1NErrorText ? this.state.B1NErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B2N</label>
              <input type="text" name="B2N" defaultValue={this.props.data.B2N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B2NErrorText ? this.state.B2NErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B3N</label>
              <input type="text" name="B3N" defaultValue={this.props.data.B3N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B3NErrorText ? this.state.B3NErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B4N</label>
              <input type="text" name="B4N" defaultValue={this.props.data.B4N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B4NErrorText ? this.state.B4NErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B5N</label>
              <input type="text" name="B5N" defaultValue={this.props.data.B5N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B5NErrorText ? this.state.B5NErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* B6N</label>
              <input type="text" name="B6N" defaultValue={this.props.data.B6N} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.B6NErrorText ? this.state.B6NErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" defaultValue={this.props.formType} />
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
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(AddCantonForm);

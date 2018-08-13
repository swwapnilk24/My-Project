import React, { Component } from 'react';
import { Link } from 'react-router';
import SnackBar from 'react-material-snackbar';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.alreadyExist = this.alreadyExist.bind(this);
    this.state = {
      alreadyExistError: '',
      snackBarShowing: false,
      codeErrorText: '',
      nameErrorText: ''
    };
  }
  close() {
    this.props.closeEvent();
  }
  alreadyExist() {
    // console.log('i just called already exist');
    // this.setState({ alreadyExistError: 'This Data Already Exist In The Records' });
    this.setState({ snackBarShowing: true });
    setTimeout(() => {
      this.setState({ snackBarShowing: false });
    }, 2000);
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    // console.log('submit');
    const form = document.forms.formMaster;
    // console.log(form);
    // console.log(this.props.data);
    const newObject = {};
    newObject.code = form.code.value;
    newObject.name = form.name.value;
    newObject.status = 'Active';
    const hiddenType = form.formhidden.value;
    let allow = true;
    if (newObject.code === '') {
      this.setState({ codeErrorText: <span> MDMDMV001: Code cannot be empty {this.errorCodeHelper('MDMDMV001')} </span> });
      allow = false;
    }
    if (newObject.name === '') {
      this.setState({ nameErrorText: <span> MDMDMV002: Name cannot be empty {this.errorCodeHelper('MDMDMV002')} </span> });
      allow = false;
    }
    if (allow) {
      this.props.submitEvent(newObject, this.alreadyExist, hiddenType);
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
    return (
      <div className="card" >
        <div className="card-header">
            MASTER DATA
          <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="formMaster" >
            <div className="snackbar-wrap">
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
              <label className="custom-label" htmlFor="amount">* Code</label>
              <input type="text" name="code" defaultValue={this.props.data.code} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.codeErrorText ? this.state.codeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Name</label>
              <input type="text" name="name" defaultValue={this.props.data.name} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.nameErrorText ? this.state.nameErrorText : ''}
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

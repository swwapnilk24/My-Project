import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.toUpper = this.toUpper.bind(this);
    this.state = {
      category: ''
    };
  }
  toUpper(e) {
    const val = e.target.value;
    console.log(e, val);
    this.setState({ category: val.toUpperCase() });
  }
  close() {
    this.props.closeEvent();
  }
  submit() {
    // console.log('submit');
    const form = document.forms.formMaster;
    // console.log(form);
    // console.log(this.props.data);
    const newObject = {};
    newObject.category = form.category.value;
    newObject.code = form.code.value;
    newObject.name = form.name.value;
    const hiddenType = form.formhidden.value;
    let allow = true;
    if (newObject.category === '') {
      allow = false;
    }
    if (newObject.code === '') {
      allow = false;
    }
    if (newObject.name === '') {
      allow = false;
    }
    if (allow) {
      this.props.submitEvent(newObject, hiddenType);
    }
  }
  render() {
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
            <div>
              <label className="custom-label" htmlFor="amount">* Category</label>
              <input type="text" name="category" onChange={this.toUpper} value={this.state.category} id="amount" className="textBoxStyle entry-input" />
              {/* <div className="dangerError">
                { this.state.AmountErrorText ? this.state.AmountErrorText : ''}
              </div> */}
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Code</label>
              <input type="text" name="code" id="amount" className="textBoxStyle entry-input" />
              {/* <div className="dangerError">
                { this.state.AmountErrorText ? this.state.AmountErrorText : ''}
              </div> */}
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Name</label>
              <input type="text" name="name" id="amount" className="textBoxStyle entry-input" />
              {/* <div className="dangerError">
                { this.state.AmountErrorText ? this.state.AmountErrorText : ''}
              </div> */}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchCompanyData } from '../../actions/CompanyActions';
import { fetchHealthInsuranceBenefits } from '../../actions/adminHealthInsurancePlansActions';

// import DatePickerCustom from './datePickerCustom';

class Form extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.toUpper = this.toUpper.bind(this);
    this.state = {
      countryErrorText: '',
      emppositionErrorText: '',
      planErrorText: '',
      companyServiceRender: true
    };
  }
  componentWillMount() {
    // this.props.dispatch(fetchHealthInsuranceBenefits('ss'));
  }
  componentDidMount() {
    document.getElementById('empposition').disabled = true;
    this.props.dispatch(fetchHealthInsuranceBenefits(this.props.currentEmployee.identify.identify.identify.corporateCompany));
    this.props.dispatch(fetchCompanyData(this.props.currentEmployee.identify.identify.identify.corporateCompany));
  }
  // componentWillReceiveProps(newprops) {
    // console.log('checking service', newprops.currentEmployee.identify.identify.identify.corporateCompany);
    // if (this.state.companyServiceRender) {
    //   this.props.dispatch(fetchCompanyData(newprops.currentEmployee.identify.identify.identify.corporateCompany));
    //   this.setState({ companyServiceRender: false });
    // }
    // if (!this.state.companyServiceRender) {
    //   if (this.props.currentEmployee.identify.identify.identify.corporateCompany !== newprops.currentEmployee.identify.identify.identify.corporateCompany) {
    //     this.props.dispatch(fetchCompanyData(newprops.currentEmployee.identify.identify.identify.corporateCompany));
    //   } else {
    //     console.log('filter id', newprops.currentEmployee.identify.identify.identify.corporateCompany);
    //   }
    // }
  // }
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
  // arrayDiff(newArrayData, serPos) {
  //   obj.masterDataType.names.map((serPos) => {
  //     console.log(existedPos.empPosition, serPos.code);
  //     if (existedPos.empPosition !== serPos.code) {
  //         finalArray.push(serPos);
  //     }
  //     return null;
  //   });
  // }
  removeDuplicates(a, b) {
    for (let i = 0, len = a.length; i < len; i += 1) {
      for (let j = 0, len2 = b.length; j < len2; j += 1) {
        if (a[i].empPosition.toString() === b[j].code.toString()) {
          b.splice(j, 1);
          len2 = b.length;
        }
      }
    }
    console.log(a);
    console.log(b);
    return b;
  }
  positionDropDownList(countrySelected) {
    const field = 'Position'.toUpperCase();
    const data = this.props.masterInfo;
    const positionExist = [];
    this.props.nomineesData.map((nomineeData) => {
      console.log(nomineeData, countrySelected);
      if (nomineeData.country === countrySelected) {
        positionExist.push(nomineeData);
      }
      return null;
    });
    console.log('nominee data', positionExist);
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field) {
        // let finalArray = [];
        // console.log(obj.masterDataType.names);
        // if (positionExist.length === 0) {
        //   finalArray = _.cloneDeep(obj.masterDataType.names);
        // } else {
        //   positionExist.map((existedPos) => {
        //     arrayDiff()
        //     return null;
        //   });
        // }
        // console.log('final', finalArray);
        let optionsList = [];
        if (positionExist.length !== 0) {
          const b = this.removeDuplicates(positionExist, _.cloneDeep(obj.masterDataType.names));
          optionsList = b.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        } else {
          optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        }
        // const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
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
    if (e.target.name === 'country') {
      const form = document.forms.formMaster;
      const newObject = {};
      newObject.country = form.country.value;
      if (newObject.country !== '') {
        this.setState({ countrySelected: newObject.country });
        document.getElementById('empposition').disabled = false;
      } else {
        document.getElementById('empposition').disabled = true;
      }
      this.setState({ countryErrorText: '' });
    }
    if (e.target.name === 'empposition') {
      this.setState({ emppositionErrorText: '' });
    }
    if (e.target.name === 'plan') {
      this.setState({ planErrorText: '' });
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
    newObject.country = form.country.value;
    newObject.empPosition = form.empposition.value;
    newObject.plan = form.plan.value;
    const hiddenType = form.formhidden.value;
    let allow = true;
    if (newObject.country === '') {
      this.setState({ countryErrorText: <span>CTCTCT001: Country is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.empPosition === '') {
      this.setState({ emppositionErrorText: <span>CTCTCT001: Employee Position is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.plan === '') {
      this.setState({ planErrorText: <span>CTCTCT001: Plan is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (allow) {
      this.props.submitEvent(newObject, hiddenType, this.existError);
    }
  }
  renderCorporateAddress(data) {
    const option = [];
    if (data.country) {
      option.push(<option value={data.country}>{data.country}</option>);
    }
    return option;
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
              <label className="custom-label" >* Country</label>
              <select className="custom-select" name="country" onChange={this.handleChange} defaultValue={this.props.data.country} >
                <option selected disabled value="">select</option>
                {/* { this.bindDataToDropDownList(this.props.masterInfo, 'Country') } */}
                { this.renderCorporateAddress(this.props.companyData.corporateAddress) }
                { this.props.companyData.branches.map((data) => <option value={data.country}>{data.country}</option>) }
              </select>
              <div className="dangerError">
                { this.state.countryErrorText ? this.state.countryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >* Employee Position</label>
              <select className="custom-select" id="empposition" name="empposition" onChange={this.handleChange} defaultValue={this.props.data.empposition} >
                <option selected disabled value="">select</option>
                { this.positionDropDownList(this.state.countrySelected)}
              </select>
              <div className="dangerError">
                { this.state.emppositionErrorText ? this.state.emppositionErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >* Plan</label>
              <select className="custom-select" name="plan" onChange={this.handleChange} defaultValue={this.props.data.plan} >
                <option selected disabled value="">select</option>
                { this.props.HealthInsuranceData.map((data, index) => <option key={index} value={data.plan}>{data.plan}</option>) }
              </select>
              <div className="dangerError">
                { this.state.planErrorText ? this.state.planErrorText : ''}
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
  return {
    masterInfo: state.masterData.currentMasterData,
    HealthInsuranceData: state.adminHealthInsurancePlansReducer.Data.healthInsurancePlans,
    companyData: state.companyData.companyData,
    currentEmployee: state.employee.currentEmployee
  };
}
export default connect(mapStateToProps)(Form);

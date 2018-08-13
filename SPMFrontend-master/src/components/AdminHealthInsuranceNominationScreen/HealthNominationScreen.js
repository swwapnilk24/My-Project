import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import EmptyRowsView from './EmptyRowsView';
import CustomModal from './customModal';
import NomineesForm from './NomineesForm';
import './HealthNominationScreen.scss';
import { fetchHealthInsuranceBenefits, updateHealthInsuranceBenefits, deleteHealthInsuranceBenefitService, deleteRowAction, fetchHealthInsurancePlansForBenefits } from '../../actions/adminHealthInsuranceActions';

class HealthInuranceNomintaionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.nomineesRowGetter = this.nomineesRowGetter.bind(this);
    this.getGridRowId = this.getGridRowId.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openAddForm = this.openAddForm.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.remove = this.remove.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    // this.removeRecord = this.removeRecord.bind(this);
    this.state = {
      formShowing: false,
      formType: '',
      formData: {},
      nomineesGridHeight: 35,
      gridSelectedIndex: [-1],
      companyServiceRender: true,
      nomineesColumns: [
      { key: 'country', name: 'Country' },
      { key: 'empPosition', name: 'Position' },
      { key: 'plan', name: 'Plan Name' }],
      nomineesRows: []
    };
  }
  // componentWillMount() {
  //   this.props.dispatch(fetchHealthInsuranceBenefits('ss'));
  //   this.props.dispatch(fetchHealthInsurancePlansForBenefits('ss'));
  // }
  componentWillReceiveProps(newProps) {
    if (this.state.companyServiceRender) {
      this.props.dispatch(fetchHealthInsuranceBenefits(newProps.currentEmployee.identify.identify.identify.corporateCompany));
      this.props.dispatch(fetchHealthInsurancePlansForBenefits(newProps.currentEmployee.identify.identify.identify.corporateCompany));
      this.setState({ companyServiceRender: false });
    }
    if (!this.state.companyServiceRender) {
      if (this.props.currentEmployee.identify.identify.identify.corporateCompany !== newProps.currentEmployee.identify.identify.identify.corporateCompany) {
        this.props.dispatch(fetchHealthInsuranceBenefits(newProps.currentEmployee.identify.identify.identify.corporateCompany));
        this.props.dispatch(fetchHealthInsurancePlansForBenefits(newProps.currentEmployee.identify.identify.identify.corporateCompany));
      }
    }
    console.log(newProps.HealthInsuranceData);
    this.setState({ nomineesGridHeight: (newProps.HealthInsuranceData.length * 35) + 35 });
    this.setState({ nomineesRows: newProps.HealthInsuranceData });
  }
  getGridRowId(data) {
    this.setState({ gridSelectedIndex: [data.rowIdx] });
    this.setState({ formData: this.state.nomineesRows[data.rowIdx] });
  }
  remove(resp) {
    if (resp.message === 'successfull') {
      const key = '_id';
      this.props.dispatch(deleteRowAction({ _id: this.state.formData[key] }));
    } else {
      alert('something went wrong please try again');
    }
  }
  toggleElement(id) {
    document.getElementById(id).classList.toggle('active');
  }
  nomineesRowGetter(index) {
    const rowObjectDateFormatted = _.cloneDeep(this.state.nomineesRows[index]);
    const formattedDob = (rowObjectDateFormatted.dob) ? moment(rowObjectDateFormatted.dob).format('DD-MMM-YYYY') : '';
    rowObjectDateFormatted.dob = formattedDob;
    return rowObjectDateFormatted;
  }
  submitEvent(newData, type, existError) {
    console.log(newData);
    const healthInsuranceBenefitsNew = _.cloneDeep(this.props.HealthInsuranceData);
    if (healthInsuranceBenefitsNew.length === 0) {
      this.props.dispatch(updateHealthInsuranceBenefits(this.props.currentEmployee.identify.identify.identify.corporateCompany, newData));
      this.closeForm();
    } else {
      let flag = true;
      healthInsuranceBenefitsNew.map((data) => {
        if (data.country === newData.country && data.empPosition === newData.empPosition) {
          flag = false;
        }
        return null;
      });
      if (flag) {
        this.props.dispatch(updateHealthInsuranceBenefits(this.props.currentEmployee.identify.identify.identify.corporateCompany, newData));
        this.closeForm();
      } else {
        existError();
      }
    }
  }
  deleteRow() {
    if (this.state.gridSelectedIndex[0] !== -1) {
      const key = '_id';
      this.props.dispatch(deleteHealthInsuranceBenefitService(this.props.currentEmployee.identify.identify.identify.corporateCompany, this.state.formData[key], this.remove));
    } else {
      alert('please select a row');
    }
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
  closeForm() {
    this.setState({ formShowing: false });
  }
  openAddForm() {
    this.setState({ formType: 'Add' });
    this.setState({ formShowing: true });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="nominees">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Health Insurance Benefits</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForm}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.deleteRow}>
                                    <i className="fas fa-trash fa-4" aria-hidden="true" />
                                  </a>
                                </li>
                                {/* <li>
                                  <a onClick={this.openEditForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                {/* <li>
                                  <a>
                                    <i title="History" onClick={this.showHistoryForCompensation} className="fa fa-history historyIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('nominees')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Select Country:
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select drop-width">
                                      <option value="" selected disabled >select</option>
                                      { this.bindDataToDropDownList(this.props.masterInfo, 'Country') }
                                    </select>
                                    <div className="errorHolder" />
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Select Employee postion:
                                    </span>
                                  </td>
                                  <td>
                                    <select className="custom-select drop-width">
                                      <option value="" selected disabled >select</option>
                                      { this.bindDataToDropDownList(this.props.masterInfo, 'position') }
                                    </select>
                                    <div className="errorHolder" />
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                    * Amount:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                    * Contribution From Employer:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                    * Contribution From Employee:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      <div className="form-group">
                                        <input type="button" name="submit" value="Add" className="form-control btn-primary add-width" />
                                      </div>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                            <ReactDataGrid
                              minHeight={this.state.nomineesGridHeight}
                              columns={this.state.nomineesColumns}
                              rowGetter={this.nomineesRowGetter}
                              rowsCount={this.state.nomineesRows.length}
                              enableCellSelect
                              onCellSelected={this.getGridRowId}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.gridSelectedIndex
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal Form={<NomineesForm formType={this.state.formType} nomineesData={this.state.nomineesRows} closeEvent={this.closeForm} submitEvent={this.submitEvent} data={this.state.formData} />} show={this.state.formShowing} />
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
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('health nomination state', state);
  return {
    HealthInsuranceData: state.adminHealthInsuranceReducer.Data.healthInsuranceBenefits,
    masterInfo: state.masterData.currentMasterData,
    currentEmployee: state.employee.currentEmployee
  };
}
export default connect(mapStateToProps)(HealthInuranceNomintaionScreen);

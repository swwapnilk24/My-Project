import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactDataGrid from 'react-data-grid';
// import CustomDatePicker from '../Shared/CustomDatePicker';
import CustomModal from '../JobInfo/CustomModal';
import ProductionSupportModal from './ProductionSupportModal';
import { saveProdSupport, getProdSupportData } from '../../actions/ProdSupportActions';

class ProductionSupport extends React.Component {
  constructor(props) {
    super(props);
    this.rowGetterTest = this.rowGetterTest.bind(this);
    this.closeProdSupportForm = this.closeProdSupportForm.bind(this);
    this.openAddProdSupportForm = this.openAddProdSupportForm.bind(this);
    this.saveProdSupportData = this.saveProdSupportData.bind(this);
    this.state = {
      requestDate: '',
      loggedInUserId: '',
      showProductionSupportModalForm: false,
      formTypeForProdSupport: undefined,
      currentDataGridObjectForProdSupport: {},
      currentSelectedIndexForProdSupport: [-1],
      gridColsProdSupport: [{ key: 'issueType', name: 'Issue Type' }, { key: 'requestDate', name: 'Request Date' }, { key: 'subject', name: 'Subject' }, { key: 'issueDesc', name: 'Description' }, { key: 'notification', name: 'Notification' }, { key: 'status', name: 'Status' }],
      gridRowsProdSupportData: [],
      columns: [{ key: 'id', name: 'ID' }, { key: 'name', name: 'Employee Names' }, { key: 'salary', name: 'salary' }],
      rows: [{ id: 1, name: 'prajith', salary: 200000 }, { id: 2, name: 'basha', salary: 200000 }, { id: 3, name: 'surendra', salary: 200000 }, { id: 4, name: 'phani', salary: 200000 }]
    };
    this.requestDateChnage = this.requestDateChnage.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getProdSupportData());
  }
  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    this.setState({ gridRowsProdSupportData: newProps.listProdSupportData });
  }
  closeProdSupportForm() {
    this.setState({ showProductionSupportModalForm: false });
    this.setState({ currentDataGridObjectForProdSupport: {} });
    this.setState({ currentSelectedIndexForProdSupport: [-1] });
  }
  openAddProdSupportForm() {
    this.setState({ showProductionSupportModalForm: true });
    this.setState({ formTypeForProdSupport: 'add' });
    this.setState({ currentDataGridObjectForProdSupport: {} });
  }
  requestDateChnage(event, type) {
    console.log('Date Event', event.target.value, type);
    this.setState({ requestDate: event.target.value });
  }
  rowGetterTest(parameter) {
    // console.log(parameter);
    return this.state.gridRowsProdSupportData[parameter];
  }
  saveProdSupportData(data, hdnType) {
    console.log('Welcome Submit', hdnType);
    const values = [data.issueType, data.requestDate, data.txtSubject, data.txtDescription, data.drpStatus, data.drpNotification];
    const fields = [data.issueTypeField, data.requestDateField, data.txtSubjectField, data.txtDescriptionField, data.drpStatusField, data.drpNotificationField];
    if (hdnType === 'add') {
      console.log('ADD', values, fields);
      this.props.dispatch(saveProdSupport(data));
      this.setState({ showProductionSupportModalForm: false });
      // this.state.gridRowsProdSupportData.push()
      const newRowsData = Object.assign([], this.state.gridRowsProdSupportData);
      newRowsData.push(data);
      this.setState({ gridRowsProdSupportData: newRowsData });
    } else if (hdnType === 'edit') {
      console.log('edit');
    }
  }
  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="box-content">
            <div className="row-no-padding">
              <div className="col-xs-12 col-lg-12 no-padding">
                <div className="box-tab active">
                  <div className="box-inner box-inner--no-pad">
                    <div className="toggler active">
                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                        <h2 className="toggler-title">Production Support</h2>
                        <div className="toggleAction">
                          <ul className="box-actions">
                            <li>
                              <a onClick={this.openAddProdSupportForm}>
                                <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                              </a>
                            </li>
                            <li>
                              <a onClick="">
                                <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                              </a>
                            </li>
                            <li>
                              <a onClick="">
                                <i className="fas fa-eye" aria-hidden="true" title="View" />
                              </a>
                            </li>
                            <li>
                              <a onClick="">
                                <i className="fas fa-times" aria-hidden="true" title="Cancel" />
                              </a>
                            </li>
                            <li>
                              <a onClick="">
                                <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                              </a>
                            </li>
                            <li>
                              <a>
                                <Link to={`/Help/${'BECBAL000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="toggler-content">
                        <ReactDataGrid
                          columns={this.state.gridColsProdSupport}
                          rowGetter={this.rowGetterTest}
                          rowsCount={this.state.gridRowsProdSupportData.length}
                          minHeight={200}
                          enableCellSelect
                          onCellSelected ={this.getRowID}
                          showCheckbox ={false}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.selectedIndexes
                            }
                          }}
                          enableRowSelect={false}
                        />
                      </div>
                      <CustomModal
                        form={
                          <ProductionSupportModal
                            formType={this.state.formTypeForProdSupport}
                            data=""
                            closeEvent={this.closeProdSupportForm}
                            submitEvent={this.saveProdSupportData}
                          />}
                        show={this.state.showProductionSupportModalForm}
                      />
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
  console.log('State', state.prodSupport);
  console.log('master changed triggering');
  return {
    prodSupportData: state.prodSupport.prodSupportData, listProdSupportData: state.prodSupport.listProdSupportData
  };
}
export default connect(mapStateToProps)(ProductionSupport);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactDataGrid from 'react-data-grid';
import moment from 'moment';
import CustomModal from '../JobInfo/CustomModal';
import HRQueriesModalForm from '../HRQueries/HRQueriesModalForm';
import { updateHRQueries } from '../../actions/HRQueriesActions';
import AuthorizedComponent from '../Routes/AuthorizedComponent';

class HRQueries extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.rowGetterHRQueries = this.rowGetterHRQueries.bind(this);
    this.getRowIDForHRQueries = this.getRowIDForHRQueries.bind(this);
    this.closeHRQueriesForm = this.closeHRQueriesForm.bind(this);
    this.saveHRQueriesData = this.saveHRQueriesData.bind(this);
    this.openAddHRQueriesForm = this.openAddHRQueriesForm.bind(this);
    this.state = {
      scrollPosition: undefined,
      requestDate: '',
      loggedInUserId: '',
      showHRQueriesModalForm: false,
      formTypeForHRQueries: undefined,
      currentDataGridObjectForHRQueries: {},
      currentSelectedIndexForHRQueries: [-1],
      gridColsHRQueries: [{ key: 'issueType', name: 'Issue Type' }, { key: 'requestDate', name: 'Request Date' }, { key: 'subject', name: 'Subject' }, { key: 'issueDesc', name: 'Description' }, { key: 'notification', name: 'Notification' }, { key: 'status', name: 'Status' }],
      gridRowsHRQueriesData: []
    };
    this.requestDateChange = this.requestDateChange.bind(this);
  }
  componentWillMount() {
    updateHRQueries();
  }
  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps.listProdSupportData);
    this.setState({ gridRowsHRQueriesData: newProps.listHRQueriesData });
  }
  getRowIDForHRQueries(data) {
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentDataGridObjectForHRQueries: rowID });
    const object = this.state.gridRowsHRQueriesData[temp];
    object.uniqueID = temp;
    this.setState({ currentDataGridObjectForHRQueries: object });
  }
  closeHRQueriesForm() {
    this.setState({ showHRQueriesModalForm: false });
    this.setState({ currentDataGridObjectForHRQueries: {} });
    this.setState({ currentSelectedIndexForHRQueries: [-1] });
  }
  openAddHRQueriesForm() {
    console.log('hiplace');
    this.setState({ showHRQueriesModalForm: true });
    this.setState({ formTypeForHRQueries: 'add' });
    this.setState({ currentDataGridObjectForHRQueries: {} });
  }
  requestDateChange(event, type) {
    console.log('Date Event', event.target.value, type);
    this.setState({ requestDate: event.target.value });
  }
  rowGetterHRQueries(index) {
    const currentRow = Object.assign({}, this.state.gridRowsHRQueriesData[index]);
    const formattedDate = (currentRow.requestDate) ? moment(currentRow.requestDate).format('DD-MMM-YYYY') : '';
    currentRow.requestDate = formattedDate;
    return currentRow;
  }

  saveHRQueriesData(data, hdnType) {
    console.log('Welcome Submit', hdnType);
    const values = [data.issueType, data.requestDate, data.txtSubject, data.txtDescription, data.drpStatus, data.drpNotification];
    const fields = [data.issueTypeField, data.requestDateField, data.txtSubjectField, data.txtDescriptionField, data.drpStatusField, data.drpNotificationField];
    if (hdnType === 'add') {
      console.log('ADD', values, fields);
      // this.props.dispatch(saveProdSupport(data));
      this.setState({ showHRQueriesModalForm: false });
      // this.state.gridRowsProdSupportData.push()
      // const newRowsData = Object.assign([], this.state.gridRowsHRQueriesData);
      // updateBenefitsData(
      //   { value: values, field: fields, type: hiddenType }
      // )
      // // newRowsData.push(data);
      // this.setState({ gridRowsHRQueriesData: newRowsData });
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
                        <h2 className="toggler-title">HRQueries</h2>
                        <div className="toggleAction">
                          <ul className="box-actions">
                            <li>
                              <a onClick={this.openAddHRQueriesForm}>
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
                          columns={this.state.gridColsHRQueries}
                          rowGetter={this.rowGetterHRQueries}
                          rowsCount={this.state.gridRowsHRQueriesData.length}
                          minHeight={200}
                          enableCellSelect
                          onCellSelected = {this.getRowIDForHRQueries}
                          showCheckbox = {false}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.selectedIndexes
                            }
                          }}
                          enableRowSelect ={false}
                        />
                      </div>
                      <CustomModal
                        form={
                          <HRQueriesModalForm
                            formType={this.state.formTypeForHRQueries}
                            data=""
                            closeEvent={this.closeHRQueriesForm}
                            submitEvent={this.saveHRQueriesData}
                          />}
                        show={this.state.showHRQueriesModalForm}
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
    listHRQueriesData: state.hrqueries.listHRQueriesData
  };
}
export default connect(mapStateToProps)(HRQueries);

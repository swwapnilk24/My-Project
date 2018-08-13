import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactDataGrid from 'react-data-grid';
import CustomModal from './CustomModal';
import RolesApprovalForm from './RolesCommentsModalForm';

class RolesApproval extends React.Component {

  constructor() {
    super();
    this.rowGetterTest = this.rowGetterTest.bind(this);
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.processIndividualLeave = this.processIndividualLeave.bind(this);
    this.deleteIndividualLeave = this.deleteIndividualLeave.bind(this);
    this.rowGetterForProcessedRoles = this.rowGetterForProcessedRoles.bind(this);
    this.submitForRolesApproval = this.submitForRolesApproval.bind(this);
    this.closeForRolesApproval = this.closeForRolesApproval.bind(this);
    this.state = {
      selectedIndexes: [],
      selectedRoles: [],
      approvedRoles: [],
      rowsForProcessedRoles: [],
      selectedId: [],
      selectedIDs: [],
      rolesApprovalGridHeight: 35,
      rowsForProcessedRolesGridHeight: 35,
      showingForRolesApproval: false,
      columns: [{ key: 'empName', name: 'Emp Name' }, { key: 'empNumber', name: 'Emp No' }, { key: 'roleName', name: 'Roles' }],
      rowsForApproval: [{ empName: 'Nikhil', empNo: '111' }],
      columnsForProcessedRoles: [{ key: 'empName', name: 'Emp Name' }, { key: 'empNumber', name: 'Emp No' }, { key: 'roleName', name: 'Roles' }, { key: 'status', name: 'Status' }, { key: 'comments', name: 'Comments' }]
    };
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    const rolesApprovalRowSize = (newProps.rolesApprovalData.roleApproval.length + 1) * 35;
    this.setState({ rolesApprovalGridHeight: rolesApprovalRowSize });
    const newRowsForrolesApproval = Object.assign([], newProps.rolesApprovalData.roleApproval);
    this.setState({ rowsForApproval: newRowsForrolesApproval });
  }

  onRowsSelected(rows) {
    console.log(rows);
    const value = this.state.selectedRoles;
    rows.map((values, index) => {
      value.push(values.row);
      return index;
    });
    this.state.selectedRoles = value;
    // const val = {};
    const key = '_id';
    const selectedIDs = [];
    console.log(this.state.selectedRoles);
    this.state.selectedRoles.map((selected, i) => {
      selectedIDs.push(selected[key]);
      return i;
    });
    console.log(selectedIDs);
    this.state.selectedIDs = selectedIDs;
    this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
    console.log('row selected', this.state.selectedIndexes);
    console.log(this.state.selectedRoles);
  }

  onRowsDeselected(rows) {
    console.log('row de-selected');
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
  }

  rowGetterTest(parameter) {
    //console.log(parameter);
    return this.state.rowsForApproval[parameter];
  }

  processIndividualLeave() {
    console.log(this.state.selectedRoles);
    let value = {};
    this.state.selectedRoles.map((values, index) => {
      value = values;
      value.status = 'Approved';
      this.state.approvedRoles.push(value);
      return index;
    });
    console.log(this.state.approvedRoles);
    const rowsForProcessedRolesRowSize = (this.state.selectedRoles.length + 1) * 35;
    this.setState({ rowsForProcessedRolesGridHeight: rowsForProcessedRolesRowSize });
    const newRowsForProcessedRoles = Object.assign([], this.state.selectedRoles);
    this.setState({ rowsForProcessedRoles: newRowsForProcessedRoles });
  }

  deleteIndividualLeave() {
    this.setState({ showingForRolesApproval: true });
  }

  rowGetterForProcessedRoles(parameter) {
    //console.log(parameter);
    return this.state.rowsForProcessedRoles[parameter];
  }

  submitForRolesApproval(data) {
    console.log(data);
    let value = {};
    this.state.selectedRoles.map((values, index) => {
      value = values;
      value.status = 'Rejected';
      value.comments = data.comments;
      this.state.approvedRoles.push(value);
      return index;
    });
    const rowsForProcessedRolesRowSize = (this.state.selectedRoles.length + 1) * 35;
    this.setState({ rowsForProcessedRolesGridHeight: rowsForProcessedRolesRowSize });
    const newRowsForProcessedRoles = Object.assign([], this.state.selectedRoles);
    this.setState({ rowsForProcessedRoles: newRowsForProcessedRoles });
    this.setState({ showingForRolesApproval: false });
  }

  closeForRolesApproval() {
    this.setState({ showingForRolesApproval: false });
  }

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="toggler active" id="PublicHolidays" >
            <div className="toggler-bar js-toggler-bar" >
              <h2 className="toggler-title mgn-left">Roles Aprroval</h2>
              <div className="actionEnable" >
                <ul className="box-actions" >
                  <li>
                    <a onClick={this.processIndividualLeave}>
                      <i className="fas fa-check" aria-hidden="true" title="Process" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.deleteIndividualLeave}>
                      <i className="fas fa-trash-alt" aria-hidden="true" title="Delete" />
                    </a>
                  </li>
                  <li>
                    <Link to={`/Help/${'PBLHLD000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                  </li>
                </ul>
              </div>
              <span className="box-filter-arrow" onClick={() => this.toggleElement('PublicHolidays')} />
            </div>
            <div className="toggler-content">
              <div className="box-content">
                <div className="box-tab active">
                  <ReactDataGrid
                    columns={this.state.columns}
                    rowGetter={this.rowGetterTest}
                    rowsCount={this.state.rowsForApproval.length}
                    minHeight={this.state.rolesApprovalGridHeight}
                    enableCellSelect
                    onCellSelected = {this.getRowID}
                    enableRowSelect = "single"
                    // showCheckbox = {this.state.check}
                    rowSelection={{
                      showCheckbox: true,
                      enableShiftSelect: false,
                      onRowsSelected: this.onRowsSelected,
                      onRowsDeselected: this.onRowsDeselected,
                      selectBy: {
                        indexes: this.state.selectedIndexes
                      }
                    }}
                  />
                  <CustomModal Form={<RolesApprovalForm closeEvent={this.closeForRolesApproval} submitEvent={this.submitForRolesApproval} />} show={this.state.showingForRolesApproval} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-tab active">
          <div className="box-inner--no-pad">
            <div className="toggler active" id="keyJobAttribute1">
              <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                <h2 className="toggler-title-new">Processed Roles</h2>
                <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute1')} />
              </div>

              <div className="toggler-content ji-padding-bottom">
                <div id="kJASnackBar" className="snackBarStyle actionDisable">
                  {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                </div>
                <ReactDataGrid
                  columns={this.state.columnsForProcessedRoles}
                  rowGetter={this.rowGetterForProcessedRoles}
                  rowsCount={this.state.rowsForProcessedRoles.length}
                  minHeight={this.state.rowsForProcessedRolesGridHeight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('Data ', state);
  return { rolesApprovalData: state.rolesApproval.rolesApprovalInfo, masterInfo: state.masterData.currentMasterData, auditData: state.auditTrail.currentEmployee, myEmployees: state.employee.myEmployees };
}

export default connect(mapStateToProps)(RolesApproval);

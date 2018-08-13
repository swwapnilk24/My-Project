import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Row, Col } from 'react-bootstrap';
import { updateRolesApprovalData } from '../../actions/RolesApprovalActions';
import { upRolesApprovalData } from '../../services/RolesApproval.service';
import CustomReactSelect from '../Shared/CustomReactSelect';
import './Roles.scss';

const subjects = [
  'self',
  'others'
];

class Roles extends Component {
  constructor() {
    super();
    this.rowGetterTest = this.rowGetterTest.bind(this);
    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);
    this.submit = this.submit.bind(this);
    this.dropValue = this.dropValue.bind(this);
    this.save = this.save.bind(this);
    this.submitSearchOptions = this.submitSearchOptions.bind(this);
    this.state = {
      // check: false,
      downValue: 0,
      options: [],
      selectedIndexes: [],
      selectedRoles: [],
      columns: [{ key: 'roleName', name: 'Roles' }],
      rowsForRoles: [],
      selectedData: [],
      stateData: []
    };
  }

  componentWillReceiveProps(newprops) {
    console.log(newprops);
    const newRowsForRoles = Object.assign([], newprops.roles);
    this.setState({ rowsForRoles: newRowsForRoles });
    const newStateData = Object.assign([], newprops.myEmployees);
    this.setState({ stateData: newStateData });
    const newOptions = [];
    const key = '_id';
    newprops.myEmployees.map(data => {
      const option = {};
      // option.label = `${data.personalInformation.personalInformation.personalInformation.firstName} - ${data.personalInformation.biographicalInformation.biographicalInformation.employeeId}`;
      option.value = data[key];
      newOptions.push(option);
      return data[key];
    });
    // console.log(newOptions);
    this.setState({ options: newOptions });
  }

  onRowsSelected(rows) {
    console.log(rows);
    const value = this.state.selectedRoles;
    rows.map((values, index) => {
      console.log(values);
      value.push(values.row);
      return index;
    });
    this.state.selectedRoles = value;
    this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
    console.log('row selected', this.state.selectedIndexes);
    console.log(rows);
  }

  onRowsDeselected(rows) {
    console.log('row de-selected');
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
  }

  bindDataToDropDownList(masterData, fieldName) {
    const field = fieldName.toUpperCase();
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

  rowGetterTest(parameter) {
    console.log(parameter);
    return this.state.rowsForRoles[parameter];
  }

  submit() {
    let val = [];
    const formDat = document.forms.formName;
    const sub = formDat.subject;
    val = sub.options[sub.selectedIndex].text;
    const field = 'self';
    let data = this.state.selectedData;
    if (val === field) {
      this.state.selectedRoles.map((values, index) => {
        console.log(values);
        data = values;
        data.empName = 'Nikhil';
        data.empNumber = '111';
        this.state.selectedData.push(data);
        console.log(this.state.selectedData);
        return index;
      });
    } else {
      this.state.selectedRoles.map((values, index) => {
        this.state.stateData.map((dat, i) => {
          console.log(values);
          data = values;
          data.empName = dat.personalInformation.personalInformation.personalInformation.firstName;
          data.empNumber = dat.personalInformation.biographicalInformation.biographicalInformation.employeeId;
          this.state.selectedData.push(data);
          console.log(this.state.selectedData);
          return i;
        });
        return index;
      });
    }
    console.log(this.state.selectedData);
    this.props.dispatch(
      updateRolesApprovalData({ value: this.state.selectedData, field: val })
    );
    this.save();
  }

  submitSearchOptions(employees) {
    let val = [];
    const formDat = document.forms.formName;
    const sub = formDat.subject;
    val = sub.options[sub.selectedIndex].text;
    console.log(employees);
    let data = this.state.selectedData;
    this.state.selectedRoles.map((values, index) => {
      this.state.stateData.map((dat, i) => {
        console.log(values);
        data = values;
        // data.empName = dat.personalInformation.personalInformation.personalInformation.firstName;
        // data.empNumber = dat.personalInformation.biographicalInformation.biographicalInformation.employeeId;
        this.state.selectedData.push(data);
        console.log(this.state.selectedData);
        return i;
      });
      return index;
    });
    this.props.dispatch(
      updateRolesApprovalData({ value: this.state.selectedData, field: val })
    );
    this.save();
  }

  dropValue() {
    let val = [];
    const formDat = document.forms.formName;
    const sub = formDat.subject;
    val = sub.options[sub.selectedIndex].text;
    this.state.downValue = val;
    console.log(this.state.downValue);
    const x = document.getElementById('searchId');
    x.classList.toggle('enable');
    const drop = 'others';
    if (this.state.downValue === drop) {
      document.getElementById('submit').style.display = 'none';
    }
  }

  save() {
    setTimeout(() => {
      console.log(this.props.rolesApprovalData);
      upRolesApprovalData({ roleApproval: this.props.rolesApprovalData }, false, this.props.dispatch);
    }, 1000);
  }

  render() {
    return (
      <Row>
        <Col lg={7} md={7}>
          <ReactDataGrid
            columns={this.state.columns}
            rowGetter={this.rowGetterTest}
            rowsCount={this.state.rowsForRoles.length}
            minHeight={200}
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
        </Col>
        <Col lg={5} md={5} className="padding-left30">
          <div>
            <form name = "formName">
              <select name="subject" onChange={this.dropValue} className="custom-select" >
                {
                subjects.map((values) =>
                  <option value={values}>{values}</option>
                )
                }
              </select>
            </form>
          </div>
          <div className="disable" id="searchId">
            <CustomReactSelect options={this.state.options} submit={this.submitSearchOptions} />
          </div>
          <div>
            <input type = "button" value = "submit" onClick = {this.submit} id = "submit" />
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  console.log('Data ', state);
  return {
    rolesApprovalData: state.rolesApproval.rolesApprovalInfo,
    roles: state.roles.roles,
    masterInfo: state.masterData.currentMasterData,
    auditData: state.auditTrail.currentEmployee,
    myEmployees: state.employee.myEmployees
  };
}

export default connect(mapStateToProps)(Roles);

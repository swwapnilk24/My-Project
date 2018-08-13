import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import './TalentPool.scss';
import { approveSkills } from '../../actions/TalentPoolActions';

class TalentPool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsForBranchesGrid: [{ key: 'empName', name: 'Employee Name' },
      { key: 'skill', name: 'Skill' },
      { key: 'level', name: 'Level' },
      { key: 'experience', name: 'Experience' },
      { key: 'status', name: 'Status' }],
      selectedIndexes: []
    };
  }
  onRowsSelected = (rows) => {
    this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
  };

  onRowsDeselected = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
  };
  approveSkill = (rows) => {
    const skillsIndexArray = this.state.selectedIndexes;
    const skillEmpArray = [];
    for (let i = 0; i < skillsIndexArray.length; i += 1) {
      const skillsIndexArrayObject = skillsIndexArray[i];
      const currentEmployee = rows[skillsIndexArrayObject];
      const newObject = {};
      newObject.empObjectId = (currentEmployee) ? currentEmployee.empObjectId : '';
      newObject.skillObjectId = (currentEmployee) ? currentEmployee.skillObjectId : '';
      skillEmpArray.push(newObject);
    }
    this.props.dispatch(approveSkills({ result: skillEmpArray }));
  };
  dateDiff(toDateA, fromDateA, stime) {
    const fromDate = moment(fromDateA, 'YYYY-MM-DD');
    const toDate = moment(toDateA, 'YYYY-MM-DD');
    let a = '';
    if (stime === 'year') {
      a = toDate.diff(fromDate, 'year');
    }
    if (stime === 'months') {
      a = toDate.diff(fromDate, 'months');
    }
    if (stime === 'days') {
      a = toDate.diff(fromDate, 'days');
    }
    return a;
  }

  render() {
    const myFilteredWorkers = this.props.PoolData;
    const newMyFilteredWorkers = [];
    for (let k = 0; k < myFilteredWorkers.length; k += 1) {
      const skillInformationArray = myFilteredWorkers[k].skillInformation;
      for (let i = 0; i < skillInformationArray.length; i += 1) {
        const newObject = {};
        const currentEmployee = myFilteredWorkers[k];
        const skillInformation = skillInformationArray[i];
        const id = '_id';
        newObject.empObjectId = (currentEmployee) ? currentEmployee[id] : '';
        newObject.skillObjectId = (skillInformation) ? skillInformation[id] : '';
        newObject.id = (currentEmployee) ? currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId : '';
        newObject.empName = `${(currentEmployee) ? currentEmployee.personalInformation.personalInformation.personalInformation.displayName : ''} ${(currentEmployee) ? currentEmployee.personalInformation.personalInformation.personalInformation.firstName : ''}`;
        newObject.skill = (skillInformation) ? skillInformation.skillName : '';
        newObject.level = (skillInformation) ? skillInformation.level.name : '';
        newObject.status = (skillInformation) ? skillInformation.status : '';
        newObject.experience = (skillInformation) ? `${this.dateDiff(skillInformation.toDate, skillInformation.fromDate, 'year')}years,${this.dateDiff(skillInformation.toDate, skillInformation.fromDate, 'months')}months,${this.dateDiff(skillInformation.toDate, skillInformation.fromDate, 'days')}days` : '';
        newMyFilteredWorkers.push(newObject);
      }
    }
    const rows = newMyFilteredWorkers;
    const rowGetter = rowNumber => rows[rowNumber];
    return (
      <div className="row">

        <div className="col-xs-12 col-lg-12">
          <div className="box-content">

            <div className="row-no-padding">
              <div className="col-xs-12 col-lg-12 no-padding">

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="keyJobAttribute">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                        <h2 className="toggler-title-new">Talent Pool</h2>
                        <div id="keyJobAttributeToggle" className="toggleAction">
                          <ul className="box-actions" >
                            <li>
                              <input type="button" name="Submit" id="submit" value="Approve" className="form-control btn-primary btn-primary1 custom-submit" onClick={() => this.approveSkill(rows)} />
                            </li>
                          </ul>
                        </div>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute')} />
                      </div>

                      <div className="toggler-content ji-padding-bottom">
                        <div id="kJASnackBar" className="snackBarStyle actionDisable">
                          {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForBranchesGrid}
                          rowGetter={rowGetter}
                          rowsCount={rows.length}
                          minHeight={2000}
                          rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: true,
                            onRowsSelected: this.onRowsSelected,
                            onRowsDeselected: this.onRowsDeselected,
                            selectBy: {
                              indexes: this.state.selectedIndexes
                            }
                          }}
                        />
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
  return {
    PoolData: state.employee.myEmployees
  };
}

export default connect(mapStateToProps)(TalentPool);

/**
 * @file SalaryCompPlan Component.
 * @author Robin
 */
/* eslint-disable */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import dateformat from 'dateformat';
import { Row, Col, Button } from 'react-bootstrap';
import { setMeritAmount, updateCompStatus, getCompensationPlanning, deleteSTI, addSTI, addSalaryTargetPlan, deleteTarget, getComplanStatus } from '../../actions/SalaryPlanAction';
// import data from './SalaryCompPlanData.json';
import './SalaryCompPlan.scss';
import StiModal from './StiModal';
import TargetModal from './TargetModal';

class SalaryCompPlan extends React.Component {
  constructor(props) {
    super(props);
    this.startDay;
    this.endDay;
    this.state = {
      isStiModalOpen: false,
      stiData: null,
      isTargetModalOpen: false,
      targetData: null,
      targetStartDate: moment(),
      targetEndDate: moment(),
      test: true,
      data: this.props.salaryplan.salaryPlan,
      abs: '',
      caldays: 1,
      fte: '',
      stitarget: '',
      selTargetPlan: '',
      selTargetPlanId: '',
      targetpercentage: '',
      tableOptions: {
        loading: false,
        showPagination: true,
        showPageSizeOptions: false,
        showPageJump: false,
        collapseOnSortingChange: false,
        collapseOnDataChange: false,
        freezeWhenExpanded: true,
        filterable: true,
        sortable: true,
        resizable: true,
        defaultPageSize:10
      },
      blnCurr: false,
      date: new Date()
    };
    this.closeModal = this.closeModal.bind(this);
    this.getStatusField = this.getStatusField.bind(this);
    this.setTextFiled = this.setTextFiled.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.addTarget = this.addTarget.bind(this);
    this.deleteSingleSti = this.deleteSingleSti.bind(this);
    this.deleteSingleTarget = this.deleteSingleTarget.bind(this);
    this.handleTargetStartDate = this.handleTargetStartDate.bind(this);
    this.handleTargetEndDate = this.handleTargetEndDate.bind(this);
    this.planChangeEvent = this.planChangeEvent.bind(this);
    this.showSTIForm = this.showSTIForm.bind(this);
    this.showTargetForm = this.showTargetForm.bind(this);
    this.updateCompStatus = this.updateCompStatus.bind(this);
  }

  componentWillMount = () => {
    this.setState({ tableOptions: { ...this.state.tableOptions, loading:true } });
    this.props.dispatch(getCompensationPlanning());
    this.props.dispatch(getComplanStatus());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.salaryplan.salaryPlan !== this.props.salaryplan.salaryPlan) {
      // this.setState({ salPlan: this.props.salaryplan.salaryPlan });
      const newArr = Object.assign([], nextProps.salaryplan.salaryPlan);
      _.each(newArr, (item) => {
        _.forEach(item.sti, o => {
          o.parentID = item.id;
        });
        _.forEach(item.target, tar => {
          tar.parentID = item.id;
        });
      });
      this.setState({ data: newArr });
      this.setState({ tableOptions: { ...this.state.tableOptions, loading:false } });
    }
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
  closeModal(varName) {
    this.setState({ [varName]: false });
  }
  setTextFiled = (event) => {
    const validated = isNaN(event.target.value);
    if (!validated) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name]: '' });
    }
  }
  onMeritChangeComplete = (id, e) => {
    const validated = !isNaN(e.target.value);
    if (validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', id]);
      if (index > -1 && ob[index].meritAmount !== undefined && ob[index].meritAmount > 0) {
        this.props.dispatch(setMeritAmount(id, ob[index].meritAmount));
      }
    }
  }
  onMeritChange = (value, e) => {
    const validated = !isNaN(e.target.value);
    if (validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', value]);
      if (index > -1) {
        ob[index].meritAmount = Number(e.target.value);
        ob[index].finalAnnualSalary = (Number(e.target.value) + ob[index].currentSalary);
        ob[index].totalIncrease = (ob[index].stiAmount + Number(e.target.value) + ob[index].ltAmount);
        this.setState({ data: ob });
      }
    }
  }

  onMeritPercentageChange = (value, e) => {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', value]);
      if (index > -1) {
        ob[index].meritAmount = (Number(e.target.value) / 100) * ob[index].currentSalary;
        ob[index].finalAnnualSalary = (Number(ob[index].meritAmount) + ob[index].currentSalary);
        ob[index].totalIncrease = (ob[index].stiAmount + Number(ob[index].meritAmount));
        this.setState({ data: ob });
      }
    }
  }


  setCurrency(blnCurr) {
    this.setState({ blnCurr });
  }
  dateChange(beginDt) {
    const startDt = document.getElementById('beginDate');
    console.log('Day', startDt.value, beginDt);
    this.startDay = startDt.value;
  }
  endDateChange(endDt) {
    const endDat = document.getElementById('endDate');
    this.endDay = endDat.value;
    console.log('Dates - ', this.endDay);
  }
  // handleChange = date => this.setState({ date })
  handleTargetStartDate(date) {
    this.setState({ targetStartDate: date });
  }
  handleTargetEndDate(date) {
    this.setState({ targetEndDate: date });
  }
  getEmployeePlans(employee) {
    console.log('employee ', employee);
    return <select>
      <option>{employee.name}</option>
      <option>Plan 1</option>
      <option>Plan 2</option>
    </select>;
  }
  showSTIForm(row) {
    if (row.status === 'ACTIVE' || row.status === 'APPROVED') {
      alert('you can not add STI for this employee');
      return false;
    }
    this.setState({ stiData: row, isStiModalOpen: true });
  }
  showTargetForm(row) {
    if (row.status === 'ACTIVE' || row.status === 'APPROVED') {
      alert('you can not add targets for this employee');
      return false;
    }
    this.setState({ targetData: row, isTargetModalOpen: true });
  }
  // change plan event
  planChangeEvent(event) {
    const index = event.nativeEvent.target.selectedIndex;
    this.setState({ selTargetPlan: event.nativeEvent.target[index].text, selTargetPlanId: event.target.value });
    console.log('Selected event', event.nativeEvent.target[index].text);
  }
  addTarget = (value) => {
    const ran = Math.floor((Math.random() * 100) + 1);
    const ob = Object.assign([], this.state.data);
    const index = _.findIndex(ob, ['id', value.id]);    
    if (index > -1) {
      const newTarget = { 
        employeeid: value.id,
        abs: ob[index].currentSalary,
        amount: (Number(this.state.targetpercentage) / 100) * ob[index].finalAnnualSalary,
        percentage: this.state.targetpercentage,
        vesting_year: this.props.salaryplan.vesting_year,
        performance_year: this.props.salaryplan.performance_year,
        plan: this.state.selTargetPlanId 
      };

      ob[index].target.push(newTarget);
      console.log('newTarget', newTarget);
      this.props.dispatch(addSalaryTargetPlan(newTarget, value.employeeid));
      // this.props.dispatch(addSalaryTargetPlan({ targetPlanData: newTarget, employeeid: value.employeeid }));
      //ob[index].targetAmount = _.sumBy(ob[index].target, 'amount');
    }   

    // if (index > -1) {
    //   ob[index].target.push({ id: ran,
    //     abs: ob[index].currentSalary,
    //     amount: (Number(this.state.targetpercentage) / 100) * ob[index].finalAnnualSalary,
    //     parentID: value.id,
    //     percentage: this.state.targetpercentage });
    //   ob[index].targetAmount = _.sumBy(ob[index].target, 'amount');
    // }
    console.log('Value', ob);
    //this.setState({ data: ob, targetpercentage: '' });
  }

  deleteSingleSti = (value) => {
    const x = confirm('Are you sure you want to delete?');
    if (x) {
      this.props.dispatch(deleteSTI(value._id, value.employeeid));
    }
  }

  deleteSingleTarget = (value) => {
    console.log(value);
    const x = confirm('Are you sure you want to delete?');
    if (x) {
      let id = value._id;
      if (id === undefined) {
        id = value.id;
      }
      this.props.dispatch(deleteTarget(id, value.employeeid));
    }
    // const newArr = Object.assign([], this.state.data);
    // const index = _.findIndex(newArr, ['id', value.parentID]);
    // const deleteindex = _.findIndex(newArr[index].target, ['id', value.id]);
    // newArr[index].target.splice(deleteindex, 1);
    // this.setState({ data: newArr });
  }

  onLTChange = (value, e) => {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', value]);
      if (index > -1) {
        ob[index].ltAmount = Number(e.target.value);
        ob[index].finalAnnualSalary = (Number(ob[index].meritAmount) + ob[index].currentSalary);
        ob[index].totalIncrease = (ob[index].stiAmount + ob[index].meritAmount + Number(ob[index].ltAmount));
        this.setState({ data: ob });
      }
    }
  }

  onltPercentageChange = (value, e) => {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', value]);
      if (index > -1) {
        ob[index].ltAmount = (Number(e.target.value) / 100) * ob[index].currentSalary;
        ob[index].finalAnnualSalary = (Number(ob[index].meritAmount) + ob[index].currentSalary);
        ob[index].totalIncrease = (ob[index].stiAmount + ob[index].meritAmount + Number(ob[index].ltAmount));
        this.setState({ data: ob });
      }
    }
  }
  // Get Data
  // getCompPlanStatusData() {
  //   this.props.compPlanningStatusData
  //   // {this.props.compPlanningStatusData.map((statusItems) => {
  //   //   console.log('statusItems', statusItems);
  //   //   // <option value={statusItems.statusCode}>{statusItems.statusCode}</option>
  //   // })}
  // }
  // saveCompPlan() {
  //   console.log('Welcome Save Plan');
  // }
  isReadOnly(status) {
    if (status === 'SUBMITTED' || status === 'ACTIVE' || status === 'APPROVED') {
      return true;
    }
    return false;
  }
  updateCompStatus(event) {
    this.props.dispatch(updateCompStatus(event.target.id, event.target.value));
  }
  getStatusField(row) {
    if (row.status === 'SUBMITTED' || row.status === 'ACTIVE' || row.status === 'APPROVED') {
      return <span>{row.status}</span>;
    }
    return (<select id={row.employeeid} defaultValue={row.status} onChange={this.updateCompStatus}>     
      {
        this.props.compPlanningStatusData.map((items, index) => {
          if (items.type === 1) {
            let selected = '';
            if (items.statusCode === row.status) {
              selected = 'selected';
            }
            return <option selected={selected} key={index} value={items.statusCode}>{items.statusName}</option>;
          }
        })
      }                
    </select>);
  }
  render() {
    const columns = [
      {
        Header: () => <div className="ts-heading ts-main ts-main--final">Basic Details</div>,
        columns: [
          {
            Header: 'Name',
            maxWidth: 80,
            accessor: 'name'
          },
          {
            Header: 'Title',
            maxWidth: 110,
            accessor: 'jobTitle'
          },
          {
            Header: 'ABS $',
            maxWidth: 70,
            accessor: 'currentSalary',
            Cell: row => (
              <span className="text-right">
                ${row.original.currentSalary.toLocaleString('en')}
              </span>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'currentSalary').toLocaleString('en')}</span>
            )
          },
          {
            Header: 'Currency',
            maxWidth: 70,
            accessor: 'currencyCode',
            Cell: row => (
              <div className="text-center">
                {row.original.currencyCode}
              </div>
            )
          },
          {
            Header: 'Rating',
            maxWidth: 70,
            accessor: 'rating',
            Cell: row => (
              <div className="text-center">
                {row.original.objective}:{row.original.behaviour}
              </div>
            )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--merit"> Merit</div>,
        columns: [
          {
            Header: () =>
              <div>
                <div>Guidelines</div>
                <div className="ts-radios">
                  <div className="ts-radio">
                    <input id="radio-1" name="radio" type="radio" />
                    <label
                      htmlFor="radio-1"
                      className="ts-radio-label"
                      onClick={() => this.setCurrency(true)}
                    >
                      $
                    </label>
                  </div>
                  <div className="ts-radio">
                    <input id="radio-2" name="radio" type="radio" />
                    <label
                      htmlFor="radio-2"
                      className="ts-radio-label"
                      onClick={() => this.setCurrency(false)}
                    >
                      %
                    </label>
                  </div>
                </div>
              </div>,
            accessor: 'guidelines',
            maxWidth: 70,
            Cell: row => (
              <div className="text-right">
                {this.state.blnCurr ?
                (`$${(Math.round(row.original.currentSalary) * row.original.minMerit) / 100}`)
                : (`${row.original.minMerit}%`)} - {this.state.blnCurr ? (`$${(Math.round(row.original.currentSalary) * row.original.maxMerit) / 100}`) : (`${row.original.maxMerit}%`)}
              </div>
            )
          },
          {
            Header: 'Amount',
            accessor: 'meritAmount',
            maxWidth: 80,
            Cell: row => (
              <div>
                <span className="ts-input-label">$</span>
                <input
                  type="text"
                  disabled={this.isReadOnly(row.original.status)}
                  className="ts-input merit_amount"
                  id = {row.original.id}
                  value={row.original.meritAmount}
                  onBlur={(e) => this.onMeritChangeComplete(row.original.id, e)}
                  onChange={(e) => this.onMeritChange(row.original.id, e)}
                />
              </div>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'meritAmount').toLocaleString('en')}</span>
            )
          },
          {
            Header: 'Percentage',
            maxWidth: 80,
            accessor: 'meritpercentage',
            Cell: row => (
              <div>
                <span className="ts-input-label">%</span>
                <input
                  type="text"
                  className="ts-input"
                  onBlur={(e) => this.onMeritChangeComplete(row.original.id, e)}
                  disabled={this.isReadOnly(row.original.status)}
                  value={_.round((Number(row.original.meritAmount) * 100 / row.original.currentSalary), 2)}
                  onChange={(e) => this.onMeritPercentageChange(row.original.id, e)}
                />
              </div>
            ),
            Footer: (
              <span className="text-right">{_.round(((_.sumBy(this.state.data, 'meritAmount')) * 100 / _.sumBy(this.state.data, 'currentSalary')), 2)}%</span>
            )
          }
        ]
      },
      // {
      //   Header: () => <div className="ts-heading ts-main ts-main--adjustment"> Target</div>,
      //   columns: [
      //     {
      //       Header: '$',
      //       accessor: 'targetAmount',
      //       maxWidth: 70,
      //       Cell: row => (
      //         <span className="text-right">
      //           $ {_.sumBy(_.map(row.original.target, 'amount')).toLocaleString('en')}
      //         </span>
      //       ),
      //       Footer: (
      //         <span className="text-right">${_.sumBy(this.state.data, 'targetAmount').toLocaleString('en')}</span>
      //           )
      //     },
      //     {
      //       Header: '%',
      //       maxWidth: 40,
      //       accessor: 'targetpercentage',
      //       Cell: row => (
      //         <span className="text-right">
      //           $ {_.round(((_.sumBy(_.map(row.original.target, 'amount'))) * 100 / row.original.currentSalary), 2)}
      //         </span>
      //       ),
      //       Footer: (
      //         <span className="text-right">${_.round(((_.sumBy(this.state.data, 'targetAmount')) * 100 / _.sumBy(this.state.data, 'currentSalary')), 2) }</span>
      //       )
      //     }
      //   ]
      // },
      {
        Header: () => <div className="ts-heading ts-main ts-main--final"> Actual Pay</div>,
        columns: [
          {
            Header: 'STI Amount',
            maxWidth: 70,
            accessor: 'stiAmount',
            Cell: row => (
              <span className="text-right">
                $ {_.sumBy(_.map(row.original.sti, 'amount')).toLocaleString('en')}
              </span>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'stiAmount')}</span>
            )
          },
          {
            Header: 'LTI Amount',
            maxWidth: 80,
            accessor: 'ltAmount',
            Cell: row => (
              <div>
                <span className="text-right">$
                {row.value.toLocaleString('en')}
                </span>
              </div>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'ltAmount').toLocaleString('en')}</span>
            )
          }
          ,
          {
            Header: 'Total Pay',
            maxWidth: 65,
            accessor: 'totalPay',
            Cell: row => (
              <span className="text-right">
               ${(row.original.currentSalary+_.sumBy(_.map(row.original.sti, 'amount'))+row.original.ltAmount).toLocaleString('en')}
              </span>
            ),
            Footer: (
              <span className="text-right">${(_.sumBy(this.state.data, 'currentSalary')+_.sumBy(this.state.data, 'stiAmount')+_.sumBy(this.state.data, 'ltAmount')).toLocaleString('en')}</span>
                )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--promotion">Total Target Direct</div>,
        columns: [
          {
            Header: 'Next Year ABS',
            maxWidth: 80,
            accessor: 'finalAnnualSalary',
            Cell: row => (
              <span className="text-right">
                ${row.original.finalAnnualSalary.toLocaleString('en')}
              </span>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'finalAnnualSalary').toLocaleString('en')}</span>
                )
          },
          {
            Header: 'LTI Targets',
            maxWidth: 80,
            accessor: 'targetAmount',
            Cell: row => (
              <span className="text-right">
                {_.sumBy(_.map(row.original.target, 'amount')).toLocaleString('en')}
              </span>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'targetAmount').toLocaleString('en')}</span>
                )
          },
          {
            Header: 'Total TTD',
            maxWidth: 80,
            accessor: 'totalTtd',
            Cell: row => (
              <span className="text-right">
                {(_.sumBy(_.map(row.original.target, 'amount'))+row.original.finalAnnualSalary).toLocaleString('en')}
              </span>
            ),
            Footer: (
              <span className="text-right">${_.sumBy(this.state.data, 'finalAnnualSalary').toLocaleString('en')}</span>
                )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--promotion">Actions</div>,
        columns: [
          {
            Header: 'Status',
            maxWidth: 110,
            accessor: 'status',
            Cell: row => (
              <span className="text-right">
                {
                  this.getStatusField(row.original)
                }
              </span>
            )
          }
        ]
      }
    ];
    const sticolumns = [
      {
        Header: 'ABS',
        maxWidth: 80,
        accessor: 'abs'
      },
      {
        Header: 'Begin Date',
        maxWidth: 80,
        accessor: 'beginDate'
      },
      {
        Header: 'End Date',
        maxWidth: 80,
        accessor: 'endDate'
      },
      {
        Header: 'Cal days',
        maxWidth: 60,
        accessor: 'caldays'
      },
      {
        Header: 'FTE',
        maxWidth: 40,
        accessor: 'fte'
      },
      {
        Header: 'IPF',
        maxWidth: 40,
        accessor: 'ipf'
      },
      {
        Header: 'BPF',
        maxWidth: 40,
        accessor: 'bpf'
      },
      {
        Header: 'CPF',
        maxWidth: 40,
        accessor: 'cpf'
      },
      {
        Header: 'Target',
        maxWidth: 60,
        accessor: 'stitarget'
      },
      {
        Header: 'Total Amount',
        maxWidth: 80,
        accessor: 'amount',
        Cell: row => (
          <div>
            {Math.round((row.original.abs/365) * row.original.caldays * row.original.fte * (row.original.stitarget/100)).toLocaleString('en')}
          </div>
        )
      },
      {
        Header: 'Actions',
        accessor: 'Actions',
        maxWidth: 50,
        Cell: row => (
          <div className="table-actions text-center">{row.value}
            <a
              className="btn-action btn-delete"
              onClick={() => this.deleteSingleSti(row.original)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.21 17.7"><title>delete</title><path d="M13,3.19h.87V2H8.59V.38h-3V2H.38V3.19h.87V15a2.36,2.36,0,0,0,2.36,2.36h7A2.36,2.36,0,0,0,13,15ZM11.74,15A1.14,1.14,0,0,1,10.6,16.1h-7A1.14,1.14,0,0,1,2.47,15V3.19h9.26Z" fill="#175d9d" stroke="#175d9d" strokeMiterlimit="10" strokeWidth="0.75" /></svg>
            </a>
          </div>
            )
      }
    ];
    const targetcolumns = [
      {
        Header: 'Plan',
        maxWidth: 100,
        accessor: 'planName'
      },{
        Header: 'Target %',
        maxWidth: 70,
        accessor: 'percentage'
      },
      {
        Header: 'Amount',
        maxWidth: 90,
        accessor: 'amount',
        Cell: row => (
          <div>
            ${row.value.toLocaleString('en')}
          </div>
        )
      },
      {
        Header: 'Actions',
        maxWidth: 60,
        accessor: 'Actions',
        maxWidth: 98,
        Cell: row => (
          <div className="table-actions text-center">{row.value}
            {/* <a
              className="btn-action btn-add"
              onClick={() => this.handlereportClick(row, 'edit')}
            >
              <img src="/assets/images/icons/ico-edit.svg" alt="" />
            </a> */}
            <a
              className="btn-action btn-delete"
              onClick={() => this.deleteSingleTarget(row.original)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.21 17.7"><title>delete</title><path d="M13,3.19h.87V2H8.59V.38h-3V2H.38V3.19h.87V15a2.36,2.36,0,0,0,2.36,2.36h7A2.36,2.36,0,0,0,13,15ZM11.74,15A1.14,1.14,0,0,1,10.6,16.1h-7A1.14,1.14,0,0,1,2.47,15V3.19h9.26Z" fill="#175d9d" stroke="#175d9d" strokeMiterlimit="10" strokeWidth="0.75" /></svg>
            </a>
          </div>
            )
      }
    ];
    return (
      <div>
        <ReactTable
          className="salaryGrid"
          data={this.state.data}
          columns={columns}
          maxHeight
          pageSize={this.state.data.length}
          {...this.state.tableOptions}
          getTrProps={(state, rowInfo, column) => ({
              className: (rowInfo !== undefined
              && (rowInfo.original.meritAmount
              + rowInfo.original.ltAmount
              + rowInfo.original.stiAmount
              + rowInfo.original.targetAmount) > rowInfo.original.currentSalary) ? 'alert-red' : ''
            })}
          SubComponent={row => (
            <div className="data_entry_div">
              <Row className="no-margin no-padding">
                <Col lg={7} md={7} className="no-padding salarySec">
                  <Row className="no-margin no-padding">
                    <Col lg={12} md={12} className="no-padding bg-light-color">
                      <h2 className="toggler-title">
                        <strong>STI</strong>
                        <Button className="addButton" onClick={()=>this.showSTIForm(row.original)}>
                          <i className="fas fa-plus-square" aria-hidden="true" />
                        </Button>
                      </h2>
                    </Col>
                  </Row>
                  <Row className="no-margin no-padding">
                    {/* <Col lg={12} md={12} className="no-padding bg-light-color">
                      <Row className=" no-padding no-margin">
                        <Col lg={2} md={2}>
                          <input
                            type="text"
                            name="abs"
                            disabled
                            value={this.state.data[row.index].currentSalary}
                          />
                        </Col>
                        <Col lg={2} md={2} className="np-left">
                          <DatePicker readOnly selected={this.state.stiStartDate} onChange={this.handleStiStartDate} />
                        </Col>
                        <Col lg={2} md={2} className="np-left">
                          <DatePicker readOnly selected={this.state.stiEndDate} onChange={this.handleStiEndDate} />
                        </Col>
                        <Col lg={2} md={2} className="np-left">
                          <input
                            type="text"
                            name="caldays"
                            placeholder="Cal Days"
                            disabled
                            value={this.state.caldays}
                            onChange={this.setTextFiled}
                            onKeyPress={this.isNumber}
                          />
                        </Col>
                        <Col lg={1} md={1} className="np-left">
                          <input
                            type="text"
                            name="fte"
                            placeholder="FTE"
                            value={this.state.fte}
                            onChange={this.setTextFiled}
                            onKeyPress={this.isNumber}
                          />
                        </Col>
                        <Col lg={2} md={2} className="np-left">
                          <input
                            type="text"
                            name="stitarget"
                            placeholder="STI Target"
                            value={this.state.stitarget}
                            onChange={this.setTextFiled}
                            onKeyPress={this.isNumber}
                          />
                        </Col>
                        <Col lg={1} md={1} className="np-left">
                          <Button
                            className="addButton"
                            disabled={(this.state.caldays === '')
                            || (this.state.caldays === 0)
                            || (this.state.fte === '')
                            || (this.state.stitarget === '')}
                            onClick={() => this.addsti(row.original)}
                          >
                            <i className="fa fa-plus-square" aria-hidden="true" />
                          </Button>
                        </Col>
                      </Row>
                    </Col> */}
                    <Col lg={12} md={12} className="no-padding">
                      <ReactTable
                        className="stiGrid"
                        data={row.original.sti}
                        columns={sticolumns}
                        pageSize={row.original.sti.length}
                        showPagination={false}
                        collapseOnDataChange={false}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={1} md={1} id="borderCollapse" />
                <Col lg={4} md={4} className="no-padding targetSec">
                  <Row className="no-margin no-padding">
                    <Col lg={12} md={12} className="no-padding bg-light-color">
                      <h2 className="toggler-title">
                        <strong>NEW TARGETS</strong>
                        <Button className="addButton" onClick={()=>this.showTargetForm(row.original)}>
                          <i className="fas fa-plus-square" aria-hidden="true" />
                        </Button>
                      </h2>
                    </Col>
                  </Row>
                  <Row className="no-margin">
                    {/* <Col lg={12} md={12} className="no-padding bg-light-color">
                      <Row className="no-margin">
                        <Col lg={4} md={4}>
                          <input
                            type="text"
                            name="abs"
                            disabled
                            value={this.state.data[row.index].finalAnnualSalary}
                          />
                        </Col>
                        <Col lg={5} md={5} className="np-left">
                          <select onChange={this.planChangeEvent} name="planName">
                            <option value=''>Choose Target Plan</option>
                          {
                            this.state.data[row.index].employee[0].targetplans.map((plan, index) => {
                              return <option key={index} value={plan.plan[0]._id}>{plan.plan[0].name}</option>;
                            })
                          }
                          </select>
                        </Col>
                        <Col lg={2} md={2} className="np-left">
                          <input
                            type="text"
                            name="targetpercentage"
                            placeholder="target %"
                            value={this.state.targetpercentage}
                            onChange={this.setTextFiled}
                          />
                        </Col>
                        <Col lg={1} md={1} className="np-left">
                          <Button
                            className="addButton"
                            disabled={(this.state.targetpercentage === '')}
                            onClick={() => this.addTarget(row.original)}
                          >
                            <i className="fa fa-plus-square" aria-hidden="true" />
                          </Button>
                        </Col>
                      </Row>
                    </Col> */}
                    <Col lg={12} md={12} className="no-padding">
                      <ReactTable
                        className="targetGrid"
                        data={row.original.target}
                        columns={targetcolumns}
                        pageSize={row.original.target.length}
                        showPagination={false}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            )}
        />
        <StiModal closeModal={this.closeModal} isOpen={this.state.isStiModalOpen} stiData={this.state.stiData} />
        <TargetModal closeModal={this.closeModal} isOpen={this.state.isTargetModalOpen} targetData={this.state.targetData} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    salaryplan: state.salaryplan,
    targetPlanData: state.targetPlan,
    compPlanningStatusData: state.salaryplan.compPlanningStatus
  };
}
export default connect(mapStateToProps)(SalaryCompPlan);


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
import { Row, Col, Button } from 'react-bootstrap';
import { getSalaryPlan } from '../../actions/SalaryPlanAction';
// import data from './SalaryCompPlanData.json';
import './SalaryCompPlan.scss';

class SalaryCompPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true,
      data: this.props.salaryplan.salaryPlan,
      abs: '',
      caldays: '',
      fte: '',
      stitarget: '',
      targetpercentage: '',
      tableOptions: {
        loading: false,
        showPagination: false,
        showPageSizeOptions: true,
        showPageJump: false,
        collapseOnSortingChange: true,
        collapseOnDataChange: false,
        freezeWhenExpanded: false,
        filterable: false,
        sortable: false,
        resizable: true
      },
      blnCurr: false
    };
    this.setTextFiled = this.setTextFiled.bind(this);
    this.addsti = this.addsti.bind(this);
    this.deleteSingleSti = this.deleteSingleSti.bind(this);
    this.deleteSingleTarget = this.deleteSingleTarget.bind(this);
  }

  componentWillMount = () => {
    this.props.dispatch(getSalaryPlan());
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
    }
  }

  setTextFiled = (event) => {
    const validated = isNaN(event.target.value);
    if (!validated) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name]: '' });
    }
  }

  onMeritChange = (value, e) => {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', value]);
      if (index > -1) {
        ob[index].meritAmount = Number(e.target.value);
        ob[index].finalAnnualSalary = (ob[index].stiAmount + Number(e.target.value) + ob[index].ltAmount + ob[index].currentSalary);
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
        ob[index].finalAnnualSalary = (ob[index].stiAmount + Number(ob[index].meritAmount) + ob[index].ltAmount + ob[index].currentSalary);
        ob[index].totalIncrease = (ob[index].stiAmount + Number(ob[index].meritAmount) + ob[index].ltAmount);
        this.setState({ data: ob });
      }
    }
  }


  setCurrency(blnCurr) {
    this.setState({ blnCurr });
  }

  addsti = (value) => {
    const ran = Math.floor((Math.random() * 100) + 1);
    const ob = Object.assign([], this.state.data);
    const index = _.findIndex(ob, ['id', value.id]);
    // ABS * Cal days * FTE * target
    if (index > -1) {
      ob[index].sti.push({
        id: ran,
        parentID: value.id,
        abs: ob[index].currentSalary,
        caldays: Number(this.state.caldays),
        fte: Number(this.state.fte),
        stitarget: Number(this.state.stitarget),
        amount: (Number(ob[index].currentSalary)
        * Number(this.state.caldays) * Number(this.state.fte) * Number(this.state.stitarget))
      });
      ob[index].stiAmount = _.sumBy(ob[index].sti, 'amount');
      ob[index].finalAnnualSalary = (ob[index].stiAmount + ob[index].targetAmount + Number(ob[index].meritAmount) + Number(ob[index].ltAmount) + ob[index].currentSalary);
      ob[index].totalIncrease = (ob[index].stiAmount + ob[index].targetAmount + Number(ob[index].meritAmount) + Number(ob[index].ltAmount));
    }
    this.setState({ data: ob,
      caldays: '',
      fte: '',
      stitarget: ''
    });
  }

  addTarget = (value) => {
    const ran = Math.floor((Math.random() * 100) + 1);
    const ob = Object.assign([], this.state.data);
    const index = _.findIndex(ob, ['id', value.id]);
    if (index > -1) {
      ob[index].target.push({ id: ran,
        abs: ob[index].currentSalary,
        amount: (Number(this.state.targetpercentage) / 100) * ob[index].currentSalary,
        parentID: value.id,
        percentage: this.state.targetpercentage });
      ob[index].targetAmount = _.sumBy(ob[index].target, 'amount');
      ob[index].finalAnnualSalary = (ob[index].stiAmount + ob[index].targetAmount + Number(ob[index].meritAmount) + Number(ob[index].ltAmount) + ob[index].currentSalary);
      ob[index].totalIncrease = (ob[index].stiAmount + ob[index].targetAmount + Number(ob[index].meritAmount) + Number(ob[index].ltAmount));
    }
    this.setState({ data: ob, targetpercentage: '' });
  }

  deleteSingleSti = (value) => {
    const newArr = Object.assign([], this.state.data);
    const index = _.findIndex(newArr, ['id', value.parentID]);
    const deleteindex = _.findIndex(newArr[index].sti, ['id', value.id]);
    newArr[index].sti.splice(deleteindex, 1);
    this.setState({ data: newArr });
  }

  deleteSingleTarget = (value) => {
    const newArr = Object.assign([], this.state.data);
    const index = _.findIndex(newArr, ['id', value.parentID]);
    const deleteindex = _.findIndex(newArr[index].target, ['id', value.id]);
    newArr[index].target.splice(deleteindex, 1);
    this.setState({ data: newArr });
  }

  onLTChange = (value, e) => {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const ob = Object.assign([], this.state.data);
      const index = _.findIndex(ob, ['id', value]);
      if (index > -1) {
        ob[index].ltAmount = Number(e.target.value);
        ob[index].finalAnnualSalary = (ob[index].stiAmount + Number(ob[index].meritAmount) + Number(ob[index].ltAmount) + ob[index].currentSalary);
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
        ob[index].finalAnnualSalary = (ob[index].stiAmount + Number(ob[index].meritAmount) + Number(ob[index].ltAmount) + ob[index].currentSalary);
        ob[index].totalIncrease = (ob[index].stiAmount + ob[index].meritAmount + Number(ob[index].ltAmount));
        this.setState({ data: ob });
      }
    }
  }

  render() {
    const columns = [
      {
        Header: () => <div className="no-style s" />,
        columns: [
          {
            Header: 'Name',
            accessor: 'name'
          },
          {
            Header: 'Job Title',
            accessor: 'jobTitle'
          },
          {
            Header: 'Review Rating',
            accessor: 'reviewRating'
          },
          {
            Header: 'Prerating',
            accessor: 'preRating'
          },
          {
            Header: 'Local Currency Code',
            accessor: 'currencyCode'
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--salary"> Current Salary</div>,
        columns: [
          {
            Header: 'Current Anual Salary',
            accessor: 'currentSalary',
            Footer: (
              <span>${_.sumBy(this.state.data, 'currentSalary')}</span>
            )
          },
          {
            Header: 'Last Increase Date',
            accessor: 'increaseDate',
            Cell: row => (
              <div>
                {moment(row.value).format('DD/MM/YYYY')}
              </div>
            )
          },
          {
            Header: 'Compa-Ratio',
            accessor: 'compRatio',
            Cell: row => (
              <div>
                <div className="ts-status ts-status--ok" />
                <span>{row.value}%</span>
              </div>
            )
          },
          {
            Header: 'Range Penetration',
            accessor: 'rangePenetration'
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--merit"> Merit</div>,
        columns: [
          {
            Header: () =>
              <div>
                <div>Merit Guidelines</div>
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
            Cell: row => (
              <div>
                {this.state.blnCurr ?
                (`$${(Math.round(row.original.currentSalary) * row.original.minMerit) / 100}`)
                : (`${row.original.minMerit}%`)} - {this.state.blnCurr ? (`$${(Math.round(row.original.currentSalary) * row.original.maxMerit) / 100}`) : (`${row.original.maxMerit}%`)}
              </div>
            )
          },
          {
            Header: 'Amount',
            accessor: 'meritAmount',
            Cell: row => (
              <div>
                <span className="ts-input-label">$</span>
                <input
                  type="text"
                  className="ts-input"
                  value={row.value}
                  onChange={(e) => this.onMeritChange(row.original.id, e)}
                />
              </div>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'meritAmount')}</span>
            )
          },
          {
            Header: 'Percentage',
            accessor: 'meritpercentage',
            Cell: row => (
              <div>
                <span className="ts-input-label">%</span>
                <input
                  type="text"
                  className="ts-input"
                  value={_.round((Number(row.original.meritAmount) * 100 / row.original.currentSalary), 2)}
                  onChange={(e) => this.onMeritPercentageChange(row.original.id, e)}
                />
              </div>
            ),
            Footer: (
              <span>{_.round(((_.sumBy(this.state.data, 'meritAmount')) * 100 / _.sumBy(this.state.data, 'currentSalary')), 2)}%</span>
            )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--lump"> Short Term Incentives</div>,
        columns: [
          {
            Header: 'stiamount',
            accessor: 'stiAmount',
            Cell: row => (
              <span>
                $ {_.sumBy(_.map(row.original.sti, 'amount'))}
              </span>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'stiAmount')}</span>
            )
          },
          {
            Header: 'stipercentage',
            accessor: 'stipercentage',
            Cell: row => (
              <span>
                $ {_.round(((_.sumBy(_.map(row.original.sti, 'amount'))) * 100 / row.original.currentSalary), 2)}
              </span>
            ),
            Footer: (
              <span>${_.round(((_.sumBy(this.state.data, 'stiAmount')) * 100 / _.sumBy(this.state.data, 'currentSalary')), 2) }</span>
            )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--adjustment"> Target</div>,
        columns: [
          {
            Header: 'Target amount',
            accessor: 'targetAmount',
            Cell: row => (
              <span>
                $ {_.sumBy(_.map(row.original.target, 'amount'))}
              </span>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'targetAmount')}</span>
                )
          },
          {
            Header: 'Target percentage',
            accessor: 'targetpercentage',
            Cell: row => (
              <span>
                $ {_.round(((_.sumBy(_.map(row.original.target, 'amount'))) * 100 / row.original.currentSalary), 2)}
              </span>
            ),
            Footer: (
              <span>${_.round(((_.sumBy(this.state.data, 'targetAmount')) * 100 / _.sumBy(this.state.data, 'currentSalary')), 2) }</span>
            )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--promotion"> Long Term Incentive</div>,
        columns: [
          {
            Header: 'Amount',
            accessor: 'ltAmount',
            Cell: row => (
              <div>
                <span className="ts-input-label">$</span>
                <input
                  type="text"
                  className="ts-input"
                  value={row.value}
                  onChange={(e) => this.onLTChange(row.original.id, e)}
                />
              </div>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'ltAmount')}</span>
            )
          },
          {
            Header: 'Percentage',
            accessor: 'ltPercentage',
            Cell: row => (
              <div>
                <span className="ts-input-label">%</span>
                <input
                  type="text"
                  className="ts-input"
                  value={_.round((Number(row.original.ltAmount) * 100 / row.original.currentSalary), 2)}
                  onChange={(e) => this.onltPercentageChange(row.original.id, e)}
                />
              </div>
            ),
            Footer: (
              <span>${_.round(((_.sumBy(this.state.data, 'ltAmount')) * 100 / _.sumBy(this.state.data, 'currentSalary')), 2) }</span>
            )
          }
        ]
      },
      {
        Header: () => <div className="ts-heading ts-main ts-main--final"> Final Salary</div>,
        columns: [
          {
            Header: 'total Increase',
            accessor: 'totalIncrease',
            Cell: row => (
              <span>
                ${row.original.totalIncrease}
              </span>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'totalIncrease')}</span>
                )
          },
          {
            Header: 'total Increase %',
            accessor: 'totalIncreasePer',
            Cell: row => (
              <span>
                $ {_.round((row.original.totalIncrease * 100 / row.original.currentSalary), 2)}
              </span>
            ),
            Footer: (
              <span>%</span>
                )
          },
          {
            Header: 'Final Annual Salary',
            accessor: 'finalAnnualSalary',
            Cell: row => (
              <span>
                ${row.original.finalAnnualSalary}
              </span>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'finalAnnualSalary')}</span>
                )
          },
          {
            Header: 'Total Pay',
            accessor: 'totalPay',
            Cell: row => (
              <span>
               ${row.original.finalAnnualSalary}
              </span>
            ),
            Footer: (
              <span>${_.sumBy(this.state.data, 'finalAnnualSalary')}</span>
                )
          }
        ]
      }
    ];
    const sticolumns = [
      {
        Header: 'ABS',
        accessor: 'abs'
      },
      {
        Header: 'Cal days',
        accessor: 'caldays'
      },
      {
        Header: 'FTE',
        accessor: 'fte'
      },
      {
        Header: 'Target',
        accessor: 'stitarget'
      },
      {
        Header: 'Total Amount',
        accessor: 'amount',
        Cell: row => (
          <div>
            {row.original.abs * row.original.caldays * row.original.fte * row.original.stitarget}
          </div>
        )
      },
      {
        Header: 'Actions',
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
        Header: 'ABS',
        accessor: 'abs'
      },
      {
        Header: 'Target %',
        accessor: 'percentage'
      },
      {
        Header: 'Target Amount',
        accessor: 'amount',
        Cell: row => (
          <div>
            ${row.value}
          </div>
        )
      },
      {
        Header: 'Actions',
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
            <div style={{ padding: '10px' }}>
              <Row className="no-margin">
                <Col lg={6} md={6}>
                  <h1 className="toggler-title"> <strong>STI</strong> </h1>
                  <Row className="no-margin">
                    <Col lg={4} md={4} className="no-padding">
                      <div className="Row">
                        <div className="row no-margin margin-bottom">
                          <div className="col-md-6 np-left">
                            <input
                              type="text"
                              name="abs"
                              disabled
                              value={this.state.data[row.index].currentSalary}
                            />
                          </div>
                          <div className="col-md-6 np-left">
                            <input
                              type="text"
                              name="caldays"
                              placeholder="cal days"
                              value={this.state.caldays}
                              onChange={this.setTextFiled}
                            />
                          </div>
                          <div className="col-md-6 np-left">
                            <input
                              type="text"
                              name="fte"
                              placeholder="fte"
                              value={this.state.fte}
                              onChange={this.setTextFiled}
                            />
                          </div>
                          <div className="col-md-6 np-left">
                            <input
                              type="text"
                              name="stitarget"
                              placeholder="sti target"
                              value={this.state.stitarget}
                              onChange={this.setTextFiled}
                            />
                          </div>
                          <div className="col-md-12 text-right">
                            <Button
                              className="btn compPlanButton"
                              disabled={(this.state.caldays === '')
                              || (this.state.fte === '')
                              || (this.state.stitarget === '')}
                              onClick={() => this.addsti(row.original)}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg={8} md={8} className="no-padding">
                      <ReactTable
                        data={row.original.sti}
                        columns={sticolumns}
                        pageSize={row.original.sti.length}
                        showPagination={false}
                        collapseOnDataChange={false}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} className="padding">
                  <h1 className="toggler-title"> <strong>TARGET</strong> </h1>
                  <Row className="no-margin">
                    <Col lg={4} md={4} className="no-padding">
                      <div className="row no-margin margin-bottom">
                        <div className="col-md-6 np-left">
                          <input
                            type="text"
                            name="abs"
                            disabled
                            value={this.state.data[row.index].currentSalary}
                          />
                        </div>
                        <div className="col-md-6 np-left">
                          <input
                            type="text"
                            name="targetpercentage"
                            value={this.state.targetpercentage}
                            onChange={this.setTextFiled}
                          />
                        </div>
                        <div className="col-md-12 text-right">
                          <Button
                            className="btn compPlanButton"
                            disabled={(this.state.targetpercentage === '')}
                            onClick={() => this.addTarget(row.original)}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={8} md={8} className="no-padding">
                      <ReactTable
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    salaryplan: state.salaryplan
  };
}
export default connect(mapStateToProps)(SalaryCompPlan);


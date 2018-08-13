/**
 * @file Compensation Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
// import SalaryPlan from '../SalaryPlan/SalaryPlan';
import SalaryCompPlan from '../SalaryCompPlan/SalaryCompPlan';
import './CompensationPlan.scss';
import PerformanceMatrix from './PerformanceMatrix';
import PerformanceBarChart from './PerformanceBarChart';
import MeritPerformanceBarChart from './MeritPerformanceBarChart';
import { saveCompPlan } from '../../actions/SalaryPlanAction';
import { loadSimulationVersions } from '../../actions/OrgchartAction';

class CompensationPlan extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.saveCompPlan = this.saveCompPlan.bind(this);
    this.state = {
      test: true,
      data: [
        {
          name: 'mahesh',
          lastname: 'n',
          sti: [],
          total: [],
          age: '12',
          visits: '15'
        }
      ],
      tabData: [
        { payBand: '>120%', count1: '', count2: '2', count3: '5', count4: '12', count5: '5' },
        { payBand: '111%-120%', count1: '3', count2: '3', count3: '34', count4: '21', count5: '4' },
        { payBand: '91%-110%', count1: '1', count2: '4', count3: '58', count4: '13', count5: '7' },
        { payBand: '81%-90%', count1: '1', count2: '18', count3: '12', count4: '7', count5: '2' },
        { payBand: '<=80%', count1: '4', count2: '5', count3: '3', count4: '1', count5: '' },
        { payBand: '', count1: '1', count2: '2', count3: '3', count4: '4', count5: '5' }
      ]
    };
  }
  componentWillMount() {
    this.props.dispatch(loadSimulationVersions());
  }
  toggleElement(elementID) {
    console.log(elementID);
    const x = document.getElementById(elementID);
    if (elementID === 'performanceBox') {
      // alert('Performacne');
      document.getElementById('salaryGrid').classList.toggle('expandHeight');
      console.log(document.getElementById('salaryGrid'));
      // salaryGrid
    } else {
      // alert('Grid');
    }
    x.classList.toggle('active');
  }
  saveCompPlan() {
    this.props.dispatch(saveCompPlan(this.props.salaryplan.salaryPlan));
  }
  render() {
    // console.log(this.props.versions);
    return (
      <div className="container no-padding">
        <div className="content-inner">
          <div className="row">
            <div className="col-xs-12 no-padding">
              <div className="">
                <div className="box-content box-content--light">
                  <div className="row-no-padding">
                    <div className="col-xs-12 no-padding">
                      <div className="box-tab active">
                        <div className="box-inner--no-pad">
                          <div className="toggler active" id="performanceBox">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h1 className="toggler-title">Performance</h1>
                              <span className="box-filter-arrow com-plan-arrow" onClick={() => this.toggleElement('performanceBox')} />
                            </div>
                            <div className="toggler-content">
                              <div className="charts-col">
                                <h3 className="charts-label">
                                  Performance Distribution
                                </h3>
                                <PerformanceBarChart data={this.props.salaryplan.salaryPlan} />
                              </div>

                              <div className="charts-col charts-height">
                                <h3 className="charts-label">
                                  Pay / Performance Matrix
                                </h3>
                                <PerformanceMatrix data={this.state.tabData} />
                              </div>

                              <div className="charts-col">
                                <h3 className="charts-label">
                                  Merit % by Performance & Currency
                                </h3>
                                <MeritPerformanceBarChart />
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="box-tab active">
                        <div className="box-inner box-inner--no-pad">
                          <div className="toggler active" id="salaryGrid">
                            <div className="toggler-bar toggler-bar--no-top">
                              <h1 className="toggler-title">Merit STI LTI Planning:</h1>
                              {/* <span className="box-filter-versions">
                                <select>
                                  <option>Choose Simulation Version</option>
                                  {
                                    this.props.versions.map((version) => {
                                      const versionName = version.versionName;
                                      return <option value={version.id}>{versionName}</option>;
                                    })
                                  }
                                </select>
                              </span> */}
                              <span className="box-filter-arrow-cloud com-plan-arrow" onClick={this.saveCompPlan}><i className="fas fa-cloud cloudSave" aria-hidden="true" /></span>
                              <span className="box-filter-arrow com-plan-arrow" onClick={() => this.toggleElement('salaryGrid')} />
                            </div>
                            <div className="table-wrapper toggler-content">
                              <div className="tables-container">
                                <div className="ts-people col-lg-12">
                                  <SalaryCompPlan />
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
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    salaryplan: state.salaryplan,
    versions: state.OrgchartReducer.comp_versions
  };
}
export default connect(mapStateToProps)(CompensationPlan);

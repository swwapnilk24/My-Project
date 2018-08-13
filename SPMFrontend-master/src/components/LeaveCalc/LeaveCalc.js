import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { connect } from 'react-redux';
import { getLeaveCalcData } from '../../actions/LeavesMasterDataAction';

class LeaveCalc extends React.Component {
  constructor(props) {
    super(props);
    this.rowGetterTest = this.rowGetterTest.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = {
      selMonth: '',
      selYear: '',
      gridCols: [{ key: 'name', name: 'Leave Type' }, { key: 'value', name: 'No.Of Days' }, { key: 'employee_id', name: 'Employee Id' }],
      gridRowsLeaveAvailedData: [],
      columns: [{ key: 'id', name: 'ID' }, { key: 'name', name: 'Employee Names' }, { key: 'salary', name: 'salary' }],
      rows: [{ id: 1, name: 'prajith', salary: 200000 }, { id: 2, name: 'basha', salary: 200000 }, { id: 3, name: 'surendra', salary: 200000 }, { id: 4, name: 'phani', salary: 200000 }]
    };
  }
  componentWillMount() {
    const dateparam = '2018-01';
    this.props.dispatch(getLeaveCalcData(dateparam));
  }
  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    const tempArr = [];
    newProps.leaveAvailedData.map((items, i) => {
      console.log(items);
      items.values.map((items1, j) => {
        tempArr.push(items1);
        return j;
      });
      console.log('items', items.values);
      // this.state.gridRowsLeaveAvailedData.push(items.values);
      return i;
    });
    console.log('items', tempArr);
    this.setState({ gridRowsLeaveAvailedData: tempArr });
  }
  rowGetterTest(parameter) {
    console.log('parameter', this.state.gridRowsLeaveAvailedData);
    //return this.state.gridRowsProdSupportData[parameter];
    return this.state.gridRowsLeaveAvailedData[parameter];
  }
  changeMonth(event) {
    console.log('event', event.target.value);
    this.setState({ selMonth: event.target.value });
  }
  changeYear(event) {
    console.log('event', event.target.value);
    this.setState({ selYear: event.target.value });
  }
  submitData() {
    const selDate = `${this.state.selYear}-${this.state.selMonth}`;
    console.log('selDate', selDate);
    this.props.dispatch(getLeaveCalcData(selDate));
  }
  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="toggler active">
            <div className="toggler-bar js-toggler-bar">
              <h2 className="toggler-title mgn-left">Leave Calculation</h2>
            </div>
            <div className="toggler-content">
              <div className="row">
                <table className="table table--stripes">
                  <tbody>
                    <tr>
                      {/* <td className="table-align span">
                        <span className="table-label span">Select Month</span>
                      </td>
                      <td>Basic</td> */}
                      <td className="table-align span">
                        <span className="table-label span">Select Month</span>
                      </td>
                      <td>
                        <select className="custom-select" onChange={this.changeMonth}>
                          <option value="--Select Month--">--Select Month--</option>
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May`</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="13">December</option>
                        </select>
                      </td>
                      <td className="table-align span">
                        <span className="table-label span">Select Year</span>
                      </td>
                      <td>
                        <select className="custom-select" onChange={this.changeYear}>
                          <option value="--Select Year--">--Select Year--</option>
                          <option value="2018">2018</option>
                          <option value="2019">2019</option>
                        </select>
                      </td>
                      <td>
                        <div className="form-group">
                          <input type="button" name="Submit" onClick={this.submitData} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="toggler-content">
                <ReactDataGrid
                  columns={this.state.gridCols}
                  rowGetter={this.rowGetterTest}
                  rowsCount={this.state.gridRowsLeaveAvailedData.length}
                  enableCellSelect
                  onCellSelected = {this.getRowID}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('State', state.prodSupport);
  console.log('master changed triggering');
  return {
    leaveAvailedData: state.leavesMasterData.listLeaveAvailedData
  };
}
export default connect(mapStateToProps)(LeaveCalc);

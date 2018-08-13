import React from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class PerformanceBarChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { data: [] };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== undefined) {
      this.state.data = [];
      nextProps.data.map((employee, index) => {
        this.state.data.push({ name: employee.name, Performance: (employee.objective + employee.objective) });
        return index;
      });
    }
  }
  render() {
    return (
      <BarChart
        width={400}
        height={200}
        data={this.state.data}
        margin={{ top: 0, left: 0, right: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" interval={0} fontFamily="Arial, sans-serif" fontSize="12px" />
        <YAxis />
        <Tooltip />
        <Legend fontFamily="Arial, sans-serif" fontSize="2px" />
        <Bar dataKey="Performance" fill="#8d1f1b" barSize={15} />
      </BarChart>
    );
  }
}
function MapStateToProps(state) {
  return {
    salaryplan: state.salaryplan
  };
}
export default connect(MapStateToProps)(PerformanceBarChart);

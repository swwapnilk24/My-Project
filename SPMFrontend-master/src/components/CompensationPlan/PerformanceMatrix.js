import React from 'react';

class PerformanceMatrix extends React.Component {
  render() {
    const tableBody = this.props.data.map((payRow, index) =>
      <tr key={index}>
        <td className="performanceMatrix">{payRow.payBand}</td>
        <td className="performanceMatrix">{payRow.count1}</td>
        <td className="performanceMatrix">{payRow.count2}</td>
        <td className="performanceMatrix">{payRow.count3}</td>
        <td className="performanceMatrix">{payRow.count4}</td>
        <td className="performanceMatrix">{payRow.count5}</td>
      </tr>
    );
    return (
      <div>
        <label style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>Pay</label>
        <table className="performanceMatrix" style={{ width: '100%', height: '135px' }}>
          <thead />
          <tbody>
            {tableBody}
          </tbody>
        </table>
        <div>
          <label style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>Performance</label>
        </div>
      </div>
    );
  }
}

export default PerformanceMatrix;

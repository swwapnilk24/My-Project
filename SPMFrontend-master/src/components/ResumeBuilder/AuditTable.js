import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class AuditTable extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  close() {
    this.props.close();
  }
  render() {
    console.log('audit data table', this.props.auditData);
    return (
      <div>
        <div className="card-header">
          {this.props.headerName}
          <button type="button" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <ReactTable
            data={this.props.auditData}
            columns={this.props.auditColumns}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

export default AuditTable;

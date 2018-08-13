import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class AuditTable extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    console.log('auditdata', props.auditData);
  }
  close() {
    this.props.close();
  }
  render() {
    return (
      <div className="expandModalWidth">
        <div className="card-header">
          {this.props.headerName}
          <button type="button" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer audit-no-pad">
          <ReactTable
            data={this.props.auditData}
            columns={this.props.auditColumns}
            defaultPageSize={10}
            // defaultSortDesc
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

export default AuditTable;

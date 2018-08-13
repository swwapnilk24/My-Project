import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class CustomReactTable extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  close() {
    this.props.close();
  }
  render() {
    return (
      <div className={this.props.customWidth ? this.props.customWidth : 'expandModalWidth'}>
        <div className="card-header">
          {this.props.headerName}
          { this.props.noClose ?
            '' :
            <button type="button" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          }
        </div>
        <div className="card-footer audit-no-pad">
          <ReactTable
            data={this.props.auditData}
            columns={this.props.auditColumns}
            defaultPageSize={this.props.pageSize ? this.props.pageSize : 10}
            filterable
            defaultFilterMethod={(filter, row) => { const searchInput = new RegExp(filter.value, 'i'); return searchInput.test(row[filter.id]); } }
            // defaultSortDesc
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

export default CustomReactTable;

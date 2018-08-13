import React from 'react';
import Modal from 'react-responsive-modal';
import ReactDataGrid from 'react-data-grid';

class ExpandableModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  close() {
    this.props.close();
  }
  render() {
    return (
      <Modal
        open={this.props.open}
      >
        <div className="card expandModalWidth">
          <div className="card-header">
            {this.props.headerName}
            <button type="button" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div>
            <form>
              <div>
                <ReactDataGrid
                  columns={this.props.columns}
                  rowGetter={this.props.rowGetter}
                  rowsCount={this.props.length}
                  minHeight={this.props.gridSize}
                  enableCellSelect
                  // onCellSelected={this.getRowIDForJobInformation}
                  showCheckbox={false}
                  // rowSelection={{
                  //   showCheckbox: false,
                  //   selectBy: {
                  //     indexes: this.state.currentSelectedIndexForJobInformation
                  //   }
                  // }}
                  enableRowSelect={false}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ExpandableModal;

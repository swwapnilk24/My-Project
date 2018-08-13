import React from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

class Hiring extends React.Component {
  constructor(props) {
    super(props);
    this.getAddressInGrid2 = this.getAddressInGrid2.bind(this);
    this.getRowIdForBranchAddress = this.getRowIdForBranchAddress.bind(this);
    this.state = {
      syncedWithServer: true,
      columnsForCompanyAddress: [{ key: 'Address_Line_1', name: 'Address Line 1', resizable: true }, { key: 'Address_Line_2', name: 'Address Line 2', resizable: true }, { key: 'City', name: 'City', resizable: true }, { key: 'Country', name: 'Country', resizable: true }, { key: 'State', name: 'State', resizable: true }, { key: 'ZIP', name: 'ZIP', resizable: true }],
      rowsForReactDataGrid: [],
      columnsForBranchesGrid: [{ key: 'companyName', name: 'Job Title' },
      { key: 'country', name: 'Req ID' },
      { key: 'state', name: 'Hiring Manager' },
      { key: 'city', name: 'Recruiter' },
      { key: 'addressLine1', name: 'Division' },
      { key: 'addressLine2', name: 'Location' },
      { key: 'zip', name: 'Currently with' },
      { key: 'numberOfEmployees', name: 'Due: Expiry date' },
      { key: 'phoneNumber', name: 'Candidates' },
      { key: 'faxNumber', name: 'Progress' },
      { key: 'mailId', name: 'Requisition Status' },
      { key: 'website', name: 'Job Start Date' }],
      rowsForBranchesGrid: [],
      showingForBranchesForm: false,
      currentSelectedIndexForBranchAddress: [-1],
      currentDataForBranchesForm: {},
      formTypeForBranchesForm: '',
      showingHistoryForBranches: false,
      columnsForBranches: [{ accessor: 'companyName', Header: 'Branch Name' }, { accessor: 'country', Header: 'Country' }, { accessor: 'state', Header: 'State' }, { accessor: 'city', Header: 'City' }, { accessor: 'addressLine1', Header: 'AddressLine1' }, { accessor: 'addressLine2', Header: 'AddressLine2' }, { accessor: 'zip', Header: 'ZIP' }, { accessor: 'numberOfEmployees', Header: 'Number of Employees' }, { accessor: 'phoneNumber', Header: 'phone Number' }, { accessor: 'faxNumber', Header: 'Fax number' }, { accessor: 'mailId', Header: 'Email' }, { accessor: 'website', Header: 'Website' }, { accessor: 'insertedBy', Header: 'Inserted By' }, { accessor: 'insertedDate', Header: 'Date' }, { accessor: 'operationType', Header: 'Operation Type' }],
      caGridSize: 35,
      caGridWidth: 1250,
      showingHistoryForHomeBranch: false,
      currentSelectedIndexForCurrentAddress: [-1],
      isActive: false,
      isActiveEdit: false,
      isActiveAdd: false,
      scrollPosition: undefined,
      currentSelectedIndexForCompanyAddress: [-1],
      currentGridDataObjectForCompanyAddress: {}
    };
  }
  getAddressInGrid2(index) {
    console.log(this.state.rowsForReactDataGrid[index]);
    return this.state.rowsForBranchesGrid[index];
  }
  getRowIdForBranchAddress(data) {
    const selectedRowIndex = data.rowIdx;
    const rowID = [selectedRowIndex];
    this.setState({ currentSelectedIndexForBranchAddress: rowID });
    this.setState({ currentDataForBranchesForm: this.state.rowsForBranchesGrid[rowID] });
  }

  render() {
    return (
      <div className="row">

        <div className="col-xs-12 col-lg-12">
          <div className="box-content">

            <div className="row-no-padding">
              <div className="col-xs-12 col-lg-12 no-padding">

                <div className="box-tab active">

                  <div className="box-inner--no-pad">

                    <div className="toggler active" id="keyJobAttribute">

                      <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                        <h2 className="toggler-title-new">Job Requisitions</h2>
                        <div id="keyJobAttributeToggle" className="toggleAction">
                          <ul className="box-actions" >
                            <li>
                              <a onClick={this.addKeyJobAttributes}>
                                <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.editKeyJobAttributes}>
                                <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                              </a>
                            </li>
                            <li>
                              <a onClick={this.openKJAAudit}>
                                <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                              </a>
                            </li>
                            <li>
                              {/* <Link to={`/Help/${'JIEDKJ000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link> */}
                            </li>
                          </ul>
                        </div>
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('keyJobAttribute')} />
                      </div>

                      <div className="toggler-content ji-padding-bottom">
                        <div id="kJASnackBar" className="snackBarStyle actionDisable">
                          {/* <CustomSnackBar show={this.state.snackBarIsOpen} data={this.state.editErrorMessage} /> */}
                        </div>
                        <ReactDataGrid
                          columns={this.state.columnsForBranchesGrid}
                          rowGetter={this.getAddressInGrid2}
                          rowsCount={this.state.rowsForBranchesGrid.length}
                          minHeight={this.state.caGridSize}
                          enableCellSelect
                          onCellSelected={this.getRowIdForBranchAddress}
                          showCheckbox={false}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.currentSelectedIndexForBranchAddress
                            }
                          }}
                          enableRowSelect={false}
                        />
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
    hiringData: state.companyData.companyData
  };
}

export default connect(mapStateToProps)(Hiring);

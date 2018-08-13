import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import './resumeBuilder.scss';
import { fetchFromDataBase, updateResumeBuilderAndAuditData, updateProfileSummary, updateContacts } from '../../actions/ResumeBuilderActions';
import CustomModal from './customModal';
import ProfileSummaryForm from './ProfileSummaryForm';
import ContactsForm from './contactsForm';

class ResumeBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.educationalRowGetter = this.educationalRowGetter.bind(this);
    this.openProfileSummaryForm = this.openProfileSummaryForm.bind(this);
    this.closeProfileSummaryForm = this.closeProfileSummaryForm.bind(this);
    this.submittedProfileSummaryForm = this.submittedProfileSummaryForm.bind(this);
    // contacts methods
    this.openContactsForm = this.openContactsForm.bind(this);
    this.closeContactsForm = this.closeContactsForm.bind(this);
    this.submittedContactsForm = this.submittedContactsForm.bind(this);
    this.state = {
      educationalColumns: [{ key: 'qualification', name: 'Qualification' }, { key: 'college', name: 'College' }, { key: 'year', name: 'Year' }, { key: 'university', name: 'University' }, { key: 'percentage', name: 'Percentage' }, { key: 'qualificationDetails', name: 'Qulaification Details' }],
      educationalRows: [],
      currentGridDataForProfileSummary: {},
      currentGridDataForContacts: {},
      showingForProfileSummary: false,
      showingForContacts: false
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchFromDataBase('emp123'));
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.resumeBuilderData.resumeBuilderData.profileSummary);
    this.setState({ currentGridDataForProfileSummary: newProps.resumeBuilderData.resumeBuilderData.profileSummary });
    this.setState({ currentGridDataForContacts: newProps.resumeBuilderData.resumeBuilderData.contacts });
  }
  toggleElement(id) {
    document.getElementById(id).classList.toggle('active');
  }
  educationalRowGetter(index) {
    return this.state.sampleRows[index];
  }
  openProfileSummaryForm() {
    this.setState({ showingForProfileSummary: true });
  }
  closeProfileSummaryForm() {
    this.setState({ showingForProfileSummary: false });
  }
  submittedProfileSummaryForm(data, type) {
    console.log(data, type);
    const newRows = {};
    newRows.profileSummaryData = data;
    this.props.dispatch(updateResumeBuilderAndAuditData({ newRows, section: 'summaryProfile' }));
    this.props.dispatch(updateProfileSummary('emp123', data));
    this.setState({ showingForProfileSummary: false });
  }
  openContactsForm() {
    this.setState({ showingForContacts: true });
  }
  closeContactsForm() {
    this.setState({ showingForContacts: false });
  }
  submittedContactsForm(data, type) {
    console.log(data, type);
    this.props.dispatch(updateContacts('emp123', data));
    this.closeContactsForm();
  }
  render() {
    // console.log('resume build', this.props.resumeBuilderData.resumeBuilderData.profileSummary.firstName);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.5 38.5">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <polygon
                            points="0 0 0 38.5 38.5 38.5 38.5 36 34.5 36 34.5 12 32 12 32 36 26.5 36 26.5 16 24 16 24 36 18.5 36 18.5 20 16 20 16 36 10.5 36 10.5 24 8 24 8 36 2.5 36 2.5 0 0 0"
                            fill="#f4f7fa"
                          />
                          <polygon points="24 4.27 24 8.5 26.5 8.5 26.5 0 18 0 18 2.5 22.23 2.5 10.29 14.44 12.06 16.2 24 4.27" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg> */}
                  </div>
                  <h2 className="box-title">Resume Builder</h2>
                </li>

              </ul>
              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="profileSummary">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Profile Summary</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                {/* <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <a onClick={this.openProfileSummaryForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('profileSummary')} />
                          </div>

                          <div className="toggler-content">
                            <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Resume Title:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.resumeTitle}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Display Name:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.displayName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      First Name:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.firstName}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Last Name:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.lastName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      DoB (dd-mm-yyyy):
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.dob}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Gender:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.gender}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Martial Status:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.maritalStatus}
                                  </td>
                                  {/* <td className="table-align">
                                    <span className="table-label">
                                      Profile Type:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.profileType}
                                  </td> */}
                                  <td className="table-align">
                                    <span className="table-label">
                                      Experience Years:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.experienceYears}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Experience Months:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.experienceMonths}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Currency:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.currency}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      CTC:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.ctc}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Video Link:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.videoLink}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      LinkedIn:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.linkedIn}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      WhatsApp Number:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.whatsappNumber}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Current Location:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.currentLocation}
                                  </td>
                                  <td />
                                  <td />
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Current Industry:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.currentIndustry}
                                  </td>
                                  <td />
                                  <td />
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Profile Summary:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.profileSummary.profileSummary}
                                  </td>
                                  <td />
                                  <td />
                                </tr>
                              </tbody>
                            </table>
                            <CustomModal Form={<ProfileSummaryForm formType={'edit'} data={this.state.currentGridDataForProfileSummary} closeEvent={this.closeProfileSummaryForm} submitEvent={this.submittedProfileSummaryForm} />} show={this.state.showingForProfileSummary} />
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="contacts">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Contacts</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                {/* <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <a onClick={this.openContactsForm}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('contacts')} />
                          </div>

                          <div className="toggler-content">
                            <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Country:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.country}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      State:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.state}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      City:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.city}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      ZIP:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.zip}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Mail ID:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.Email}
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Contacts:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.contacts}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      Current Address:
                                    </span>
                                  </td>
                                  <td>
                                    {this.props.resumeBuilderData.resumeBuilderData.contacts.currentAddress}
                                  </td>
                                  <td />
                                  <td />
                                </tr>
                              </tbody>
                            </table>
                            <CustomModal Form={<ContactsForm formType={'edit'} data={this.state.currentGridDataForContacts} closeEvent={this.closeContactsForm} submitEvent={this.submittedContactsForm} />} show={this.state.showingForContacts} />
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="educational">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Educational</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('educational')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Qualification:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Year:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Percentage:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * College:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * University/Board:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Qualification Details:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                            <ReactDataGrid
                              minHeight={200}
                              columns={this.state.educationalColumns}
                              rowGetter={this.educationalRowGetter}
                              rowsCount={this.state.educationalRows.length}
                              enableCellSelect
                              onCellSelected={this.getRowIDForCompensation}
                              showCheckbox={false}
                              // emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.currentSelectedIndexForCompensation
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
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="employment">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Employment</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('employment')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Employer:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Country:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * State:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * City:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Industry:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Portfolio:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Designation:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Role:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Start Date:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * End Date:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="assignments">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Assignments/Projects</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('assignments')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Employer:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Client:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Project Name:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Industry:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Start Date:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * End Date:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Location:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Role:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Expertise/Skills:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="expertiseskills">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Expertise/Skills</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('expertiseskills')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Industry:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Technology/Portfolio:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Skills:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Skill Level:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Experience (Months):
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="training">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Training</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('training')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Course Title:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Type:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Days:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Training Company:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Month:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              *  Year:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="certifications">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Certifications</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('certifications')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Title:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Company Name:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Month:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Year:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="visa">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Visa</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('visa')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Country:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Type:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Valid Till(dd-mm-yyyy):
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="preferredjobloc">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Preferred Job Location</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('preferredjobloc')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Country:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * State:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * City:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="salarydetails">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Salary Details</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                {/* <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li> */}
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('salarydetails')} />
                          </div>

                          <div className="toggler-content">
                            <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Currency:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Current CTC:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Fixed Component:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Variable Component:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-align">
                                    <span className="table-label">
                                      * Expected CTC:
                                    </span>
                                  </td>
                                  <td>
                                    <input className="textBoxStyle entry-input" />
                                    <div className="errorHolder" />
                                  </td>
                                  <td />
                                  <td />
                                </tr>
                              </tbody>
                            </table>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="hobbies">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Hobbies</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('hobbies')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Hobby:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Display Name:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="spokenlanguages">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Spoken Languages</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('spokenlanguages')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Language:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Display Name:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="membership">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Membership</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('membership')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Membership Details:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Location:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">


              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="awards">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Awards</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.addOpenForCompensation}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.EditOpenForCompensation}>
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <Link to={`/Help/${'CSCICS000'}`} target="_blank" >
                                    <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('awards')} />
                          </div>

                          <div className="toggler-content">
                            {/* <table className="table table--stripes">
                              <tbody>
                                <tr>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Title:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Company Name:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                    <table className="table table--stripes">
                                      <tbody>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Month:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="table-align">
                                            <span className="table-label">
                                              * Year:
                                            </span>
                                          </td>
                                          <td>
                                            <input className="textBoxStyle entry-input" />
                                            <div className="errorHolder" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
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
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Contacts
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Educational
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Employment
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Assignments/Projects
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Expertise/Skills
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Training
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Certifications
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Visa
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Preferred Job Location
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Salary Details
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Hobbies
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Spoken Languages
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Membership
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button>+</button>Awards
          </div>
        </div>
      </div>);
  }
}
function mapStateToProps(state) {
  return {
    resumeBuilderData: state.resumeBuilderData
  };
}
export default connect(mapStateToProps)(ResumeBuilder);

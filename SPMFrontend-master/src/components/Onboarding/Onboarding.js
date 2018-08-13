import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';
import CustomGaugeChart from '../Shared/CustomGaugeChart';
import MarksTranscripts from './MarksTranscripts';
import CustomModal from '../JobInfo/CustomModal';
import './Onboarding.scss';
import AuthorizedComponent from '../Routes/AuthorizedComponent';

class Onboarding extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.state = {
      marksTranscriptsIsOpen: false,
      marksTranscripts: [],
      marksTranscriptsColumns: [{ key: 'docName', name: 'Document Name' }, { key: 'status', name: 'Status' }],
      currentSelectedIndexForMarksTranscripts: [-1],
      currentGridDataObjectForMarksTranscripts: {},
      marksTranscriptsType: ''
    };
    this.addMarksTranscripts = this.addMarksTranscripts.bind(this);
    this.editMarksTranscripts = this.editMarksTranscripts.bind(this);
    this.closeMarksTranscripts = this.closeMarksTranscripts.bind(this);
    this.submitMarksTranscripts = this.submitMarksTranscripts.bind(this);
    this.rowGetterForMarksTranscripts = this.rowGetterForMarksTranscripts.bind(this);
    this.getRowIDForMarksTranscripts = this.getRowIDForMarksTranscripts.bind(this);
  }
  getRowIDForMarksTranscripts(data) {
    // this.setState({ scrollPosition: window.scrollY });
    // console.log(data);
    const temp = data.rowIdx;
    const rowID = [temp];
    this.setState({ currentSelectedIndexForMarksTranscripts: rowID });
    const object = this.state.marksTranscripts[temp];
    object.uniqueID = temp;
    this.setState({ currentGridDataObjectForMarksTranscripts: object }, () => {
      console.log(this.state.currentGridDataObjectForMarksTranscripts);
    });
  }
  toggleElement(elementID, elementActionID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementActionID !== '') {
      const y = document.getElementById(elementActionID);
      y.classList.toggle('disable');
    }
  }
  addMarksTranscripts() {
    this.setState({ marksTranscriptsType: 'add' });
    this.setState({ marksTranscriptsIsOpen: true });
  }
  editMarksTranscripts() {
    this.setState({ marksTranscriptsType: 'edit' });
    this.setState({ marksTranscriptsIsOpen: true });
  }
  closeMarksTranscripts() {
    this.setState({ marksTranscriptsIsOpen: false });
  }
  submitMarksTranscripts(uploadedFiles) {
    const newMarksTranscripts = uploadedFiles;
    this.setState({ marksTranscripts: newMarksTranscripts });
    this.setState({ marksTranscriptsIsOpen: false });
  }
  rowGetterForMarksTranscripts(index) {
    return this.state.marksTranscripts[index];
  }
  render() {
    return (
      <div>
        <div className="container">

          <div className="row">

            <div className="col-xs-12">

              <div className="box">

                <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    {/* <div className="box-icon">
                      <i className="fas fa-calendar-times-o leaveIcon" aria-hidden="true" />
                    </div> */}
                    <h2 className="box-title">On boarding</h2>
                    <ul className="box-actions">
                      {/* <li>
                      <a >Edit</a>
                    </li> */}
                      <li>
                        <a title="Help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                        </a>
                      </li>
                    </ul>
                  </li>

                </ul>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler active">

                            {/* <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Welcome</h2>
                              <span className="box-filter-arrow" />
                            </div> */}

                            <div className="toggler-content headings top-content">
                              <h1>Welcome!</h1>
                              <div>
                                <h2>We are excited you are now part of our company!</h2>
                                <p>It’s time to get started on your new hire activities. Here is your checklist of onboarding tasks. Check out the Getting Started announcements for information to help guide you during your first few weeks with us. Our culture is one of the main reasons that our employees join us and thrive.</p>
                              </div>
                              {/* <pre>
                                {`
                                  Welcome!

                                  We are excited you are now part of our company!
                                  It’s time to get started on your new hire activities. Here is your checklist of onboarding tasks.
                                  Check out the Getting Started announcements for information to help guide you during your first few weeks with us.
                                  Our culture is one of the main reasons that our employees join us and thrive.

                                  IMP: Please check your company email regularly.
                                `}
                              </pre> */}
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="box">
                <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    {/* <div className="box-icon">
                      <i className="fas fa-calendar-times-o leaveIcon" aria-hidden="true" />
                    </div> */}
                    <h2 className="box-title">Pending Tasks</h2>
                    <ul className="box-actions">
                      <li>
                        <a title="Help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                        </a>
                      </li>
                    </ul>
                  </li>

                </ul>
                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler active">

                            {/* <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Pending Tasks</h2>
                              <span className="box-filter-arrow" />
                            </div> */}

                            <div className="toggler-content">
                              <div>
                                Manager Name: Prajith
                              </div>
                              <div className="pending-task">
                                <h2> Pending Tasks:</h2>
                                <div className="pendingTaskBox">
                                  <h3>Getting Started</h3>
                                  <Row className="padding-vertical">
                                    <Col lg={6} md={6} className="border-right">
                                      <h1>5</h1>
                                      <label>Ready</label>
                                    </Col>
                                    <Col lg={6} md={6}>
                                      <h1>0</h1>
                                      <label>Completed</label>
                                    </Col>
                                    <Col lg={12} md={12} className="margin-top text-center">
                                      <CustomGaugeChart value={50} cColor={'#175d9d'} wColor={'#175d9d'} />
                                    </Col>
                                  </Row>
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

              <div className="box">

                <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    {/* <div className="box-icon">
                      <i className="fas fa-calendar-times-o leaveIcon" aria-hidden="true" />
                    </div> */}
                    <h2 className="box-title">Disability Self-Identification</h2>
                    <ul className="box-actions">
                      <li>
                        <a title="Help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                        </a>
                      </li>
                    </ul>
                  </li>

                </ul>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler" id="disabilityCheck">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Voluntary Self-Identification of Disability</h2>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('disabilityCheck', '')} />
                            </div>

                            <div className="toggler-content">
                              <div className="headings">
                                <div>
                                  <input type="checkbox" name="isDisabled" />
                                  <label className="custom-label">Self-Identification of Disability</label>
                                </div>
                                <div>
                                  <input type="button" value="submit" className="form-control btn-primary custom-submit custom-width" />
                                </div>
                                <div>
                                  <h3>Why are you being asked to complete this form?</h3>
                                  <p>
                                    We reach out to, hire, and provide equal opportunity to qualified people with disabilities.
                                    To help us measure how well we are doing, we are asking you to tell us if you have a disability or if you ever had a disability.
                                    Completing this form is voluntary, but we hope that you will choose to fill it out. This will help us to arrange for special assistance that you might need.
                                    If you are applying for a job, any answer you give will be kept private and will not be used against you in any way.
                                    If you already work for us, your answer will not be used against you in anyway.
                                    Because a person may become disabled at any time, we are required to ask all of our employees to update their information.
                                    You may voluntarily self-identify as having a disability on this form without fear of any punishment because you did not identify as having a disability earlier.
                                  </p>
                                </div>
                                <div>
                                  <h3>How do I know if I have a disability?</h3>
                                  <p>
                                    You are considered to have a disability if you have a physical or mental impairment or medical condition that substantially limits a major life activity, or if you have a history or record of such an impairment or medical condition.
                                  </p>
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

              <div className="box">

                <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    {/* <div className="box-icon">
                      <i className="fas fa-calendar-times-o leaveIcon" aria-hidden="true" />
                    </div> */}
                    <h2 className="box-title">Review Documents</h2>
                    <ul className="box-actions">
                      <li>
                        <a title="Help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                        </a>
                      </li>
                    </ul>
                  </li>

                </ul>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler" id="marksheetsOrTranscripts">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Marksheets/ Transcripts</h2>
                              <div className="toggleAction disable" id="markSheetsAction">
                                <ul className="box-actions">
                                  <li>
                                    <a onClick={this.addMarksTranscripts}>
                                      <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={this.editMarksTranscripts}>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="fas fa-eye" aria-hidden="true" title="View" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('marksheetsOrTranscripts', 'markSheetsAction')} />
                            </div>

                            <div className="toggler-content">
                              <CustomModal form={<MarksTranscripts formType={this.state.marksTranscriptsType} submit={this.submitMarksTranscripts} close={this.closeMarksTranscripts} />} show={this.state.marksTranscriptsIsOpen} />
                              {this.state.marksTranscripts.length > 0 ?
                                <ReactDataGrid
                                  columns={this.state.marksTranscriptsColumns}
                                  rowGetter={this.rowGetterForMarksTranscripts}
                                  rowsCount={this.state.marksTranscripts.length}
                                  minHeight={(this.state.marksTranscripts.length + 1) * 35}
                                  enableCellSelect
                                  onCellSelected={this.getRowIDForMarksTranscripts}
                                  showCheckbox={false}
                                  rowSelection={{
                                    showCheckbox: false,
                                    selectBy: {
                                      indexes: this.state.currentSelectedIndexForMarksTranscripts
                                    }
                                  }}
                                  enableRowSelect={false}
                                /> :
                                'No Marksheet/Transcript documents have been uploaded yet'
                              }
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler" id="degreeCertificates">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Degree certificates</h2>
                              <div className="toggleAction disable" id="degreeCertsActions">
                                <ul className="box-actions">
                                  <li>
                                    <a>
                                      <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="fas fa-eye" aria-hidden="true" title="View" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('degreeCertificates', 'degreeCertsActions')} />
                            </div>

                            <div className="toggler-content">
                              Degree certificates
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler" id="prevEmploymentCerts">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Previous employment and company leaving certificate</h2>
                              <div className="toggleAction disable" id="prevEmploymentCertsActions">
                                <ul className="box-actions">
                                  <li>
                                    <a>
                                      <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="fas fa-eye" aria-hidden="true" title="View" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('prevEmploymentCerts', 'prevEmploymentCertsActions')} />
                            </div>

                            <div className="toggler-content">
                              Previous employment and company leaving certificate
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler" id="otherDocs">

                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                              <h2 className="toggler-title">Other documents</h2>
                              <div className="toggleAction disable" id="otherDocsActions">
                                <ul className="box-actions">
                                  <li>
                                    <a>
                                      <i className="fas fa-plus addIco" aria-hidden="true" title="Add" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                                    </a>
                                  </li>
                                  <li>
                                    <a>
                                      <i className="fas fa-eye" aria-hidden="true" title="View" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span className="box-filter-arrow" onClick={() => this.toggleElement('otherDocs', 'otherDocsActions')} />
                            </div>

                            <div className="toggler-content">
                              Other documents
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>


              </div>

              {/* <div className="pageURL">
                <Link to={'/PersonalInfo'} target="_blank">Review contact details</Link>
              </div> */}

              <div className="box">

                <ul className="box-headings js-tabs">

                  <li className="box-heading active">
                    {/* <div className="box-icon">
                      <i className="fas fa-calendar-times-o leaveIcon" aria-hidden="true" />
                    </div> */}
                    <h2 className="box-title">Review/Update contact details and emergency contact details</h2>
                  </li>

                </ul>
                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner--no-pad">

                          <div className="toggler active" id="otherDocs">

                            <div className="toggler-content">
                              <Link to={'/PersonalInfo'} target="_blank">Review contact details</Link>
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>

              <div className="pageURL">
                <p>Please contact your manager shown above to get further details on your assignments.</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default Onboarding;

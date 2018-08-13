import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class RunPayRoll extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Basic', dataKey: 'Basic', value: '100' },
      { title: 'B', dataKey: 'B', value: '100' },
      { title: 'C', dataKey: 'C', value: '100' }
    ];
    this.rows = [
      { Basic: 'A', B: 'B', C: 'C' },
      { A: 'A', B: 'B', C: 'C' }
    ];
    this.createPdf = this.createPdf.bind(this);
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'RunPayRoll') {
      const ca = document.getElementById('RunPayRollToggle');
      ca.classList.toggle('actionDisable');
    }
  }
  createPdf() {
    const doc = new jsPDF('p', 'pt'); // eslint-disable-line no-undef, new-cap
    // const doc = new jsPDF(); // eslint-disable-line no-undef, new-cap
    // doc.text('Hello world!', 10, 10);
    // doc.save('a4.pdf');
    // const doc = new jsPDF('p', 'pt'); // eslint-disable-line no-undef, new-cap
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    // doc.text('YOLO', 10, 20);
    // doc.text('YOLO2', 10, 50);
    doc.autoTable(this.columns, this.rows);// , {
    //   startY: doc.autoTableEndPosY() + 70,
    //   margin: { horizontal: 10 },
    //   styles: { overflow: 'linebreak' },
    //   bodyStyles: { valign: 'top' },
    //   columnStyles: { email: { columnWidth: 'wrap' } },
    //   theme: 'striped'
    // });
    doc.autoTable(this.columns, this.rows, {
      startY: doc.autoTableEndPosY() + 70,
      margin: { horizontal: 10 },
      styles: { overflow: 'linebreak' },
      bodyStyles: { valign: 'top' },
      columnStyles: { email: { columnWidth: 'wrap' } },
      theme: 'striped'
    });
    doc.save('repro.pdf');
    console.log('1');
  }
  render() {
    // let doc = new jsPDF();
    // doc.text('Hello world!', 10, 10);
    // doc.save('a4.pdf');
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="RunPayRoll">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Tax Planning</h1>
                <div id="RunPayRollToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <a onClick={this.editHomeAddressForm}>
                        <i className="far fa-edit editIco" aria-hidden="true" title="Edit" />
                      </a>
                    </li>
                    <li>
                      <a onClick={this.showHistoryForHomeBranch}>
                        <i className="fas fa-history historyIco" aria-hidden="true" title="History" />
                      </a>
                    </li>
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span onClick={() => this.toggleElement('RunPayRoll')} className="box-filter-arrow" />
              </div>
              <div className="toggler-content">
                <div className="row">
                  <div className="col-lg-12 no-padding">
                    <table className="table table--stripes">
                      <tbody>
                        <tr>
                          <td className="table-align">
                            <span className="table-label">Country</span>
                          </td>
                          <td>jkj</td>
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
    );
  }
}

function mapStateToProps(state) {
  console.log('company data', state.companyData);
  // console.log(state.employee.currentEmployee);
  // console.log('Job Title = ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    companyData: state.companyData.companyData
  };
}
export default connect(mapStateToProps)(RunPayRoll);

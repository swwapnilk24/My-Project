import React from 'react';

class AdminPanel extends React.Component {
  render() {
    return (
      <div className="container">

        <div className="row">

          <div className="col-xs-12">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">

                  <h2 className="box-title">Admin</h2>

                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title">Create List</h2>
                            <span className="box-filter-arrow" />
                          </div>

                          <div className="toggler-content">

                            Test

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

      </div>
    );
  }
}

export default AdminPanel;

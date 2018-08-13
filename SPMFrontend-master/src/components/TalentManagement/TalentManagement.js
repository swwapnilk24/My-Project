/**
 * @file JobInfo Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import { filter, flatMap } from 'lodash';
import { filter } from 'lodash';
// import moment from 'moment';
import ReactDataGrid from 'react-data-grid';
import './TalentManagement.scss';
import ImageFormatter from './ImageFormatter';
import {
  getMenuSubmenu,
  getFilteredWorker,
  getWorkers
} from '../../actions/TalentManagementActions';

class TalentManagement extends React.Component {
  constructor(props) {
    super(props);
    this.rowGetterForJobInformation = this.rowGetterForJobInformation.bind(this);
    this.state = {
    };
    this.toggleElement = this.toggleElement.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getWorkers());
    this.props.dispatch(getMenuSubmenu());
  }
  rowGetterForJobInformation(index) {
    return this.state.rowsForJobInformation[index];
  }
  redirectModel(index) {
    this.props.router.push(`/${index}`);
  }
  toggleElementChecked(primaryKey, value, menuId, subMenuId) {
    this.props.dispatch(getFilteredWorker(primaryKey, value, menuId, subMenuId));
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  render() {
    const columns = [{
      key: 'id',
      name: '',
      formatter: <ImageFormatter value1="sss" value="sss" />
      // resizable: true,
      // headerRenderer: <ImageFormatter value="sss" />
    }];
    const myFilteredWorkers = this.props.TalentManagement.myFilteredWorkers;
    const newMyFilteredWorkers = [];
    for (let i = 0; i < myFilteredWorkers.length; i += 1) {
      const newObject = {};
      // console.log(newMyFilteredWorkers, 'newMyFilteredWorkers');
      newObject.id = myFilteredWorkers[i];
      newMyFilteredWorkers.push(newObject);
    }
    const rows = newMyFilteredWorkers;
    const rowGetter = rowNumber => rows[rowNumber];
    const LoG = this.props.TalentManagement.menuSubmenuList;
    // const LoG = menuSubmenuList;
    const listItems = [];

    if (LoG) {
      if ('userMenu' in LoG) {
        const LogUserMenu = LoG.userMenu;
        // *** MENU
        for (let i = 0; i < LogUserMenu.length; i += 1) {
          const menuObject = LogUserMenu[i];
          //const Type = SvgComponents[menuObject.svg];
          // if (menuObject.subMenu.length === 0) {
          //   listItems.push(<li className="sidebar-menu-block">
          //     <menuObject className={`sidebar-item-main ${(pathArr[0] === menuObject.slug ? 'active' : '')}`} to={menuObject.slug}>
          //       <div className="sidebar-item-icon"> <Type /> </div>
          //       <div className="sidebar-item-text"> {menuObject.name} </div>
          //     </menuObject> </li>);
          // }
          // ******SUBMENU*****
          if (menuObject.subMenu.length !== 0) {
            const LogUserSubMenu = menuObject.subMenu;
            // *** SUBMENU
            const listItemss = [];
            for (let k = 0; k < LogUserSubMenu.length; k += 1) {
              const subMenuObject = LogUserSubMenu[k];
              let subMenu = [];
              if (menuObject.primaryKey && menuObject.primaryKeyType) {
                for (let m = 0; m < this.props.TalentManagement.myEmployees.length; m += 1) {
                  const firstLoop = this.props.TalentManagement.myEmployees[m][menuObject.primaryKey];
                  for (let n = 0; n < firstLoop.length; n += 1) {
                    if (firstLoop[n][menuObject.key] === subMenuObject.name) {
                      subMenu.push(this.props.TalentManagement.myEmployees[m]);
                    }
                  }
                }
              } else if (menuObject.primaryKey) {
                subMenu = filter(this.props.TalentManagement.myEmployees, [menuObject.primaryKey, subMenuObject.name]);
              } else {
                subMenu = [];
              }
              const countOfSubMenu = subMenu.length;
              const menuObjectKey = (menuObject.primaryKey && menuObject.primaryKeyType) ? menuObject.key : menuObject.primaryKey;
              if (subMenuObject.length !== 0) {
                listItemss.push(<div key={k} className="compare-single">
                  <input
                    type="checkbox"
                    id={`checkbox-${i}-${k}`}
                    className="compare-checkbox"
                    onClick={() => this.toggleElementChecked(menuObjectKey, subMenuObject.name, menuObject.id, subMenuObject.id)}
                  />
                  <label htmlFor={`checkbox-${i}-${k}`} className="compare-label" />
                  <div className="compare-user-info">
                    <strong className="name compare-user-name compare-user-name-new">{subMenuObject.name}</strong>
                    <p className="compare-user-details compare-user-details-new">
                      ({countOfSubMenu})</p>
                  </div>
                </div>
                );
              }
            }
            // ******MENU*****
            const toogleId = `toggler-${i}`;
            listItems.push(<div key={i} className="box-tab active">

              <div className="box-inner--no-pad">

                <div className="toggler" id={toogleId}>

                  <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                    <h2 className="toggler-title-new">{menuObject.name}</h2>
                    <span className="box-filter-arrow" onClick={() => this.toggleElement(toogleId)} />
                  </div>

                  <div className="toggler-content ji-padding-bottom">
                    {listItemss}

                  </div>

                </div>

              </div>

            </div>);
          }
        } // For loop ends
      }
    }
    return (
      <div className="container">

        <div className="row">

          <div className="col-xs-12 col-lg-12">

            <div className="box">

              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path
                            d="M38.91,9.93a3.74,3.74,0,0,0-5.28,0l-1,1V1.11A1.11,1.11,0,0,0,31.56,0H4.26A4.26,4.26,0,0,0,0,4.26V35.74A4.26,4.26,0,0,0,4.26,40h27.3a1.11,1.11,0,0,0,1.11-1.11V21.45l6.24-6.24a3.73,3.73,0,0,0,0-5.28ZM16.47,2.22h4.07V6.61l-1.37-1a1.11,1.11,0,0,0-1.34,0l-1.37,1ZM6,37.78H4.26a2,2,0,0,1-2-2V4.26a2,2,0,0,1,2-2H6Zm24.43,0H8.24V23.21H9.75a1.11,1.11,0,0,0,0-2.22H8.24V19h4.14a1.11,1.11,0,0,0,0-2.22H8.24V2.22h6V8.85A1.11,1.11,0,0,0,16,9.73l2.48-1.88L21,9.73a1.31,1.31,0,0,0,1.17.11,1.12,1.12,0,0,0,.62-1V2.22h7.68V13.11L18,25.56a1.11,1.11,0,0,0-.33.79v3.71a1.11,1.11,0,0,0,1.11,1.11H22.5a1.11,1.11,0,0,0,.79-.33l7.16-7.16ZM22,28.94H19.9V26.8L33.47,13.23l2.14,2.14Zm15.3-15.3-.16.16L35,11.66l.16-.16a1.55,1.55,0,0,1,2.14,0A1.57,1.57,0,0,1,37.34,13.64Z"
                            fill="#f4f7fa"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Talent Management</h2>
                </li>

              </ul>

              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-3 col-lg-3 no-padding">
                    {listItems}
                  </div>
                  <div className="col-xs-9 col-lg-9 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--side box-inner--no-pad">

                        <div className="toggler active" id="JobInfo">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
                            <h2 className="toggler-title-new">Worker Information</h2>
                            <ul className="box-actions" >
                              <li>
                                <a className="personTagNew" onClick={() => this.redirectModel('AddNewSkills')}>
                                  Add New Skill
                                  </a>
                              </li>
                              {/* <li>
                                <a className="personTagNew" onClick={() => this.redirectModel('AddNewPosition')}>
                                  Add New Position
                                  </a>
                              </li> */}
                            </ul>
                            <span className="box-filter-arrow" onClick={() => this.toggleElement('JobInfo')} />
                          </div>

                          <div className="toggler-content ji-padding-bottom">
                            <div>
                              <ReactDataGrid
                                columns={columns}
                                rowGetter={rowGetter}
                                rowsCount={rows.length}
                                minHeight={2000}
                                rowHeight={100}
                                headerRowHeight={1}
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

          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { TalentManagement: state.talentManagement };
}

export default connect(mapStateToProps)(TalentManagement);

import React from 'react';
import moment from 'moment';
import './ImageFormatter.scss';


class ImageFormatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleElement = this.toggleElement.bind(this);
  }
  toggleElement(elementID, skillLength) {
    const x = document.getElementById(elementID);
    x.classList.toggle('show');
    const el = this.findAncestor(x, 'react-grid-Cell');
    const style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    const e2 = this.findAncestor(x, 'react-grid-Row');
    const style1 = window.getComputedStyle ? getComputedStyle(e2, null) : e2.currentStyle;
    const topVal = style.height.split('px');
    const topVal1 = parseInt(topVal[0], 10);
    const topValNew = (x.classList.value === 'toggler2 show') ? `${topVal1 + (skillLength * 10)}px` : `${topVal1 - (skillLength * 10)}px`;
    const topVal2 = style1.height.split('px');
    const topVal3 = parseInt(topVal2[0], 10);
    const topValNew1 = (x.classList.value === 'toggler2 show') ? `${topVal3 + (skillLength * 10)}px` : `${topVal3 - (skillLength * 10)}px`;
    el.style.height = topValNew;
    e2.style.height = topValNew1;
  }
  findAncestor(el, cls) {
    let k = el;
    while ((k.parentElement) && !k.classList.contains(cls)) {
      k = k.parentElement;
    }
    return k;
  }
  dateDiff(toDateA, fromDateA, stime) {
    const fromDate = moment(fromDateA, 'YYYY-MM-DD');
    const toDate = moment(toDateA, 'YYYY-MM-DD');
    let a = '';
    if (stime === 'year') {
      a = toDate.diff(fromDate, 'year');
    }
    if (stime === 'months') {
      a = toDate.diff(fromDate, 'months');
    }
    if (stime === 'days') {
      a = toDate.diff(fromDate, 'days');
    }
    return a;
  }
  render() {
    const currentEmployee = this.props.value;
    console.log(currentEmployee, 'currentEmployee');
    const content = currentEmployee.skillInformation.map((post) =>
      <div className="imageTag">
        <div>Skill : <tag className="personTag">{post.skillName}</tag>  |  Level : <tag className="personTag">{post.level.name}</tag>  |  Experience : <tag className="personTag">{this.dateDiff(post.toDate, post.fromDate, 'year')}years,{this.dateDiff(post.toDate, post.fromDate, 'months')}months,{this.dateDiff(post.toDate, post.fromDate, 'days')}days</tag></div>
      </div>
    );
    return (
      <div className="toggler2" id={`currentJobA-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`}>
        <div className="compare-single">
          <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement(`currentJobA-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`, (currentEmployee.skillInformation.length + 2))}>
            <span className="box-filter-arrow" />
          </div>
          <label htmlFor="compare-" className="compare-label" />
          <img src="../../assets/images/global/sample-avatar-2.jpg" alt="" className="compare-avatar" />
          <div className="compare-user-info">
            <p className="compare-user-details">
              <h3 className="person-name">
                {(currentEmployee) ? currentEmployee.personalInformation.personalInformation.personalInformation.displayName : ''} {(currentEmployee) ? currentEmployee.personalInformation.personalInformation.firstName : ''}
              </h3>
              <div className="person-position person-position-new">{(currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0]) ? currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0].position : ''}</div>
              <span className="person-pin">{(currentEmployee) ? currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId : ''}</span>
            </p>
          </div>
        </div>
        <div className="toggler-content">
          {/* skills : {(currentEmployee) ? currentEmployee.skillInformation.skills.name : ''} */}
          {content}
        </div>
      </div>
    );
  }
}

export default ImageFormatter;

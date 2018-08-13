/**
 * @file SPM BreadCrumbs.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import './BreadCrumbs.scss';

class BreadCrumbs extends React.Component {
  render() {
    return (
      <ul className="breadcrumbs">
        <li>
          <a href="panel-index.html" className="breadcrumbs-item active">{this.props.translate('Home')}</a>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code };
}

export default connect(mapStateToProps)(BreadCrumbs);

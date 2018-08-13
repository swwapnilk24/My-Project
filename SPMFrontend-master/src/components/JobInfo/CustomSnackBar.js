import React from 'react';
import SnackBar from 'react-material-snackbar';
import './JobInfo.scss';

class CustomSnackBar extends React.Component {
  render() {
    return (
      <SnackBar
        show={this.props.show}
        timer={6000}
      >
        {this.props.data}
      </SnackBar>
    );
  }
}

export default CustomSnackBar;

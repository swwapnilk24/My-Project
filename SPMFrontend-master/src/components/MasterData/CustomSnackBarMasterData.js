import React from 'react';
import SnackBar from 'react-material-snackbar';

class CustomSnackBar extends React.Component {
  render() {
    const snackbarStyle = {
      position: 'relative',
      background: '#404040',
      color: '#fff',
      padding: '14px',
      WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
      fontWeight: '500',
      textTransform: 'initial',
      willChange: 'transform',
      whiteSpace: 'nowrap',
      transform: 'translateY(20px)',
      WebkitTransform: 'translateY(20px)',
      boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
      fontSize: '14px',
      opacity: 0,
      borderRadius: '3px',
      display: '-webkit-box, -ms-flexbox, flex',
      // display: '-ms-flexbox',
      // display: 'flex',
      WebkitBoxAlign: 'center',
      msFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxPack: 'justify',
      msFlexPack: 'justify',
      justifyContent: 'space-between',
      lineHeight: '20px'
    };
    return (<div>
      <SnackBar
        show={this.props.show}
        style={ snackbarStyle }
      >
        {this.props.snackBarErrorMessage}
      </SnackBar>
    </div>);
  }
}
export default CustomSnackBar;

import React from 'react';
import { authenticateEmail } from '../../actions/CompanyActions';

class EmailVerification extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToLogin = this.navigateToLogin.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const splitArr = url.split('?');
    const token = splitArr[1];
    if (token) {
      authenticateEmail(token, this.navigateToLogin);
    } else {
      alert('Sorry something went wrong');
    }
  }

  navigateToLogin(response) {
    if (response.status === 200) {
      // alert('called');
      this.props.router.push('/');
    } else {
      alert('Something went wrong please try again');
    }
  }

  render() {
    return (
      <div>Test</div>
    );
  }
}

export default EmailVerification;

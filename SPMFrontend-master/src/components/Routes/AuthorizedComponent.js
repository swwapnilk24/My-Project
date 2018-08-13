import React, { PropTypes } from 'react';
import _ from 'lodash';

class AuthorizedComponent extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { routes } = this.props; // array of routes
    const { router } = this.context;

    // check if user data available
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // redirect to login if not
      router.push('/Login');
    }

    // get all roles available for this route
    const routeRoles = _.chain(routes)
      .filter(item => item.authorize) // access to custom attribute
      .map(item => item.authorize)
      .flattenDeep()
      .value();

    // compare routes with user data
    if (_.intersection(routeRoles, user.roles).length === 0) {
      router.push('/');
    }
  }
}

export default AuthorizedComponent;

import React, { Component } from 'react';

import Login from './Login';
import Register from './Register';
import ManageEvents from './Event/Manage';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',  
    }
    
    this.login = this.login.bind(this);
  }

  setValue = (name) => (value) => {
    this.setState({ [name]: value });
  }

  login(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="admin">
        {
          this.props.authenticated ? (
            <ManageEvents />
          ) : (
            <div className="admin-login columns">
              <Login />
              <Register />
            </div>
          )
        }
      </div>
    )
  }
}

export default Admin;
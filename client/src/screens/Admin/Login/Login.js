import React, { Component } from 'react';

import Input from 'app/components/Input';
import Button from 'app/components/Button';
import Loading from 'app/components/Loading';
import ErrorsDisplay from 'app/components/ErrorsDisplay';

const FIELD_ROW_CLASS = 'column is-narrow is-quarter-desktop';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',  
    }
    
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.props.cleanError();
  }

  setValue = (name) => (value) => {
    this.setState({ [name]: value });
  }

  login(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  render() {
    const { email, password } = this.state;
    const { inProgress, errors } = this.props;
    console.log('in progress', inProgress, errors);
    return (
      <div className="column">
        <h2 className="title has-text-centered">Log in</h2>
        <form onSubmit={this.login}>
          <div className="columns is-multiline is-centered">
            <Input
              customClass={FIELD_ROW_CLASS}
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
              value={email}
              onChange={this.setValue('email')}
            />
          </div>
          <div className="columns is-multiline is-centered">
            <Input
              customClass={FIELD_ROW_CLASS}
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              value={password}
              onChange={this.setValue('password')}
            />
          </div>
          <div className="columns is-multiline is-centered">
            <div className={FIELD_ROW_CLASS}>
              <ErrorsDisplay errors={errors} namespace="login"/>
            </div>
          </div>
          <div className="columns is-multiline is-centered">
            <div className={FIELD_ROW_CLASS}>
              <Button customClass="is-fullwidth" primary>Log in</Button>
            </div>
          </div>
        </form>
        <Loading visible={inProgress} label="Logging in..." fullscreen/>
      </div>
    )
  }
}

export default Login;
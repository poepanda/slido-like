import React, { Component } from 'react';

import Input from 'app/components/Input';
import Button from 'app/components/Button';
import Loading from 'app/components/Loading';
import ErrorsDisplay from 'app/components/ErrorsDisplay';

const FIELD_ROW_CLASS = 'column is-narrow is-quarter-desktop';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',  
    }
    
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.props.cleanError();
  }

  setValue = (name) => (value) => {
    this.setState({ [name]: value });
  }

  register(e) {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.props.register({ name, email, password })
  }

  render() {
    const { inProgress, errors } = this.props;
    const { name, email, password } = this.state;
    return (
      <div className="column">
        <h2 className="title has-text-centered">Register</h2>
        <form onSubmit={this.register}>
          <div className="columns is-multiline is-centered">
            <Input
              customClass={FIELD_ROW_CLASS}
              name="name"
              placeholder="Name"
              label="Name"
              value={name}
              onChange={this.setValue('name')}
            />
          </div>
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
              <ErrorsDisplay errors={errors} namespace="register"/>
            </div>
          </div>
          <div className="columns is-multiline is-centered">
            <div className={FIELD_ROW_CLASS}>
              <Button customClass="is-fullwidth" primary>Register</Button>
            </div>
          </div>
          <Loading visible={inProgress} />
        </form>
      </div>
    )
  }
}

export default Register;
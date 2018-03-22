import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Button from 'app/components/Button';
import Input from 'app/components/Input'

import './Join.css';

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      eventCodeError: ''
    };

    this.setEventCode = this.setEventCode.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
  }

  setEventCode(code) {
    this.setState({ code });
  }

  joinEvent(e) {
    e.preventDefault();
    const { code } = this.state;
    if (!code) return toast.error('Please fill in the event code!');
    this.props.history.push(`audi/event/${code}`);
  }

  render() {
    const { code } = this.state;

    return (
      <div className="event-join container">
        <div className="columns is-centered">
          <form
            onSubmit={this.joinEvent}
            className="column is-centered has-text-centered"
          >
            <Input
              name="code"
              onChange={this.setEventCode}
              value={code}
              placeholder="Enter the event code"
              addons={(
                <Button primary large>
                  Enter
                </Button>
              )}
              large
            />
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

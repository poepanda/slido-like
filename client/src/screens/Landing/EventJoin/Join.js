import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Button from 'app/components/Button';
import Input from 'app/components/Input'

import './Join.css';

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode: '',
      eventCodeError: ''
    };

    this.setEventCode = this.setEventCode.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
  }

  setEventCode(eventCode) {
    this.setState({ eventCode });
  }

  joinEvent(e) {
    e.preventDefault();
    const { eventCode } = this.state;
    if (!eventCode) return toast.error('Please fill in the event code!');
    this.props.history.push(`audi/event/${eventCode}`);
  }

  render() {
    const { eventCode } = this.state;

    return (
      <div className="event-join container">
        <div className="columns is-centered">
          <form
            onSubmit={this.joinEvent}
            className="column is-centered has-text-centered"
          >
            <Input
              name="eventCode"
              onChange={this.setEventCode}
              value={eventCode}
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

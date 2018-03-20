import React, { Component } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import Input from 'app/components/Input';
import DateBox from 'app/components/DateBox';
import Button from 'app/components/Button';

const FIELD_ROW_CLASS = 'column is-narrow is-quarter-desktop';

class EventCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode: '',
      name: '',
      from: moment(),
      to: moment().add(3, 'days'),
    }
    this.createEvent = this.createEvent.bind(this);
  }

  setValue = (name) => (value) => {
    this.setState({ [name]: value });
  }

  createEvent(e) {
    e.preventDefault();
    this.props.createEvent({ ...this.state });
  }

  doesEventAlreadyExists() {
    
  }
  
  componentDidMount() {
    if (this.props.eventCreated) {
      toast.warn('For now, you can only create one event! Redirecting to event manage page');
      setTimeout(() => {
        this.props.history.push('/admin');
      }, 2000);
    }
  }

  componentDidUpdate() {
    if (this.props.eventCreated) {
      toast.warn('Event created! Redirect to Manage page...');
      setTimeout(() => this.props.history.push('/admin'), 1500);
    }
  }

  render() {
    const { eventCode, name, from, to } = this.state;
    return (
      <div className="container">
        <h1 className="title has-text-centered">Create new event</h1>
        <div className="columns">
          <div className="column">
            <form onSubmit={this.createEvent}>
              <div className="columns is-multiline is-centered">
                <Input
                  name="eventCode"
                  customClass={FIELD_ROW_CLASS}
                  placeholder="Enter a unique code"
                  label="Code"
                  value={eventCode}
                  onChange={this.setValue('eventCode')}
                />
              </div>
              <div className="columns is-multiline is-centered">
                <Input
                  name="name"
                  customClass={FIELD_ROW_CLASS}
                  placeholder="Enter a name for your event"
                  label="Name"
                  value={name}
                  onChange={this.setValue('name')}
                />
              </div>
              <div className="columns is-multiline is-centered">
                <DateBox
                  onChange={this.setValue('from')}
                  className={FIELD_ROW_CLASS}
                  label="Date from"
                  value={from}/>
              </div>
              <div className="columns is-multiline is-centered">
                <DateBox
                  onChange={this.setValue('to')}
                  className={FIELD_ROW_CLASS}
                  label="Date to"
                  value={to}/>
              </div>
              <div className="columns is-multiline is-centered">
                <Button primary>Create event</Button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default EventCreate;
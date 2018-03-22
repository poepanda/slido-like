import React, { Component } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { throttle } from 'lodash';

import Input from 'app/components/Input';
import DateBox from 'app/components/DateBox';
import Button from 'app/components/Button';
import ErrorsDisplay from 'app/components/ErrorsDisplay';
import Loading from 'app/components/Loading';

const FIELD_ROW_CLASS = 'column is-narrow is-quarter-desktop';

class EventCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
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
      setTimeout(
        throttle(() => {
          this.props.history.push('/admin');
        }, 2500), 2000
      );
    }
    this.props.cleanError();
  }

  componentDidUpdate() {
    if (this.props.eventCreated) {
      toast.warn('Event created! Redirect to Manage page...');
      setTimeout(
        throttle(() => this.props.history.push('/admin'), 2500), 1500
      );
    }
  }

  render() {
    const { inProgress, errors, eventCreated } = this.props;
    const { code, name, from, to } = this.state;
    if (eventCreated) return (
      <div className="container">
        <h6 className="has-text-centered">Event was already created! <br/> Redirecting... to manage page</h6>
      </div>
    )
    return (
      <div className="container">
        <h1 className="title has-text-centered">Create new event</h1>
        <div className="columns">
          <div className="column">
            <form onSubmit={this.createEvent}>
              <div className="columns is-multiline is-centered">
                <Input
                  name="code"
                  customClass={FIELD_ROW_CLASS}
                  placeholder="Enter a unique code"
                  label="Code"
                  value={code}
                  onChange={this.setValue('code')}
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
              <div className="columns is-multiline is-centered has-text-centered">
                <div className={FIELD_ROW_CLASS}>
                  <ErrorsDisplay errors={errors}/>
                </div>
              </div>
              <div className="columns is-multiline is-centered has-text-centered">
                <Button primary>Create event</Button>
              </div>
            </form>
          </div>
        </div>
        <Loading visible={inProgress} fullscreen/>
        <ToastContainer />
      </div>
    )
  }
}

export default EventCreate;
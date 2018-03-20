import React from 'react'
import { Link } from 'react-router-dom';

import Button from 'app/components/Button';
import EventJoin from './EventJoin';

import './Landing.css';

export default () => (
  <div className="landing">
    <h2 className="title has-text-centered">Welcome to Sli.do-like</h2>
    <div className="columns">
      <div style={{ padding: '22px' }} className="column">
        <EventJoin />
      </div>
    </div>
    <div className="columns">
      <div className="column has-text-centered">
        Or
      </div>
    </div>
    <div className="columns">
      <div className="column has-text-centered">
        <Link to="admin/event/create">
          <Button primary>
            Create your own event
          </Button>
        </Link>
      </div>
    </div>
  </div>
)
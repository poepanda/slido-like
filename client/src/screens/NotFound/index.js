import React from 'react'

import { Link } from 'react-router-dom';

import './NotFound.css';

export default () => (
  <div className="not-found columns is-vcentered">
    <h2 className="column is-full has-text-centered">
      Uhoh! Look like you're seeking for something doesn't exist :o
      <br/>
      <Link to="/">
        Get back home!
      </Link>
    </h2>
  </div>
)
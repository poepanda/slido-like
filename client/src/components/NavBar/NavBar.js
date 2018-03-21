import React from 'react'
import { Link } from 'react-router-dom';

import ErrorsDisplay from '../ErrorsDisplay';

import './NavBar.css';

export default ({ authenticated, logout, logoutErrors, cleanLogoutErrors }) => (
  <nav className="main-nav">
    <Link to="/">Home</Link>
    {' - '}
    <Link to="/admin">{ authenticated ? 'Manage Event' : 'Login' }</Link>
    { authenticated ? (
      <span className="main-nav__admin">
        {' - '}
        <Link to="/admin/event/create">Create Event</Link>
        {' - '}
        <a onClick={logout}>Logout</a>
        <ErrorsDisplay namespace="logout" isToast errors={logoutErrors} clean={cleanLogoutErrors}/>
      </span>
    ) : null }
  </nav>
)
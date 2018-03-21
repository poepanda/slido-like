import React from 'react'
import classnames from 'classnames';

import './Loading.css';

export default ({ fullscreen, visible, label }) => {
  console.log('loading', visible);
  const loadingClasses = classnames(
    'loading is-vcentered columns',
    { 
      'loading--fullscreen': fullscreen,
      'loading--visible': visible
    }
  );
  
  return (
    <div className={loadingClasses}>
      <div className="column has-text-centered is-centered">
        <h2>{ label ? label : 'Loading...' }</h2>
        <img className="loading__animated-icon" src={require('app/assets/images/loading.svg')} alt="I'm loading!"/>
      </div>
    </div>
  )
}
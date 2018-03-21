import React from 'react';
import { ToastContainer, toast } from 'react-toastify'

import './ErrorsDisplay.css';

const inTheRightPlace = (namespace, error) => (!namespace || (namespace && namespace === error.namespace));
const errorsInGoodFormat = (errors) => (errors && Array.isArray(errors));

export default ({ errors, namespace, isToast, clean }) => {
  // A toast error
  // Which mean show a toast to the user about the error then clean them from the store.
  if (isToast) {
    errorsInGoodFormat(errors) && errors.map(error => {
      inTheRightPlace(namespace, error) && toast.error(error.msg);
      return true;
    });
    if (typeof clean === 'function') clean();
    return (
      <ToastContainer />
    )
  }

  // Normal display errors to user
  return errorsInGoodFormat(errors) ? (
    <div className="errors-display">
      <div className="column errors-display__container">
        {
          errors.map(error => (
            inTheRightPlace(namespace, error) ? (
              <div key={error.msg.trim()} className="columns errors-display__error">
                { error.msg }
              </div>
            ) : null
          ))
        }
      </div>
    </div>
  ) : null
}
/** Generate common resopnses with according status code and response body format 
 * Including:
 * 500: Internal error
 * 400: Bad request
 * 401: Unauthorized
 * 403: Forbidden
 * 404: Not found
 * */
export const formatErrors = (errors) => {
  if (errors.constructor === Array) return { errors };
  return { errors: [errors] };
}

export const internalErrorResponse = (res, errors) => {
  return res.status(500).send(formatErrors(errors ? errors : 'Somethign wrong happen on the server.'));
}

export const badRequestResponse = (res, errors) => {
  return res.status(400).send(formatErrors(errors ? errors : 'Invalid field. Please fix it and try again.'));
}

export const unAuthorizeResponse = (res, errors) => {
  return res.status(401).send(formatErrors(errors ? errors : 'You\' are not authorized to do this'));
}

export const forbiddenResponse = (res) => {
  return res.status(403).send(formatErrors('You are not allowed to do this!'));
}

/**
 * @param  {expresss response object} res
 * @param  {object} data
 */
export const successResponse = (res, data) => {
  return res.status(200).send({ ...data, success: true });
}
export const addIndexPropertyTo = questions => questions.map((item, index) => ({ ...item, index}))

// Getting errors from api response
export const getErrors = (errResponse, namespace) => { 
  if (errResponse.response) {
    return errResponse.response.data.errors.map(msg => {
      return {
        namespace,
        msg,
      }
    });
  }
  return [errResponse.toString()];
}
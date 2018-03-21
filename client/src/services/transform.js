export const addIndexPropertyTo = questions => questions.map((item, index) => ({ ...item, index}))

// Getting errors from api response
export const getErrors = (errResponse, namespace) => { 
  const errors = errResponse.response.data.errors.map(msg => {
    return {
      namespace,
      msg,
    }
  });
  console.log(errors);
  return errors;
}
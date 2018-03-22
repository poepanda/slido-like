import jwt from 'jsonwebtoken';
import config from '../config';

import { forbiddenResponse, internalErrorResponse } from '../responses';

export default (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['authorization'];
  
  if (!token) 
    return forbiddenResponse(res);

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return internalErrorResponse(res, 'Failed to authenticate token.');    

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}
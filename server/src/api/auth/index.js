import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config';
import { badRequestResponse, internalErrorResponse, successResponse } from '../responses';

// Database
import { User } from '../../db';

const router = express.Router();
import authenticated from '../middlewares/authenticated';

/**
 * route to log the user in
 * require email and password
 */
router.post('/login', (req, res) => {
  const { email = '', password = '' } = req.body;
  User()
    .find({ email: email || '' })
    .then(result => {
      if (result.errors) return internalErrorResponse(res);
      if (!result.length) return badRequestResponse(res, 'User doesn\'t exist');
      const user = result[0];

      // check if the password is valid
      if (!password) return badRequestResponse(res, 'Password is empty');
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return badRequestResponse(res,  'Invalid password');
      
      // if user is found and password is valid
      // create a token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      successResponse(res, { token });
    })
});

/**
 * Logout route
 * Do nothing at the moment 
 */
router.get('/logout', (req, res) => {
  // Do nothing and send mulltoken back
  successResponse(res, { auth: false, token: null });
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return badRequestResponse(res, 'Email or Password is empty!')
  var hashedPassword = bcrypt.hashSync(password, 8);

  User().create({
    name,
    email,
    password: hashedPassword
  }).then(({ errors, id }) => {
    if (errors) return internalErrorResponse(res, 'There was problem registering the user!');
    // If user registered without error
    // Generate the token
    const token = jwt.sign({ id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // And send the token back to user
    successResponse(res, { token });
  });
  
});

/**
 * Get me
 * Return information of current logged in user
 */
router.get('/me', authenticated, (req, res, next) => {
  User()
    .find({ id: req.userId })
    .then(result => {
      if (result.errors) return internalErrorResponse(res, 'There was a problem finding the user.');
      const user = result[0];
      if (!user) badRequestResponse(res, 'No user found!');
      successResponse(res, {
        email: user.email,
        name: user.name,
      });
    });

});

export default router;
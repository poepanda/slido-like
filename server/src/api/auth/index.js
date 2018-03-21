import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config';
import { errors } from '../response';

// Database
import { User } from '../../db';

const router = express.Router();
import authenticated from '../middlewares/authenticated';

router.post('/login', (req, res) => {
  const { email = '', password = '' } = req.body;
  User()
    .find({ email: email || '' })
    .then(result => {
      if (result.errors) return res.status(500).send(errors('Something wrong happen on the server.'));
      if (!result.length) return res.status(400).send(errors('User doesn\'t exist'));
      const user = result[0];

      // check if the password is valid
      if (!password) return res.status(401).send(errors('Password is empty'));
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send(errors('Invalid password'));
      
      // if user is found and password is valid
      // create a token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ token, success: true });
    })
});

router.get('/logout', (req, res) => {
  // Do nothing and send mulltoken back
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) res.status(400).send(errors('Email or Password is empty!'))
  var hashedPassword = bcrypt.hashSync(password, 8);

  User().create({
    name,
    email,
    password: hashedPassword
  }).then(({ errors, id }) => {
    if (errors) res.status(500).send(errors('There was problem registering the user!'));
    // If user registered without error
    // Generate the token
    const token = jwt.sign({ id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // And send the token back to user
    res.status(200).send({ token, success: true });
  });
  
});

router.get('/me', authenticated, (req, res, next) => {
  User()
    .find({ id: req.userId })
    .then(result => {
      if (result.errors) return res.status(500).send(errors('There was a problem finding the user.'));
      const user = result[0];
      if (!user) return res.status(400).send(errors('No user found!'));
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    });

});

export default router;
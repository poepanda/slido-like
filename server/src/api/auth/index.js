import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from './config';

// Database
import { User } from '../../db';

const router = express.Router();
import verifyToken from './verifyToken';

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', function(req, res) {
  User()
    .find({ email: req.body.email })
    .then(result => {
      if (result.errors) return res.status(500).send('Something wrong happen on the server.');
      if (!result.length) return res.status(404).send('User doesn\'t exist');
      const user = result[0];

      // check if the password is valid
      console.log(req.body);
      if (!req.body.password) return res.status(401).send('Password is empty')
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send('Invalid password');
      
      // if user is found and password is valid
      // create a token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ token, success: true });
    })
});

router.get('/logout', function(req, res) {
  // Do nothing and send mulltoken back
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password) res.status(400).send('Email or Password is empty!')
  var hashedPassword = bcrypt.hashSync(password, 8);

  User().create({
    name,
    email,
    password: hashedPassword
  }).then(({ errors, id }) => {
    if (errors) res.status(500).send('There was problem registering the user!');
    // If user registered without error
    // Generate the token
    const token = jwt.sign({ id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // And send the token back to user
    res.status(200).send({ token, success: true });
  });
  
});

router.get('/me', verifyToken, function(req, res, next) {
  User()
    .find({ id: req.userId })
    .then(result => {
      if (result.errors) return res.status(500).send("There was a problem finding the user.");
      const user = result[0];
      if (!user) return res.status(404).send("No user found!");
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    });

});

export default router;
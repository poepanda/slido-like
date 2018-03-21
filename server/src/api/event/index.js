import express from 'express';
import authenticated from '../middlewares/authenticated';

import Event from '../../db/models/event';

const router = express.Router();

router.get('/event', authenticated, (req, res) => {
  res.send('hello there');
});

router.post('/event/create', authenticated, (req, res) => {
  res.send('create event');
})

export default router;
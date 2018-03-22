import express from 'express';
import authenticated from '../middlewares/authenticated';

import { Event } from '../../db';
import { internalErrorResponse, successResponse, badRequestResponse } from '../responses';
import { validateEvent } from './validation';
import { responsedEvent } from './transform';

const router = express.Router();

router.get('/event', (req, res) => {
  res.send('hello there');
});

router.post('/event/create', authenticated, (req, res) => {
  const { errors, ...data } = validateEvent(req.body);
  if (errors.length) return badRequestResponse(res, errors);
  
  Event()
    .create({
      ...data,
      createdBy: req.userId
    })
    .then(({ errors, id }) => {
      if (errors) return internalErrorResponse(res);
      return successResponse(res, { id });
    })
})

/**
 * Fetch a single event created by admin
 * Only one event allowed for now
 * Maybe a list of events in the future
 **/
router.get('/event/fetch', authenticated, (req, res) => {
  const { userId } = req;
  console.log('fetching event', userId);
  Event()
    .find({ createdBy: userId })
    .then(events => {
      console.log('events', events);
      if (events.errors) return internalErrorResponse(res);
      return successResponse(res, responsedEvent(events[0]));
    })
})

export default router;
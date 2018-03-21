import { Router } from 'express';

import auth from './auth';
import event from './event';

export default ({ config, db }) => {
	let api = Router();

	// Authentication controller
	api.use(auth);

	// Event controller / routes
	api.use(event);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.send('Hello from API ;)')
	});

	return api;
}

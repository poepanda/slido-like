const r = require('rethinkdb');

import userModel from './models/user';
import eventModel from './models/event';
import { checkAndCreateTables } from './migration';

let connection = null;

// Exporting models
export const User = () => userModel(r, connection);
export const Event = () => eventModel(r, connection);

// Initialize the database
export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  //Try to connect to db
  // r.connect({ host: 'localhost' , port: process.env.DB_PORT || 28015 }, (err, conn) => {
  r.connect({ host: process.env.DB_HOST || 'localhost' , port: process.env.DB_PORT || 28015 }, (err, conn) => {
    if (err) throw err;
    
    // Populate the connection to be used outside of this call back
    connection = conn;
    
    // All execution gonna use default 'test' db
    // Check whether the needed tables are already created
    checkAndCreateTables(r, connection);    
    
    // Run the call after connectting to database
    if (typeof callback === 'function') callback();
  });
}
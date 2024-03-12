/**
 * In Vercel,
 * Each serverless function should be a file that exports a function that takes in two arguments:
 * A request (an instance of http.IncomingMessage) 
 * And a response (an instance of http.ServerResponse)
 *
 * We're exporting an Express application from '../app/index.js',
 * Which is a function that can handle request and response objects,
 * But it's not directly a function that takes in a request and a response.
 *
 * To fix this,
 * We created a new file in the /api directory
 * (Which is the directory Vercel looks for serverless functions in by default)
 * And have it import and use our Express application.
 */
import app from '../app/index.js';

export default (req, res) => {
  app(req, res);
};

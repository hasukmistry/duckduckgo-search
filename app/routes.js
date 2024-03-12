import express from 'express';
import SearchController from './controllers/SearchController.js';

const router = express.Router();

// Defined routes
router.get('/search/:site/:query', SearchController.get.bind(SearchController));

// TODO: convert get routes to post route

export default router;

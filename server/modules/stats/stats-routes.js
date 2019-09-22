'use strict';
import express from 'express';
import passport from 'passport';
import { getStats } from './stats-controller';

export const statsRoutes = express.Router();

statsRoutes.get('/stats', passport.authenticate('jwt', { session: false }), getStats);

export default statsRoutes;
'use strict';
import express from 'express';
import passport from 'passport';
import { updateProfile, getProfileById } from './profile-controller';

export const profileRoutes = express.Router();

profileRoutes.get('/profile/:profileId', passport.authenticate('jwt', { session: false }), getProfileById);
profileRoutes.put('/profile/:profileId', passport.authenticate('jwt', { session: false }), updateProfile);

export default profileRoutes;
import * as googleAuth from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import User from './Models/userModel';
import mongoose from 'mongoose';

dotenv.config();

passport.use(
  new googleAuth.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      let email = profile.emails ? profile.emails[0].value : '';
      const user = await User.findOne({ email: email });
      if (user) return done(null, user);
      else {
        const newUser = await User.create({
          username: profile.displayName,
          email: email,
          _id: new mongoose.Types.ObjectId(parseInt(profile.id)),
        });
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

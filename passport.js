import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    // You can customize what to do with the user profile data here
    return done(null, profile);
  }
  ));
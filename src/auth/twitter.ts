import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY!,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
    callbackURL: "http://localhost:5000/auth/twitter/callback"
}, (token, tokenSecret, profile, done) => {
    return done(null, { profile, token, tokenSecret });
}));

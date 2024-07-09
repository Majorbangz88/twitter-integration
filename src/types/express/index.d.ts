import { Profile } from 'passport-twitter';

declare global {
    namespace Express {
        interface User {
            profile: Profile;
            token: string;
            tokenSecret: string;
        }
    }
}

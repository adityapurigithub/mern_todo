import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../models/User.js";

let options = {};

//token from req-headers ....from client
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//secret used to extract user from token
options.secretOrKey = process.env.JWT_KEY || "thisisasecret";

export default (passport) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      //when creating jwt token i passed id so finding user using the id in payload
      User.findById(jwt_payload.id, function (err, user) {
        if (err) {
          return done(err, false); //done(_err_,_user_)
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};

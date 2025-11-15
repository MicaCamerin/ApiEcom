const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JWTStrategy } = require('passport-jwt');
const UserDAO = require('../data/user.mongo');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET || 'secretjwt';

function initializePassport() {
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await UserDAO.findByEmail(email);
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return done(null, false, { message: 'Contraseña incorrecta' });

      
      const safeUser = { ...user };
      delete safeUser.password;
      return done(null, safeUser);
    } catch (err) {
      return done(err);
    }
  }));

 
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: (req) => {
      let token = null;
      if (req && req.cookies) token = req.cookies['jwt'];
      return token;
    },
    secretOrKey: SECRET
  }, async (jwt_payload, done) => {
    try {
      const user = await UserDAO.getById(jwt_payload.id);
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const safeUser = { ...user };
      delete safeUser.password;
      return done(null, safeUser);
    } catch (err) {
      return done(err);
    }
  }));
}

module.exports = initializePassport;
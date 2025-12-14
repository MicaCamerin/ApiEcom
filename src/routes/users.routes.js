const express = require('express');
const router = express.Router();
const UserDAO = require('../data/user.mongo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserDTO = require('../dtos/user.dto');

const SECRET = process.env.JWT_SECRET || 'secretjwt';

// Registro 
router.post('/register', async (req, res) => {
  try {
    const existing = await UserDAO.findByEmail(req.body.email);
    if (existing) return res.status(400).json({ message: 'Email ya registrado' });

    const newUser = await UserDAO.createUser(req.body);
  
    const { password, ...safeUser } = newUser;
    res.status(201).json({ status: 'success', payload: safeUser });
  } catch (error) {
    console.error('POST /api/sessions/register', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
});

// Login 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Login failed' });

    
    const token = jwt.sign({ id: user._id || user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '1h' });

    
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ status: 'success', token });
  })(req, res, next);
});


router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const safeUser = new UserDTO(req.user);

    res.json({
      status: 'success',
      payload: safeUser
    });
  }
);

module.exports = router;
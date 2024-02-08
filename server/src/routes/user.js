const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const { User } = require('../../db/models');

userRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('Cookie');
    res.json({ msg: 'Logged out' });
  });
});

userRouter.get('/auth', (req, res) => {
  res.json({user: req.session?.newUser || ''})
})

userRouter.post('/register', async (req, res) => {
  const { email, login, phone_number, password, role } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json({ err: 'User is already exists' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ role, email, login, phone_number, password: hash });
      req.session.email = newUser.email;
      req.session.save( () => {
        res.json({ msg: 'User registered', newUser });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.email = user.email;
        req.session.save(() => {
          res.json({ msg: 'Authorization succesfully completed', email: user.email});
        });
      } else {
        res.json({ err: 'Incorrect password' });
      }
    } else {
      res.json({ err: 'Such user not found' });
    }
  } catch (error) {
    console.log(error);
    res.json({ err: 'Authorization error' });
  }
});

module.exports = userRouter;


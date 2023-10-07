import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import passport from 'passport';

//register

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//login
export const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }
    if (!user) {
      return res.status(401).json({ msg: info.message });
    }

    // Log in the user
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ msg: loginErr.message });
      }
      // User is authenticated and logged in successfully
      return res.status(200).json({ msg: 'Login successful', user });
    });
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }
    res.status(200).json({ msg: 'Logout successful' });
  });
};

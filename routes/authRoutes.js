import { Router } from 'express';
import multer from 'multer';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/isAuth.js';

const authRoute = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

authRoute.post('/register', upload.single('picture'), registerUser);
authRoute.post('/login', loginUser);
authRoute.get('/logout', logoutUser);
authRoute.get('/home', isAuthenticated, (req, res) => {
  res.json({ msg: 'welcome home' });
});

export default authRoute;

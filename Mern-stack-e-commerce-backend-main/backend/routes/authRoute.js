import { registerController, loginController, updateProfile } from "../controller/authcontroller.js";
import express from "express";
import { requireSignIn , isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/register', registerController);

//Login , post

router.post('/login', loginController);

//protected route

router.get('/userauth', requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true
  });
});

router.get('/adminauth',   requireSignIn, isAdmin , (req, res) => {
  res.status(200).send({
    ok: true
  });
});



// update profile

router.put('/profile' , requireSignIn , updateProfile)
export default router;

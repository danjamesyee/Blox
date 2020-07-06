//use Express router to separate our resources
const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");

//setup JSON web token so our users can sign in and acess protected routes
const jwt = require("jsonwebtoken");

//set up route for user registraction
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const passport = require("passport");

//import your validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Note: callback for every Express route requires request and response as args
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

//create private auth route:
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  }
);

//set up route to register new users:
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check to make sure nobody has already registered with a duplicate handle
  User.findOne({ handle: req.body.handle }).then((user) => {
    if (user) {
      // Use the validations to send the error
      errors.handle = "User already exists";
      return res.status(400).json(errors);

    } else {
      // Otherwise create a new user
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });
      //avoid storing PW in db as string, use bcrypt to salt and hash the PW first
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, handle: user.handle };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//setup a route to allow users to login. similar to rails, compares user inputed PW
//with salted/hashed PW . if PW incorrect, return status 400 error
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      // Use the validations to send the error
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email };

        //we want to return signed jsonwebtoken with each login or register request
        //in order to 'sign the user in' on the frontend
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
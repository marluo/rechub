const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const decode = require("../middleware/decode");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Joi = require("@hapi/joi");
const schema = require("../validation/registerjoi");
const validateUser = require("../validation/registerjoi");
const User = require("../models/User");

// @@route - regga en user
// @@desc - regga en user och skicka token
// @@who - public

router.post("/api/users/register", async (req, res) => {
  try {
    //destructa objektet
    const { email, username, password, role, firstName, lastName } = req.body;
    const { error } = validateUser(req.body);
    if (error) {
      return res.json({ errors: error.details });
    }

    //hitta user i db
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "User with that email is already registered"
      });
    }

    //ny user
    const newUser = new User({
      email,
      username,
      password,
      role,
      firstName,
      lastName
    });

    //hashar lösenordet
    newUser.password = await bcrypt.hash(newUser.password, 10);
    //sparar user
    await newUser.save();

    //payload som vi ska signa/codea

    //signera och skapa en token
    jwt.sign(
      { id: newUser.id, name: `${firstName} ${lastName}`, role: newUser.role },
      process.env.JWTSECRET,

      (err, token) => {
        //om error
        if (err) throw err;
        //skicka tillbaka token
        return res.json({ id, token, firstName, lastName, role, username });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @@route - logga in user
// @@desc - logga in user och skicka token
// @@who - public

router.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Incorrect password or username" });
    }

    const { id, firstName, lastName, role, username } = user;

    //kollar om användaren finns i databasen

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log(checkPassword);
    //kollar om lösenordet är rätt
    if (!checkPassword) {
      return res.send({ msg: "Incorrect password or username" });
    }

    jwt.sign(
      { id: id, name: `${firstName} ${lastName}`, role: role },
      process.env.JWTSECRET,
      (err, token) => {
        res
          .status(200)
          .json({ id, token, firstName, lastName, role, username });
      }
    );
  } catch (err) {
    console.error(err);
    res.send({ err: "something" });
  }
});

router.get("/users/auth", decode, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    console.log("ww", user);

    if (!user) {
      res.json({ msg: "no user found by that id" });
    }

    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.json("error");
  }
});

module.exports = router;

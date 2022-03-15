require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function register(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);
    const result = await User.create({ ...req.body, password_digest: hashed });
    res.status(201).json({ msg: "user created!" });
  } catch (err) {
    res.status(500);
  }
}

async function login(req, res) {
  try {
    if (!req.body.username) {
      throw new Error("No username inserted");
    }
    if (!req.body.password) {
      throw new Error("No password inserted");
    }
    // -----
    const user = await User.findByUsername(req.body.username);
    const authed = await bcrypt.compare(req.body.password, user.passwordDigest);
    if (!!authed) {
      const payload = { username: user.username };
      let token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 1000,
      });
      if (!token) {
        throw new Error("Error in token generation");
      }
      res.status(200).json({
        success: true,
        token: "Bearer " + token,
      });
      // ------
      // const user = await User.findByUsername(req.body.username);
      // const authed = bcrypt.compareSync(req.body.password, user.passwordDigest);
      // if (!!authed) {
      //   const payload = { username: user.username };
      //   const sendToken = (err, token) => {
      //     if (err) {
      //       throw new Error("Error in token generation");
      //     }
      //     res.status(200).json({
      //       success: true,
      //       token: "Bearer " + token,
      //     });
      //   };
      //   jwt.sign(payload, process.env.SECRET, { expiresIn: 1000 }, sendToken);
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401);
  }
}

module.exports = { register, login };

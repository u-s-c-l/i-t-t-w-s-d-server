require("dotenv").config();

const Score = require("../models/Score");

async function index(req, res) {
  //returns an array
  try {
    const scores = await Score.all;
    res.status(200).json(scores);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function findByUsername(req, res) {
  //returns an object
  try {
    const score = await Score.findByUsername(req.params.username);
    res.status(200).json(score);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function findByCategory(req, res) {
  //returns an object
  try {
    const score = await Score.findByCategory(req.params.cat);
    res.status(200).json(score);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function findByUsernameAndCat(req, res) {
  //returns an object
  try {
    const score = await Score.findByUsernameAndCat(
      req.params.username,
      req.params.cat
    );
    res.status(200).json(score);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function returnLeadersBoard(req, res) {
  //returns an object
  try {
    const score = await Score.getLeadersBoard;
    res.status(200).json(score);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function updateInsert(req, res) {
  try {
    const newdata = await Score.updateScore(
      req.body.username,
      req.body.cat,
      req.body.score
    );
    res.status(201).json(newdata);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function destroy(req, res) {
  try {
    const score = await Score.destroy(req.params.username);
    res.status(204).end();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  index,
  findByUsername,
  findByCategory,
  findByUsernameAndCat,
  returnLeadersBoard,
  updateInsert,
  destroy,
};

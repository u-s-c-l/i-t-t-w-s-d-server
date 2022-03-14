require('dotenv').config();

const Score = require('../models/Score');

async function index (req, res) { //returns an array
    try {
        const scores = await Score.all
        res.status(200).json(scores)
    } catch(err) {
        res.status(403).send(err.message)
    }
}

async function findByUsername (req, res){ //returns an object
try{ 
        const score = await Score.findByUsername(req.params.username);
        res.status(200).json(score)
} catch(err) {
        res.status(403).send(err.message)
        }
}

async function destroy(req, res){
    try {
        const score = await Score.findByUsername(req.params.username)
        await score.destroy()
        res.status(204).send('User scores deleted')
    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = { index, findByUsername, destroy }

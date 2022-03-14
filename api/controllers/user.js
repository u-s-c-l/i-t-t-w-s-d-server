require('dotenv').config();

const User = require('../models/User');

async function index (req, res) { //returns an array
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch(err) {
        res.status(403).send({err})
    }
}

async function findByUsername (req, res){ //returns an object
try{ 
        const user = await User.findByUsername(req.params.username);
        res.status(200).json(user);
} catch(err) {
        res.status(403).json(err.message);
        }
}

module.exports = { index, findByUsername }
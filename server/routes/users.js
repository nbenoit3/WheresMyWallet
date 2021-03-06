const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require("../db");
const passport = require("../passport");

/* GET users listing. */
router.post('/login', passport.authenticate('local'), function(req, res, next) {
    console.log(req.user.username);
    console.log(req.user.id);
    console.log("you hit login route");
    res.json({ id: req.user.id, username: req.user.username });
});


router.post('/register', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  console.log("you got to the register route!!");

  if (!username || !password) {
      res.status(400).send({
          error: "PROVIDE A USERNAME AND PASSWORD"
      })
  } else {
      const user = await db.any('SELECT * FROM users WHERE username = $1', [username])
      
      if (user.length === 0) {
          let hashedPassword = bcrypt.hashSync(password, 10);
          const newUser = await db.one('INSERT INTO users(username, password) VALUES($1, $2) RETURNING id,username', [username, hashedPassword])
          console.log(newUser);
          res.json(newUser)
      } else {
          res.status(400).send({error: "USER ALREADY EXISTS"})
      }
      }
});

module.exports = router;

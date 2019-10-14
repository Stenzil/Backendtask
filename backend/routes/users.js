const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find({}).select('username mobile -_id')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const mobile = req.body.mobile;
  const pass = req.body.pass;
  const newUser = new User({username,mobile, pass});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
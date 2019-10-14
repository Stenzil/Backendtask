const router = require('express').Router();
let Order = require('../models/order.model');

let Car = require('../models/car.model');

router.route('/').get((req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.json('order deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
  const username = req.body.description;
  const vnumber = req.body.username;
  const duration = req.body.duration;
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  
  const orderid = vnumber+year+month+date;
  
  const newOrder = new Order({username,vnumber,orderid,duration});
  console.log(req.body.duration)
  Car.findOneAndUpdate({"vnumber": req.body.duration},{"isRented": true})
  .then(cars => res.json(cars))
  .then(newOrder.save())
  .catch(err => res.status(400).json('Error: ' + err));

});
module.exports = router;
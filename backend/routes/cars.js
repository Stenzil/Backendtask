const router = require('express').Router();
let Car = require('../models/car.model');
router.route('/').get((req, res) => {
    Car.find()
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/ava').get((req, res) => {
    Car.find({"isRented": false})
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/search').get((req,res)=> {
    const model = req.body.model;
    var seating = req.body.seating;
    Car.find({"model":model,"seating":seating})
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/add').post((req, res) => {
    const model = req.body.model;
    const vnumber = req.body.vnumber;
    const rentperday = req.body.rentperday;
    const seating = req.body.seating;
    const isRented = req.body.isRented;
  
    const cars = new Car({
      model ,
      vnumber ,
      rentperday,
      seating,
      isRented
    });
  
    cars.save()
    .then(() => res.json('car added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:model').get((req, res) => {
    Car.find({"model": req.params.model})
      .then(car => res.json(car))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:vnumber').post((req, res) => {
    Car.findOneAndUpdate({"vnumber": req.params.vnumber},{"isRented": false})
      .then(car => res.json("rent clear"))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/info/:id').get((req, res) => {
    Car.findById(req.params.id)
      .then(car => res.json(car))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Car.findByIdAndDelete(req.params.id)
      .then(() => res.json('Car deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Car.findById(req.params.id)
      .then(exercise => {
        exercise.model = req.body.model;
        exercise.vnumber = req.body.vnumber;
        exercise.seating = req.body.seating;
        exercise.rentperday = req.body.rentperday;
        exercise.isRented = req.body.isRented;
  
        exercise.save()
          .then(() => res.json('Car Details updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;
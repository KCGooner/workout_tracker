const router = require('express').Router();

const Workout = require('../models/model.js');

router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((result) => {
      res.json(result);
    })
});



router.get('/api/workouts', (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((result) => {
      result.forEach((workout) => {
        let total = 0;
        workout.exercises.forEach((exercise) => {
          total += exercise.duration;
        });
        workout.totalDuration = total;
      });
      res.json(result);
    })
});

router.put('/api/workouts/:id', (req, res) => {
  Workout.updateOne({ _id: req.params.id }, {
    $push: {
      exercises: req.body,
    },
    })
    .then((result) => {
      res.json(result);
    })
});

router.get('/api/workouts/range', (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((result) => {
      res.json(result);
    })
});

module.exports = router;
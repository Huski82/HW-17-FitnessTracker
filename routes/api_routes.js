const Workout = require("../models/workout.js");
const express = require("express");
const router = express.Router();


router.get("/api/workouts", (req, res) => {
	Workout.find({});
	Workout.aggregate([
		{
			$addFields: {
				totalDuration: {
					$sum: "$exercises.duration",
				},
			},
		},
	])
		.sort({ date: -1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post("/api/workouts", (req, res) => {
	Workout.create({})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch(({ message }) => {
			console.log(message);
		});
});

router.put("/api/workouts/:id", (req, res) => {
	console.log("Params", req.body, req.params);

	Workout.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { exercises: req.body } },
		{ new: true }
	)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.get("/api/workouts/range", (req, res) => {
	Workout.find({});
	Workout.aggregate([
		{
			$addFields: {
				totalDuration: {
					$sum: "$exercises.duration",
				},
			},
		},
	])
		.sort({ day: -1 })
		.limit(7)
		.sort({ day: 1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});



module.exports = router;

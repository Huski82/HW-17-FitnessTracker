const Workout = require("../models/workout.js");
const express = require("express");
const app = express.Router();


app.get("/api/workouts", (req, res) => {
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

app.post("/api/workouts", (req, res) => {
	Workout.create({})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch(({ message }) => {
			console.log(message);
		});
});

app.put("/api/workouts/:id", (req, res) => {
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

app.get("/api/workouts/range", (req, res) => {
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



module.exports = app;

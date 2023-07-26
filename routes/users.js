const Joi = require("joi");
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const users = [
  { id: 1, name: "hamza" },
  { id: 2, name: "wahid" },
  { id: 3, name: "saad" },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    type: req.body.type,
    isArchive: req.body.isArchive,
  });

  res.send(user);
});

router.put("/:id", (req, res) => {
  const genre = users.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The user with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = users.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The user with the given ID was not found.");

  const index = users.indexOf(genre);
  users.splice(index, 1);

  res.send(genre);
});

router.get("/:id", (req, res) => {
  const genre = users.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(genre);
});

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    type: Joi.string().required(),
    isArchive: Joi.boolean().required(),
  };

  return Joi.validate(user, schema);
}

module.exports = router;

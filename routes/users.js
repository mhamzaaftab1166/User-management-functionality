const Joi = require("joi");
const express = require("express");
const User = require("../models/user");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.query);
  const { type, name, email, isArchive } = req.query;
  const whereClause = {};

  if (type) {
    whereClause.type = type;
  }

  if (name) {
    whereClause.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (email) {
    whereClause.email = {
      [Op.like]: `%${email}%`,
    };
  }

  if (isArchive) {
    whereClause.isArchive = isArchive === "true";
  }

  const users = await User.findAll({
    where: whereClause,
  });

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

router.put("/:id", async (req, res) => {
  const user = await User.findByPk(parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await user.update({
    name: req.body.name,
    email: req.body.email,
    type: req.body.type,
    isArchive: req.body.isArchive,
  });
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(parseInt(req.params.id));

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  await user.destroy();

  res.send(user);
});

router.get("/:email", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.params.email },
  });
  if (!user)
    return res.status(404).send("The user with the given email was not found.");
  res.send(user);
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

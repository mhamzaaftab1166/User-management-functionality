const Joi = require("joi");
const express = require("express");
const app = express();
require("./startup/db")();
require("./startup/routes")(app);

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const Sequelize = require("sequelize");
const db = require("../connection");

const Car = db.define("cars", {
  name: {
    type: Sequelize.STRING,
  },
  price_per_hour: {
    type: Sequelize.DOUBLE,
  },
  availability: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Car;

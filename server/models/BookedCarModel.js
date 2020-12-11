const Sequelize = require("sequelize");
const db = require("../connection");

const BookedCar = db.define("booked_cars", {
  car_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  hours:{
    type: Sequelize.INTEGER,
  },
  total_price: {
    type: Sequelize.FLOAT,
  },
  start_time: {
    type: Sequelize.BIGINT,
  },
  end_time: {
    type: Sequelize.BIGINT,
  },
});

module.exports = BookedCar;

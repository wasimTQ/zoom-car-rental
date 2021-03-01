const Op = require('sequelize').Op;

const carModel = require("../models/CarModel");

exports.getAllCars = async (req, res) => {
    const cars = await carModel.findAll();
    res.send(cars);
}

exports.getCarsByAvailability = async (req, res) => {
    let whereStatement = {};
    let query = req.query;

    if(query.availability){
        whereStatement.availability = query.availability
    }
    if(query.price_per_hour){
        whereStatement.price_per_hour = {
            [Op.lte]: query.price_per_hour
        }
    }

    console.log(whereStatement);
    try{
        const cars = await carModel.findAll({
            where: whereStatement
        });
        res.send(cars);
    }catch (err){
        res.status(400).send(err);
    }
}

exports.postCar = async (req, res) => {
   try {
    const cars = await carModel.create({
        name: req.body.name,
        price_per_hour: req.body.price,
        availability: true
      });
    res.send(cars);
   } catch (err) {
       res.status(400).send(err);
   }
}

exports.deleteCar = async (req, res) => {
    console.log(req.params.id);
    const cars = await carModel.destroy({
        where:{
            id: req.params.id
        },
    })
    res.send(true);
}
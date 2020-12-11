const bookedModel = require("../models/BookedCarModel");
const carModel = require("../models/CarModel");

exports.bookCar = async (req, res) => {
    const available_car = await carModel.findOne({
        where: {
            id: req.params.car_id
        }
    })
    if(!available_car.availability){
        res.send('Car is not available');
        return;
    }
    let now = new Date();
    console.log(now);
    console.log('Normal: ');
    console.log(now.getSeconds(),now.getMinutes(), now.getHours());
    console.log('UTC: ');
    console.log(now.getUTCSeconds(),now.getUTCMinutes(), now.getUTCHours());
    const toHours = req.body.hours * 60 * 60 * 1000
    let endTime = now.getTime() + toHours
    
    let dateFromTwo = new Date(endTime);
    console.log(dateFromTwo);
    console.log('Normal: ');
    console.log(dateFromTwo.getSeconds(), dateFromTwo.getMinutes(),dateFromTwo.getHours());
    console.log('UTC: ');
    console.log(dateFromTwo.getUTCSeconds(),dateFromTwo.getUTCMinutes(), dateFromTwo.getUTCHours());
    
    const booking = await bookedModel.create({
        car_id: req.params.car_id,
        user_id: req.userId,
        hours: req.body.hours,
        total_price: available_car.price_per_hour * req.body.hours,
        start_time: now.getTime(),
        end_time: dateFromTwo.getTime()
    })
    const changeAvailability = await carModel.update({
        availability: false
    }, {
        where: { id: req.params.car_id }
    })


    res.status(200).send({
        changeAvailability,
        booking
    })
}

exports.deleteBooked = async (req, res) => {
    const findCar = await bookedModel.findOne({
        where: { id: req.params.id }
    })
    
    if(findCar.user_id !== req.userId){
        res.send('Car cannot be deleted as it is not the one you bought');
        return;
    }
    
    const delBooked = await bookedModel.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send('deleted');
}

exports.bookedByUser = async (req, res) => {
    const booked = await bookedModel.findAll({
        where: { id: req.userId }
    })
    res.status(200).send(booked);
}
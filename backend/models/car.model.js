const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    vnumber: { type: String, required: true, unique: true },
    rentperday: { type: Number, required: true },
    seating: { type: Number, required: true },
    isRented: {type: Boolean, required: true, default: false}
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
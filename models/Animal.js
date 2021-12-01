const mongoose = require("mongoose");

const Animal = mongoose.model('Animal', {
    name: String,
    race: String,
    age: Number,
    brave: Boolean,
})

module.exports = Animal
const {Schema, model} = require("mongoose");

//name, user's name, timestamp pizza created, timestamp pizza updates, pizza size, pizza toppings

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//create the Pizza model using the PizzeSchema
const Pizza = model('Pizza', PizzaSchema);

//export the pizza model
module.exports = Pizza;


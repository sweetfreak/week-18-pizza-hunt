const { Pizza } = require('../models');

const pizzaController = {

    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
          .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    //get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({_id: params.id})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                //if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create pizza
    //NOTE: in mongoose, the .create can insert one or insert many using the same function
    createPizza({ body }, res) {
        Pizza.create(body)
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.json(err));
      },

    //update pizza
    // NOTE: With this .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and returns the updated document. If we don't set that third parameter, { new: true }, it will return the original document. By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
    // note 2: there are methods called "updateOne and udpateMany which update the json docs without returning them"
    updatePizza({params, body}, res) {
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No Pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete pizza
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
        .then(dbPizzaData=> {
            if(!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;
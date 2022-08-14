const router = require('express').Router();
const {
  getAllPizza,
  getPizzaByID,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller');

//set up GET all and POST at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

//set up GET one, PUT, and DELETE  at /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaByID)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;

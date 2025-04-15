var express = require('express');
var router = express.Router();
let recipes = require('../recipes.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/step/:id', (req, res) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    let { elapsedTime = '0' } = req.query;
    if (!/^\d+$/.test(elapsedTime)) {
      return res.status(400).send('NOT_FOUND');
    }
    elapsedTime = Number(elapsedTime);

    //VAlidate id
    if (isNaN(numId) || !numId) {
      return res.status(400).send('NOT_FOUND');
    }
    const recipe = recipes.find(recipe => recipe.id === numId);

    // check for exisiting recipe
    if (!recipe) {
      return res.status(400).send('NOT_FOUND');
    }

    // find current step based on elapsed time
    const foundIndex = recipe.timers.findIndex(time => elapsedTime <= time);
    const stepIndex = foundIndex === -1 ? recipe.timers.length - 1 : foundIndex;

    res.json({ index: stepIndex });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
});

module.exports = router;
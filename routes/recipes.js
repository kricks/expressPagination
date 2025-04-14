var express = require('express');
var router = express.Router();
let recipes = require('../recipes.json');

// ascyn / await allows handling future operations without blocking execution
router.get('/', async (req, res, next) => {
  try {
    const { context } = req;
    const page = context?.page || 1; //defaults to first page
    const limit = context && context.limit || req.query.limit;
    const skip = context && context.skip || req.query.skip || ((page - 1) * limit);
    const search = context && context.searchTerm || req.query.q;
    
    let results = search ? recipes.filter(({ name }) => name.match(new RegExp(search, "gi"))) : recipes;
    results = await results.slice(skip, (skip + limit)); //extracts correct portion for pagination, skip determins starting index of results, skip + limit ensures limit number of recipes are returned
    res.json({
      page: Number(page),
      limit: Number(limit),
      skip: Number(skip),
      search: search,
      data: results || [],
    });
  }
  catch (err) {
    return res.status(500).json({ errorMessage: 'Failed to fetch recipes', error: err });
  }
});

module.exports = router;

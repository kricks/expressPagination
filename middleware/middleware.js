module.exports = (req, res, next) => {
    const {page = 1, limit = 3, q = ''} = req.query; // extract query parameters
    // console.log('req', req.query);
    req.context = {
        page: +page,
        limit: +limit,
        skip: (page - 1) * limit, // this calculates the correct starting index for pagination
        searchTerm: q,
        search: q ? new RegExp(q, "gi") : null
    };
    next(); // allows request to proceed to the recipes.js router
}
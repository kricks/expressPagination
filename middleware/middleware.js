module.exports = (req, res, next) => {
    const {page = 1, limit = 3, q = ''} = req.query; // extract query parameters

    // coinvert to number and validate
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    // Reject non-numeric values
    if (isNaN(parsedPage) || isNaN(parsedLimit)) {
        return res.status(400).json({ error: "Invalid pagination parameters. Page and limit must be numbers." });
    }

    // Handle negative numbers gracefully (convert to default values)
    req.context = {
        page: parsedPage < 1 ? 1 : parsedPage, // Negative pages default to `1`
        limit: parsedLimit < 1 ? 3 : parsedLimit, // Negative limits default to `3`
        skip: (parsedPage < 1 ? 1 : parsedPage - 1) * parsedLimit,
        searchTerm: q,
        search: q ? new RegExp(q, "gi") : null
    };
    next(); // allows request to proceed to the recipes.js router
}
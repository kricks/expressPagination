# Express Recipes Projects

This repository contains two Express applications:

1. **Express Pagination** – An application demonstrating pagination, filtering, and secure recipe query parsing.
2. **Express Find Recipe** – An application that returns the current step index of a recipe based on elapsed time.

---

## Repository Structure

```
expressFindRecipe/
├── app.js
├── package.json
├── README.md
├── recipes.json
├── bin/
│   └── www
├── public/
│   └── stylesheets/
│        └── style.css
├── routes/
│   ├── index.js
│   └── recipes.js
├── test/
│   └── recipes.test.js
└── views/
    ├── error.jade
    ├── index.jade
    └── layout.jade

expressPagination/
├── app.js
├── package.json
├── README.md
├── recipes.json
├── bin/
│   └── www
├── middleware/
│   └── middleware.js
├── model/
│   └── objectModel.js
├── public/
│   └── stylesheets/
│        └── style.css
├── routes/
│   ├── index.js
│   └── recipes.js
├── test/
│   └── recipes.test.js
└── views/
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

---

## Express Pagination

### Overview

The **Express Pagination** app demonstrates how to use a custom Express middleware to standardize query parameters for pagination. It processes parameters such as:

- `page` – The page number (default: 1)
- `limit` – Number of items per page (default: 3)
- `skip` – Calculated offset (`(page - 1) * limit`)
- `searchTerm` – A search string from the `q` query parameter
- `search` – A regular expression (`gi` flag) built from the search term

The middleware validates the parameters before the request reaches the router for recipes, ensuring secure and predictable behavior.

### Installation

1. Navigate to the `expressPagination` directory.
2. Install dependencies:

    ````sh
    npm install
    ````

### Running the Application

Start the server by running:

````sh
npm start

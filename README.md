# Express Recipes Projects

This repository contains two Express applications that showcase different aspects of working with Express:

1. **Express Pagination** – Demonstrates robust handling of paginated data, filtering, and secure query parsing.
2. **Express Find Recipe** – Provides an API to determine the current step of a recipe based on the elapsed time.

---

## Overview

The projects showcase how to build RESTful APIs using Express, and how to employ middleware to manipulate and validate request data. This README provides more in-depth explanations of each application.

---

## Express Pagination

### Purpose

The Express Pagination application is designed to help developers understand how to:

- Handle query parameters for pagination.
- Perform data filtering based on a search query.
- Securely transform and validate incoming query parameters.
- Integrate middleware into an Express application to standardize request handling.

### How It Works

1. **Middleware for Query Parsing:**
   - Middleware intercepts incoming requests and extracts query parameters.
   - It sets default values for missing parameters (`page`, `limit`) and computes properties like `skip` for database queries.
   - Additionally, the middleware constructs a regular expression (`search`) for flexible filtering based on an optional `q` parameter.

2. **Routing:**
   - After processing by the middleware, the request reaches the recipes router.
   - The router uses these parameters to fetch and paginate data from the model or data store (`recipes.json`).

3. **Model Integration:**
   - The `objectModel.js` (or similar module) may define methods to interface with data, ensuring that pagination and filtering are applied consistently.
   - This abstraction helps in decoupling the business logic from the Express routes.

4. **Response:**
   - The server returns a JSON response containing paginated recipe entries and metadata (such as the current page and total pages).

### Benefits

- **Reusability:** The middleware for handling query parameters is modular and can be reused across different routes or projects.
- **Security:** By validating and sanitizing input, the application minimizes risks related to malformed or malicious queries.
- **Scalability:** The approach simplifies adding more filters or pagination enhancements in the future.

---

## Express Find Recipe

### Purpose

The Express Find Recipe application is built to determine the current step of a recipe by evaluating the amount of time that has elapsed. This is particularly useful in scenarios where a recipe involves timed steps (e.g., cooking instructions).

### How It Works

1. **Endpoint Structure:**
   - The main endpoint, `/recipes/step/:id`, accept a recipe identifier as a route parameter.
   - An optional query parameter `elapsedTime` can be supplied to simulate the time passed since the recipe started.

2. **Validation:**
   - The application checks if the provided `id` corresponds to a valid recipe in the data store (`recipes.json`).
   - It also validates the `elapsedTime` parameter to ensure it is a positive numeric value.
   - If any validation fails, the API responds with a 400 status code and a message indicating `NOT_FOUND`.

3. **Logic for Step Determination:**
   - Each recipe includes a sequence of steps, each with an associated timer value.
   - The server logic iterates through the steps, comparing the `elapsedTime` against the predefined timers.
   - The response includes the index or identifier of the current step, so the client knows which instruction to display.

4. **Response:**
   - A successful request returns a JSON object with the current step data.
   - This logic provides an abstraction to handle recipes dynamically based on time, rather than hard-coded steps.

### Benefits

- **User Interaction:** Allows client-side applications (or voice assistants) to display the real-time progress of a recipe.
- **Dynamic Processing:** Adjusts the current instructional step based on time, improving the user experience for recipe guidance.
- **Robust Validation:** Prevents errors by validating both route parameters and query parameters before processing.

---

## Running the Applications

### Installation Steps

For both projects, ensure you have Node.js installed. Then, in each project directory (`expressPagination` or `expressFindRecipe`):

````sh

Starting the Applications
===========================
Run the server with:

Access the applications via [http://localhost:3000](http://localhost:3000).

Running Tests
-------------
Each application includes unit tests. To run these tests:

Tests are located in the test folder of each application.

Technologies Used
-----------------
- **Express:** A fast, minimalist web framework for Node.js.
- **Middleware:** Custom middleware for query parameter processing.
- **Jade:** For rendering views (if the project uses visual templating).
- **Morgan:** Logging HTTP requests.
- **Jest & Supertest:** For testing API endpoints and functionalities.

Contributions
-------------
Feel free to open issues or submit pull requests if you have suggestions for improvements or bug fixes.

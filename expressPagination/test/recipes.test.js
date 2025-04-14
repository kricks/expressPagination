const request = require("supertest");
const app = require("../app");

describe("Recipies API", () => {
    test("Should return recipes with pagination", async () => {
        const res = await request(app).get("/recipes?page=1&limit=3");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(3);
    });
    test("Should filter recipes by search term", async () => {
        const res = await request(app).get("/recipes?q=cr");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data.some(recipe => recipe.name.toLowerCase().includes("cr"))).toBe(true);
    });
    test("Should return empty data for non-existent search", async () => {
        const res = await request(app).get("/recipes?q=asdfqewr");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(0);
    });
    test("Should return first page with default limit if no pagination parameters are provided", async () => {
        const res = await request(app).get("/recipes");
        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.limit).toBe(3);
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].name).toBe("Crock Pot Roast");
    });
    test("Should return 500 on internal errors", async () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        const res = await request(app).get("/recipes?q=*");
        expect(res.status).toBe(500);
    });
    test("Middleware should attach pagination and search params", async () => {
        const response = await request(app).get("/recipes?page=2&limit=5&q=pizza");
        expect(response.status).toBe(200);
        expect(response.body.page).toBe(2);
        expect(response.body.limit).toBe(5);
        expect(response.body.search).toBe("pizza");
    });
    test("Should prevent malicious query injections", async () => {
        const response = await request(app).get("/recipes?q=' OR 1=1 --");
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0); // Prevent unintended matches
    });
    test("Should return 400 for invalid query parameters", async () => {
        const response = await request(app).get("/recipes?page=abc&limit=xyz");
        expect(response.status).toBe(400);
    });
    test("Should respond within acceptable time limit", async () => {
        const start = Date.now();
        await request(app).get("/recipes?page=1&limit=3");
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(500); // Ensure response is under 500ms
    });
    test("Should handle special characters in search term", async () => {
        const response = await request(app).get("/recipes?q=$%^&");
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0); // Expect no matches
    });
    test("Should default to page 1 if page parameter is negative", async () => {
        const response = await request(app).get("/recipes?page=-5&limit=3");
        expect(response.status).toBe(200);
        expect(response.body.page).toBe(1);
    });
    test("Should default to limit 3 if limit parameter is negative", async () => {
        const response = await request(app).get("/recipes?page=1&limit=-2");
        expect(response.status).toBe(200);
        expect(response.body.limit).toBe(3);
    });
    test("Should return an empty array when page is out of range", async () => {
        const response = await request(app).get("/recipes?page=100&limit=3");
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
    });
});

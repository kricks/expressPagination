const request = require("supertest");
const app = require("../app");

describe("FindRecipesApi", () => {
    it("Should return index of current step", async () => {
        const res = await request(app).get('/recipes/step/4?elapsedTime=11');
        expect(res.status).toBe(200);
        expect(res.body.index).toBe(0);
    });
    it("Should return 400 when ID is not valid number", async () => {
        const res = await request(app).get('/recipes/step/100?elapsedTime=100');
        expect(res.status).toBe(400);
    });
    it("should return 400 when ID is not in response body", async () => {
        const res = await request(app).get('/recipes/step/null');
        expect(res.status).toBe(400);
    });
    it("Should default elapsedTime to 0 when not provided", async () => {
        const res = await request(app).get('/recipes/step/2');
        expect(res.status).toBe(200);
        expect(res.body.index).toBe(0); // Assuming timers[0] is the first step
    });
    it("Should return 400 when elapsedTime is not a valid number", async () => {
        const res = await request(app).get('/recipes/step/2?elapsedTime=abc');
        expect(res.status).toBe(400);
    });
    it("Should return the last step when elapsedTime exceeds all timers", async () => {
        const res = await request(app).get('/recipes/step/2?elapsedTime=9999');
        expect(res.status).toBe(200);
        expect(res.body.index).toBe(9); // Assuming timers.length is 10
    });
    it("Should respond within acceptable time limit", async () => {
        const res = await request(app).get('/recipes/step/3?elapsedTime=20').timeout(5000);
        expect(res.status).toBe(200);
    });    
});

const request = require("supertest");
const app = require("../app.js");

describe("base.register function", () => {
  // positive
  test("positif", async () => {
    try {
      const user = {
        name: "rafii",
        email: "rafii@gmail.com",
        password: "ferdie123",
      };

      const res = await request(app)
        .post("/auth/register")
        .send({ name: user.name, email: user.email, password: user.password });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("user created!");
      expect(res.body.data).toStrictEqual({
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

describe("base.register function", () => {
  // positive
  test("negatif", async () => {
    try {
      const user = {
        name: "umar",
        email: "umar@gmail.com",
        password: "ferdie123",
      };

      const res = await request(app)
        .post("/auth/register")
        .send({ name: user.name, email: user.email, password: user.password });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("email already used!");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

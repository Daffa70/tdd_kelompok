const request = require("supertest");
const app = require("../app.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

describe("login function", () => {
  // positive
  test('res.json called { status: true, message: "login success!", data: {token: token}', async () => {
    try {
      const user = {
        id: 1,
        name: "sabrina",
        email: "sabrina@mail.com",
        password: "password123",
      };
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET_KEY
      );

      const res = await request(app)
        .post("/auth/login")
        .send({ email: user.email, password: user.password });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("login success!");
      expect(res.body.data).toStrictEqual({ token });
    } catch (err) {
      const token = err.response.body.data.token;
      expect(token).toBeTruthy();
    }
  });

  test('res.json called { status: false, message: "credential is not valid!", data: {null}', async () => {
    try {
      const user = {
        id: 1,
        name: "sabrina",
        email: "sabrina@mail.com",
        password: "password1235",
      };
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET_KEY
      );

      const res = await request(app)
        .post("/auth/login")
        .send({ email: user.email, password: user.password });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("credential is not valid!");
      expect(res.body.data).toBeNull();
    } catch (err) {
      const token = err.response.body.data.token;
      expect(token).toBeTruthy();
    }
  });
});

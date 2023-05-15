const request = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate");

// reset database user
truncate.user();

const user = {
  name: "kelompok1",
  email: "kelompok1@mail.com",
  password: "password123",
  token: "",
};

describe("base.register function", () => {
  // positive
  test("positif", async () => {
    try {
      const res = await request(app)
        .post("/auth/register")
        .send({ name: user.name, email: user.email, password: user.password });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("email");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("user created!");
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

describe("base.register function", () => {
  // positive
  test("negatif", async () => {
    try {
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

describe("login function", () => {
  // positive
  test('res.json called { status: true, message: "login success!", data: {token: token}', async () => {
    try {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: user.email, password: user.password });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("login success!");
      user.token = res.body.data.token;
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  test('res.json called { status: false, message: "credential is not valid!", data: {null}', async () => {
    try {
      const user1 = {
        email: "sabrina@mail.com",
        password: "password1231235",
      };

      const res = await request(app)
        .post("/auth/login")
        .send({ email: user1.email, password: user1.password });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("credential is not valid!");
      expect(res.body.data).toBeNull();
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

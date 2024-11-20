const dotenv = require("dotenv");
dotenv.config();

const request = require("supertest");
const app = require("../server");

// unit testing
// const AuthMiddlewares = require('../middlewares/authenticate')

// before() => run 1x diawal test case, utk semua test case
// beforeEach() => run SETIAP diawal test case, utk semua test case
// after() => run 1x diakhir test case
// afterEach() => run SETIAP diakhir test case, utk semua test case

describe("API LOGIN TEST", () => {
  it("Login succeed", async () => {
    const user = {
      email: "richmondcarter@amril.com",
      password: "Dummy123",
    };
    const response = await request(app).post("/api/v1/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Success");
  });

  it("Login failed", async () => {
    const user = {
      email: "emailsalah@mail.com",
      password: "Password123",
    };
    const response = await request(app).post("/api/v1/auth/login").send(user);
    console.log(response.body);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("Failed");
    expect(response.body.message).toBe(
      "Wrong password or user doesn't exist"
    );
  });
});

describe("API REGISTER TEST", () => {
  it("Register succeed", async () => {
    const user = {
      name: "Nauval Ahmed",
      email: "ahmed@example.com",
      password: "Dummy123",
      age: 21,
      city: "Bandung",
    };
    const response = await request(app).post("/api/v1/auth/register").send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("Success");
  });

  it("Register failed due to missing fields", async () => {
    const user = {
      name: "Muhammad Rafif Ramadhansyah",
      password: "Dummy12345",
      city: "Batam",
    };
    const response = await request(app).post("/api/v1/auth/register").send(user);
    console.log(response.body);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("Failed");
    expect(response.body.message).toBe("Required fields are missing");
  });

  it("Register failed due to email already registered", async () => {
    const user = {
      name: "Therese Roach",
      email: "thereseroach@amril.com",
      password: "Dummy123",
      age: 48,
      city: "Cimahi",
    };
    const response = await request(app).post("/api/v1/auth/register").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("Failed");
    expect(response.body.message).toBe("User email already taken");
  });

  it("Register failed due to password didn't meet minimum length", async () => {
    const user = {
      name: "Justin Hubner",
      email: "justin@example.com",
      password: "12345",
      age: 23,
      city: "Tangerang",
    };
    const response = await request(app).post("/api/v1/auth/register").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("Failed");
    expect(response.body.message).toBe("Minimum password must be 8 character");
  });
});

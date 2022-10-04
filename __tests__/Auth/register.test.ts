import request from "supertest";
import app from "../../app";

describe("REGISTER", () => {
  test("register simply", (done) => {
    request(app)
      .post(`/auth/register`)
      .send({
        email: process.env.REGISTER_TEST,
        password: process.env.PASSWORD_REGISTER_TEST,
      })
      .end(async (err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        var token = res._body.accessToken;
        await request(app)
          .post(`/auth/deleteAccount`)
          .set("Authorization", "Bearer " + token)
          .send({
            email: process.env.REGISTER_TEST,
            password: process.env.PASSWORD_REGISTER_TEST,
          });
        done();
      });
  });

  test("register with an existing address", (done) => {
    request(app)
      .post(`/auth/register`)
      .send({
        email: process.env.LOGIN_TEST,
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(403);
        expect(res._body.message).toMatch("403 your email already exists");
        done();
      });
  });

  test("register no badpassword", (done) => {
    request(app)
      .post(`/auth/register`)
      .send({
        email: process.env.REGISTER_TEST,
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.errors[0].msg).toMatch("Password is missing");
        expect(res.statusCode).toEqual(500);
        done();
      });
  });

  test("register with short password", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: process.env.REGISTER_TEST,
        password: "a",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Password need to be 6 length");
        done();
      });
  });

  test("register with no email", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        password: process.env.PASSWORD_REGISTER_TEST,
      })
      .expect(500)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Email is missing");
        done();
      });
  });

  test("register with a wrongly formatted email", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: "kylianhotmail.com",
        password: process.env.PASSWORD_REGISTER_TEST,
      })
      .expect(500)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Email is wrongly formatted");
        done();
      });
  });

  test("register with nothing", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({})
      .expect(500)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Email is missing");
        expect(res._body.errors[1].msg).toMatch("Password is missing");
        done();
      });
  });
});

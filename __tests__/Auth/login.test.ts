import request from "supertest";
import app from "../../app";

describe("LOGIN", () => {
  test("login simply", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: process.env.LOGIN_TEST,
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  test("login with a badpassword", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: process.env.LOGIN_TEST,
        password: "dsdsdd",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(403);
        expect(res._body.message).toMatch("403 Badpassword");
        done();
      });
  });

  test("login with no password", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: process.env.LOGIN_TEST,
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Password is missing");
        done();
      });
  });

  test("login with short password", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: process.env.LOGIN_TEST,
        password: "a",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Password need to be 6 length");
        done();
      });
  });

  test("login with no email", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .expect(500)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Email is missing");
        done();
      });
  });

  test("login with a wrongly formatted email", (done) => {
    request(app)
      .post(`/auth/login`)
      .send({
        email: "kylianhotmail.com",
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .expect(500)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Email is wrongly formatted");
        done();
      });
  });

  test("login with nothing", (done) => {
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

import request from "supertest";
import app from "../../app";

describe("DELETE ACCOUNT", () => {
  test("delete account with nothing", (done) => {
    request(app)
      .post(`/auth/deleteAccount`)
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

  test("delete account without tokenid", (done) => {
    request(app)
      .post(`/auth/deleteAccount`)
      .send({
        email: process.env.LOGIN_TEST,
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(404);
        expect(res._body.message).toMatch("404 jwt not found");
        done();
      });
  });

  test("delete account with badpassword", (done) => {
    request(app)
      .post(`/auth/deleteAccount`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .send({
        email: process.env.LOGIN_TEST,
        password: "abcdefghij",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(403);
        expect(res._body.message).toMatch("403 badpassword");
        done();
      });
  });

  test("delete account with bad email", (done) => {
    request(app)
      .post(`/auth/deleteAccount`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .send({
        email: "admin@hotmail.com",
        password: "abcdefghij",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(401);
        expect(res._body.message).toMatch(
          "401 you are trying to delete an account that is not yours"
        );
        done();
      });
  });

  test("delete account with expired token", (done) => {
    request(app)
      .post(`/auth/deleteAccount`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .send({
        email: process.env.LOGIN_TEST,
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(401);
        expect(res._body.message).toMatch("401 jwt expired");
        done();
      });
  });
});

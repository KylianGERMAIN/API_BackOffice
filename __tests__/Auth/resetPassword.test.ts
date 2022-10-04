import request from "supertest";
import app from "../../app";

describe("RESET PASSWORD", () => {
  test("reset password with nothing", (done) => {
    request(app)
      .post(`/auth/resetpassword`)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Password is missing");
        done();
      });
  });

  test("reset password with no header", (done) => {
    request(app)
      .post(`/auth/resetpassword`)
      .send({
        password: process.env.PASSWORD_LOGIN_TEST,
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(404);
        expect(res._body.message).toMatch("404 jwt not found");
        done();
      });
  });

  test("reset password with expired token", (done) => {
    request(app)
      .post(`/auth/resetpassword`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .send({
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

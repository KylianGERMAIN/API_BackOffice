import request from "supertest";
import app from "../../app";

describe("REFRESH ACCESS TOKEN", () => {
  test("refresh with refresh token simply", (done) => {
    request(app)
      .get(`/auth/refreshaccesstoken`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res._body.tokenType).toMatch("Bearer");
        done();
      });
  });

  test("refresh with nothing", (done) => {
    request(app)
      .get(`/auth/refreshaccesstoken`)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(404);
        expect(res._body.message).toMatch("404 jwt not found");
        done();
      });
  });

  test("refresh with bad refresh token", (done) => {
    request(app)
      .get(`/auth/refreshaccesstoken`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res._body.tokenType).toMatch("Bearer");
        done();
      });
  });
});

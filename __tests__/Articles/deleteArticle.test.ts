import request from "supertest";
import app from "../../app";

describe("DELETE ARTICLES", () => {
  test("delete article with nothing", (done) => {
    request(app)
      .post(`/articles/deleteArticle`)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.errors[0].msg).toMatch("Id is missing");
        expect(res.statusCode).toEqual(500);
        done();
      });
  });

  test("delete article with expired token", (done) => {
    request(app)
      .post(`/articles/deleteArticle`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .send({
        id: "a2b82f42-4013-11ed-b878-0242ac120002",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(401);
        expect(res._body.message).toMatch("401 jwt expired");
        done();
      });
  });
});

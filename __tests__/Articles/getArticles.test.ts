import request from "supertest";
import app from "../../app";

describe("GET ARTICLES", () => {
  test("get articles simply", (done) => {
    request(app)
      .get(`/articles/getArticles`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  test("get articles with search simply", (done) => {
    request(app)
      .get(`/articles/getArticles?search=krako`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res._body.data.length).toBeGreaterThan(0);
        done();
      });
  });


  test("get articles with search and pagination simply", (done) => {
    request(app)
      .get(`/articles/getArticles?search=titre&pagination=10000`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res._body.data.length).toEqual(0);
        done();
      });
  });

  test("get articles with not number in pagination", (done) => {
    request(app)
      .get(`/articles/getArticles?search=titre&pagination=abc`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(403);
        expect(res._body.message).toMatch(
          "403 pagination is not a number or is inferior at 1"
        );
        done();
      });
  });

  test("get articles with nothing", (done) => {
    request(app)
      .get(`/articles/getArticles`)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(404);
        expect(res._body.message).toMatch("404 jwt not found");
        done();
      });
  });

  test("get articles with expired token", (done) => {
    request(app)
      .get(`/articles/getArticles`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(401);
        expect(res._body.message).toMatch("401 jwt expired");
        done();
      });
  });
});

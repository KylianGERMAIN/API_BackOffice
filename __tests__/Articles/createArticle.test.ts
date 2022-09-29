import request from "supertest";
import app from "../../app";

describe("CREATE ARTICLE", () => {
  test("create article simply", (done) => {
    request(app)
      .post(`/articles/createArticle`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .send({
        title: "Krakow",
        content: "Krakow est une ville incroyable",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(200);
        expect(res._body.message).toMatch("OK");
        request(app)
          .post(`/articles/deleteArticle`)
          .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
          .send({
            id: res._body.id,
          })
          .end((err: any, ress: any) => {
            if (err) return done(err);
            expect(ress._body.statusCode).toEqual(200);
            expect(ress._body.message).toMatch("OK");
            done();
          });
      });
  });

  test("create article with no content", (done) => {
    request(app)
      .post(`/articles/createArticle`)
      .send({
        title: "Krakow",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Content is missing");
        done();
      });
  });

  test("create article with no title", (done) => {
    request(app)
      .post(`/articles/createArticle`)
      .send({
        content: "Krakow est une ville incroyable",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Title is missing");
        done();
      });
  });

  test("create article with no token", (done) => {
    request(app)
      .post(`/articles/createArticle`)
      .send({
        title: "Krakow",
        content: "Krakow est une ville incroyable",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(404);
        expect(res._body.message).toMatch("404 jwt not found");
        done();
      });
  });

  test("create article with expired token", (done) => {
    request(app)
      .post(`/articles/createArticle`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .send({
        title: "Krakow",
        content: "Krakow est une ville incroyable",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(401);
        expect(res._body.message).toMatch("401 jwt expired");
        done();
      });
  });
});

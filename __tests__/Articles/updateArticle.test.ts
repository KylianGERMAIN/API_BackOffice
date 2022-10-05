import request from "supertest";
import app from "../../app";

describe("UPDATE ARTICLES", () => {
  test("update articles simply", (done) => {
    request(app)
      .post(`/articles/updateArticle`)
      .set("Authorization", "Bearer " + process.env.VALIDE_LOGIN_TOKEN)
      .send({
        title: "Krakow",
        content: "Krakow est une ville incroyable",
        id: "2e59439e-18c2-4dfd-ba7e-19da4475cc5d",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  test("update articles with nothing", (done) => {
    request(app)
      .post(`/articles/updateArticle`)
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        expect(res._body.errors[0].msg).toMatch("Id is missing");
        expect(res._body.errors[1].msg).toMatch("Title is missing");
        expect(res._body.errors[2].msg).toMatch("Content is missing");
        done();
      });
  });

  test("update articles with no token", (done) => {
    request(app)
      .post(`/articles/updateArticle`)
      .send({
        title: "Krakow",
        content: "Krakow est une ville incroyable",
        id: "2e59439e-18c2-4dfd-ba7e-19da4475cc5d",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(404);
        expect(res._body.message).toMatch("404 jwt not found");
        done();
      });
  });

  test("update articles with expired token", (done) => {
    request(app)
      .post(`/articles/updateArticle`)
      .set("Authorization", "Bearer " + process.env.EXPIRED_LOGIN_TOKEN)
      .send({
        title: "Krakow",
        content: "Krakow est une ville incroyable",
        id: "2e59439e-18c2-4dfd-ba7e-19da4475cc5d",
      })
      .end((err: any, res: any) => {
        if (err) return done(err);
        expect(res._body.statusCode).toEqual(401);
        expect(res._body.message).toMatch("401 jwt expired");
        done();
      });
  });
});

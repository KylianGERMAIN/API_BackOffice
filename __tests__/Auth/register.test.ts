import request from "supertest";
import app from "../../app";

// describe("REGISTER", () => {
// test("Register simply", (done) => {
//     request(app)
//       .post(`/auth/register`)
//       .send({
//         email: process.env.LOGIN_TEST,
//         password: process.env.PASSWORD_LOGIN_TEST,
//       })
//       .expect(200)
//       .end((err: any, res: any) => {
//         if (err) return done(err);
//         expect(res.statusCode).toEqual(200);
//         done();
//       });
//   });
// });

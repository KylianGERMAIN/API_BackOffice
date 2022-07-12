import express, { Express, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generateAccessToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function generateRefreshToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '2y' });
}

function rowisvoid(rows: any): boolean {
  if (rows.length === 0) {
    return true
  }
  return false
}

function add_user_to_db(req: Request, res: Response, pool: any, hash: any) {
  var uuid = require('uuid');
  var datetime = Date.now();
  console.log(datetime)
  pool.query(`INSERT INTO public.users("id", "email", "password", "date") VALUES('${uuid.v4()}', '${req.body.email}', '${hash}', '${datetime}')`,
    (error: any, results: { rows: any; }) => {
      if (error) {
        console.log(error);
        res.status(403).send('Error');
        return false;
      }
      else {
        return true;
      }
    })
  return true
}

function hash_password(req: Request, res: Response, pool: any) {

  const saltRounds = 15;

  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    if (err) {
      res.status(403).send('Error generate token');
      return
    }
    bcrypt.hash(req.body.password, salt, async function (err: any, hash: any) {
      if (err) {
        res.status(403).send('Error generate token');
        return
      }
      var accesstoken = generateAccessToken({ email: req.body.email, password: hash });
      var refreshtoken = generateRefreshToken({ email: req.body.email, password: hash })
      if (await add_user_to_db(req, res, pool, hash) === true) {
        res.json({ refreshToken: refreshtoken, accessToken: accesstoken, tokenType: 'Bearer' });
      }
    });
  });
}

export async function register(req: Request, res: Response, pool: any) {
  await pool.query(`SELECT * FROM Public.users WHERE email like '${req.body.email}'`, (error: any, results: { rows: any; }) => {
    if (error) {
      console.log(results);
      res.status(403).send('Error');
      return false;
    }
    else {
      if (rowisvoid(results.rows) === true) {
        hash_password(req, res, pool)
        return true
      } else {
        res.status(404).send('Your email already exists');
        return false;
      }
    }
  });
  return false
}

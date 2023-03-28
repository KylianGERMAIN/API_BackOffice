import express, { Express, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
    responseEmailAlreadyExist,
    responseErrorWhileGeneratingToken,
    responseErrorWhileHashingToken,
    responseErrorSearchingAccount,
    responseErrorAddingAccount,
} from "../../Function/Response/responseUser";
import { pool } from "../../Function/Utils/database";
import { generateRefreshAcccesTokens } from "../../Function/Utils/generateToken";
import { rowIsVoid } from "../../Function/Utils/simpleCondition";
import { User } from "../../Interfaces/User";
const bcrypt = require("bcrypt");

function addUserToDb(user: User, res: Response) {
    pool.query(
        `INSERT INTO public.users("id", "email", "password", "date") VALUES('${user.id}', '${user.email}', '${user.password}', '${user.date}')`,
        (error: any) => {
            if (error) {
                responseErrorAddingAccount(res);
                return false;
            }
            return true;
        }
    );
    return true;
}

function hashPassword(user: User, res: Response) {
    const saltRounds = 15;

    bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
        if (err) {
            responseErrorWhileGeneratingToken(res);
            return;
        }
        bcrypt.hash(user.password, salt, async function (err: any, hash: any) {
            if (err) {
                responseErrorWhileHashingToken(res);
                return;
            }
            user.password = hash;
            if ((await addUserToDb(user, res)) === true) {
                res.status(StatusCodes.CREATED).json(
                    generateRefreshAcccesTokens(user)
                );
            }
        });
    });
}

export async function register(req: Request, res: Response) {
    var uuid = require("uuid");
    const user: User = {
        id: uuid.v4(),
        email: req.body.email,
        password: req.body.password,
        date: Date.now().toString(),
    };

    await pool.query(
        `SELECT * FROM public.users WHERE email like '${user.email}'`,
        (error: any, results: { rows: any }) => {
            if (error) {
                console.log(error);
                responseErrorSearchingAccount(res);
            } else {
                if (rowIsVoid(results.rows) === true) {
                    hashPassword(user, res);
                } else {
                    responseEmailAlreadyExist(res);
                }
            }
        }
    );
}

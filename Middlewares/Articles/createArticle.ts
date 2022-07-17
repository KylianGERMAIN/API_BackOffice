import express, { Express, Request, Response } from 'express';
import { verifToken } from '../../Function/Utils/verifToken';

export async function createArticle(req: Request, res: Response) {
    var token = JSON.parse((await verifToken(req.headers.authorization, res)).toString())
    if (token != 'error') {
        res.send("la route est fonctionnel")
    }
}

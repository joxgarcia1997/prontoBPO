import {Request, Response } from 'express';

import db from '../database';
import { promises } from 'fs';

class UserController {

    public async get (req: Request, res: Response) {
        const { id } = req.params;
        const user = await db.query('SELECT * FROM users where id = ?', [id]);
        if(user.length > 0){
            res.json(user[0]);
        }
        res.json({status:"error!"});
    }

    public async list (req: Request, res: Response) {
        const equipos = await db.query('SELECT * FROM users');
        res.json(equipos);
    }

    public async  create(req: Request, res: Response):  Promise<void> {
        await db.query('INSERT INTO users set ?', [req.body]);
        res.json({text : 'created'});
    }

    public async delete(req: Request, res:Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM users where id = ?', [id]);
        res.json({text: "deleted"});
    }

}

export const userController = new UserController();
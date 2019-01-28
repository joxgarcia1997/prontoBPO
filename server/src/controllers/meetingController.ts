import {Request, Response } from 'express';

import db from '../database';
import { promises } from 'fs';

class MeetingController {

    public async listMeetings (req: Request, res: Response) {
        const query = "select M.meeting_id, U.nombre, M.meeting_time from users U INNER JOIN meetings M on U.id = M.user_id";
        const meetings = await db.query(query);
        res.json(meetings);
    }

    public async listMeet (req: Request, res: Response){
        const { id } = req.params;
        const meetings = await db.query('select meeting_id, meeting_time from meetings where user_id = ?', [id]);
        res.json(meetings);
    }

    
    public async deleteMeet (req: Request, res: Response){
        const { id } = req.params;
        await db.query('DELETE FROM meetings where meeting_id = ?', [id]);
        res.json({text: "deleted"});
    }

    public async addMeet (req: Request, res: Response){
        await db.query('INSERT INTO meetings set ?', [req.body]);
        res.json({text: "created!"});
    }

    public async getAvailables (req: Request, res:Response){
        const query = "Select * from users U where not exists (Select 1 from meetings M where U.id = M.user_id and (M.free_time Between ? and ?) and (M.free_time Between '08:00' and '17:00') and (M.free_time not Between '12:00' and '13:00'))";
        const resp = await db.query(query,[req.body.start, req.body.end]);
        res.json(resp);
    }
}

export const meetingController = new MeetingController();
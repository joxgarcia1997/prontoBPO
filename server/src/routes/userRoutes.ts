import { Router } from 'express';

import { userController } from '../controllers/usersController'
import { meetingController } from '../controllers/meetingController'

class UserRoutes {
    public router : Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        // Users apis
        this.router.get('/:id', userController.get);
        this.router.get('/', userController.list);
        this.router.post('/', userController.create);
        this.router.delete('/:id',userController.delete);
        // Meetings 
        this.router.post('/meetings/availables/', meetingController.getAvailables);
        this.router.get('/meetings/all', meetingController.listMeetings);
        this.router.get('/meetings/:id', meetingController.listMeet);
        this.router.post('/meetings/', meetingController.addMeet);
        this.router.delete('/meetings/:id', meetingController.deleteMeet);

    }
}
const userRutes = new UserRoutes();
export default userRutes.router;
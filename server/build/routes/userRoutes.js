"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const meetingController_1 = require("../controllers/meetingController");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // Users apis
        this.router.get('/:id', usersController_1.userController.get);
        this.router.get('/', usersController_1.userController.list);
        this.router.post('/', usersController_1.userController.create);
        this.router.delete('/:id', usersController_1.userController.delete);
        // Meetings 
        this.router.post('/meetings/availables/', meetingController_1.meetingController.getAvailables);
        this.router.get('/meetings/all', meetingController_1.meetingController.listMeetings);
        this.router.get('/meetings/:id', meetingController_1.meetingController.listMeet);
        this.router.post('/meetings/', meetingController_1.meetingController.addMeet);
        this.router.delete('/meetings/:id', meetingController_1.meetingController.deleteMeet);
    }
}
const userRutes = new UserRoutes();
exports.default = userRutes.router;

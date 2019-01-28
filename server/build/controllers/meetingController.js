"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class MeetingController {
    listMeetings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "select M.meeting_id, U.nombre, M.meeting_time from users U INNER JOIN meetings M on U.id = M.user_id";
            const meetings = yield database_1.default.query(query);
            res.json(meetings);
        });
    }
    listMeet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const meetings = yield database_1.default.query('select meeting_id, meeting_time from meetings where user_id = ?', [id]);
            res.json(meetings);
        });
    }
    deleteMeet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM meetings where meeting_id = ?', [id]);
            res.json({ text: "deleted" });
        });
    }
    addMeet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO meetings set ?', [req.body]);
            res.json({ text: "created!" });
        });
    }
    getAvailables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "Select * from users U where not exists (Select 1 from meetings M where U.id = M.user_id and (M.free_time Between ? and ?) and (M.free_time Between '08:00' and '17:00') and (M.free_time not Between '12:00' and '13:00'))";
            const resp = yield database_1.default.query(query, [req.body.start, req.body.end]);
            res.json(resp);
        });
    }
}
exports.meetingController = new MeetingController();

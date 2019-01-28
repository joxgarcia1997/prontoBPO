"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); // Pongo mi servidor en el puerto 3000 o en otro entregado por un app
        this.app.use(morgan_1.default('dev')); // Devuelve los GET y POST en mi consola
        this.app.use(cors_1.default()); // Pide datos al servidor
        this.app.use(express_1.default.json()); // Entendera los archivos de json, evitando el modulo de body parser
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/users', userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Se inicio el server en el puerto:', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();

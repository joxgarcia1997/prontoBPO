import express, { Application } from 'express';

import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';

class Server {

    public app : Application; 

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);     // Pongo mi servidor en el puerto 3000 o en otro entregado por un app
        this.app.use(morgan('dev'));                        // Devuelve los GET y POST en mi consola
        this.app.use(cors());                               // Pide datos al servidor
        this.app.use(express.json());                       // Entendera los archivos de json, evitando el modulo de body parser
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/users',userRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Se inicio el server en el puerto:', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
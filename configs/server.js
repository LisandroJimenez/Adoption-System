'use strict';
import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection} from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from "../src/auth/auth.routes.js";

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use('/adoptionSystem/v1/auth', authRoutes)
}

const conectarDB = async() =>{
    try {
        await dbConnection();
        console.log('Conexion exitosa con la base de datos')
    } catch (error) {
        console.log('Error al conectar con la base de datos')
    }
}

export const initServer = async() =>{
 const app = express();
 const port = process.env.PORT || 3001;
 try {
     middlewares(app);
     conectarDB();
     routes(app);
     app.listen(port);
     console.log(`server running on port ${port}`)
    
 } catch (err) {
    console.log(`server init failed: ${err}`)
 }

}
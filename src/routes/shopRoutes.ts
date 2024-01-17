import { Router } from "express";
import { getIndex, getSaludo } from "../ controllers/shopCtrl.js";


export const shopRouter = Router();

shopRouter.get('/saludo', getSaludo );
shopRouter.get('/', getIndex);


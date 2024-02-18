import { Request,Response, NextFunction } from "express";
import { Events } from "../models/Events.js";
export const getEvents = async (req: Request,res: Response,next: NextFunction) => {  
    res.status(202).json({message:"ok", eventos: await Events.fetchAll()});
    
}; 
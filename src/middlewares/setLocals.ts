import { NextFunction, Request, Response } from "express";

const setLocals = (req:Request, res:Response, next: NextFunction)=>{
    res.locals.logado = req.cookies['logado'];
    next();
}
export default setLocals
import jwt from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET =  config.jwt_secret as string;

export const verfiyToken = (req: Request, res: Response, nex: NextFunction) => {
    // will get token this format: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjAzNjQ1NzEsImV4cCI6MTcyMDM2ODE3MX0.rnvvxV5PbDpHxlu_jj599euxbCiGeCCl0eGow1nYla8
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(401).send({ message: 'Invalid token and Access Denied!' });
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(401).send({ message: 'Invalid token and Access Denied!' });
            return; 
        }
        (req as any).decoded = decoded;
        nex();
    })

}


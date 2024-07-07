import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { userServices } from "./user.services";

const JWT_SECRET = config.jwt_secret as string;

const registerUser = async (req: Request, res: Response): Promise<void> => {
    const {email, password, role} = req.body;
    try {
        const existingUser = await userServices.findUserByEmail(email);
        if(existingUser) {
             res.status(409).send({ message: 'User email is already exists! Try using a new email address' });
             return;
        }
        const userRole = role || 'user';
        const user = await userServices.createUser(email, password, role);

        res.status(200).send({ message: 'User created successfully', user });
        
    } catch (error) {
        res.status(500).send({ message: 'User resgistration failed!', error });
    }
};


const loginUser = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    try {
        const user = await userServices.findUserByEmail(email);
        if(!user) {
            res.status(400).send({ message: 'Invalid email or password' });
            return;
        }

        const isValidPassword = await userServices.ValidatePassword(password, user.password)

        if(!isValidPassword) {
            res.status(400).send({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign({email: user?.email, role: user.role}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).send({ message: 'User logged in successfully', token });

    } catch (error) {
        res.status(500).send({ message: 'User resgistration failed!', error });
    }
}

export const UserController = {
    registerUser,
    loginUser
};
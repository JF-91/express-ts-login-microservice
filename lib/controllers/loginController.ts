import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import * as bcrypt from "bcrypt";
import  * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//TODO: Login
export async function login(req: Request, res: Response){
    try {
        
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({message: "Email and password are required"});
        }
    
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        console.log(token);

        return res.status(200).json({message: "Login successful", token: token});
    
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//TODO: Register
export async function register(req: Request, res: Response):Promise<Response>{
    try {
        const prisma = new PrismaClient();
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({message: "Email and password are required"});
        }
    
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });
        
        console.log(newUser);

        return res.status(200).json({message: "User created successfully"});
    
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
//TODO: Login
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
            }
            const user = yield prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const passwordMatch = yield bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Login successful", token: token });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
exports.login = login;
//TODO: Register
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
            }
            const user = yield prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword
                }
            });
            console.log(newUser);
            return res.status(200).json({ message: "User created successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
exports.register = register;
//# sourceMappingURL=loginController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfiyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET = config_1.default.jwt_secret;
const verfiyToken = (req, res, nex) => {
    var _a;
    // will get token this format: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjAzNjQ1NzEsImV4cCI6MTcyMDM2ODE3MX0.rnvvxV5PbDpHxlu_jj599euxbCiGeCCl0eGow1nYla8
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).send({ message: 'Invalid token and Access Denied!' });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Invalid token and Access Denied!' });
            return;
        }
        req.decoded = decoded;
        nex();
    });
};
exports.verfiyToken = verfiyToken;

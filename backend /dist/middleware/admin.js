"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtPassword = process.env.JWT_ADMIN_PASSWORD || 'TREX9888';
const adminMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({
            message: "Authorization tokens are missing"
        });
        return;
    }
    const decodedId = jsonwebtoken_1.default.verify(token, jwtPassword);
    if (decodedId) {
        req.userId = decodedId.id;
        next();
    }
    else {
        res.status(403).json({
            message: "invalid or expired token "
        });
    }
};
exports.adminMiddleware = adminMiddleware;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importStar(require("bcrypt"));
const admin_1 = require("../middleware/admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.adminRouter = (0, express_1.Router)();
const jwtPassword = process.env.JWT_ADMIN_PASSWORD || 'TREX9888';
exports.adminRouter.post("/create/ipo", admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageurl, priceBand, open, close, issueSize, listingDate, rhp, drhp, issueType, status } = req.body;
    console.log(req.body);
    const parsedData = {
        name,
        imageurl,
        open: new Date(open),
        close: new Date(close),
        listingDate: new Date(listingDate),
        issueSize: parseInt(issueSize, 10),
        issueType,
        drhp,
        rhp,
        status,
        priceBand
    };
    console.log(parsedData);
    const query = `INSERT INTO  ipo_details 
        (name,imageurl,price_band,open,close,issue_size,listing_date,rhp,drhp,issue_type,status,admin_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        returning *
    `;
    const values = [
        parsedData.name,
        parsedData.imageurl,
        parsedData.priceBand,
        parsedData.open,
        parsedData.close,
        parsedData.issueSize,
        parsedData.listingDate,
        parsedData.rhp,
        parsedData.drhp,
        parsedData.issueType,
        parsedData.status,
        req.userId
    ];
    try {
        const result = yield db_1.default.query(query, values);
        console.log('ipo created', result.rows[0]);
        res.status(200).json({
            message: "ipo created"
        });
    }
    catch (error) {
        console.error("Error creating the ipo :", error);
        res.status(400).json({
            message: "please enter the values carefully "
        });
    }
}));
exports.adminRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedpassword = bcrypt_1.default.hashSync(password, 10);
    const query = `INSERT INTO admins
        (name,email,password) VALUES($1,$2,$3)
        RETURNING *
    `;
    const values = [name, email, hashedpassword];
    try {
        const result = yield db_1.default.query(query, values);
        console.log("Admin created ", result.rows[0]);
        res.status(200).json({
            message: "Admin created succesfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            message: " please try again later "
        });
    }
}));
exports.adminRouter.get("/test", (req, res) => {
    res.send("you got me");
});
exports.adminRouter.post("/verify", admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.query("SELECT * FROM admins WHERE id=$1", [req.userId]);
    res.status(200).json({
        user: user
    });
}));
exports.adminRouter.get('/ipos', admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.default.query("SELECT * FROM ipo_details WHERE admin_id=$1", [req.userId]);
        res.status(200).json({
            ipos: data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
exports.adminRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield db_1.default.query('SELECT * FROM admins WHERE email=$1', [email]);
        const user = result.rows[0];
        if (!user) {
            res.status(404).json({
                message: "user not found"
            });
            return;
        }
        if (user) {
            const check = (0, bcrypt_1.compareSync)(password, user.password);
            if (check) {
                const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtPassword, {
                    expiresIn: '1w'
                });
                res.status(200).json({
                    message: "User Signed in ",
                    token: token
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "some error occured please try agian later"
        });
    }
}));

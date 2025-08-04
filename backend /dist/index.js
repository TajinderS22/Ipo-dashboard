"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("./routes/admin");
const user_1 = require("./routes/user");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const router = express_1.default.Router();
app.use(router);
router.use('/admin', admin_1.adminRouter);
router.use('/user', user_1.userRouter);
app.listen(port, () => {
    console.log("Server is live at port " + port + ".");
});

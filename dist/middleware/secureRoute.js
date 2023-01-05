"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environments_1 = require("../config/environments");
const users_1 = __importDefault(require("../models/users"));
function secureRoute(req, res, next) {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: 'Unauthorized' });
    }
    const token = rawToken.replace('Bearer ', '');
    console.log(token);
    jsonwebtoken_1.default.verify(token, environments_1.secret, async (err, payload) => {
        if (err || !payload) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: 'Unauthorized' });
        }
        const jwtPayload = payload;
        const user = await users_1.default.findById(jwtPayload.userId);
        // ! Adding this code in case the user doesn't exist
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: 'Unauthorized' });
        }
        req.currentUser = user;
        next();
    });
}
exports.default = secureRoute;

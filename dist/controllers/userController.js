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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.login = exports.sellerSignup = exports.signup = void 0;
const users_1 = __importStar(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environments_1 = require("../config/environments");
const http_status_codes_1 = require("http-status-codes");
async function signup(req, res) {
    try {
        if ((0, users_1.checkPasswords)(req.body.password, req.body.passwordConfirmation)) {
            const user = await users_1.default.create(req.body);
            res.send(user);
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send({ message: "Passwords don't match", errors: { password: "Passwords don't match" } });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        // .send({ errors: formatValidationError(e) })
    }
}
exports.signup = signup;
async function sellerSignup(req, res) {
    try {
        if ((0, users_1.checkPasswords)(req.body.password, req.body.passwordConfirmation)) {
            const user = await users_1.default.create(req.body);
            // user.isSeller = true
            // await user.save()
            res.send(user);
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send({ message: "Passwords don't match", errors: { password: "Passwords don't match" } });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        // .send({ errors: formatValidationError(e) })
    }
}
exports.sellerSignup = sellerSignup;
async function login(req, res) {
    try {
        const user = await users_1.default.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ message: "Login failed" });
        }
        const isValidPw = (0, users_1.validatePassword)(req.body.password, user.password);
        console.log(req.body.password);
        console.log(user.password);
        console.log(isValidPw);
        if (isValidPw) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, environments_1.secret, { expiresIn: '24h' });
            res.status(http_status_codes_1.StatusCodes.OK).send({ message: "Login successful", token });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ message: "Login failed on if is valid pw" });
        }
    }
    catch (e) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ message: "Login failed" });
    }
}
exports.login = login;
async function getCurrentUser(req, res) {
    try {
        res.status(http_status_codes_1.StatusCodes.OK).send(req.currentUser);
    }
    catch (e) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Request failed" });
    }
}
exports.getCurrentUser = getCurrentUser;

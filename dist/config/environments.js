"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.secret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.secret = process.env.SECRET;
exports.MONGODB_URI = getMongoURI();
function getMongoURI() {
    if (process.env.NODE_ENV === 'test') {
        return process.env.MONGODB_URI_TEST;
    }
    return process.env.MONGODB_URI_DEV;
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStartPromise = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const mongoose_1 = __importDefault(require("mongoose"));
const environments_1 = require("./config/environments");
const router_1 = __importDefault(require("./views/router"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use(express_1.default.json());
app.use('/api', router_1.default);
// app.use(errorHandler)
async function start() {
    await mongoose_1.default
        .connect(environments_1.MONGODB_URI)
        .then(() => {
        console.log('Connected to the database!');
    })
        .catch(err => {
        console.log(err);
    });
    return app.listen(8000, () => {
        console.log('Express API is running on http://localhost:8000');
    });
}
exports.serverStartPromise = start();
exports.default = app;

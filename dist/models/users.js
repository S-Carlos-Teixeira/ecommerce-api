"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswords = exports.validatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile is required'],
        unique: true,
        validate: {
            message: 'Please enter a valid number.',
            validator: (mobile) => validator_1.default.isMobilePhone(mobile, 'any')
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // ! Changed these validation functions to return a nice message.
        validate: {
            message: 'Please enter a valid email.',
            validator: (email) => validator_1.default.isEmail(email)
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // ! Multiple validators, for different types of error messages on the password
        validate: [
            {
                message: 'Password must be at least 8 characters in length.',
                validator: (password) => password.length >= 8
            },
            {
                message: 'Password must contain at least 1 lowercase character, uppercase character, and symbol.',
                validator: (password) => validator_1.default.isStrongPassword(password, {
                    minLowercase: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                    minNumbers: 1
                })
            }
        ]
    },
    isSeller: { type: Boolean, default: false }
});
userSchema.pre('save', function hashPassword(next) {
    this.password = bcrypt_1.default.hashSync(this.password, bcrypt_1.default.genSaltSync());
    next();
});
function validatePassword(loginPassword, originalPassword) {
    return bcrypt_1.default.compareSync(loginPassword, originalPassword);
}
exports.validatePassword = validatePassword;
function checkPasswords(password, passwordConfirmation) {
    return password === passwordConfirmation;
}
exports.checkPasswords = checkPasswords;
// ! Plugging in unique validator.
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.plugin((0, mongoose_hidden_1.default)({ defaultHidden: { password: true, email: true, _id: true } }));
exports.default = mongoose_1.default.model('User', userSchema);

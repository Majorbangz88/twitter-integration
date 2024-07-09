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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }
    const { token, tokenSecret, profile } = req.user;
    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${profile.username}&count=10`;
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.json(response.data);
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({ error: typedError.message });
    }
}));
exports.default = router;

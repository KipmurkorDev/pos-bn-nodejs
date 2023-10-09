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
exports.getAccessToken = exports.getOAuthToken = void 0;
const axios_1 = __importDefault(require("axios"));
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_OAUTH_TOKEN_URL = process.env.MPESA_OAUTH_TOKEN_URL || '';
const getOAuthToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = MPESA_OAUTH_TOKEN_URL;
    let buffer = Buffer.from(MPESA_CONSUMER_KEY + ":" + MPESA_CONSUMER_SECRET);
    let auth = `Basic ${buffer.toString('base64')}`;
    try {
        let { data } = yield axios_1.default.get(url, {
            "headers": {
                "Authorization": auth
            }
        });
        return data['access_token'];
    }
    catch (err) {
        throw new Error(err['response']['statusText']);
    }
});
exports.getOAuthToken = getOAuthToken;
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const response = yield axios_1.default.post(MPESA_OAUTH_TOKEN_URL, null, {
        headers: {
            'Authorization': `Basic ${auth}`,
        },
    });
    return response.data.access_token;
});
exports.getAccessToken = getAccessToken;

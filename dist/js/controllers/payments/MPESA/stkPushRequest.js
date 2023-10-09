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
exports.initiateStkPush = void 0;
const axios_1 = __importDefault(require("axios"));
const oauthToken_1 = require("./oauthToken");
const SHORTCODE = 'your_shortcode';
const LNM_PASSKEY = 'your_passkey';
const LNM_CALLBACK_URL = 'your_callback_url';
const initiateStkPush = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtain the OAuth token
        const accessToken = yield (0, oauthToken_1.getAccessToken)();
        // Generate a timestamp
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        // Generate the password as per Safaricom's guidelines
        const password = Buffer.from(`${SHORTCODE}${LNM_PASSKEY}${timestamp}`).toString('base64');
        // Construct the STK Push request payload
        const stkPushRequest = {
            BusinessShortCode: SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: '1',
            PartyA: '254XXXXXXXXX',
            PartyB: SHORTCODE,
            PhoneNumber: '254XXXXXXXXX',
            CallBackURL: LNM_CALLBACK_URL,
            AccountReference: 'Test123',
            TransactionDesc: 'Test Payment',
        };
        // Make the STK Push request to Safaricom's API
        const response = yield axios_1.default.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkPushRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        // Send a response to the client
        return ({ message: 'STK Push initiated successfully', response: response.data });
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred");
    }
});
exports.initiateStkPush = initiateStkPush;

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
exports.sendMoney = void 0;
const axios_1 = __importDefault(require("axios"));
// Load your API credentials from a .env file
require('dotenv').config();
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const shortcode = process.env.SHORTCODE;
const passkey = process.env.LNM_PASSKEY;
const callbackUrl = process.env.LNM_CALLBACK_URL;
// Function to obtain an OAuth token
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const response = yield axios_1.default.post('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', null, {
        headers: {
            'Authorization': `Basic ${auth}`,
        },
    });
    return response.data.access_token;
});
// Function to initiate the M-Pesa transaction
const initiateMpesaTransaction = (accessToken, phoneNumber, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate a timestamp
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        // Generate the password as per Safaricom's guidelines
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
        // Construct the STK Push request payload
        const stkPushRequest = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: shortcode,
            PhoneNumber: phoneNumber,
            CallBackURL: callbackUrl,
            AccountReference: 'Transaction123',
            TransactionDesc: 'Payment for Goods',
        };
        // Make the STK Push request to Safaricom's API
        const response = yield axios_1.default.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkPushRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
});
const sendMoney = (phoneNumber, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtain an OAuth token
        const accessToken = yield getAccessToken();
        // Initiate the M-Pesa transaction
        const response = yield initiateMpesaTransaction(accessToken, phoneNumber, amount);
        // Send a response to the client
        return ({ message: 'M-Pesa transaction initiated successfully', response });
    }
    catch (error) {
        console.error(error);
        throw new Error('An error occurred');
    }
});
exports.sendMoney = sendMoney;

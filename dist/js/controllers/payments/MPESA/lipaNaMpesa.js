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
exports.lipaNaMpesaOnline = void 0;
const axios_1 = __importDefault(require("axios"));
const oauthToken_1 = require("./oauthToken");
const LIPA_NA_MPESA_SHORTCODE = process.env.lipa_na_mpesa_shortcode;
const lipaNaMpesaOnline = () => __awaiter(void 0, void 0, void 0, function* () {
    let token = yield (0, oauthToken_1.getOAuthToken)();
    let auth = `Bearer ${token}`;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    let url = process.env.lipa_na_mpesa_url || '';
    let bs_short_code = LIPA_NA_MPESA_SHORTCODE;
    let passkey = process.env.lipa_na_mpesa_passkey;
    let password = Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
    let transcation_type = "CustomerPayBillOnline";
    let amount = "1";
    let partyA = "party-sending-funds"; //should follow the format:2547xxxxxxxx
    let partyB = LIPA_NA_MPESA_SHORTCODE;
    let phoneNumber = "party-sending-funds"; //should follow the format:2547xxxxxxxx
    let callBackUrl = "your-ngrok-url/mpesa/lipa-na-mpesa-callback";
    let accountReference = "lipa-na-mpesa-tutorial";
    let transaction_desc = "Testing lipa na mpesa functionality";
    try {
        let { data } = yield axios_1.default.post(url, {
            "BusinessShortCode": bs_short_code,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": transcation_type,
            "Amount": amount,
            "PartyA": partyA,
            "PartyB": partyB,
            "PhoneNumber": phoneNumber,
            "CallBackURL": callBackUrl,
            "AccountReference": accountReference,
            "TransactionDesc": transaction_desc
        }, {
            "headers": {
                "Authorization": auth
            }
        }).catch(console.log);
        return ({
            success: true,
            message: data
        });
    }
    catch (err) {
        throw new Error(err['response']['statusText']);
    }
    ;
});
exports.lipaNaMpesaOnline = lipaNaMpesaOnline;

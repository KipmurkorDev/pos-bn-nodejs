import axios from "axios";
import { getOAuthToken } from "./oauthToken";


const LIPA_NA_MPESA_SHORTCODE = process.env.lipa_na_mpesa_shortcode;

export const lipaNaMpesaOnline = async () => {
    let token = await getOAuthToken();
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

        let { data }: any = await axios.post(url, {
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
    } catch (err: any) {
        throw new Error(err['response']['statusText']);
    };
};

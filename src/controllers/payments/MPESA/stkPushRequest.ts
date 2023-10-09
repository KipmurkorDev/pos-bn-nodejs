import axios from 'axios'
import { getAccessToken } from './oauthToken'

const SHORTCODE = 'your_shortcode';
const LNM_PASSKEY = 'your_passkey';
const LNM_CALLBACK_URL = 'your_callback_url';



export const initiateStkPush = async () => {
    try {
        // Obtain the OAuth token
        const accessToken = await getAccessToken();

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
            Amount: '1', // Replace with the actual amount
            PartyA: '254XXXXXXXXX', // Replace with the customer's phone number
            PartyB: SHORTCODE,
            PhoneNumber: '254XXXXXXXXX', // Replace with the customer's phone number
            CallBackURL: LNM_CALLBACK_URL,
            AccountReference: 'Test123',
            TransactionDesc: 'Test Payment',
        };

        // Make the STK Push request to Safaricom's API
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkPushRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // Send a response to the client
        return ({ message: 'STK Push initiated successfully', response: response.data });
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred");
    }
}

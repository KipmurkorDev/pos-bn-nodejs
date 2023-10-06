import { Response, Request, Router } from "express"
import axios from 'axios'
const router = Router()


// Replace these with your actual credentials
const CONSUMER_KEY = 'your_consumer_key';
const CONSUMER_SECRET = 'your_consumer_secret';
const SHORTCODE = 'your_shortcode';
const LNM_PASSKEY = 'your_passkey';
const LNM_CALLBACK_URL = 'your_callback_url';

// Function to obtain the OAuth token
const getAccessToken = async () => {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const response = await axios.post('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', null, {
        headers: {
            'Authorization': `Basic ${auth}`,
        },
    });
    return response.data.access_token;
};

export const initiateStkPush = async (req: Request, res: Response, next: Function) => {
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
        res.status(200).json({ message: 'STK Push initiated successfully', response: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

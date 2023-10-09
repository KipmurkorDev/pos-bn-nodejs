import axios from 'axios';

// Load your API credentials from a .env file
require('dotenv').config();

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const shortcode = process.env.SHORTCODE;
const passkey = process.env.LNM_PASSKEY;
const callbackUrl = process.env.LNM_CALLBACK_URL;

// Function to obtain an OAuth token
const getAccessToken = async () => {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const response = await axios.post('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', null, {
        headers: {
            'Authorization': `Basic ${auth}`,
        },
    });
    return response.data.access_token;
};

// Function to initiate the M-Pesa transaction
const initiateMpesaTransaction = async (accessToken: any, phoneNumber: any, amount: any) => {
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
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkPushRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendMoney = async (phoneNumber: string, amount: string) => {
    try {
        // Obtain an OAuth token
        const accessToken = await getAccessToken();
        // Initiate the M-Pesa transaction
        const response = await initiateMpesaTransaction(accessToken, phoneNumber, amount);
        // Send a response to the client
        return ({ message: 'M-Pesa transaction initiated successfully', response });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred');
    }
}

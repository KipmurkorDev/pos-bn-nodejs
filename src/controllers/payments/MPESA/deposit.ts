import { Request, Response, NextFunction } from 'express';



import axios, { AxiosRequestConfig } from 'axios';

const stkPushUrl: string = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
const accessToken: string = 'GD1hq8tkZFanSvRaLPAK3ZaMjhgU'; // Replace with your access token

export async function deposit(req: Request, res: Response, next: NextFunction) {
    try {
        const { BusinessShortCode,
            Password,
            Timestamp,
            TransactionType,
            Amount,
            PartyA,
            PartyB,
            PhoneNumber,
            CallBackURL,
            AccountReference,
            TransactionDesc,
            accessToken } = req.body.mpesa
        const data = {
            BusinessShortCode,
            Password,
            Timestamp,
            TransactionType,
            Amount,
            PartyA,
            PartyB,
            PhoneNumber,
            CallBackURL,
            AccountReference,
            TransactionDesc,
        };

        const axiosConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        };

        const response = await axios.post(stkPushUrl, data, axiosConfig);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: "UNKNOWN ERROR", error });
    }
}

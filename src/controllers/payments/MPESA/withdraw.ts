import axios from 'axios';
import { Request, Response, NextFunction } from 'express';


export const withdraw = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {
            Timestamp,
            CallBackURL,
            BusinessShortCode,
            Password,
            TransactionType,
            Amount,
            PartyA,
            PartyB,
            PhoneNumber,
            AccountReference,
            TransactionDesc,
            access_token,
            OriginatorConversationID,
        } = req.body.mpesa || {}

        const data = {
            Timestamp,
            CallBackURL,
            BusinessShortCode,
            Password,
            TransactionType,
            Amount,
            PartyA,
            PartyB,
            PhoneNumber,
            AccountReference,
            TransactionDesc,
            access_token,
            OriginatorConversationID,
        };




        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.body.mpesa.access_token}`
            }
        };

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest', data, axiosConfig);

        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "UNKNOWN ERROR", error });
    }


}

export const callback = (req: Request, res: Response, next: NextFunction) => {
    // console.log({ body: req.body })
    // console.log("SUCCESS")
    res.status(200).json({ message: 'SUccess', })
}

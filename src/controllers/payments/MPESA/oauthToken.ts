import axios from "axios";

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_OAUTH_TOKEN_URL = process.env.MPESA_OAUTH_TOKEN_URL || '';

export const getOAuthToken = async () => {
    let url = MPESA_OAUTH_TOKEN_URL;
    let buffer = Buffer.from(MPESA_CONSUMER_KEY + ":" + MPESA_CONSUMER_SECRET);
    let auth = `Basic ${buffer.toString('base64')}`;
    try {
        let { data } = await axios.get(url, {
            "headers": {
                "Authorization": auth
            }
        });
        return data['access_token'];
    } catch (err: any) {
        throw new Error(err['response']['statusText']);
    }
};

export const getAccessToken = async () => {
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const response = await axios.post(MPESA_OAUTH_TOKEN_URL, null, {
        headers: {
            'Authorization': `Basic ${auth}`,
        },
    });
    return response.data.access_token;
};

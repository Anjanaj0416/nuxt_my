import axios from 'axios';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { message, phoneNumber } = body;

  const TWILIO_ACCOUNT_SID = 'your_twilio_account_sid';
  const TWILIO_AUTH_TOKEN = 'your_twilio_auth_token';
  const WHATSAPP_FROM = 'whatsapp:+14155238886'; // Your Twilio WhatsApp number
  const TWILIO_API_URL = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

  try {
    const response = await axios.post(
      TWILIO_API_URL,
      new URLSearchParams({
        To: `whatsapp:${phoneNumber}`,
        From: WHATSAPP_FROM,
        Body: message,
      }),
      {
        auth: {
          username: TWILIO_ACCOUNT_SID,
          password: TWILIO_AUTH_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { error: 'Error sending WhatsApp message', details: error.message };
  }
});

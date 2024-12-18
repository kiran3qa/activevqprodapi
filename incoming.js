const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio webhook to handle incoming calls
app.post('/incomingCall', (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  // Example: Greet the caller and gather input
  response.say('Hello, thank you for calling. Please press 1 for sales or 2 for support.');

  // Optionally gather user input
  response.gather({
    numDigits: 1,
    action: '/handleKeyPress', // Handle key press in another route
    method: 'POST',
  });

  res.type('text/xml');
  res.send(response.toString());
});

// Handle keypress response
app.post('/handleKeyPress', (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  const digit = req.body.Digits;

  if (digit === '1') {
    response.say('You selected sales. Please wait while we connect you.');
    // Optionally, forward the call
    response.dial('+919886867045'); // Replace with the sales team's number
  } else if (digit === '2') {
    response.say('You selected support. Please wait while we connect you.');
    // Optionally, forward the call
    response.dial('+0987654321'); // Replace with the support team's number
  } else {
    response.say('Invalid choice. Goodbye!');
    response.hangup();
  }

  res.type('text/xml');
  res.send(response.toString());
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

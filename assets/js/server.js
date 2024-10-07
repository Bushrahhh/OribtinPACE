// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
      const response = await axios.post('https://api.groq.com/openai/v1/', {
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful assistant knowledgeable about NASA's PACE mission, oceans, and space science." },
          { role: "user", content: req.body.message }
        ],
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.post('/', async (req, res) => {
  const { prompt, chosenResponseType, responses } = req.body;

  const anaResponse = responses.find(response => response.type === 'ana').content;
  const baseResponse = responses.find(response => response.type === 'base').content;
  
  try {
    const vote = new Vote({
      prompt,
      anaResponse,
      baseResponse,
      chosenResponseType
    });
    
    await vote.save();
    res.status(201).json({ message: 'Voto registrado!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar voto' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.post('/', async (req, res) => {
  const { prompt, chosenResponseType } = req.body;
  
  try {
    const vote = new Vote({
      prompt,
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
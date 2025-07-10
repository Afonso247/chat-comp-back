const express = require('express');
const router = express.Router();
const { generateBaseResponse, generateAnaResponse } = require('../services/responseService');

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    console.log(prompt);
    // Gerar respostas
    const baseResponse = await generateBaseResponse(prompt);
    const anaResponse = await generateAnaResponse(prompt);
    
    // Embaralhar ordem das respostas
    const responses = [
      { type: 'base', content: baseResponse },
      { type: 'ana', content: anaResponse }
    ].sort(() => Math.random() - 0.5);
    
    res.json({ responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar respostas' });
  }
});

module.exports = router;
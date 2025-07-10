const OpenAI = require('openai');
const config = require('../chatbot-config.json');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Resposta padrão do ChatGPT
async function generateBaseResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ],
    max_tokens: 500
  });
  return response.choices[0].message.content;
}

// Resposta da Ana (com configuração TCC)
async function generateAnaResponse(prompt) {
  const systemMessage = buildSystemMessage(config);
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: prompt }
    ],
    max_tokens: 500
  });
  return response.choices[0].message.content;
}

function buildSystemMessage(config) {
  let message = `Você é ${config.personalidade.nome}, ${config.personalidade.titulo}.\n${config.personalidade.descricao}\n\nDiretrizes:\n`;
  
  Object.entries(config.diretrizes).forEach(([key, value]) => {
    if (value && value.length > 0) {
      message += `\n${key.replace(/_/g, ' ').toUpperCase()}:\n`;
      value.forEach(item => message += `- ${item}\n`);
    }
  });
  
  return message;
}

module.exports = { generateBaseResponse, generateAnaResponse };
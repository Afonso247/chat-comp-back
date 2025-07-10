require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const responseRoutes = require('./routes/responseRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://chat-comp-front.vercel.app'
}));
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Rotas
app.use('/api/responses', responseRoutes);
app.use('/api/votes', voteRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
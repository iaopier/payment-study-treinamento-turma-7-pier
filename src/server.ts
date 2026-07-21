import express from 'express';
const app = express();
app.use(express.json());
app.get('/config', (req, res) => {
  res.json({ message: 'Suas alterações são salvas automaticamente a cada 30 segundos' });
});
export { app };
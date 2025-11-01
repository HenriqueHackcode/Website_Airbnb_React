import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

export const app = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const { PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/tmp', express.static(__dirname + '/tmp'));
app.use(express.static(path.join(__dirname, '../front-end/dist')));
app.use('/api', routes);

app.all(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front-end/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}!`);
});

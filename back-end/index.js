import 'dotenv/config';
import { app } from './server.js';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}!`);
});

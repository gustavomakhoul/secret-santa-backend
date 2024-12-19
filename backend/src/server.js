import app from './app.js';
import { serverConfig } from './config/server.config.js';

const port = serverConfig.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${serverConfig.environment}`);
});
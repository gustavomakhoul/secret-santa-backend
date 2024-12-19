import app from '../src/app.js';

// Handle preflight requests
app.options('*', (req, res) => {
  res.status(200).end();
});

export default app;
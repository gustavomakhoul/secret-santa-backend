import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
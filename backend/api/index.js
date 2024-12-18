import dotenv from 'dotenv';
import app from '../src/app.js';

dotenv.config();

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        console.error('Serverless function error:', err);
        res.status(err.statusCode || 500).json({
          error: err.message || 'Internal Server Error',
          details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
        return reject(err);
      }
      resolve();
    });
  });
}
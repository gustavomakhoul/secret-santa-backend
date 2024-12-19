export const corsConfig = {
  origin: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:5173',
    'https://courageous-horse-5119ed.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};
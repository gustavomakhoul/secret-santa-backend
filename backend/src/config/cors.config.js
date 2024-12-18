export const corsConfig = {
  origin: [
    'http://localhost:5173',
    'https://courageous-horse-5119ed.netlify.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};
# Secret Santa Backend

Backend service for the Secret Santa application, handling email notifications for gift exchanges.

## Features

- Email notifications using Resend
- Rate limiting
- CORS protection
- Input validation
- Error handling
- Health check endpoint

## Environment Variables

```env
RESEND_API_KEY=your_resend_api_key
NODE_ENV=development|production
CORS_ORIGIN=http://localhost:5173
PORT=3001
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with required environment variables

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/send-secret-santa`: Send Secret Santa email
- `GET /health`: Health check endpoint

## Deployment

The application is configured for deployment on Vercel using the provided `vercel.json` configuration.
import cors from 'cors';
import { environment } from '../config/environment.js';

export const corsMiddleware = cors({
  origin: environment.corsOrigin,
  methods: ['POST'],
});
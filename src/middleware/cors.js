import cors from 'cors';
import { config } from '../config/environment.js';

export const corsMiddleware = cors({
  origin: config.corsOrigin,
  methods: ['POST']
});
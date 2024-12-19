import { CorsOptions } from 'cors';
import { environment } from './environment.js';

export const corsConfig: CorsOptions = {
  origin: environment.frontendUrl,
  methods: ['GET', 'POST'],
  credentials: true
};
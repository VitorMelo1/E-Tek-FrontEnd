import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/E-Tek-FrontEnd/',
  plugins: [react()],
});
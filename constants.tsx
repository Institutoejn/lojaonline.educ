
import React from 'react';

export const COLORS = {
  lilac: '#9C89FF', // Lilás principal da logo
  lilacLight: '#E0D7FF',
  pink: '#FF95B2',  // Rosa das letras EDUC
  pinkLight: '#FFD1DC',
  yellow: '#FFD688', // Amarelo da régua e lápis
  blue: '#BAE6FD',
  white: '#FFFFFF',
  text: '#4A4A4A'
};

export const ICONS = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  WhatsApp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.069l-.669 2.445 2.511-.659c.722.439 1.661.714 2.888.715h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.391 8.21c-.147.412-.85.748-1.185.795-.335.046-.74.066-1.196-.082-.26-.084-.6-.201-1.021-.383-1.78-.773-2.934-2.586-3.023-2.704-.089-.118-.724-.962-.724-1.836s.457-1.306.621-1.483c.163-.177.355-.221.473-.221s.237.001.34.005c.111.004.259-.042.406.315.147.358.503 1.226.547 1.314.044.089.074.192.015.31-.06.118-.089.192-.177.295-.089.103-.186.23-.266.309-.089.089-.182.186-.078.365.103.178.459.758.984 1.225.677.602 1.248.788 1.426.877.178.089.281.074.385-.044.103-.118.444-.517.562-.694.118-.178.237-.148.4-.089.163.059 1.036.488 1.214.577.178.089.296.133.34.21.044.077.044.444-.103.856z"/>
    </svg>
  )
};

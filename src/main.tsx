import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 15000, // данные будут считаться устаревшими после 15000 миллисекунд и будут удалены
      retry: 1, //default 3
      staleTime: 6000, // после 6000 миллисекунд данные будут считаться устаревшими и будут запрошены снова
      refetchOnReconnect: true 
    }
  }
});

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

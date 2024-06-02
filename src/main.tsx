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
      gcTime: 5000,
      retry: 1,
      staleTime: 6000
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import './fonts/fonts.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <div>
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId="197617872965-gkv3q5secmfh9rnlh7vbcm1kjet29ti4.apps.googleusercontent.com">
                <React.StrictMode>
                    <RouterProvider router={router} />
                </React.StrictMode>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    </div>
);

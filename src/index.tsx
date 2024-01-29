import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import './fonts/fonts.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <div>
        <GoogleOAuthProvider clientId="197617872965-gkv3q5secmfh9rnlh7vbcm1kjet29ti4.apps.googleusercontent.com">
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </GoogleOAuthProvider>
    </div>
);

import { GoogleLogin } from '@react-oauth/google';
import React from 'react'; 

interface GoogleLoginButtonProps {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
    onSuccess,
    onError,
}) => {
    const handleGoogleLogin = async () => {
        try {
            // Assuming googleResponse contains the necessary data

            // Call the onSuccess callback if login is successful
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Google login error:', error);

            // Call the onError callback if provided
            if (onError) {
                onError(error);
            }
        }
    };

    return (
        <button onClick={handleGoogleLogin} id="log_google">
            Увійти з{' '}
            <img
                src="./icons/google.svg"
                style={{ width: '20px', height: '20px' }}
                alt="Google Icon"
            />
        </button>
    );
};

export default GoogleLoginButton;

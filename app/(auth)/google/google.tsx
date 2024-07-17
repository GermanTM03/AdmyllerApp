import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Register: React.FC = () => {
    const handleRegisterSuccess = async (response: any) => {
        try {
            const res = await fetch('http://localhost:7208/api/Auth/GoogleResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId: response.credential }),
            });

            if (!res.ok) {
                throw new Error('Error en el registro');
            }

            const result = await res.json();
            console.log('Register Success:', result);
        } catch (error) {
            console.error('Register Error:', error);
        }
    };

    const handleRegisterFailure = () => {
        console.error('Register Failed');
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleRegisterSuccess}
                onError={handleRegisterFailure} // No se pasa argumento
            />
        </div>
    );
};

export default Register;

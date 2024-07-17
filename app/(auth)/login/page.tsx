'use client'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { TextInput } from '@tremor/react';
import Image from 'next/image';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Loading from '../../Actions/Loading'; // Importar el componente de carga
import { GoogleLogin } from '@react-oauth/google'; // Importar GoogleLogin
import axios from 'axios';

const Page = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores de autenticación
    const [tokenChecked, setTokenChecked] = useState(false); // Estado para controlar si se ha verificado el token

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // Redirigir al usuario al dashboard si hay un token activo
                window.location.href = '/dashboard';
            } else {
                setTokenChecked(true);
            }
        };
        checkToken();
    }, []);

    const formHandler = async (data: { email: string, password: string }) => {
        try {
            const response = await fetch('https://localhost:7208/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }

            const responseData = await response.json();
            const { token } = responseData; 

            localStorage.setItem('token', token);
            window.location.href = '/dashboard';

        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleLoginSuccess = async (response: any) => {
        const tokenId = response.credential;
        try {
            const result = await axios.post('https://localhost:7208/api/Auth/GoogleResponse', {
                tokenId: tokenId
            });
            const { token } = result.data; // Suponiendo que la respuesta incluye el token
            localStorage.setItem('token', token);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login Error:', error);
            setError('Error al iniciar sesión con Google.');
        }
    };

    const handleGoogleLoginFailure = (response: any) => {
        console.error('Login Failed:', response);
        setError('Error al iniciar sesión con Google.');
    };

    if (!tokenChecked) {
        return <Loading />;
    }

    return (
        <section className='h-screen'>
            <div className='h-full grid grid-cols-2'>
                <div className='overflow-hidden col-span-1'>
                    <img
                        className='hover:scale-110 duration-150 w-full max-h-svh object-cover'
                        src='https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='Background'
                    />
                </div>
                <div className='col-span-1 content-center'>
                    <form onSubmit={handleSubmit(formHandler)} className='max-w-lg mx-auto'>
                        <Link href={'/home'} className='flex items-center gap-2 mb-6'>
                            <ChevronLeftIcon className='h-4' />
                            Regresar al sitio web
                        </Link>
                        <div className='h-24 flex items-center'>
                            <Image src='/assets/brand/admyller-logo-color.svg' width={244} height={244} alt='Admyller Logo' />
                        </div>
                        <h1 className='text-2xl mb-6'>Iniciar sesión</h1>
                        <p className='mb-6'>
                            <Link href='/register' className='underline font-semibold'>Crea una cuenta gratis </Link>
                            o inicia sesión para usar Admyller
                        </p>
                        <div className='flex flex-col gap-1 mb-6'>
                            <label htmlFor='email'>Email:</label>
                            <Controller
                                name='email'
                                control={control}
                                rules={{ required: 'El email es requerido' }}
                                render={({ field }) => (
                                    <TextInput
                                        type='text'
                                        {...field}
                                        placeholder='johndoe@email.com'
                                        className='h-10'
                                        icon={EnvelopeIcon}
                                    />
                                )}
                            />
                            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                        </div>
                        <div className='flex flex-col gap-1 mb-6'>
                            <label htmlFor='password'>Contraseña:</label>
                            <Controller
                                name='password'
                                control={control}
                                rules={{ required: 'La contraseña es requerida' }}
                                render={({ field }) => (
                                    <TextInput
                                        type='password'
                                        {...field}
                                        placeholder='Escriba su contraseña...'
                                        className='h-10'
                                    />
                                )}
                            />
                            {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                            <Link href='' className='my-4 text-sm text-right underline'>¿Olvidó su contraseña?</Link>
                        </div>
                        <button type='submit' className='w-full h-10 bg-slate-900 text-white px-2 rounded-md'>
                            Iniciar sesión
                        </button>
                        {error && <span className='text-sm text-red-500 mt-2'>{error}</span>}
                    </form>
                    <div className='mt-4'>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;

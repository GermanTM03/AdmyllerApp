"use client";

import { useEffect, useState } from 'react';

interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
}

interface ApiResponse {
  value: UserProfile;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Bearer Token:', token);

        const response = await fetch('https://localhost:7208/api/Users/ProfileUser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
        }

        const data: ApiResponse = await response.json();
        console.log('Data recibida:', data);

        setProfile(data.value);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      {profile ? (
        <div>
          <p>Nombre Completo: {profile.fullName}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>No se encontró información del perfil.</p>
      )}
    </div>
  );
};

export default UserProfile;

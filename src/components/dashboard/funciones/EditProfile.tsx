"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Importa useRouter

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const router = useRouter(); // Inicializa el router

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
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
        setProfile(data.value);
        setFormData(data.value); // Inicializa formData con los datos del perfil
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://localhost:7208/api/Users/EditProfile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: result.message,
        });
        setProfile(formData);
        setIsEditing(false);
      } else {
        throw new Error(result.message || 'Error al editar el perfil');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error desconocido',
        });
      }
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://localhost:7208/api/Users/DeleteUser', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta eliminada!',
          text: result.message,
        }).then(() => {
          localStorage.removeItem('token'); // Elimina el token del localStorage
          router.push('/'); // Redirige a la página de inicio
        });
      } else {
        throw new Error(result.message || 'Error al eliminar el perfil');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error desconocido',
        });
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nombre Completo:
              <input
                type="text"
                name="fullName"
                value={formData?.fullName || ''}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData?.email || ''}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleEditToggle}>Cancelar</button>
        </form>
      ) : (
        <div>
          <p>Nombre Completo: {profile?.fullName}</p>
          <p>Email: {profile?.email}</p>
          <button onClick={handleEditToggle}>Editar Perfil</button>
          <button onClick={handleDeleteUser} style={{ color: 'red' }}>Eliminar Cuenta</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

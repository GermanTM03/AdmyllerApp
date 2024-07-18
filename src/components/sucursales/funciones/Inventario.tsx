"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Branch {
    branchId: number;
    businessName: string;
    address: string;
    rfc: string;
    email: string;
    phoneNumber: string;
    userId: number;
}

interface ApiResponse {
    value: Branch; 
}

interface SucursalProps {
    id: string; 
}

const SucursalEdit = ({ id }: SucursalProps) => {
    const router = useRouter();
    const [branch, setBranch] = useState<Branch | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Branch | null>(null);

    useEffect(() => {
        const fetchBranch = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://localhost:7208/api/Branchs/Branch/${id}`, {
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
                setBranch(data.value);
                setFormData(data.value);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchBranch();
    }, [id]);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        console.log('Token para eliminación:', token);
        
        const confirmation = confirm("¿Estás seguro de que quieres eliminar esta sucursal?");
        if (!confirmation) return;

        try {
            const response = await fetch(`https://localhost:7208/api/Branchs/DeleteBranchs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Respuesta de eliminación:', response);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }

            alert('Sucursal eliminada con éxito');
            router.push('/dashboard');
        } catch (error: unknown) {
            console.error('Error en eliminación:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const handleEdit = async () => {
        if (!formData) return;

        const token = localStorage.getItem('token');
        console.log('Token para edición:', token);
        console.log('Datos a editar:', formData);
        
        try {
            const response = await fetch(`https://localhost:7208/api/Branchs/EditBranchs/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Respuesta de edición:', response);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }

            const data: ApiResponse = await response.json();
            setBranch(data.value);
            setIsEditing(false);

            alert('Sucursal editada con éxito');
            router.push('/dashboard');
        } catch (error: unknown) {
            console.error('Error en edición:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
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
            <h1>Detalles de la Sucursal</h1>
            {branch && !isEditing && (
                <div>
                    <h2>{branch.businessName}</h2>
                    <p>Dirección: {branch.address}</p>
                    <p>RFC: {branch.rfc}</p>
                    <p>Email: {branch.email}</p>
                    <p>Teléfono: {branch.phoneNumber}</p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            )}
            {isEditing && branch && (
                <div>
                    <h2>Editar Sucursal</h2>
                    <input
                        type="text"
                        name="businessName"
                        value={formData ? formData.businessName : ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData ? formData.address : ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="rfc"
                        value={formData ? formData.rfc : ''}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData ? formData.email : ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData ? formData.phoneNumber : ''}
                        onChange={handleChange}
                    />
                    <button onClick={handleEdit}>Guardar Cambios</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default SucursalEdit;

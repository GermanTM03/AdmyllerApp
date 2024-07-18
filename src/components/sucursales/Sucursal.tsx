// src/components/sucursales/Sucursal.tsx
"use client";

import { useEffect, useState } from 'react';

interface Branch {
    branchId: number;
    businessName: string;
    address: string;
    rfc: string;
    email: string;
    phoneNumber: number;
    userId: number;
}

interface ApiResponse {
    value: Branch; 
}

interface SucursalProps {
    id: string; // Agrega la prop id
}

const Sucursal = ({ id }: SucursalProps) => {
    const [branch, setBranch] = useState<Branch | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBranch = async () => {
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

        fetchBranch();
    }, [id]); // Cambia a usar la prop id

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Detalles de la Sucursal</h1>
            {branch && (
                <div>
                    <h2>{branch.businessName}</h2>
                    <p>Dirección: {branch.address}</p>
                    <p>RFC: {branch.rfc}</p>
                    <p>Email: {branch.email}</p>
                    <p>Teléfono: {branch.phoneNumber}</p>
                </div>
            )}
        </div>
    );
};

export default Sucursal;

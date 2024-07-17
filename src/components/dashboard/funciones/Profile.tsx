"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    value: Branch[];
}

const Dashboard = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Bearer Token:', token);

                const response = await fetch('https://localhost:7208/api/Branchs/Branchs', {
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
                setBranches(data.value);
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

        fetchBranches();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Mis Sucursales</h1>
            <ul className="list-disc pl-5">
                {branches.map(branch => (
                    <li key={branch.branchId}>
                        <Link href={`/sucursal/${branch.branchId}`} className="text-blue-600 hover:underline">
                            {branch.businessName}
                        </Link>
                        <p>Dirección: {branch.address}</p>
                        <p>Email: {branch.email}</p>
                        <p>Teléfono: {branch.phoneNumber}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;

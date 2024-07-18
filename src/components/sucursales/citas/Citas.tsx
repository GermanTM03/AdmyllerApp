import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CitasForm from './CitasForm';

interface Citas {
    appointmentId?: number;
    person: string;
    reason: string;
    datetime: string;
}

const Citas = ({ id }: { id: string }) => {
    const router = useRouter();
    const [citas, setCitas] = useState<Citas[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingCita, setEditingCita] = useState<Citas | null>(null);

    useEffect(() => {
        const fetchCitas = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://localhost:7208/api/Appointment/AppointmentBranch/${id}`, {
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

                const data: Citas[] = await response.json();
                setCitas(data);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchCitas();
    }, [id]);

    const handleDelete = async (appointmentId: number | undefined) => {
        if (appointmentId === undefined) {
            console.error('El ID de cita es indefinido.');
            return;
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:7208/api/Appointment/DeleteAppointment/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }
    
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Cita eliminada correctamente.',
            });
    
            setCitas(citas.filter(cita => cita.appointmentId !== appointmentId));
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };
    

    const openEditModal = (cita: Citas) => {
        setEditingCita(cita);
    };

    const closeEditModal = () => {
        setEditingCita(null);
    };

    const handleEdit = async (editedCita: Citas) => {
        // Implementa la lógica para editar la cita utilizando el ID de editedCita
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Citas</h1>
            {citas.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Persona</th>
                            <th>Motivo</th>
                            <th>Fecha y Hora</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => (
                            <tr key={cita.appointmentId}>
                                <td>{cita.appointmentId}</td>
                                <td>{cita.person}</td>
                                <td>{cita.reason}</td>
                                <td>{cita.datetime}</td>
                                <td>
                                    <button onClick={() => openEditModal(cita)}>Editar</button>
                                    <button onClick={() => handleDelete(cita.appointmentId)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay citas disponibles.</p>
            )}

            {editingCita && (
                <CitasForm
                    cita={editingCita}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default Citas;

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface CitasFormProps {
    cita: Citas;
    onClose: () => void;
}

interface Citas {
    appointmentId?: number;
    person: string;
    reason: string;
    datetime: string;
}

const CitasForm: React.FC<CitasFormProps> = ({ cita, onClose }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Citas>({
        ...cita,
    });

    useEffect(() => {
        setFormData({
            ...cita,
        });
    }, [cita]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`https://localhost:7208/api/Appointment/UpdateAppointment/${formData.appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }
    
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Cita editada correctamente.',
            });

            onClose(); // Cerrar el modal después de editar
            router.push('/dashboard');
        } catch (error: unknown) {
            console.error("Error editing cita:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    };
    
    return (
        <div className="modal"> {/* Asegúrate de tener estilos adecuados para tu modal */}
            <h2>Editar Cita</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                <div>
                    <label>Persona</label>
                    <input
                        type="text"
                        name="person"
                        value={formData.person || ''}
                        onChange={handleChange}
                        placeholder="Persona"
                    />
                </div>
                <div>
                    <label>Motivo</label>
                    <input
                        type="text"
                        name="reason"
                        value={formData.reason || ''}
                        onChange={handleChange}
                        placeholder="Motivo"
                    />
                </div>
                <div>
                    <label>Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        name="datetime"
                        value={formData.datetime || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default CitasForm;

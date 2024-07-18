import { useState } from 'react';
import Swal from 'sweetalert2';

interface Citas {
    appointmentId?: number;
    person: string;
    reason: string;
    datetime: string;
}

interface CitasProps {
    id: string;
}

const AddCitas = ({ id }: CitasProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newCita, setNewCita] = useState<Partial<Citas>>({
        person: '',
        reason: '',
        datetime: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCita(prevCita => ({
            ...prevCita,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7208/api/Appointment/AddAppointment/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCita),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }

            const data = await response.json();
            console.log('Cita guardada:', data); // Mensaje de consola para confirmar el éxito

            // Mostrar SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'La cita se ha guardado correctamente.',
            });

            // Limpiar formulario después de éxito
            setNewCita({
                person: '',
                reason: '',
                datetime: '',
            });

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');

            // Mostrar SweetAlert de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error instanceof Error ? error.message : 'Error desconocido',
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Agregar Cita</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="person">Persona</label>
                    <input type="text" id="person" name="person" value={newCita.person || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="reason">Motivo</label>
                    <textarea id="reason" name="reason" value={newCita.reason || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="datetime">Fecha y Hora</label>
                    <input type="datetime-local" id="datetime" name="datetime" value={newCita.datetime || ''} onChange={handleInputChange} required />
                </div>
                <button type="submit">Guardar Cita</button>
            </form>
        </div>
    );
};

export default AddCitas;

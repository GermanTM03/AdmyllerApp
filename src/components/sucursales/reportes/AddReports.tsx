import { useState } from 'react';
import Swal from 'sweetalert2';

interface Report {
    customerName: string;
    address: string;
    phoneNumber: string;
    serialNumber: string;
    licensePlates: string;
    brand: string;
    mileage: number;
    fuelType: string;
    model: string;
    color: string;
    visualDetails: string;
    entryDate: string; // Ahora será tipo datetime-local
    valuableItems: string;
}

interface ReportProps {
    id: string;
}

const AddReports = ({ id }: ReportProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newReport, setNewReport] = useState<Partial<Report>>({
        customerName: '',
        address: '',
        phoneNumber: '',
        serialNumber: '',
        licensePlates: '',
        brand: '',
        mileage: 0,
        fuelType: '', // Puedes definir opciones por defecto aquí
        model: '',
        color: '',
        visualDetails: '',
        entryDate: '', // Ahora será tipo datetime-local
        valuableItems: '' // Puedes definir opciones por defecto aquí
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewReport(prevReport => ({
            ...prevReport,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7208/api/Reports/AddReport/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReport),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }

            const data = await response.json();
            console.log('Reporte guardado:', data); // Mensaje de consola para confirmar el éxito

            // Mostrar SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El reporte se ha guardado correctamente.',
            });

            // Limpiar formulario después de éxito
            setNewReport({
                customerName: '',
                address: '',
                phoneNumber: '',
                serialNumber: '',
                licensePlates: '',
                brand: '',
                mileage: 0,
                fuelType: '',
                model: '',
                color: '',
                visualDetails: '',
                entryDate: '',
                valuableItems: '',
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
            <h2>Agregar Reporte</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customerName">Nombre del Cliente</label>
                    <input type="text" id="customerName" name="customerName" value={newReport.customerName || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input type="text" id="address" name="address" value={newReport.address || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Número de Teléfono</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={newReport.phoneNumber || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="serialNumber">Número de Serie</label>
                    <input type="text" id="serialNumber" name="serialNumber" value={newReport.serialNumber || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="licensePlates">Placas</label>
                    <input type="text" id="licensePlates" name="licensePlates" value={newReport.licensePlates || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="brand">Marca</label>
                    <input type="text" id="brand" name="brand" value={newReport.brand || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="mileage">Kilometraje</label>
                    <input type="number" id="mileage" name="mileage" value={newReport.mileage || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="fuelType">Tipo de Combustible</label>
                    <select id="fuelType" name="fuelType" value={newReport.fuelType || ''} onChange={handleInputChange}>
                        <option value="">Selecciona...</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Diésel">Diésel</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Eléctrico">Eléctrico</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="model">Modelo</label>
                    <input type="text" id="model" name="model" value={newReport.model || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <input type="text" id="color" name="color" value={newReport.color || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="visualDetails">Detalles Visuales</label>
                    <textarea id="visualDetails" name="visualDetails" value={newReport.visualDetails || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="entryDate">Fecha y Hora de Entrada</label>
                    <input type="datetime-local" id="entryDate" name="entryDate" value={newReport.entryDate || ''} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="valuableItems">Artículos Valiosos</label>
                    <textarea id="valuableItems" name="valuableItems" value={newReport.valuableItems || ''} onChange={handleInputChange} />
                </div>
                <button type="submit">Guardar Reporte</button>
            </form>
        </div>
    );
};

export default AddReports;

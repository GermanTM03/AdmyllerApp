// "use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface ReportFormProps {
    report: Report;
    onClose: () => void;
}

interface Report {
    reportId: number;
    customerName: string | null;
    address: string | null;
    phoneNumber: string | null;
    serialNumber: string | null;
    licensePlates: string | null;
    brand: string | null;
    mileage: number;
    fuelType: string | null;
    model: string | null;
    color: string | null;
    visualDetails: string | null;
    entryDate: string;
    valuableItems: string | null;
}

const ReportFormModal: React.FC<ReportFormProps> = ({ report, onClose }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Report>({
        ...report,
    });

    useEffect(() => {
        setFormData({
            ...report,
        });
    }, [report]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('Report ID:', formData.reportId);
        console.log('Form Data:', formData);
    
        try {
            const response = await fetch(`https://localhost:7208/api/Reports/UpdateReport/${formData.reportId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            console.log('Response Status:', response.status);
            console.log('Response:', response);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }
    
            alert('Reporte editado con éxito');
            onClose(); // Cerrar el modal después de editar
            router.push('/dashboard');
        } catch (error: unknown) {
            console.error("Error editing report:", error);
            // Manejo de errores
        }
    };
    
    return (
        <div className="modal"> {/* Asegúrate de tener estilos adecuados para tu modal */}
            <h2>Editar Reporte</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                <div>
                    <label>Nombre del Cliente</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName || ''}
                        onChange={handleChange}
                        placeholder="Nombre del Cliente"
                    />
                </div>
                <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        placeholder="Dirección"
                    />
                </div>
                <div>
                    <label>Número de Teléfono</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                        placeholder="Número de Teléfono"
                    />
                </div>
                <div>
                    <label>Número de Serie</label>
                    <input
                        type="text"
                        name="serialNumber"
                        value={formData.serialNumber || ''}
                        onChange={handleChange}
                        placeholder="Número de Serie"
                    />
                </div>
                <div>
                    <label>Placas</label>
                    <input
                        type="text"
                        name="licensePlates"
                        value={formData.licensePlates || ''}
                        onChange={handleChange}
                        placeholder="Placas"
                    />
                </div>
                <div>
                    <label>Marca</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand || ''}
                        onChange={handleChange}
                        placeholder="Marca"
                    />
                </div>
                <div>
                    <label>Kilometraje</label>
                    <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        placeholder="Kilometraje"
                    />
                </div>
                <div>
                    <label>Tipo de Combustible</label>
                    <input
                        type="text"
                        name="fuelType"
                        value={formData.fuelType || ''}
                        onChange={handleChange}
                        placeholder="Tipo de Combustible"
                    />
                </div>
                <div>
                    <label>Modelo</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model || ''}
                        onChange={handleChange}
                        placeholder="Modelo"
                    />
                </div>
                <div>
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color || ''}
                        onChange={handleChange}
                        placeholder="Color"
                    />
                </div>
                <div>
                    <label>Detalles Visuales</label>
                    <textarea
                        name="visualDetails"
                        value={formData.visualDetails || ''}
                        onChange={handleChange}
                        placeholder="Detalles Visuales"
                    ></textarea>
                </div>
                <div>
                    <label>Fecha de Ingreso</label>
                    <input
                        type="datetime-local"
                        name="entryDate"
                        value={formData.entryDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Objetos de Valor</label>
                    <input
                        type="text"
                        name="valuableItems"
                        value={formData.valuableItems || ''}
                        onChange={handleChange}
                        placeholder="Objetos de Valor"
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default ReportFormModal;

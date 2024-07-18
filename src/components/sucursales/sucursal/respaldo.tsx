"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

interface Report {
    reportId?: number; // Hacer reportId opcional para el nuevo reporte
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
    entryDate: string;
    valuableItems: string;
}

const AddReport = () => {
    const { id } = useParams<{ id: string }>(); // Obtén el ID de la URL

    const [newReport, setNewReport] = useState<Report>({
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
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewReport((prev) => ({ ...prev, [name]: value }));
    };

    const validateInputs = (): boolean => {
        if (
            !newReport.customerName ||
            !newReport.address ||
            !newReport.phoneNumber ||
            !newReport.serialNumber ||
            !newReport.licensePlates ||
            !newReport.brand ||
            !newReport.mileage ||
            !newReport.fuelType ||
            !newReport.model ||
            !newReport.color ||
            !newReport.visualDetails ||
            !newReport.entryDate ||
            !newReport.valuableItems
        ) {
            setError('Todos los campos son obligatorios.');
            return false;
        }

        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(newReport.phoneNumber)) {
            setError('El número de teléfono solo debe contener números.');
            return false;
        }

        setError(null);
        return true;
    };

    const handleAddReport = async () => {
        if (!id) {
            setError('ID no válido.');
            return;
        }

        if (!validateInputs()) {
            return;
        }

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
                throw new Error(`Error ${response.status}: ${errorData.message || 'Error al agregar reporte'}`);
            }

            Swal.fire({
                icon: 'success',
                title: 'Reporte añadido con éxito',
                showConfirmButton: false,
                timer: 1500
            });

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
            setIsModalOpen(false);

            // Refrescar la página después de un breve retraso
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Error desconocido');
            }
        }
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white p-2 rounded">
                Agregar Reporte
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Agregar Reporte</h2>
                        <input type="text" name="customerName" placeholder="Nombre del cliente" onChange={handleInputChange} />
                        <input type="text" name="address" placeholder="Dirección" onChange={handleInputChange} />
                        <input type="text" name="phoneNumber" placeholder="Teléfono" onChange={handleInputChange} />
                        <input type="text" name="serialNumber" placeholder="Número de serie" onChange={handleInputChange} />
                        <input type="text" name="licensePlates" placeholder="Placas" onChange={handleInputChange} />
                        <input type="text" name="brand" placeholder="Marca" onChange={handleInputChange} />
                        <input type="number" name="mileage" placeholder="Kilometraje" onChange={handleInputChange} />
                        <input type="text" name="fuelType" placeholder="Tipo de combustible" onChange={handleInputChange} />
                        <input type="text" name="model" placeholder="Modelo" onChange={handleInputChange} />
                        <input type="text" name="color" placeholder="Color" onChange={handleInputChange} />
                        <input type="text" name="visualDetails" placeholder="Detalles visuales" onChange={handleInputChange} />
                        <input type="datetime-local" name="entryDate" placeholder="Fecha de entrada" onChange={handleInputChange} />
                        <input type="text" name="valuableItems" placeholder="Artículos valiosos" onChange={handleInputChange} />

                        <button onClick={handleAddReport} className="bg-green-600 text-white p-2 rounded">
                            Guardar
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className="bg-red-600 text-white p-2 rounded">
                            Cancelar
                        </button>

                        {error && <div className="text-red-600">{error}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddReport;

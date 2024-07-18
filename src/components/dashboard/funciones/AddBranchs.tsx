"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

interface Branch {
    branchId: number;
    businessName: string;
    address: string;
    rfc: string;
    email: string;
    phoneNumber: string;
    userId: number;
}

const AddBranch = () => {
    const [newBranch, setNewBranch] = useState<Partial<Branch>>({});
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBranch((prev) => ({ ...prev, [name]: value }));
    };

    const validateInputs = (): boolean => {
        if (!newBranch.businessName || !newBranch.address || !newBranch.rfc || !newBranch.email || !newBranch.phoneNumber) {
            setError('Todos los campos son obligatorios.');
            return false;
        }

        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(newBranch.phoneNumber)) {
            setError('El número de teléfono solo debe contener números.');
            return false;
        }

        setError(null);
        return true;
    };

    const handleAddBranch = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('https://localhost:7208/api/Branchs/AddBranchs', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBranch),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Error al agregar sucursal'}`);
            }

            Swal.fire({
                icon: 'success',
                title: 'Sucursal añadida con éxito',
                showConfirmButton: false,
                timer: 1500
            });

            setNewBranch({});
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
                Agregar Sucursal
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Agregar Sucursal</h2>
                        <input type="text" name="businessName" placeholder="Nombre del negocio" onChange={handleInputChange} />
                        <input type="text" name="address" placeholder="Dirección" onChange={handleInputChange} />
                        <input type="text" name="rfc" placeholder="RFC" onChange={handleInputChange} />
                        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                        <input type="number" name="phoneNumber" placeholder="Teléfono" onChange={handleInputChange} />

                        <button onClick={handleAddBranch} className="bg-green-600 text-white p-2 rounded">
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

export default AddBranch;

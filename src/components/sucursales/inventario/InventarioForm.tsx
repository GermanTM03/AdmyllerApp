import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface ProductFormProps {
    product: Product;
    onClose: () => void;
}

interface Product {
    productId: number;
    brand: string | null;
    productName: string | null;
    description: string | null;
    quantity: number;
    cost: number;
}

const InventarioForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Product>({
        ...product,
    });

    useEffect(() => {
        setFormData({
            ...product,
        });
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`https://localhost:7208/api/inventory/ProductUpdate/${formData.productId}`, {
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
                text: 'Producto editado correctamente.',
            });

            onClose(); // Cerrar el modal después de editar
            router.push('/dashboard');
        } catch (error: unknown) {
            console.error("Error editing product:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    };
    
    return (
        <div className="modal"> {/* Asegúrate de tener estilos adecuados para tu modal */}
            <h2>Editar Producto</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                <div>
                    <label>Nombre del Producto</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName || ''}
                        onChange={handleChange}
                        placeholder="Nombre del Producto"
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
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        placeholder="Descripción"
                    ></textarea>
                </div>
                <div>
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Cantidad"
                    />
                </div>
                <div>
                    <label>Costo</label>
                    <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        placeholder="Costo"
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default InventarioForm;

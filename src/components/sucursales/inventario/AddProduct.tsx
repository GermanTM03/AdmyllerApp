import { useState } from 'react';
import Swal from 'sweetalert2';

interface Product {
    productId?: number;
    brand?: string;
    productName: string;
    description: string;
    quantity: number;
    cost: number;
}

interface ProductProps {
    id: string;
}

const AddProduct = ({ id }: ProductProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        brand: '',
        productName: '',
        description: '',
        quantity: 0,
        cost: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7208/api/inventory/AddProduct/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No autorizado'}`);
            }

            const data = await response.json();
            console.log('Producto guardado:', data); // Mensaje de consola para confirmar el éxito

            // Mostrar SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El producto se ha guardado correctamente.',
            });

            // Limpiar formulario después de éxito
            setNewProduct({
                brand: '',
                productName: '',
                description: '',
                quantity: 0,
                cost: 0,
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
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="brand">Marca del Producto</label>
                    <input type="text" id="brand" name="brand" value={newProduct.brand || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="productName">Nombre del Producto</label>
                    <input type="text" id="productName" name="productName" value={newProduct.productName || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <textarea id="description" name="description" value={newProduct.description || ''} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="quantity">Cantidad</label>
                    <input type="number" id="quantity" name="quantity" value={newProduct.quantity || 0} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="cost">Costo</label>
                    <input type="number" id="cost" name="cost" value={newProduct.cost || 0} onChange={handleInputChange} required />
                </div>
                <button type="submit">Guardar Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;

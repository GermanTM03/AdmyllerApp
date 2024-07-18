"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import InventarioForm from './InventarioForm'; // Asumiendo que InventarioForm maneja la edición de productos

interface Product {
    productId: number;
    brand: string | null;
    productName: string | null;
    description: string | null;
    quantity: number;
    cost: number;
}

const Inventario = ({ id }: { id: string }) => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://localhost:7208/api/inventory/ProductsBranch/${id}`, {
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

                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    const handleDelete = async (productId: number) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:7208/api/inventory/DeleteProduct/${productId}`, {
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
                text: 'Producto eliminado correctamente.',
            });

            setProducts(products.filter(product => product.productId !== productId));
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
    };

    const closeEditModal = () => {
        setEditingProduct(null);
    };

    const handleEdit = async (editedProduct: Product) => {
        // Implementa la lógica para editar el producto utilizando el ID de editedProduct
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Inventario de Productos</h1>
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del Producto</th>
                            <th>Marca</th>
                            <th>Cantidad</th>
                            <th>Costo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName || 'N/A'}</td>
                                <td>{product.brand || 'N/A'}</td>
                                <td>{product.quantity}</td>
                                <td>{product.cost}</td>
                                <td>
                                    <button onClick={() => openEditModal(product)}>Editar</button>
                                    <button onClick={() => handleDelete(product.productId)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay productos disponibles.</p>
            )}

            {editingProduct && (
                <InventarioForm
                    product={editingProduct}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default Inventario;

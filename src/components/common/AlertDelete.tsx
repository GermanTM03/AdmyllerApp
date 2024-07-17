import React from 'react';
import Swal from 'sweetalert2';

const handleDelete = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            
            Swal.fire(
              'Eliminado!',
              'Ha sido eliminado.',
              'success'
            );
          }
        });
      };
    
export default handleDelete


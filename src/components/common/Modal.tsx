interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div>
            <button onClick={onClose}>Cerrar</button>
            {/* Contenido del modal */}
        </div>
    );
}

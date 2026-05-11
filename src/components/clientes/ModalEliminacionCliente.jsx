import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const ModalEliminacionCliente = ({ 
  mostrarModalEliminacion, 
  setMostrarModalEliminacion, 
  cliente, 
  eliminarCliente // Cambiado para coincidir con la prop que envía el padre
}) => {
  const [cargando, setCargando] = useState(false);

  const handleEliminar = async () => {
    setCargando(true);
    await eliminarCliente();
    setCargando(false);
  };

  // Evitar errores si el cliente es null al cerrar/abrir
  if (!cliente) return null;

  return (
    <Modal 
      show={mostrarModalEliminacion} 
      onHide={() => setMostrarModalEliminacion(false)} 
      centered 
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <p className="mb-1">¿Estás seguro de que deseas eliminar al cliente?</p>
        <h5 className="fw-bold text-danger">
          {cliente?.nombre_cliente} {cliente?.apellido_cliente}
        </h5>
        <p className="text-muted small mb-0">
          ID: {cliente?.id_cliente} <br />
          Esta acción eliminará permanentemente el registro.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 d-flex justify-content-center pb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => setMostrarModalEliminacion(false)}
          disabled={cargando}
          className="px-4 me-2"
        >
          Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={handleEliminar} 
          disabled={cargando}
          className="px-4"
        >
          {cargando ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Eliminando...
            </>
          ) : (
            "Eliminar Definitivamente"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCliente;
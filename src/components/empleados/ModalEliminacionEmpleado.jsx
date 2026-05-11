import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionEmpleado = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  eliminarEmpleado,
  empleado,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleEliminar = async () => {
    setDeshabilitado(true);
    await eliminarEmpleado();
    setDeshabilitado(false);
  };

  return (
    <Modal show={mostrarModalEliminacion} onHide={() => setMostrarModalEliminacion(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Seguro que deseas eliminar a <strong>{empleado?.nombre_empleado} {empleado?.apellido_empleado}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEliminacion(false)}>Cancelar</Button>
        <Button variant="danger" onClick={handleEliminar} disabled={deshabilitado}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionEmpleado;
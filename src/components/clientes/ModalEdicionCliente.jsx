import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCliente = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  clienteEditar,
  setClienteEditar,
  actualizarCliente,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  // Manejo de cambios local para el formulario
  const manejoCambio = (e) => {
    const { name, value } = e.target;
    setClienteEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActualizar = async () => {
    setDeshabilitado(true);
    await actualizarCliente();
    setDeshabilitado(false);
  };

  // ESTO ES LO QUE EVITA EL ERROR: 
  // Si no hay objeto clienteEditar, no renderizamos el contenido
  if (!clienteEditar) return null;

  return (
    <Modal
      show={mostrarModalEdicion}
      onHide={() => setMostrarModalEdicion(false)}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre_cliente"
              // Usamos optional chaining (?.) y un fallback (|| "")
              value={clienteEditar?.nombre_cliente || ""}
              onChange={manejoCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="apellido_cliente"
              value={clienteEditar?.apellido_cliente || ""}
              onChange={manejoCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular_cliente"
              value={clienteEditar?.celular_cliente || ""}
              onChange={manejoCambio}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModalEdicion(false)}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleActualizar}
          disabled={deshabilitado}
        >
          {deshabilitado ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCliente;
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({ 
  mostrarModal, // Debe llamarse igual que en Clientes.jsx
  setMostrarModal, 
  agregarCliente 
}) => {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_cliente: "",
    apellido_cliente: "",
    celular_cliente: "",
  });

  const [deshabilitado, setDeshabilitado] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setDeshabilitado(true);
    await agregarCliente(nuevoCliente);
    // Limpiar formulario y cerrar se hace tras el éxito
    setNuevoCliente({ nombre_cliente: "", apellido_cliente: "", celular_cliente: "" });
    setDeshabilitado(false);
  };

  return (
    <Modal 
      show={mostrarModal} 
      onHide={() => setMostrarModal(false)} 
      backdrop="static" 
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleGuardar}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre_cliente"
              value={nuevoCliente.nombre_cliente}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido_cliente"
              value={nuevoCliente.apellido_cliente}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular_cliente"
              value={nuevoCliente.celular_cliente}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={deshabilitado}>
            {deshabilitado ? "Guardando..." : "Guardar Cliente"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegistroCliente;
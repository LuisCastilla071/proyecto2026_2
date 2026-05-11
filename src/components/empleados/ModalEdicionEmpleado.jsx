import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionEmpleado = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  empleadoEditar,
  manejoCambioInputEdicion,
  actualizarEmpleado,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleActualizar = async () => {
    setDeshabilitado(true);
    await actualizarEmpleado();
    setDeshabilitado(false);
  };

  // Si no hay objeto para editar, no renderizamos el contenido problemático
  if (!empleadoEditar) return null;

  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              name="nombre_empleado" 
              value={empleadoEditar?.nombre_empleado || ""} 
              onChange={manejoCambioInputEdicion} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
              name="apellido_empleado" 
              value={empleadoEditar?.apellido_empleado || ""} 
              onChange={manejoCambioInputEdicion} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PIN de Acceso</Form.Label>
            <Form.Control 
              type="password" 
              name="pin_acceso" 
              value={empleadoEditar?.pin_acceso || ""} 
              onChange={manejoCambioInputEdicion} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select 
              name="tipo_empleado" 
              value={empleadoEditar?.tipo_empleado || ""} 
              onChange={manejoCambioInputEdicion}
            >
              <option value="">Seleccione un cargo...</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cajero">Cajero</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleActualizar} 
          disabled={deshabilitado}
        >
          {deshabilitado ? "Actualizando..." : "Actualizar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionEmpleado;
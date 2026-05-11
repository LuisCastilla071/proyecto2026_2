import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({ mostrarModal, setMostrarModal, agregarEmpleado }) => {
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre_empleado: "",
    apellido_empleado: "",
    pin_acceso: "",
    tipo_empleado: "",
  });
  const [deshabilitado, setDeshabilitado] = useState(false);

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistrar = async () => {
    const { nombre_empleado, apellido_empleado, pin_acceso, tipo_empleado } = nuevoEmpleado;
    if (!nombre_empleado.trim() || !apellido_empleado.trim() || !pin_acceso.trim() || !tipo_empleado) return;

    setDeshabilitado(true);
    await agregarEmpleado(nuevoEmpleado);
    setNuevoEmpleado({ nombre_empleado: "", apellido_empleado: "", pin_acceso: "", tipo_empleado: "" });
    setDeshabilitado(false);
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre_empleado" value={nuevoEmpleado.nombre_empleado} onChange={manejoCambioInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="apellido_empleado" value={nuevoEmpleado.apellido_empleado} onChange={manejoCambioInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PIN de Acceso</Form.Label>
            <Form.Control type="password" name="pin_acceso" value={nuevoEmpleado.pin_acceso} onChange={manejoCambioInput} maxLength={10} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Empleado</Form.Label>
            <Form.Select name="tipo_empleado" value={nuevoEmpleado.tipo_empleado} onChange={manejoCambioInput}>
              <option value="">Selecciona un tipo...</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cajero">Cajero</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
        <Button variant="primary" onClick={handleRegistrar} disabled={deshabilitado}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;
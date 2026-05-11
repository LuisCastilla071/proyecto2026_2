import React from "react";
import { Table, Button } from "react-bootstrap";

const TablaClientes = ({ clientes, abrirModalEdicion, abrirModalEliminacion }) => (
  <Table striped borderless hover responsive size="sm">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Celular</th>
        <th className="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clientes.map((c) => (
        <tr key={c.id_cliente}>
          <td>{c.id_cliente}</td>
          <td>{c.nombre_cliente}</td>
          <td>{c.apellido_cliente}</td>
          <td>{c.celular_cliente}</td>
          <td className="text-center">
            <Button variant="outline-warning" size="sm" className="me-2" onClick={() => abrirModalEdicion(c)}><i className="bi bi-pencil"></i></Button>
            <Button variant="outline-danger" size="sm" onClick={() => abrirModalEliminacion(c)}><i className="bi bi-trash"></i></Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
export default TablaClientes;
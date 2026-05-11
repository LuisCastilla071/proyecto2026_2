import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const TarjetaCliente = ({ clientes, abrirModalEdicion, abrirModalEliminacion }) => {
  const [idActivo, setIdActivo] = useState(null);

  return (
    <div>
      {clientes.map((c) => {
        const activa = idActivo === c.id_cliente;
        return (
          <Card key={c.id_cliente} className="mb-3 border-0 shadow-sm tarjeta-categoria-contenedor" onClick={() => setIdActivo(activa ? null : c.id_cliente)}>
            <Card.Body className={`p-2 tarjeta-categoria-cuerpo ${activa ? "tarjeta-categoria-cuerpo-activo" : ""}`}>
              <Row className="align-items-center">
                <Col xs={2}><div className="bg-light rounded p-2 text-center"><i className="bi bi-person text-muted fs-3"></i></div></Col>
                <Col xs={7}>
                  <div className="fw-bold">{c.nombre_cliente} {c.apellido_cliente}</div>
                  <div className="small text-muted">{c.celular_cliente}</div>
                </Col>
                <Col xs={3} className="text-end small fw-bold text-primary">#{c.id_cliente}</Col>
              </Row>
            </Card.Body>
            {activa && (
              <div className="tarjeta-categoria-capa" onClick={(e) => { e.stopPropagation(); setIdActivo(null); }}>
                <div className="d-flex gap-2 tarjeta-categoria-botones-capa" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline-warning" onClick={() => abrirModalEdicion(c)}><i className="bi bi-pencil"></i></Button>
                  <Button variant="outline-danger" onClick={() => abrirModalEliminacion(c)}><i className="bi bi-trash"></i></Button>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
export default TarjetaCliente;
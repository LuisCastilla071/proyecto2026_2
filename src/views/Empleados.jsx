import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";

// Componentes de Empleados
import TablaEmpleados from "../components/empleados/TablaEmpleados";
import TarjetaEmpleado from "../components/empleados/TarjetaEmpleado";
import ModalRegistroEmpleado from "../components/empleados/ModalRegistroEmpleado";
import ModalEdicionEmpleado from "../components/empleados/ModalEdicionEmpleado";
import ModalEliminacionEmpleado from "../components/empleados/ModalEliminacionEmpleado";

// Componentes Comunes
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";

const Empleados = () => {
  // --- Estados de Notificación ---
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });

  // --- Estados de Datos y Carga ---
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // --- Estados de Modales ---
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  // --- Estados de Selección/Formulario ---
  const [empleadoEditar, setEmpleadoEditar] = useState({
    id_empleado: "",
    nombre_empleado: "",
    apellido_empleado: "",
    pin_acceso: "",
    tipo_empleado: "",
  });
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);

  // --- Búsqueda y Paginación ---
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(10);
  const [paginaActual, establecerPaginaActual] = useState(1);

  // --- Carga de Datos ---
  const cargarEmpleados = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("empleados")
        .select("*")
        .order("id_empleado", { ascending: true });

      if (error) throw error;
      setEmpleados(data || []);
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al cargar empleados.", tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  // --- Lógica de Filtrado (Busca por nombre, apellido o cargo) ---
  useEffect(() => {
    const textoLower = textoBusqueda.toLowerCase().trim();
    const filtrados = empleados.filter(
      (emp) =>
        emp.nombre_empleado.toLowerCase().includes(textoLower) ||
        emp.apellido_empleado.toLowerCase().includes(textoLower) ||
        emp.tipo_empleado.toLowerCase().includes(textoLower)
    );
    setEmpleadosFiltrados(filtrados);
    establecerPaginaActual(1);
  }, [textoBusqueda, empleados]);

  // --- Paginación ---
  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  // --- Manejadores de Modales ---
  const abrirModalEdicion = (emp) => {
    setEmpleadoEditar({ ...emp });
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (emp) => {
    setEmpleadoAEliminar(emp);
    setMostrarModalEliminacion(true);
  };

  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditar((prev) => ({ ...prev, [name]: value }));
  };

  // --- Operaciones CRUD ---
  const agregarEmpleado = async (nuevoEmpleado) => {
    try {
      const { error } = await supabase.from("empleados").insert([nuevoEmpleado]);
      if (error) throw error;

      setToast({ mostrar: true, mensaje: "Empleado registrado exitosamente.", tipo: "exito" });
      setMostrarModalRegistro(false);
      await cargarEmpleados();
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al registrar empleado.", tipo: "error" });
    }
  };

  const actualizarEmpleado = async () => {
    try {
      const { error } = await supabase
        .from("empleados")
        .update({
          nombre_empleado: empleadoEditar.nombre_empleado,
          apellido_empleado: empleadoEditar.apellido_empleado,
          pin_acceso: empleadoEditar.pin_acceso,
          tipo_empleado: empleadoEditar.tipo_empleado,
        })
        .eq("id_empleado", empleadoEditar.id_empleado);

      if (error) throw error;

      setMostrarModalEdicion(false);
      await cargarEmpleados();
      setToast({ mostrar: true, mensaje: "Empleado actualizado correctamente.", tipo: "exito" });
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al actualizar empleado.", tipo: "error" });
    }
  };

  const eliminarEmpleado = async () => {
    try {
      const { error } = await supabase
        .from("empleados")
        .delete()
        .eq("id_empleado", empleadoAEliminar.id_empleado);

      if (error) throw error;

      setMostrarModalEliminacion(false);
      await cargarEmpleados();
      setToast({ mostrar: true, mensaje: "Empleado eliminado exitosamente.", tipo: "exito" });
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al eliminar empleado.", tipo: "error" });
    }
  };

  return (
    <Container className="mt-3">
      {/* Cabecera */}
      <Row className="align-items-center mb-3">
        <Col xs={8}>
          <h3 className="mb-0">
            <i className="bi bi-people-fill me-2"></i> Empleados
          </h3>
        </Col>
        <Col xs={4} className="text-end">
          <Button onClick={() => setMostrarModalRegistro(true)}>
            <i className="bi bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nuevo Empleado</span>
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Buscador */}
      <Row className="mb-4">
        <Col md={6} lg={5}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) => setTextoBusqueda(e.target.value)}
            placeholder="Buscar por nombre, apellido o cargo..."
          />
        </Col>
      </Row>

      {/* Estado de Carga */}
      {cargando ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2 text-muted">Cargando empleados...</p>
        </div>
      ) : (
        <>
          {/* Resultados */}
          {empleadosFiltrados.length === 0 ? (
            <Alert variant="info" className="text-center">
              No se encontraron empleados.
            </Alert>
          ) : (
            <Row>
              <Col xs={12} className="d-lg-none">
                <TarjetaEmpleado
                  empleados={empleadosPaginados}
                  abrirModalEdicion={abrirModalEdicion}
                  abrirModalEliminacion={abrirModalEliminacion}
                />
              </Col>
              <Col lg={12} className="d-none d-lg-block">
                <TablaEmpleados
                  empleados={empleadosPaginados}
                  abrirModalEdicion={abrirModalEdicion}
                  abrirModalEliminacion={abrirModalEliminacion}
                />
              </Col>
            </Row>
          )}

          {/* Paginación */}
          {empleadosFiltrados.length > 0 && (
            <Paginacion
              registrosPorPagina={registrosPorPagina}
              totalRegistros={empleadosFiltrados.length}
              paginaActual={paginaActual}
              establecerPaginaActual={establecerPaginaActual}
              establecerRegistrosPorPagina={establecerRegistrosPorPagina}
            />
          )}
        </>
      )}

      {/* Modales */}
      <ModalRegistroEmpleado
        mostrarModal={mostrarModalRegistro}
        setMostrarModal={setMostrarModalRegistro}
        agregarEmpleado={agregarEmpleado}
      />

      <ModalEdicionEmpleado
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        empleadoEditar={empleadoEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        actualizarEmpleado={actualizarEmpleado}
      />

      <ModalEliminacionEmpleado
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarEmpleado={eliminarEmpleado}
        empleado={empleadoAEliminar}
      />

      {/* Notificación Operación */}
      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
    </Container>
  );
};

export default Empleados;
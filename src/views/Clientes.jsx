import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";

// Componentes
import TablaClientes from "../components/clientes/TablaClientes";
import TarjetaCliente from "../components/clientes/TarjetaCliente";
import ModalRegistroCliente from "../components/clientes/ModalRegistroCliente";
import ModalEdicionCliente from "../components/clientes/ModalEdicionCliente";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionCliente";

// Componentes Comunes
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";

const Clientes = () => {
  // --- Estados de Notificación ---
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });

  // --- Estados de Datos y Carga ---
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados Modales
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  // Selección
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteEditar, setClienteEditar] = useState({
    id_cliente: "", nombre_cliente: "", apellido_cliente: "", celular_cliente: ""
  });

  // --- Estados de Búsqueda y Paginación ---
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(10);
  const [paginaActual, establecerPaginaActual] = useState(1);

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase.from("clientes").select("*").order("id_cliente", { ascending: true });
      if (error) throw error;
      setClientes(data || []);
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al cargar clientes.", tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarClientes(); }, []);

  // --- Lógica de Filtrado ---
  useEffect(() => {
    const textoLower = textoBusqueda.toLowerCase().trim();
    const filtrados = clientes.filter(
      (cli) =>
        cli.nombre_cliente.toLowerCase().includes(textoLower) ||
        cli.apellido_cliente.toLowerCase().includes(textoLower) ||
        (cli.celular_cliente && cli.celular_cliente.includes(textoLower))
    );
    setClientesFiltrados(filtrados);
    establecerPaginaActual(1);
  }, [textoBusqueda, clientes]);

  // --- Lógica de Paginación ---
  const clientesPaginados = clientesFiltrados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  // --- Funciones para abrir modales (Asegurando la carga de datos) ---
  const abrirModalEdicion = (cli) => { 
    setClienteEditar({ ...cli }); 
    setMostrarModalEdicion(true); 
  };
  const abrirModalEliminacion = (cli) => { 
    setClienteSeleccionado(cli); 
    setMostrarModalEliminacion(true); 
  };

  const agregarCliente = async (nuevo) => {
    try {
      const { error } = await supabase.from("clientes").insert([nuevo]);
      if (error) throw error;
      setToast({ mostrar: true, mensaje: "Cliente registrado exitosamente.", tipo: "exito" });
      setMostrarModalRegistro(false);
      await cargarClientes();
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al registrar cliente.", tipo: "error" });
    }
  };

  const actualizarCliente = async () => {
    try {
      const { error } = await supabase.from("clientes").update({
        nombre_cliente: clienteEditar.nombre_cliente,
        apellido_cliente: clienteEditar.apellido_cliente,
        celular_cliente: clienteEditar.celular_cliente
      }).eq("id_cliente", clienteEditar.id_cliente);
      if (error) throw error;
      setToast({ mostrar: true, mensaje: "Cliente actualizado correctamente.", tipo: "exito" });
      setMostrarModalEdicion(false);
      await cargarClientes();
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al actualizar cliente.", tipo: "error" });
    }
  };

  const eliminarCliente = async () => {
    try {
      const { error } = await supabase.from("clientes").delete().eq("id_cliente", clienteSeleccionado.id_cliente);
      if (error) throw error;
      setToast({ mostrar: true, mensaje: "Cliente eliminado correctamente.", tipo: "exito" });
      setMostrarModalEliminacion(false);
      await cargarClientes();
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al eliminar cliente.", tipo: "error" });
    }
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center mb-3">
        <Col xs={8}><h3><i className="bi bi-person-hearts me-2"></i> Clientes</h3></Col>
        <Col xs={4} className="text-end">
          <Button onClick={() => setMostrarModalRegistro(true)}>
            <i className="bi bi-plus-lg me-2"></i><span className="d-none d-sm-inline">Nuevo Cliente</span>
          </Button>
        </Col>
      </Row>
      <hr />

      <Row className="mb-4">
        <Col md={6} lg={5}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) => setTextoBusqueda(e.target.value)}
            placeholder="Buscar por nombre, apellido o celular..."
          />
        </Col>
      </Row>

      {cargando ? (
        <div className="text-center my-5"><Spinner animation="border" variant="success" /></div>
      ) : (
        <>
          {clientesFiltrados.length === 0 ? (
            <Alert variant="info" className="text-center">No se encontraron clientes.</Alert>
          ) : (
            <Row>
              <Col lg={12} className="d-none d-lg-block">
                <TablaClientes clientes={clientesPaginados} abrirModalEdicion={abrirModalEdicion} abrirModalEliminacion={abrirModalEliminacion} />
              </Col>
              <Col xs={12} className="d-lg-none">
                <TarjetaCliente clientes={clientesPaginados} abrirModalEdicion={abrirModalEdicion} abrirModalEliminacion={abrirModalEliminacion} />
              </Col>
            </Row>
          )}

          {clientesFiltrados.length > 0 && (
            <Paginacion
              registrosPorPagina={registrosPorPagina}
              totalRegistros={clientesFiltrados.length}
              paginaActual={paginaActual}
              establecerPaginaActual={establecerPaginaActual}
              establecerRegistrosPorPagina={establecerRegistrosPorPagina}
            />
          )}
        </>
      )}

      {/* MODALES CON PROPS CORREGIDAS */}
      <ModalRegistroCliente 
        mostrarModal={mostrarModalRegistro} 
        setMostrarModal={setMostrarModalRegistro} 
        agregarCliente={agregarCliente} 
      />

      <ModalEdicionCliente 
        mostrarModalEdicion={mostrarModalEdicion} 
        setMostrarModalEdicion={setMostrarModalEdicion} 
        clienteEditar={clienteEditar} 
        setClienteEditar={setClienteEditar} 
        actualizarCliente={actualizarCliente} 
      />

      <ModalEliminacionCliente 
        mostrarModalEliminacion={mostrarModalEliminacion} 
        setMostrarModalEliminacion={setMostrarModalEliminacion} 
        cliente={clienteSeleccionado} 
        eliminarCliente={eliminarCliente} 
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
    </Container>
  );
};
export default Clientes;
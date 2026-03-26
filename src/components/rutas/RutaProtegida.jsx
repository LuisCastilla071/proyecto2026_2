import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario-supabase");

    // Si NO hay usuario guardado → redirige directo a login
    if (!usuarioGuardado) {
      navegar("/login", { replace: true });
    }
  }, [navegar]);

  // Si está logueado, muestra la página normalmente
  return <>{children}</>;
};

export default RutaProtegida;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Obtener la información del localStorage al cargar el componente
    const clienteId = localStorage.getItem('cliente_id');
    const nombreUsuario = localStorage.getItem('nombre_usuario');
    const nombre = localStorage.getItem('nombre');
    const contacto = localStorage.getItem('contacto');
    const tipoCliente = localStorage.getItem('tipo_cliente');

    // Guardar la información en el estado local
    setUserInfo({
      clienteId,
      nombreUsuario,
      nombre,
      contacto,
      tipoCliente
    });
  }, []);
  
  const handleLogout = () => {
    // Eliminar todos los elementos del localStorage
    localStorage.clear();
    // Redirigir a la ruta "/"
    navigate('/');
  };

  return (
    <>
      <Navbar /> 
      <main className="bg-gray-800 h-dvh flex flex-col justify-center items-center gap-5 text-white">
          {userInfo && (
            <>
              <h1 className="text-3xl font-bold">Información sobre {userInfo.nombre}:</h1>
              <div className="text-center text-xl">
                <p>ID de Cliente: {userInfo.clienteId}</p>
                <p>Nombre de Usuario: {userInfo.nombreUsuario}</p>
                <p>Contacto: {userInfo.contacto}</p>
                <p>Tipo de Cliente: {userInfo.tipoCliente}</p>
              </div>
              <button onClick={handleLogout} class='bg-gray-900 text-2xl font-bold border border-none rounded-md px-6 py-2'>Cerrar sesión</button>
            </>
            
          )}
      </main>
    </>
  );
}

export default ProfilePage;
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectData, setIncorrectData] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del usuario y la contraseña al servidor para autenticación
    // Supongamos que el servidor devuelve el ID del usuario
    const userFromServer = await authenticateUser(username, password);
    console.log(userFromServer)
    if (typeof userFromServer === 'object') {
      // Guardar el ID del usuario en localStorage
      localStorage.setItem('cliente_id', userFromServer.id );
      localStorage.setItem('nombre_usuario', userFromServer.nombre_usuario );
      localStorage.setItem('nombre', userFromServer.nombre );
      localStorage.setItem('contacto', userFromServer.contacto );
      localStorage.setItem('tipo_cliente', userFromServer.tipo_cliente_id );
      navigate('/home');
    }
    setIncorrectData(true);
  };


  return (
    <main className='bg-gray-800 h-dvh flex flex-col justify-center items-center gap-5 text-white'>
      <h2 className='text-3xl font-bold'>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-96'>
        <div className='w-full flex gap-5 items-center'>
          <label className='font-medium text-lg'>Usuario:</label>
          <input required type="text" value={username} onChange={handleUsernameChange} className='p-2 w-full outline-none text-gray-800 border border-none rounded-md' />
        </div>
        <div className='w-full flex gap-5 items-center'>
          <label className='font-medium text-lg'>Contraseña:</label>
          <input required type="password" value={password} onChange={handlePasswordChange} className='p-2 w-full outline-none text-gray-800 border border-none rounded-md'/>
        </div>
        <button type="submit" className='bg-gray-900 border border-none rounded-md w-full p-3 hover:opacity-75 transition'>Ingresar</button>
      </form>
      {incorrectData && <p className='text-red-500'>Usuario o contraseña incorrectos</p>}
    </main>
  );
}

async function authenticateUser(username, password) {
  try {
    // Realizar una solicitud POST al servidor para autenticar al usuario
    const response = await axios.get(`http://52.146.23.192:8080/chacranet/ClienteServlet?nombre_usuario=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
}

export default LoginPage;
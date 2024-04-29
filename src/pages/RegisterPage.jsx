import { useState, useEffect } from 'react';
import axios from 'axios';

const RegistroPage = () => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contacto, setContacto] = useState('');
  const [tipoCliente, setTipoCliente] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [tiposCliente, setTiposCliente] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    // Cargar tipos de cliente
    axios.get('http://tu-servidor.com/api/tipos-cliente')
      .then(response => {
        setTiposCliente(response.data);
      })
      .catch(error => {
        console.error('Error al cargar tipos de cliente:', error);
      });

    // Cargar departamentos
    axios.get('http://52.146.23.192:8080/chacranet/DepartamentoServlet?')
      .then(response => {
        setDepartamentos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar departamentos:', error);
      });
  }, []);

  const handleDepartamentoChange = (e) => {
    const selectedDepartamento = e.target.value;
    setDepartamento(selectedDepartamento);
    // Cargar ciudades del departamento seleccionado
    axios.get(`http://tu-servidor.com/api/departamentos/${selectedDepartamento}/ciudades`)
      .then(response => {
        setCiudades(response.data);
      })
      .catch(error => {
        console.error('Error al cargar ciudades:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
    const data = {
      usuario,
      nombre,
      apellido,
      contacto,
      tipoCliente,
      departamento,
      ciudad
    };
    console.log('Datos del formulario:', data);
    // Aquí puedes realizar la solicitud al servidor para registrar al usuario
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div>
          <label>Contacto:</label>
          <input type="text" value={contacto} onChange={(e) => setContacto(e.target.value)} />
        </div>
        <div>
          <label>Tipo de Cliente:</label>
          <select value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)}>
            <option value="">Seleccione un tipo de cliente</option>
            {tiposCliente.map(tipo => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Departamento:</label>
          <select value={departamento} onChange={handleDepartamentoChange}>
            <option value="">Seleccione un departamento</option>
            {departamentos.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Ciudad:</label>
          <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
            <option value="">Seleccione una ciudad</option>
            {ciudades.map(ciudad => (
              <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroPage;
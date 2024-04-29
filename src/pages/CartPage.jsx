import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
const ShoppingCartPage = () => {
  
  const [cartInfo, setCartInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Obtener la información del localStorage al cargar el componente
    const carrito = localStorage.getItem('carrito');

    const carritoJSON = JSON.parse(carrito);
    console.log(carritoJSON)   

    // Guardar la información en el estado local
    setCartInfo(carritoJSON);
  }, []);

  const handlePayment = async () => {
    try {
      const monto = cartInfo.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      await axios.post('http://52.146.23.192:8080/chacranet/TransaccionServlet?', { monto });

      localStorage.removeItem('carrito');
      
      navigate('/transaction');

    } catch (error) {
      console.error('Error al realizar el pago:', error);
    }
  };
  
  return (
    <>
    <Navbar /> 
    <main className="bg-gray-800 h-dvh flex flex-col justify-center items-center gap-10 text-white">
      {cartInfo && (
        <>
          <h1 className="text-3xl font-bold">Carrito de Compras:</h1>
          <div className="text-center text-xl flex flex-col gap-5">
            {cartInfo.map(product => (
              <div key={product.nombre} className="flex justify-center items-center gap-8 bg-gray-700 border border-none rounded-md p-5 max-h-36">
                <p className="w-40">{product.nombre}</p>
                <img src={product.imagen} alt={product.nombre} className="w-36 h-36" />
                <p className="w-40 font-semibold">Precio: S/.{product.precio}</p>
                <p className="w-40 font-semibold">Cantidad: {product.cantidad}</p>
                <p className="w-44 font-semibold">Subtotal: S/.{product.precio * product.cantidad}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-5 w-[50%]">
            <h2 className="text-2xl font-bold">Total: S/.{cartInfo.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}</h2>
            <button onClick={handlePayment} className="p-4 bg-gray-700 w-full text-xl font-bold border border-none rounded-md hover:opacity-75 transition">Realizar Pago</button>
          </div>
        </>
        
      )  
      }
    </main>
    </>
    
  );
}

export default ShoppingCartPage;
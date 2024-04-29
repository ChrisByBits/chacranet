import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://52.146.23.192:8080/chacranet/ProductoServlet?id=${id}`);
        console.log(response.data)
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      
    };
  }, [id]);

  if (loading) 
    return (
      <>
        <Navbar isActiveSearch={false} />
        <main className="pt-20 p-6 flex justify-center items-center bg-neutral-800 text-white min-h-[100dvh]">
          <CircularProgress className="text-white"/>
        </main>
        
      </>
    )
  ;

  if (error) 
    return (
      <>
        <Navbar isActiveSearch={false} />
        <p>Error...</p>
      </>
    )
  ;

  function agregarAlCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistenteIndex = carrito.findIndex(item => item.id === product.id);
  
    if (productoExistenteIndex !== -1) {
      // Si el producto ya está en el carrito, aumentar su cantidad
      carrito[productoExistenteIndex].cantidad += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      carrito.push({...product, cantidad: 1});
    }
  
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  return (
    <>
      <Navbar isActiveSearch={false} />
      <main className="pt-20 p-6 flex justify-center items-center bg-gray-800 text-white min-h-[100dvh] gap-4">
        <div className="flex justify-center items-center max-w-[70%] gap-4">
          <img src={product.imagen} alt={product.title} className=" h-[60dvh]" />
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold text-center">{product.nombre}</h2>
            <p className="text-center text-xl">{product.descripcion}</p>
            <p className="text-center text-2xl font-bold">{`Precio: S/. ${product.precio}`}</p>
            <button className="bg-gray-600 border border-none rounded-md p-4 hover:opacity-75 transition" onClick={agregarAlCarrito}>Añadir al carrito</button>
          </div>
        </div>
        
      </main>
    </>
    
  );
};

export default ProductPage;
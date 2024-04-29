
import {useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import axios from 'axios';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = term => {
    setSearchTerm(term);
    if (term === "") 
      setFilteredProducts(products);
    else {
      const filtered = products.filter(product =>
        product.nombre.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://52.146.23.192:8080/chacranet/ProductoServlet?');
        setProducts(response.data);

        setFilteredProducts(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} isActiveSearch={true} />
      <main className=" pt-32 px-6 flex flex-col items-center gap-10 bg-gray-800 text-white min-h-[100dvh]">
        <div className='flex flex-col items-center'>
          <h1 className="text-4xl text-center font-semibold"> Conexión directa entre productores y vendedores </h1>
          <h2 className="text-3xl text-center  text-gray-400">¡Descubre nuestra Galería de Productos Agropecuarios!</h2>
        </div>
        
        <div className="grid grid-cols-4 gap-x-14 gap-y-8 w-full">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
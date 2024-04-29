import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from "@mui/material";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/producto/${product.id}`}>
      <Card className='bg-gray-700 text-inherit h-96 overflow-auto' >
        <CardActionArea className='text-inherit'>
          <CardMedia
            component="img"
            image={ product.imagen }
            alt={ product.nombre }
            className='max-h-64'
          />
          <CardContent className='flex flex-col text-inherit gap-2'>
            <h3 className='font-bold text-lg'>{ product.nombre }</h3>
            <p className='font-medium'> { product.descripcion }</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ProductCard;
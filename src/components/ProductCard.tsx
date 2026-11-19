import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="btn btn-primary w-full"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

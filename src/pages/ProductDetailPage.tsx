import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((item) => item.id === Number(id));

  if (status === 'loading') return <p>Đang tải chi tiết sản phẩm...</p>;
  if (!product) {
    return (
      <div>
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn-primary">Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="detail-layout">
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p className="detail-desc">{product.description}</p>
        <div className="detail-actions">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="btn btn-primary"
          >
            Thêm vào giỏ hàng
          </button>
          <Link to="/" className="btn btn-outline">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
  updateQuantity,
} from '../features/cart/cartSlice';

export const CartPage = () => {
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalAmount = useAppSelector(selectTotalAmount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Giỏ hàng đang trống</h2>
        <Link to="/" className="btn btn-primary">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Giỏ hàng của bạn ({totalQuantity} sản phẩm)</h2>
      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <div className="cart-item-info">
              <h4>{product.title}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
                }
                className="btn btn-outline"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))
                }
                className="btn btn-outline"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className="btn btn-danger"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Tổng tiền: ${totalAmount.toFixed(2)}</h3>
        <button
          onClick={() => navigate('/checkout')}
          className="btn btn-primary"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

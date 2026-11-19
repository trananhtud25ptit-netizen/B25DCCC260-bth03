import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectTotalAmount,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export const CheckoutPage = () => {
  const items = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="empty-state">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn {user?.username} đã mua sắm tại ShopMini.</p>
        <Link to="/" className="btn btn-primary">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-box">
      <h2>Xác nhận thanh toán</h2>
      <p>Khách hàng: <strong>{user?.username}</strong></p>

      {items.length === 0 ? (
        <p>Không có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <ul className="checkout-list">
            {items.map(({ product, quantity }) => (
              <li key={product.id}>
                {product.title} × {quantity} — ${(product.price * quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Tổng thanh toán: ${totalAmount.toFixed(2)}</h3>
          <button onClick={handlePlaceOrder} className="btn btn-primary">
            Đặt hàng
          </button>
        </>
      )}
    </div>
  );
};

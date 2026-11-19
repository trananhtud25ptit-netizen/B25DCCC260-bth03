import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          ShopMini
        </Link>

        <nav className="nav-actions">
          <Link to="/cart" className="btn-link">
            Giỏ hàng ({totalQuantity})
          </Link>

          <button onClick={toggleTheme} className="btn btn-outline">
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          {user ? (
            <div className="user-box">
              <span>Xin chào, <strong>{user.username}</strong></span>
              <button onClick={logout} className="btn btn-danger">
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

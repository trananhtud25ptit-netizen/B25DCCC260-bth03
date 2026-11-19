import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="container main-content">
        <Outlet />
      </main>
    </div>
  );
};
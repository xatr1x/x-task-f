import React, { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: ReactNode; // Додаємо children як опціональний пропс
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/types">Типи</Link></li>
            <li><Link to="/brands">Бренди</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        {children || <Outlet />} {}
      </main>
      
      <footer>
        <p>© 2024 Моя компанія</p>
      </footer>
    </div>
  );
};

export default Layout;

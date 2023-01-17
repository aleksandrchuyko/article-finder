import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
  <Suspense fallback={null}>
    <Outlet />
  </Suspense>
);

export default Layout;

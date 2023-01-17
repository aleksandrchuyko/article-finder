import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Articles from './pages/Articles/Articles';

const ArticleDetails = lazy(
  () => import('./pages/ArticleDetails/ArticleDetails')
);

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/articles' />} />
          {/* <Route index element={<Home />}/> */}
          <Route path='articles' element={<Articles />} />
          <Route path='articles/:articleId' element={<ArticleDetails />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;

import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/Layout/Layout';
import Articles from './pages/Articles/Articles';
const ArticleDetails = lazy(
  () => import('./pages/ArticleDetails/ArticleDetails')
);

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/articles' />} />
            <Route path='articles' element={<Articles />} />
            <Route path='articles/:articleId' element={<ArticleDetails />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};
export default App;

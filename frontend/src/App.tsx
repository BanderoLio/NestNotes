import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from '@/features/auth/components/AuthGuard.tsx';
import { LoginPage } from '@/pages/LoginPage.tsx';
import { RegisterPage } from '@/pages/RegisterPage.tsx';
import { NotesPage } from '@/pages/NotesPage.tsx';
import { Container } from '@chakra-ui/react';

export const App = () => {
  return (
    <BrowserRouter>
      <Container p={0} colorPalette={'blue'}>
        <Routes>
          <Route path={'/auth'}>
            <Route path={'login'} element={<LoginPage />} />
            <Route path={'register'} element={<RegisterPage />} />
          </Route>
          <Route path={'/notes'} element={<NotesPage />} />
          <Route
            path={'/'}
            element={
              <>
                <AuthGuard />
                <Navigate to={'/notes/'} />
              </>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

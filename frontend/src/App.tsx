import './App.css';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { AuthGuard } from '@/features/auth/components/AuthGuard.tsx';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/auth'}>
          <Route path={'login'} element={<LoginForm />} />
          <Route
            path={'register'}
            element={
              <>
                <AuthGuard />
                <Text>Test page</Text>
              </>
            }
          />
        </Route>
        <Route
          path={'/'}
          element={
            <>
              <AuthGuard />
              <Text>Мэйн страница</Text>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

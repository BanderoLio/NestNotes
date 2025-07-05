import { useAppSelector } from '@/app/hooks.ts';
import { selectAuthentication } from '@/features/auth/authSlice.ts';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard() {
  const location = useLocation();
  const authentication = useAppSelector(selectAuthentication);
  return authentication ? (
    <></>
  ) : (
    <Navigate
      to={'/auth/login/'}
      state={{
        from: location.pathname,
      }}
      replace
    />
  );
}

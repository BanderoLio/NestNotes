import { Navigate, useLocation } from 'react-router-dom';
import type { NavigationState } from '@/components/interfaces/navigation-state.interface.ts';
import type { RedirectionProps } from '@/components/interfaces/redirection-props.interface.ts';

export function Redirection({ toRedirect = true }: RedirectionProps) {
  const location = useLocation();
  const from: string = location.state
    ? (location.state as NavigationState).from
    : '/';
  return toRedirect ? <Navigate to={from} replace /> : <></>;
}

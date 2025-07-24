import { Container, Link, Stack, Text } from '@chakra-ui/react';
import { RegisterForm } from '@/features/auth/components/RegisterForm.tsx';
import { NavLink } from 'react-router';

export function RegisterPage() {
  return (
    <Container fluid centerContent>
      <Stack>
        <RegisterForm />
        <Text mx={'auto'}>
          Уже есть аккаунт?{' '}
          {
            <Link asChild>
              <NavLink to={'/auth/login/'}>Войти</NavLink>
            </Link>
          }
        </Text>
      </Stack>
    </Container>
  );
}

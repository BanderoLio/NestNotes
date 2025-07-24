import { Container, Link, Stack, Text } from '@chakra-ui/react';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { NavLink } from 'react-router';

export function LoginPage() {
  return (
    <Container fluid centerContent>
      <Stack>
        <LoginForm />
        <Text mx={'auto'}>
          Нет аккаунта?{' '}
          {
            <Link asChild>
              <NavLink to={'/auth/register/'}>Зарегистрироваться</NavLink>
            </Link>
          }
        </Text>
      </Stack>
    </Container>
  );
}

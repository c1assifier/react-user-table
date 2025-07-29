import Container from '@/components/Container/Container';
import { UserTable } from '@/components/UserTable';

export default function HomePage() {
  return (
    <Container>
      <h1>Список пользователей</h1>
      <UserTable />
    </Container>
  );
}

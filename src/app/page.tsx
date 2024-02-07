'use client';
import UnAuthWrapper from '../commonComponents/unauthWraper';
import LoginPage from '../components/login';

export default function HomeScreen() {
  return (
    <UnAuthWrapper>
      <LoginPage />
    </UnAuthWrapper>
  );
}

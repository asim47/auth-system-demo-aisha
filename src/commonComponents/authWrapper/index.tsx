import { CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';

const NON_AUTH_ROUTES = ['/', '/sign-up', '/forget-password'];

const AuthWrapper: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const dispatch = useEnhancedDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const [IsLoading, setIsLoading] = useState(true);

  const IsAuth = useEnhancedSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (localStorage.getItem('@Token')) {
      restoreFunction();
    } else {
      if (!NON_AUTH_ROUTES.includes(pathname)) {
        router.push('/');
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (IsAuth) {
      if (NON_AUTH_ROUTES.includes(pathname)) {
        router.push('/home');
      }
    }
  }, [IsAuth]);

  async function restoreFunction() {
    try {
      setIsLoading(true);

      const res = await dispatch(Actions.restoreSession());

      if (res) {
        if (NON_AUTH_ROUTES.includes(pathname)) {
          router.push('/home');
        }
      } else {
        if (NON_AUTH_ROUTES.includes(pathname)) {
          router.push('/');
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  if (IsLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full flex-col">
        <CircularProgress />
      </div>
    );
  return <>{props.children}</>;
};

export default AuthWrapper;

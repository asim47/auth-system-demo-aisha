import { CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Login from '../../components/login';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';

const AuthWrapper2: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const dispatch = useEnhancedDispatch();

  const router = useRouter();

  const [IsLoading, setIsLoading] = useState(true);

  const IsAuth = useEnhancedSelector((state) => state.user.isAuth);

  useEffect(() => {
    // if (!IsLoading) {
    //     if (IsAuth) {
    //         setIsLoading(false)
    //     } else {
    //         router.push('/');
    //     }
    // }
  }, [IsAuth, IsLoading]);

  useEffect(() => {
    if (localStorage.getItem('@Token')) {
      restoreFunction();
    } else {
      setIsLoading(false);
    }
  }, []);

  async function restoreFunction() {
    try {
      setIsLoading(true);

      await dispatch(Actions.restoreSession());

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

  if (!IsAuth) return <Login fromAuthWrapper />;

  return <>{props.children}</>;
};

export default AuthWrapper2;

import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import { logoutUser } from '../../store/reducers';

const HomePage = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const UserData = useEnhancedSelector((state) => state.user.userData);

  if (!UserData)
    return (
      <div className="flex justify-center items-center h-screen w-full flex-col">
        <CircularProgress />
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col">
      <h1 className="text-SUCCESS_COLOR">
        Welcome {UserData.FirstName} {UserData.LastName}
      </h1>

      <br />
      <br />
      <br />
      <Button
        onClick={async () => {
          await dispatch(logoutUser());
          router.push('/');
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UnAuthWrapper: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!!localStorage.getItem('@Token')) {
      router.push('/home');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (IsLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full flex-col">
        <CircularProgress />
      </div>
    );

  return <>{props.children}</>;
};

export default UnAuthWrapper;

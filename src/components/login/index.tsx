import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
const Login = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ErrorMsg, setErrorMsg] = useState('');
  const [IsLoading, setIsLoading] = useState(false);

  async function loginUserFunction() {
    try {
      setIsLoading(true);
      setErrorMsg('');

      if (!Email || !Password) throw 'Please fill everything';

      const res = await dispatch(Actions.loginAction(Email, Password));

      if (res) throw res;

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (typeof error === 'string') {
        setErrorMsg(error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col">
      <TextField
        label="Email"
        style={{ marginBottom: '20px', width: '500px' }}
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type={'password'}
        style={{ marginBottom: '20px', width: '500px' }}
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-ERROR_COLOR py-5">{ErrorMsg}</p>
      {IsLoading ? (
        <CircularProgress />
      ) : (
        <Button onClick={() => loginUserFunction()} style={{ marginBottom: '20px', width: '500px' }}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Login;

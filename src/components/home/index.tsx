import { Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import { logoutUser } from '../../store/reducers';
import * as Actions from '../../store/actions';
import { DialogWrapper } from '../../Helpers/dialogWrapper';

const HomePage = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  const [IsDialogOpen, setIsDialogOpen] = React.useState(false);
  const [FirstName, setFirstName] = React.useState('');
  const [LastName, setLastName] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [ErrorMsg, setErrorMsg] = React.useState('');
  const [IsLoading, setIsLoading] = React.useState(false);

  const UserData = useEnhancedSelector((state) => state.user.userData);
  const AdminUsers = useEnhancedSelector((state) => state.user.adminsUsers);

  useEffect(() => {
    dispatch(Actions.getAdminUsers());
  }, []);

  useEffect(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setIsLoading(false);
  }, [IsDialogOpen]);

  async function saveUser() {
    try {
      setIsLoading(true);
      setErrorMsg('');

      if (!FirstName || !LastName || !Email || !Password) throw 'Please fill everything';

      const res = await dispatch(Actions.saveUsersAction(FirstName, LastName, Email, Password));

      if (res) throw res;

      setIsLoading(false);
      setIsDialogOpen(false);
    } catch (error) {
      setIsLoading(false);
      if (typeof error === 'string') {
        setErrorMsg(error);
      }
    }
  }

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
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Add New User
      </Button>
      <div style={{ height: '600px', overflow: 'scroll' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AdminUsers.map((adminUser, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{adminUser.FirstName}</TableCell>
                  <TableCell>{adminUser.LastName}</TableCell>
                  <TableCell>{adminUser.Email}</TableCell>
                  <TableCell>
                    <Button
                      className="mr-10"
                      onClick={() => {
                        console.log('Edit');
                      }}
                    >
                      Edit
                    </Button>
                    {UserData._id !== adminUser._id && (
                      <Button
                        color="error"
                        onClick={() => {
                          dispatch(Actions.deleteUser(adminUser._id));
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

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
      <DialogWrapper
        isOpen={IsDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onSave={() => {
          saveUser();
        }}
        title="Add New User"
        errorMsg={ErrorMsg}
        isLoadingActions={IsLoading}
        content={
          <div
            style={{
              width: '600px',
            }}
            className="flex justify-between  flex-wrap"
          >
            <TextField
              style={{ width: '49%', marginBottom: '20px' }}
              label="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              style={{ width: '49%', marginBottom: '20px' }}
              label="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              style={{ width: '49%', marginBottom: '20px' }}
              label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ width: '49%', marginBottom: '20px' }}
              label="Password"
              type={'password'}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
};

export default HomePage;

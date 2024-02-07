import * as ReducerActions from '../reducers/';
import * as Actions from './';
import { AppThunkPromise } from '../store';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants';
import { LoginUserResponse } from '../../interfaces';

export const loginAction = (email: string, password: string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const res = await axios.post<LoginUserResponse>(`${API_ENDPOINT}/customer/login`, {
        Email: email,
        Password: password,
      });

      dispatch(
        ReducerActions.setUserDataAndToken({
          userData: res.data.Customer,
          token: res.data.Token,
        }),
      );
    } catch (error: any) {
      console.log(error.response.data.Msg);
      return (error?.response?.data?.Msg as string) || 'Something went wrong, please try again later';
    }
  };
};

export const restoreSession = (): AppThunkPromise<void | boolean> => {
  return async (dispatch) => {
    try {
      // throw "Testing error"
      const token = localStorage.getItem('@Token');

      const res = await axios.get<LoginUserResponse>(`${API_ENDPOINT}/customer/verifyToken`, {
        headers: {
          'x-auth-token': token,
        },
      });

      dispatch(
        ReducerActions.setUserDataAndToken({
          userData: res.data.Customer,
          token: res.data.Token,
        }),
      );

      return true;
    } catch (error: any) {
      dispatch(ReducerActions.logoutUser());
      console.log(error);
      return false;
    }
  };
};

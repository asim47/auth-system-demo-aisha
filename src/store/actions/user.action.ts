import * as ReducerActions from '../reducers/';
import * as Actions from './';
import { AppThunkPromise } from '../store';

export const loginAction = (body: Record<string, string>): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  };
};

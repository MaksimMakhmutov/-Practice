import { server } from '../bff';
import { ACTION_TYPE } from './acton-type';

export const logout = (session) => async (dispatch) => {
    await server.logout(session);
    dispatch({
        type: ACTION_TYPE.LOGOUT,
    });
};
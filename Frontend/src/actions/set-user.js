import { ACTION_TYPE } from './acton-type';

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});

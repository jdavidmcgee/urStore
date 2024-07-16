import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
	emerald: 'emerald',
	forest: 'forest',
};

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
};

const getThemeFromLocalStorage = () => {
	const theme = localStorage.getItem('theme') || themes.emerald;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
};

const initialState = {
	user: getUserFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: (state, action) => {
			const user ={...action.payload.user, token: action.payload.jwt}; // this is the user object from the server.  the ...action.payload.user ensures we get all the user properties associated with the user object
            state.user = user
            localStorage.setItem('user', JSON.stringify(user));
		},
		logoutUser: state => {
			state.user = null;
			//localStorage.clear(); // alternative
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
		},
		toggleTheme: state => {
			const { emerald, forest } = themes;
            state.theme = state.theme === emerald ? forest : emerald;
			document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
		},
	},
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;

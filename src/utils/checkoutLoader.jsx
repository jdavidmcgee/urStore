import { customFetch } from './index';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';



// REMEMBER that useSelector and useDispatch are hooks that are used to access the redux store...and can't be used outside of a functional component!  So we have to access the store directly in the loader function!

export const loader = store => () => {
	const user = store.getState().userState.user;
	if(!user){
		toast.warn('Please login to checkout');
		return redirect('/login');
	}
	return null;
};
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	About,
	Cart,
	Checkout,
	Error,
	HomeLayout,
	Landing,
	Login,
	Orders,
	Products,
	Register,
	SingleProduct,
} from './Pages';

import { ErrorElement } from './components';

// loaders: loaders are functions that are used to fetch data before rendering the page
import { loader as landingLoader } from './utils/landingLoader';
import { loader as singleProductLoader } from './utils/singleProductLoader';
import { loader as productsLoader } from './utils/productsLoader';
import { loader as checkoutLoader } from './utils/checkoutLoader';
import { loader as ordersLoader } from './utils/ordersLoader';

// actions
import { action as registerAction } from './utils/actionRegister';
import { action as loginAction } from './utils/actionLogin';
import { action as checkoutAction } from './utils/actionCheckoutForm';

import { store } from './store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
				errorElement: <ErrorElement />,
				loader: landingLoader(queryClient),
			},
			{
				path: 'cart',
				element: <Cart />,
			},
			{
				path: 'checkout',
				element: <Checkout />,
				loader: checkoutLoader(store),
				action: checkoutAction(store, queryClient),
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'orders',
				element: <Orders />,
				loader: ordersLoader(store, queryClient),
			},
			{
				path: 'products',
				element: <Products />,
				errorElement: <ErrorElement />,
				loader: productsLoader(queryClient),
			},
			{
				path: 'products/:id',
				element: <SingleProduct />,
				errorElement: <ErrorElement />,
				loader: singleProductLoader(queryClient),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <Error />,
		action: loginAction(store),
	},
	{
		path: '/register',
		element: <Register />,
		errorElement: <Error />,
		action: registerAction,
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;

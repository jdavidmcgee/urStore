import { ComplexPaginationContainer, OrdersList, SectionTitle } from '../components';
import { useLoaderData } from 'react-router-dom';

// WE HAVE A LOADER FUNCTION THAT CHECKS IF THE USER IS LOGGED IN BEFORE THEY CAN ACCESS THE ORDERS PAGE...AND THEN FIRES A GET REQUEST TO FETCH THE ORDERS

const Orders = () => {
	const { meta } = useLoaderData();

	if (meta.pagination.total < 1) {
		return <SectionTitle text="Please make an order" />;
	}
	return <>
    <SectionTitle text="Your Orders" />
    <OrdersList />
    <ComplexPaginationContainer />
  </>;
};

export default Orders;

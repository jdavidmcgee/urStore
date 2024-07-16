import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { loader } from '../utils/productsLoader';

const Products = () => {
	return (
		<>
			<Filters />
			<ProductsContainer />
			<PaginationContainer />
		</>
	);
};

export default Products;

import { FeaturedProducts, Hero } from "../components";
import {customFetch} from '../utils';
import { loader } from "../utils/landingLoader"

// set up the loader function (moved to utils/landingLoader.js to address fast refresh issue)
// const url = '/products?featured=true';

// export const loader = async () => {
// 	const response = await customFetch(url);
// 	const products = response.data.data
// 	return {products}; // if we don't return something we WILL get an error!
// }

const Landing = () => {
	return <>
		<Hero />
		<FeaturedProducts />
	</>;
};

export default Landing;

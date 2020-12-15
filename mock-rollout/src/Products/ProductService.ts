import axios from 'axios';
import { IProduct } from './ProductModel';

const url = 'https://mock-rollout-e0dc5-default-rtdb.firebaseio.com/products.json';

export class ProductService {
    public static async getProducts(): Promise<IProduct[]> {
        const response = await axios.get(url);
        return response.data;
    };
}

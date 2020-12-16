import axios from 'axios';
import { ENDPOINTS } from '../constants/api-endpoint';
import { IProduct } from '../model/ProductModel';

export class ApiContext {
    public static async getProducts(): Promise<IProduct[]> {
        const response = await axios.get<IProduct[]>(ENDPOINTS.GET_HARDWARE);
        return response.data;
    };
}
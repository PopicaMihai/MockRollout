import { ApiContext } from '../store/ApiContext';

export class ProductsService {
    static getProducts() {
        try {
            return ApiContext.getProducts();
        }
        catch {
            throw new Error('Server Error');
        }
    };
}
import React, { useContext } from 'react';
import { ProductsContext} from '../../store/ProductContext';
import { ProductItem } from '../ProductItem/ProductItem';

export const ProductsList =  () => {
    const allProducts = useContext(ProductsContext).state.products;
    const errorMessage = useContext(ProductsContext).state.error;

    if (errorMessage) {
        return (
            <div>
                <h1>Error: {errorMessage}</h1>
            </div>
        )
    } else {
        return (
            <div>
                {allProducts!.map((product, index) => (
                    <ProductItem currentProduct={product} index={index}/>
                ))}
            </div>
        )
    }
}



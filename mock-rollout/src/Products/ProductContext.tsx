import React, { createContext, FC, useEffect, useState } from 'react';
import { IProduct } from './ProductModel';
import { ProductService } from './ProductService';

interface Props  {
    children: React.ReactNode;
}

export const ProductsContext = createContext<any>(null);

export const ProductContextProvider: FC<Props> = props => {
    const [product, setProducts] = useState<IProduct[] | null>([]);

    useEffect(() => {
        ProductService.getProducts()
            .then(response => {
                setProducts(response);
            });
    }, []);
    
    return (
        <ProductsContext.Provider value={product}>
            {props.children}
        </ProductsContext.Provider>
    )
}
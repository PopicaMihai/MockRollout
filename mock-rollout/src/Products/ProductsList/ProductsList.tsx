import React, { Fragment } from 'react';
import { ProductContextProvider} from '../ProductContext';
import { ProductItem } from '../ProductItem/ProductItem';

export const ProductsList =  () => {
    return (
        <Fragment>
            <ProductContextProvider>
                <ProductItem />
            </ProductContextProvider>
        </Fragment>
    )
}



import React, { FC } from 'react'
import { IProduct } from '../../model/ProductModel';

interface IProductProps {
    currentProduct: IProduct;
    index: number;
}

export const ProductItem: FC<IProductProps> = ({currentProduct, index}) => {
    return (
        <div key={index}>
            <p>{currentProduct.InventoryNumber}</p>
            <p>{currentProduct.Location}</p>
            <p>{currentProduct.Floor}</p>
        </div>
    )
}

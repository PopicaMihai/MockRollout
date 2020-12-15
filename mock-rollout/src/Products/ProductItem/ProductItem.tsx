import { useContext } from 'react'
import { ProductsContext } from '../ProductContext'
import { IProduct } from '../ProductModel'

export const ProductItem = () => {
    const products: IProduct[] = useContext(ProductsContext);
    return (
        <div>
            {products?.map((product, index) => (
                <div key={index}>
                    <p>{product.InventoryNumber}</p>
                    <p>{product.Location}</p>
                    <p>{product.Floor}</p>
                </div>
            ))}
        </div>
    )
}

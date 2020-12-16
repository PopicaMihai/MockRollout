import React, { createContext, FC, useEffect, useState, useReducer } from 'react';
import { IProduct } from '../model/ProductModel';
import { ProductsService } from '../services/ProductService';

interface IContext {
    products?: IProduct[] | null;
    error?: string
}

interface IProductProps  {
    children: React.ReactNode;
}

type IAction = 
    | { type: 'GET_SUCCESS', products: IProduct[] | null, error: string }
    | { type: 'GET_FAILED', products: IProduct[] | null, error: string };


const initialProductsState: IContext = {
    products: [],
    error: ''
}

export const ProductsContext = createContext<{
        state: IContext, 
        dispatch: React.Dispatch<any>;}>
    ({
        state: initialProductsState, 
        dispatch: () => null
    });

const reducer = (state: IContext, action: IAction): IContext => {
    switch (action.type) {
        case 'GET_SUCCESS': 
            return { products: action.products, error: '' }
        case 'GET_FAILED': 
            return { products: [], error: action.error }
        default: 
            return state
    }
}

export const ProductContextProvider: FC<IProductProps> = props => {
    const [ getProductsState, setProductsState ] = useState<IContext>({ products: [] });
    const [ errorMessage, setErrorMessage ] = useState<IContext>({ error: '' });
    const [ state, dispatch ] = useReducer(reducer, initialProductsState);

    const store = { state, dispatch };
    
    useEffect(() => {
        ProductsService.getProducts()
            .then(response => {
                setProductsState({ products: response });
                dispatch({
                    type: 'GET_SUCCESS', 
                    products: getProductsState.products!,
                    error: ''
                });
            })
            .catch(error => {
                setErrorMessage({ error: error.message })
                dispatch({
                    type: 'GET_FAILED',
                    products: [],
                    error: errorMessage.error!
                });
            })
    }, [getProductsState, errorMessage]);

    return (
        <ProductsContext.Provider value={store}>
            {props.children}
        </ProductsContext.Provider>
    )
}
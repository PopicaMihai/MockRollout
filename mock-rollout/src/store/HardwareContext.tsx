import React, { createContext, FC, useEffect, useReducer, useContext } from 'react';
import { APIContext } from './ApiContext';
import { IHardware } from '../models/HardwareModel';
import { 
    IHardwareContextState,
    IHardwareContext,
    IHardwareProviderState,
    IAction
} from './Types';

const initialHardwareState: IHardwareContextState = {
    hardwares: [],
    error: '',
    isLoading: true
};

const initialContextState: IHardwareContext = {
    hardwareState: initialHardwareState,
    dispatchHardwareState: undefined,
    updateHardware: undefined,
    deleteHardware: undefined
};

export const HardwareContext = createContext<IHardwareContext>(initialContextState);

const reducer = (state: IHardwareContextState, action: IAction): IHardwareContextState => {
    switch (action.type) {
        case 'GET_SUCCESS': 
            return { hardwares: action.hardwares, error: '', isLoading: false };
        case 'GET_FAILED':
            return { hardwares: [], error: action.error, isLoading: false };
        case 'EDIT_SUCCESS':
            return { error: '', isLoading: false };
        case 'EDIT_FAILED':
            return { error: action.error, isLoading: false };
        case 'DELETE_SUCCESS':
            return { error: '', isLoading: false }
        case 'DELETE_FAILED':
            return { error: action.error, isLoading: false }
         default: 
            return state
    };
};

export const HardwareContextProvider: FC<IHardwareProviderState> = (props: IHardwareProviderState) => {
    const [ hardwareState, dispatchHardwareState ] = useReducer(reducer, initialHardwareState);

    const apiContext = useContext(APIContext);

    const getHardware = async () => {
        hardwareState.isLoading = true;
        try {
            const response = await apiContext.callApi!('GET', '/products.json')
            dispatchHardwareState({
                type: 'GET_SUCCESS',
                hardwares: response || [],
                error: '',
                isLoading: false
            });
        } catch (err) {
            dispatchHardwareState({
                type: 'GET_FAILED',
                hardwares: [],
                error: err.message,
                isLoading: false
            });
        }
    };

    const updateHardware = async (hardware: IHardware) => {
        let hardwareId = hardwareState?.hardwares?.findIndex((item) => item?.SerialNumber === hardware.SerialNumber);
        hardwareState.isLoading = true;
        try {
            await apiContext.callApi!('PUT', `/products/${hardwareId}.json`, hardware);
            dispatchHardwareState({
                type: 'EDIT_SUCCESS',
                error: '',
                isLoading: false
            });
            await getHardware();
            
        } catch (err) {
            dispatchHardwareState({
                type: 'EDIT_FAILED',
                error: err.message,
                isLoading: false
            });
        }
    };

    const deleteHardware = async (serialNumber: string) => {
        const hardwareId = hardwareState?.hardwares?.findIndex((item: IHardware, index: number) => item?.SerialNumber === serialNumber);
        hardwareState.isLoading = true;
        try {
            await apiContext.callApi!('DELETE', `/products/${hardwareId}.json`);
            dispatchHardwareState({
                type: 'DELETE_SUCCESS',
                error: '',
                isLoading: false
            });
            await getHardware()

        } catch(err) {
            dispatchHardwareState({
                type: 'DELETE_FAILED',
                error: err.message,
                isLoading: false
            });
        }
    };

    useEffect(() => {
        getHardware();
    }, []);

    const store: IHardwareContext = { 
        hardwareState,
        dispatchHardwareState,
        updateHardware,
        deleteHardware
     };

    return (
        <HardwareContext.Provider value={store}>
            {props.children}
        </HardwareContext.Provider>
    )
}
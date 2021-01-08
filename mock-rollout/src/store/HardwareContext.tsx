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
            return { hardwares: action.hardwares, error: '' };
        case 'GET_FAILED':
            return { hardwares: [], error: action.error };
        case 'EDIT':
            return { hardwares: action.hardwares };
        case 'DELETE':
            return { hardwares: action.hardwares }
         default: 
            return state
    };
};

export const HardwareContextProvider: FC<IHardwareProviderState> = (props: IHardwareProviderState) => {
    const [ hardwareState, dispatchHardwareState ] = useReducer(reducer, initialHardwareState);

    const apiContext = useContext(APIContext);

    const getHardware = async () => {
        try {
            const response = await apiContext.callApi!('GET', '/products.json')
            dispatchHardwareState({
                type: 'GET_SUCCESS',
                hardwares: response || [],
                error: ''
            });
        } catch (err) {
            dispatchHardwareState({
                type: 'GET_FAILED',
                hardwares: [],
                error: err.message
            });
        }
    };

    const updateHardware = async (hardware: IHardware) => {
        const hardwareId = hardwareState?.hardwares?.findIndex((item) => item?.SerialNumber === hardware.SerialNumber)
        try {
            await apiContext.callApi!('PUT', `/products/${hardwareId}.json`, hardware);
            await getHardware();
        } catch (err) {
            console.log(err)
        }
        
    };

    const deleteHardware = async (serialNumber: string) => {
        const hardwareId = hardwareState?.hardwares?.findIndex((item: IHardware, index: number) => item?.SerialNumber === serialNumber);
        try {
            await apiContext.callApi!('DELETE', `/products/${hardwareId}.json`);
            await getHardware()
        } catch(err) {
            console.log(err);
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
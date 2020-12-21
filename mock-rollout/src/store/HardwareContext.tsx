import React, { createContext, FC, useEffect, useState, useReducer } from 'react';
import { IHardware } from '../model/HardwareModel';
import { HardwareService } from '../services/HardwareService';

interface IHardwareContextState {
    hardwares?: IHardware[];
    error?: string;
}

interface IHardwareContext {
    hardwareState: IHardwareContextState,
    dispatchHardwareState?: (action: IAction) => void,
    updateHardware?: (id: number, hardware: IHardware) => void
}

interface IHardwareProviderState {
    children: React.ReactNode;
}

type IAction = 
    | { type: 'GET_SUCCESS', hardwares: IHardware[], error: string }
    | { type: 'GET_FAILED', hardwares: IHardware[], error: string }
    | { type: 'EDIT', hardwares: IHardware[] }


const initialHardwareState: IHardwareContextState = {
    hardwares: [],
    error: ''
}

const initialContextState: IHardwareContext = {
    hardwareState: initialHardwareState,
    dispatchHardwareState: undefined,
    updateHardware: undefined
}

export const HardwareContext = createContext<IHardwareContext>(initialContextState);

const reducer = (state: IHardwareContextState, action: IAction): IHardwareContextState => {
    switch (action.type) {
        case 'GET_SUCCESS': 
            return { hardwares: action.hardwares, error: '' };
        case 'GET_FAILED': 
            return { hardwares: [], error: action.error };
        case 'EDIT':
            return { hardwares: action.hardwares };
         default: 
            return state
    }
}

const deleteHardware = (hardwares: IHardware[], id: number): IHardware[] => {
    if (hardwares[id]) {
        var index = hardwares.indexOf(hardwares[id])
        hardwares.splice(index, 1);
    }
    return hardwares;
}

export const HardwareContextProvider: FC<IHardwareProviderState> = (props: IHardwareProviderState) => {
    const [ hardwareState, dispatchHardwareState ] = useReducer(reducer, initialHardwareState);

    const getHardware = async () => {
        await HardwareService.getHardware()
            .then(response => {
                dispatchHardwareState({
                    type: 'GET_SUCCESS', 
                    hardwares: response || [],
                    error: ''
                });
            })
            .catch(error => {
                dispatchHardwareState({
                    type: 'GET_FAILED',
                    hardwares: [],
                    error: error.message
                });
            })
    }

    const updateHardware = (id: number, hardware: IHardware) => {
        HardwareService.editHardware(id, hardware)
            .then(response => {
                dispatchHardwareState({
                    type: 'EDIT', 
                    hardwares: [...deleteHardware(hardwareState.hardwares || [], id), hardware]
                })
            })
            .catch(error => {
                console.log(error);
        })
    }

    useEffect(() => {
        getHardware();
    }, [ hardwareState ]);

    const store: IHardwareContext = { 
        hardwareState,
        dispatchHardwareState,
        updateHardware
     }
    
    return (
        <HardwareContext.Provider value={store}>
            {props.children}
        </HardwareContext.Provider>
    )
}
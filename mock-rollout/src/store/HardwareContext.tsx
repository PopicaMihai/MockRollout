import React, { createContext, FC, useEffect, useState, useReducer } from 'react';
import { IHardware } from '../model/HardwareModel';
import { HardwareService } from '../services/HardwareService';

interface IHardwareContextState {
    hardwares?: IHardware[];
    error?: string;
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
    error: undefined,
    updateHardware: undefined
}

export const HardwareContext = createContext<IHardwareContextState>(initialHardwareState);

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
    const [ getHardwareState, setHardwareState ] = useState<IHardware[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ state, dispatch ] = useReducer(reducer, initialHardwareState);

    async function handleGetData() {
        await HardwareService.getHardware()
            .then(response => {
                setHardwareState(response);
                dispatch({
                    type: 'GET_SUCCESS', 
                    hardwares: getHardwareState || [],
                    error: ''
                });
            })
            .catch(error => {
                setErrorMessage(error.message)
                dispatch({
                    type: 'GET_FAILED',
                    hardwares: [],
                    error: errorMessage
                });
            })
    }

    const updateHardware = (id: number, hardware: IHardware) => {
        HardwareService.editHardware(id, hardware)
            .then(response => {
                setHardwareState(
                    [...deleteHardware(getHardwareState, id), hardware]
                );
                dispatch({
                    type: 'EDIT', 
                    hardwares: getHardwareState
                })
            })
            .catch(error => {
                console.log(error);
        })
    }

    useEffect(() => {
        handleGetData();
    }, [getHardwareState, errorMessage]);

    const store: IHardwareContextState = {
        hardwares: getHardwareState, error: errorMessage, updateHardware
    }

    return (
        <HardwareContext.Provider value={store}>
            {props.children}
        </HardwareContext.Provider>
    )
}
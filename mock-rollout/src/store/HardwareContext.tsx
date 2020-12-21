import React, { createContext, FC, useEffect, useState, useReducer } from 'react';
import { IHardware } from '../model/HardwareModel';
import { HardwareService } from '../services/HardwareService';

interface IState {
    hardwares?: IHardware[] | null | undefined;
    error?: string;
    updateHardware?: (id: number, hardware: IHardware) => void
}

interface IHardwareProps  {
    children: React.ReactNode;
}

type IAction = 
    | { type: 'GET_SUCCESS', hardwares: IHardware[] | null, error: string }
    | { type: 'GET_FAILED', hardwares: IHardware[] | null, error: string }
    | { type: 'EDIT', hardwares: IHardware[] }


const initialHardwareState: IState = {
    hardwares: [],
    error: '',
    updateHardware: (id: number, hardware: IHardware) => {}
}

export const HardwareContext = createContext<{
        state: IState, 
        dispatch: React.Dispatch<any>;}>
    ({
        state: initialHardwareState, 
        dispatch: () => null
    });

const reducer = (state: IState, action: IAction): IState => {
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

export const HardwareContextProvider: FC<IHardwareProps> = props => {
    const [ getHardwareState, setHardwareState ] = useState<IState>({ hardwares: [] });
    const [ errorMessage, setErrorMessage ] = useState<IState>({ error: '' });
    const [ state, dispatch ] = useReducer(reducer, initialHardwareState);
    
    const store = { state, dispatch };

    async function handleGetData() {
        await HardwareService.getHardware()
            .then(response => {
                setHardwareState({ hardwares: response });
                dispatch({
                    type: 'GET_SUCCESS', 
                    hardwares: getHardwareState.hardwares!,
                    error: ''
                });
            })
            .catch(error => {
                setErrorMessage({ error: error.message })
                dispatch({
                    type: 'GET_FAILED',
                    hardwares: [],
                    error: errorMessage.error!
                });
            })
    }

    const handleEditHardware = (id: number, hardware: IHardware) => {
        HardwareService.editHardware(id, hardware)
            .then(response => {
                setHardwareState({
                    hardwares: [...deleteHardware(getHardwareState.hardwares!, id), hardware]
                });
                dispatch({
                    type: 'EDIT', 
                    hardwares: getHardwareState.hardwares!
                })
            })
            .catch(error => {
                console.log(error);
        })
    }

    state.updateHardware = handleEditHardware;

    useEffect(() => {
        handleGetData();
    }, [getHardwareState, errorMessage]);

    return (
        <HardwareContext.Provider value={store}>
            {props.children}
        </HardwareContext.Provider>
    )
}
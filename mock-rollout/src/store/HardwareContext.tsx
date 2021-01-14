import React, { createContext, FC, useEffect, useReducer, useContext } from 'react';

import { IHardware } from '../models/HardwareModel';
import { APIContext } from './ApiContext';
import { ProjectContext } from './ProjectContext';
import { 
    IHardwareAction,
    IHardwareContextState,
    IHardwareContext,
    IHardwareProviderState
} from './Types';

const initialHardwareState: IHardwareContextState = {
    hardwares: [],
    error: '',
    isLoading: true
}

const initialContextState: IHardwareContext = {
    hardwareState: initialHardwareState,
    dispatchHardwareState: (action: IHardwareAction) => {},
    getHardwaresByProjectName: (name: string) => {},
};

export const HardwareContext = createContext<IHardwareContext>(initialContextState);

const reducer = (state: IHardwareContextState, action: IHardwareAction): IHardwareContextState => {
    switch (action.type) {
        case 'GET_HARDWARE_SUCCESS': 
            return { hardwares: action.hardwares, error: '', isLoading: false };
        case 'GET_HARDWARE_FAILED':
            return { hardwares: [], error: action.error, isLoading: false };
        case 'EDIT_HARDWARE_SUCCESS':
            return { error: '', isLoading: false };
        case 'EDIT_HARDWARE_FAILED':
            return { error: action.error, isLoading: false };
        case 'DELETE_HARDWARE_SUCCESS':
            return { error: '', isLoading: false }
        case 'DELETE_HARDWARE_FAILED':
            return { error: action.error, isLoading: false }
         default: 
            return state
    };
};

export const HardwareContextProvider: FC<IHardwareProviderState> = (props: IHardwareProviderState) => {
    const [ hardwareState, dispatchHardwareState ] = useReducer(reducer, initialHardwareState);

    const apiContext = useContext(APIContext);
    const projectContext = useContext(ProjectContext);

    const getHardwaresByProjectName = async (name: string) => {
        let projectId = projectContext.projectState.projects.findIndex(project => project.name === name);
        hardwareState.isLoading = true;
        try {
            const response = await apiContext.callApi!('GET', `/projects/${projectId}/hardwares.json`);
            dispatchHardwareState({
                type: 'GET_HARDWARE_SUCCESS',
                hardwares: response || [],
                error: '',
                isLoading: false
            });
        } catch (err) {
            dispatchHardwareState({
                type: 'GET_HARDWARE_FAILED',
                hardwares: [],
                error: err.message,
                isLoading: false
            });
        }
    };

    const updateHardwareByProjectName = async (hardware: IHardware, projectName: string) => {
        let hardwareId = hardwareState.hardwares?.findIndex((item) => item?.SerialNumber === hardware.SerialNumber);
        let projectId = projectContext.projectState.projects.findIndex(project => project.name === projectName);
        hardwareState.isLoading = true;
        try {
            await apiContext.callApi!('PUT', `/projects/${projectId}/hardwares/${hardwareId}.json`, hardware);
            dispatchHardwareState({
                type: 'EDIT_HARDWARE_SUCCESS',
                error: '',
                isLoading: false
            });
            await getHardwaresByProjectName(projectName)
            
        } catch (err) {
            dispatchHardwareState({
                type: 'EDIT_HARDWARE_FAILED',
                error: err.message,
                isLoading: false
            });
        }
        
    };

    const deleteHardwareByProjectName = async (serialNumber: string, projectName: string) => {
        const hardwareId = hardwareState.hardwares?.findIndex((item: IHardware, index: number) => item?.SerialNumber === serialNumber);
        let projectId = projectContext.projectState.projects.findIndex(project => project.name === projectName);
        hardwareState.isLoading = true;
        try {
            await apiContext.callApi!('DELETE', `/projects/${projectId}/hardwares/${hardwareId}.json`);
            dispatchHardwareState({
                type: 'DELETE_HARDWARE_SUCCESS',
                error: '',
                isLoading: false
            });
            await getHardwaresByProjectName(projectName)

        } catch(err) {
            dispatchHardwareState({
                type: 'DELETE_HARDWARE_FAILED',
                error: err.message,
                isLoading: false
            });
        }
    };

    useEffect(() => {
        getHardwaresByProjectName('Mockup');
    }, []);

    const store: IHardwareContext = {
        hardwareState,
        dispatchHardwareState,
        getHardwaresByProjectName,
        updateHardwareByProjectName,
        deleteHardwareByProjectName
    };

    return (
        <HardwareContext.Provider value={store}>
            {props.children}
        </HardwareContext.Provider>
    )
}

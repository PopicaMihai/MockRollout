import { IHardware } from '../models/HardwareModel';

export interface IHardwareContextState {
    hardwares?: IHardware[];
    error?: string;
    isLoading?: boolean;
}

export interface IHardwareContext {
    hardwareState: IHardwareContextState,
    dispatchHardwareState?: (action: IAction) => void,
    updateHardware?: (hardware: IHardware) => void,
    deleteHardware?: (serialNumber: string) => void
}

export interface IHardwareProviderState {
    children: React.ReactNode;
}

export type IAction = 
    | { type: 'GET_SUCCESS', hardwares: IHardware[], error: string, isLoading: boolean }
    | { type: 'GET_FAILED', hardwares: IHardware[], error: string, isLoading: boolean }
    | { type: 'EDIT_SUCCESS', error: string, isLoading: boolean }
    | { type: 'EDIT_FAILED', error: string, isLoading: boolean }
    | { type: 'DELETE_SUCCESS', error: string, isLoading: boolean }
    | { type: 'DELETE_FAILED', error: string, isLoading: boolean };

export type methodType = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;

export interface APIContextConfig {
    callApi?: (method: methodType, url: any, data?: any) => Promise<any>,
}

export interface IApiProviderState  {
    children: React.ReactNode;
}
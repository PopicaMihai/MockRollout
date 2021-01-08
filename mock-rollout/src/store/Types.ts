import { IHardware } from '../models/HardwareModel';

export interface IHardwareContextState {
    hardwares?: IHardware[];
    error?: string;
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
    | { type: 'GET_SUCCESS', hardwares: IHardware[], error: string }
    | { type: 'GET_FAILED', hardwares: IHardware[], error: string }
    | { type: 'EDIT', hardwares: IHardware[] }
    | { type: 'DELETE', hardwares: IHardware[] };

export type methodType = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;

export interface APIContextConfig {
    callApi?: (method: methodType, url: any, data?: any) => Promise<any>
}

export interface IApiProviderState  {
    children: React.ReactNode;
}
import { IHardware } from '../models/HardwareModel';
import { IProject } from '../models/ProjectModel';

export interface IProjectContextState {
    projects: IProject[];
    error?: string;
    isLoading: boolean;
}

export interface IHardwareContextState {
    hardwares?: IHardware[];
    error?: string;
    isLoading: boolean;
}

export interface IProjectContext {
    projectState: IProjectContextState,
    dispatchProjectState?: (action: IProjectAction) => void,
}

export interface IHardwareContext {
    hardwareState: IHardwareContextState,
    dispatchHardwareState?: (action: IHardwareAction) => void,
    getHardwaresByProjectName?: (name: string) => void,
    updateHardwareByProjectName?: (hardware: IHardware, name: string) => void,
    deleteHardwareByProjectName?: (serialNumber: string, name: string) => void
}

export interface IProjectProviderState {
    children: React.ReactNode;
}

export interface IHardwareProviderState {
    children: React.ReactNode;
}

export type IProjectAction = 
    | { type: 'GET_PROJECTS_SUCCESS', projects: IProject[], error: string, isLoading: boolean }
    | { type: 'GET_PROJECTS_FAILED', projects: IProject[], error: string, isLoading: boolean };


export type IHardwareAction = 
    | { type: 'GET_HARDWARE_SUCCESS', hardwares: IHardware[], error: string, isLoading: boolean }
    | { type: 'GET_HARDWARE_FAILED', hardwares: IHardware[], error: string, isLoading: boolean }
    | { type: 'EDIT_HARDWARE_SUCCESS', error: string, isLoading: boolean }
    | { type: 'EDIT_HARDWARE_FAILED', error: string, isLoading: boolean }
    | { type: 'DELETE_HARDWARE_SUCCESS', error: string, isLoading: boolean }
    | { type: 'DELETE_HARDWARE_FAILED', error: string, isLoading: boolean };

export type methodType = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;

export interface APIContextConfig {
    callApi?: (method: methodType, url: any, data?: any) => Promise<any>
}

export interface IApiProviderState  {
    children: React.ReactNode;
}
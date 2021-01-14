import React, { createContext, FC } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ENDPOINTS } from '../constants/api-endpoint';
import { 
    APIContextConfig,
    IApiProviderState,
    methodType
} from './Types';

const initialContextApiState: APIContextConfig = {
    callApi: undefined
};

export const APIContext = createContext<APIContextConfig>(initialContextApiState);

export const APIContextProvider: FC<IApiProviderState> = (props: IApiProviderState) => {

    const config: AxiosRequestConfig = {
        baseURL: ENDPOINTS.BASE,
        headers: {'Content-Type': 'application/json'},
        timeout: 3000,
    };

    const axiosInstance: AxiosInstance = axios.create(config)

    const callApi = async (method: methodType, url: string, data: any): Promise<any> => {
        return axiosInstance.request({
            url: config.baseURL + url,
            method: method,
            data: data
        }).then(res => res.data);
    };

    const store: APIContextConfig = {
        callApi
    };

    return (
        <APIContext.Provider value={store}>
            {props.children}
        </APIContext.Provider>
    )
}
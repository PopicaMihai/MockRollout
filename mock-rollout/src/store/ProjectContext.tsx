import React, { createContext, FC, useEffect, useReducer, useContext } from 'react';
import { APIContext } from './ApiContext';
import { 
    IProjectContext,
    IProjectProviderState,
    IProjectAction,
    IProjectContextState
} from './Types';

const initialProjectState: IProjectContextState = {
    projects: [],
    error: '',
    isLoading: true
}

const initialContextState: IProjectContext = {
    projectState: initialProjectState,
    dispatchProjectState: undefined,
};

export const ProjectContext = createContext<IProjectContext>(initialContextState);

const reducer = (state: IProjectContextState, action: IProjectAction): IProjectContextState => {
    switch (action.type) {
        case 'GET_PROJECTS_SUCCESS': 
            return { projects: action.projects, error: '', isLoading: false };
        case 'GET_PROJECTS_FAILED':
            return { projects: [], error: action.error, isLoading: false };
         default: 
            return state
    };
};

export const ProjectContextProvider: FC<IProjectProviderState> = (props: IProjectProviderState) => {
    const [ projectState, dispatchProjectState ] = useReducer(reducer, initialProjectState);

    const apiContext = useContext(APIContext);

    const getAllProjects = async () => {
        projectState.isLoading = true;
        try {
            const response = await apiContext.callApi!('GET', '/projects.json')
            dispatchProjectState({
                type: 'GET_PROJECTS_SUCCESS',
                projects: response || [],
                error: '',
                isLoading: false
            });
        } catch (err) {
            dispatchProjectState({
                type: 'GET_PROJECTS_FAILED',
                projects: [],
                error: err.message,
                isLoading: false
            });
        }
    };

    useEffect(() => {
        getAllProjects();
    }, []);

    const store: IProjectContext = { 
        projectState,
        dispatchProjectState,
     };

    return (
        <ProjectContext.Provider value={store}>
            {props.children}
        </ProjectContext.Provider>
    )
}
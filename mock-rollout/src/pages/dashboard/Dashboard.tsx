import React, { useContext } from 'react';
import { ProjectContext } from '../../store/ProjectContext';
import { ProjectItem } from '../../components/Project/ProjectItem/ProjectItem'; 
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import '../dashboard/Dashboard.scss';

export const Dashboard = () => {
    let dashboardContent = null;

    const { projectState } = useContext(ProjectContext);

    if (projectState.isLoading) {
        dashboardContent = <Spinner />
    } else {
        dashboardContent = projectState?.projects && <ProjectItem projectList={projectState.projects} />
    }

    return (
        <div className='dasboard__container'>
            {!projectState.error &&
                dashboardContent
            }
            {projectState.error &&
                <ErrorMessage text={projectState.error} />
            }
        </div>
    )
}
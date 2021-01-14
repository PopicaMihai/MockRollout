import React, { ChangeEvent, FC, Fragment, useContext, useState } from 'react';

import { ProjectContext } from '../../store/ProjectContext';
import { HardwareContextProvider } from '../../store/HardwareContext';
import { HardwareList } from '../../components/Hardware/HardwareList/HardwareList';
import { InputText } from '../../components/UI/InputText/InputText';
import { LogoName } from '../../components/UI/LogoName/LogoName';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import { InputTypes } from '../../Enums/InputTypes';
import { IProject } from '../../models/ProjectModel';
import './ProjectPage.scss';

export const ProjectPage = () => {
    let projectListElement = null;

    const { projectState } = useContext(ProjectContext);
    const [currentProject, setCurrentProject] = useState<IProject>(projectState.projects[0]);

    const findProjectByName = (name: string) => {
        let projectId = projectState.projects.findIndex((item) => item.name === name);
        setCurrentProject(projectState.projects[projectId]);
    }

    const handleInputChanges = (event: ChangeEvent) => {
        let element = event.target as HTMLInputElement;
        findProjectByName(element.value);
    };

    const projectsNames = projectState.projects.map((project: IProject, index: number) => project.name);

    if (!projectState.projects.length) {
        return <Fragment/>;
    }

    if (projectState.isLoading) {
        projectListElement = <Spinner />
    } else {
        projectListElement = projectState.projects && 
            <Fragment>
                <div className='project'>
                    <section className={'project__logo'}>
                        <LogoName name={currentProject?.name}/>
                    </section>

                    <section className={'project__title'}>
                        <div className={'project__title-name'}>
                            <h3>Project Name:</h3>
                            <InputText name={'Project'} type={InputTypes.Dropdown} data={projectsNames} editMode={true} currentValue={currentProject?.name} changeHandler={handleInputChanges} />
                        </div>
                        <div className={'project__title-owner'}>
                            <h3>Owner Name:</h3>
                            <p>{currentProject?.projectOwner}</p>
                        </div>
                    </section>

                    <section className={'project__description'}>
                        <h3>Description:</h3>
                        <p>{currentProject?.description}</p>
                    </section>
                </div>
                <div>
                    <HardwareContextProvider>
                        <HardwareList projectName={currentProject?.name}/>
                    </HardwareContextProvider>
                </div>
            </Fragment>
    }

    return (
        <div className='project__container'>
            {!projectState.error &&
                projectListElement
            }
            {projectState.error &&
                <ErrorMessage text={projectState.error} />
            }
        </div>
    )
};

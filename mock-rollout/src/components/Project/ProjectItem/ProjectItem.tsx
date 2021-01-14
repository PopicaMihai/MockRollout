import React, { ChangeEvent, FC, Fragment, useState } from 'react';
import { HardwareContextProvider } from '../../../store/HardwareContext';
import { HardwareList } from '../../Hardware/HardwareList/HardwareList';
import { InputText } from '../../UI/InputText/InputText';
import { LogoName } from '../../UI/LogoName/LogoName';
import { InputTypes } from '../../../Enums/InputTypes';
import { IProject } from '../../../models/ProjectModel'; 
import { IProjectListProps } from './Types';
import './ProjectItem.scss';


export const ProjectItem: FC<IProjectListProps> = (props: IProjectListProps) => {
    const [currentProject, setCurrentProject] = useState<IProject>(props.projectList[0]);

    const projectsNames = props.projectList.map((project: IProject, index: number) => project.name);

    const findProjectId = (name: string) => {
        let projectId = props.projectList.findIndex((item) => item.name === name);
        setCurrentProject(props.projectList[projectId]);
    }

    const handleInputChanges = (event: ChangeEvent) => {
        let element = event.target as HTMLInputElement;
        findProjectId(element.value);
    };

    return (
        <Fragment>
            <div className={'project'}>
                <section className={'project__logo'}>
                    <LogoName name={currentProject.name}/>
                </section>

                <section className={'project__title'}>
                    <div className={'project__title-name'}>
                        <h3>Project Name:</h3>
                        <InputText name={'Project'} type={InputTypes.Dropdown} data={projectsNames} editMode={true} currentValue={currentProject.name} changeHandler={handleInputChanges} />
                    </div>
                    <div className={'project__title-owner'}>
                        <h3>Owner Name:</h3>
                        <p>{currentProject.projectOwner}</p>
                    </div>
                </section>

                <section className={'project__description'}>
                    <h3>Description:</h3>
                    <p>{currentProject.description}</p>
                </section>
            </div>
            <div>
                <HardwareContextProvider>
                    <HardwareList projectName={currentProject.name}/>
                </HardwareContextProvider>
            </div>
        </Fragment>
    )
};

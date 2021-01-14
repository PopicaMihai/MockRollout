import React, { FC, Fragment, useContext, useEffect } from 'react';

import { HardwareContext } from '../../../store/HardwareContext';
import { HardwareItem } from '../HardwareItem/HardwareItem';
import { Spinner } from '../../UI/Spinner/Spinner';
import { ErrorMessage } from '../../UI/ErrorMessage/ErrorMessage';
import { IHardware } from '../../../models/HardwareModel';
import { IHardwareListProps } from './Types';
import './HardwareList.scss';

export const HardwareList: FC<IHardwareListProps> = (props: IHardwareListProps) => {
    let hardwareListContent = null;
    const { hardwareState, getHardwaresByProjectName, deleteHardwareByProjectName } = useContext(HardwareContext);

    useEffect(() => {
        getHardwaresByProjectName(props.projectName);
    }, [ props.projectName ]);

    const deleteHardwareFromList = (serialNumber: string) => {
        deleteHardwareByProjectName!(serialNumber, props.projectName);
    };

    if (!hardwareState.hardwares?.length) {
        return <Fragment/>;
    }

    if (hardwareState.isLoading) {
        hardwareListContent = <Spinner />;
    } else {
        hardwareListContent = hardwareState.hardwares!.map((item: IHardware, index: number) => {
            if (!item) {
                return <Fragment key={index}/>;
            }
            return <HardwareItem hardware={item} key={index} deleteHardwareAction={deleteHardwareFromList} projectName={props.projectName}/>;
        })
    }

    return (
        <Fragment>
            <div className='hardware__container'>
            {!hardwareState.error &&
                hardwareListContent
            }
            {hardwareState.error &&
                <ErrorMessage text={hardwareState.error} />
            }
            </div>
        </Fragment>
    )
}


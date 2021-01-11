import React, { FC, Fragment, useContext } from 'react';
import { HardwareItem } from '../HardwareItem/HardwareItem';
import { HardwareContext } from '../../../store/HardwareContext';
import { Spinner } from '../../UI/Spinner/Spinner';
import { ErrorMessage } from '../../UI/ErrorMessage/ErrorMessage';
import { IHardwareListProps } from './Types';
import './HardwareList.scss';

export const HardwareList: FC<IHardwareListProps> = (props: IHardwareListProps) => {
    let hardwareListContent = null;

    const { deleteHardware, hardwareState } = useContext(HardwareContext);

    const deleteHardwareFromList = (serialNumber: string) => {
        deleteHardware!(serialNumber);
    };

    if (!props.hardwareList.length) {
        return <Fragment/>;
    }

    if (hardwareState.isLoading) {
        hardwareListContent = <Spinner />;
    } else {
        hardwareListContent = props.hardwareList.map((item, index) => {
            if (!item) {
                return <Fragment key={index}/>;
            }
            return <HardwareItem hardware={item} key={index} deleteHardwareAction={deleteHardwareFromList}/>;
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
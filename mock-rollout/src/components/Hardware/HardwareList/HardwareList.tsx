import React, { FC, Fragment, useContext } from 'react';
import { HardwareItem } from '../HardwareItem/HardwareItem';
import { HardwareContext } from '../../../store/HardwareContext';
import { IHardwareListProps } from './Types';
import './HardwareList.scss';

export const HardwareList: FC<IHardwareListProps> = (props: IHardwareListProps) => {
    const { deleteHardware } = useContext(HardwareContext);

    const deleteHardwareFromList = (serialNumber: string) => {
        deleteHardware!(serialNumber);
    };

    if (!props.hardwareList.length) {
        return <Fragment/>
    }

    return (
        <Fragment>
            <div className='hardware__container'>
                {props.hardwareList.map((item, index) => {
                    if (!item) {
                        return <Fragment key={index}/>
                    }
                    return <HardwareItem hardware={item} key={index} deleteHardwareAction={deleteHardwareFromList}/>
                })}
            </div>
        </Fragment>
    )
}
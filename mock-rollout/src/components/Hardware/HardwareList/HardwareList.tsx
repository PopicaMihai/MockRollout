import React, { FC, Fragment, useContext } from 'react';
import { HardwareItem } from '../HardwareItem/HardwareItem';
import './HardwareList.scss';
import { IHardwareListProps } from './Types';
import { HardwareContext } from '../../../store/HardwareContext';

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
                    return <HardwareItem hardware={item} key={index} deleteHardwareProps={deleteHardwareFromList}/>
                })}
            </div>
        </Fragment>
    )
}
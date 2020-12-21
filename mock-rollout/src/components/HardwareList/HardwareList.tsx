import React, { FC, Fragment, useCallback, useContext } from 'react';
import { HardwareItem } from '../HardwareItem/HardwareItem';
import './HardwareList.scss'
import { IHardwareListProps } from './Types/HardwareListProps';

export const HardwareList: FC<IHardwareListProps> =  ({hardware}) => {
    
    return (
        <Fragment>
            <div className='hardware__container'>
                {hardware.map((item, index) => (
                    <HardwareItem hardware={item} key={index} index={index}/>
                ))}
            </div>
        </Fragment>
    )
}
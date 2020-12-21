import React, { useContext } from 'react';
import { HardwareList } from '../../components/HardwareList/HardwareList';
import { HardwareContext } from '../../store/HardwareContext';
import '../dashboard/Dashboard.scss';

export const Dashboard = () => {
    const { hardwares, error } = useContext(HardwareContext)

    return (
        <div className='dasboard__container'>
            {hardwares! && !error && <HardwareList hardware={hardwares!}/>}
        </div>
    )
}

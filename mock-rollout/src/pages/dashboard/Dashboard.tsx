import React, { useContext } from 'react';
import { HardwareList } from '../../components/HardwareList/HardwareList';
import { HardwareContext } from '../../store/HardwareContext';
import '../dashboard/Dashboard.scss';

export const Dashboard = () => {
    const allHardware = useContext(HardwareContext).state.hardwares;
    const errorMessage = useContext(HardwareContext).state.error;

    return (
        <div className='dasboard__container'>
            {allHardware! && !errorMessage && <HardwareList hardware={allHardware!}/>}
        </div>
    )
}

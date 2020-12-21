import React, { useContext } from 'react';
import { HardwareList } from '../../components/HardwareList/HardwareList';
import { HardwareContext } from '../../store/HardwareContext';
import '../dashboard/Dashboard.scss';

export const Dashboard = () => {
    const { hardwareState } = useContext(HardwareContext)

    return (
        <div className='dasboard__container'>
            {hardwareState?.hardwares && !hardwareState?.error && <HardwareList hardware={hardwareState.hardwares}/>}
        </div>
    )
}

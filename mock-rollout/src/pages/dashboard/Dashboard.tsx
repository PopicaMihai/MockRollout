import React, { useContext } from 'react';
import { HardwareList } from '../../components/Hardware/HardwareList/HardwareList';
import { HardwareContext } from '../../store/HardwareContext';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import '../dashboard/Dashboard.scss';

export const Dashboard = () => {
    let dashboardContent = null;

    const { hardwareState } = useContext(HardwareContext);

    if (hardwareState.isLoading) {
        dashboardContent = <Spinner />
    } else {
        dashboardContent = hardwareState?.hardwares && <HardwareList hardwareList={hardwareState.hardwares} />
    }

    return (
        <div className='dasboard__container'>
            {!hardwareState.error &&
                dashboardContent
            }
            {hardwareState.error &&
                <ErrorMessage text={hardwareState.error} />
            }
        </div>
    )
}
import React, { FC } from 'react';
import { IEditTextProps } from '../../interfaces/EditTextProps';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { hardwareTypes } from '../../constants/hardware-types';
import { CardHeader } from '@progress/kendo-react-layout';

export const EditTextDropdown: FC<IEditTextProps> = ({editMode, currentHardware, updatedHardware, name, changeHandler }) => {

    if (editMode) {
        return (
            <DropDownList className ='hardware__title' defaultItem={currentHardware} data={hardwareTypes} defaultValue={updatedHardware} onChange={changeHandler} name={name}/>
        )
    } else {
        return (
            <CardHeader>{currentHardware}</CardHeader>
        )
    } 
}


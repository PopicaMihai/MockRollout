import React, { FC } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { IEditTextProps } from '../../interfaces/EditTextProps';

export const EditInputText: FC<IEditTextProps> = ({editMode, currentHardware, updatedHardware, name, changeHandler }) => {

    if (editMode) {
        return (
            <Input defaultValue={updatedHardware} onChange={changeHandler} name={name}/>
        )
    } else {
        return (
            <p>{currentHardware}</p>
        )
    } 
}


import React, { FC } from 'react';
import { TextArea } from '@progress/kendo-react-inputs';
import { IEditTextProps } from '../../interfaces/EditTextProps';

export const EditTextArea: FC<IEditTextProps> = ({editMode, currentHardware, updatedHardware, name, changeHandler }) => {

    if (editMode) {
        return (
            <TextArea style={{display: 'block', width:'90%'}} rows={2} disabled={false} defaultValue={updatedHardware} onChange={changeHandler} name={name}/>
        )
    } else {
        return (
            <p>{currentHardware}</p>
        )
    } 
}


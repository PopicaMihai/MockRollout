import React, { FC, Fragment } from 'react';
import { IEditTextProps } from './Types';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { InputTypes } from '../../../Enums/InputTypes';
import './InputText.scss';

export const InputText: FC<IEditTextProps> = ({ editMode, currentValue, updatedValue , name, changeHandler, type, data }) => {
    let element = null;

    if (editMode) {

        switch(type) {
            case (InputTypes.Input):
                element = <Input defaultValue={updatedValue} onChange={changeHandler} name={name}/>
                break;
            case (InputTypes.Textarea):
                element = <TextArea defaultValue={updatedValue} onChange={changeHandler} name={name} rows={2} disabled={false}/>
                break;
            case (InputTypes.Dropdown):
                element = <DropDownList defaultItem={currentValue} data={data} defaultValue={updatedValue} onChange={changeHandler} name={name}/>
                break;
            default: 
                element = <p>ERROR</p>
            }
            
    } else {
        element = <p>{currentValue}</p>
    }

    return (
        <Fragment>
            {element}
        </Fragment>
    )
}

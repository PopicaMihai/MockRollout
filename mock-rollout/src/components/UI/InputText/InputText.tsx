import React, { FC, Fragment } from 'react';
import { IEditTextProps } from './Types';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { InputTypes } from '../../../Enums/InputTypes';
import './InputText.scss';

export const InputText: FC<IEditTextProps> = (props: IEditTextProps) => {
    let element = null;

    if (props.editMode) {

        switch(props.type) {
            case (InputTypes.Input):
                element = <Input defaultValue={props.updatedValue} onChange={props.changeHandler} name={props.name}/>
                break;
            case (InputTypes.Textarea):
                element = <TextArea defaultValue={props.updatedValue} onChange={props.changeHandler} name={props.name} rows={2} disabled={false}/>
                break;
            case (InputTypes.Dropdown):
                element = <DropDownList defaultItem={props.currentValue} data={props.data} defaultValue={props.updatedValue} onChange={props.changeHandler} name={props.name}/>
                break;
            default: 
                element = <p>ERROR</p>
            }
            
    } else {
        element = <p>{props.currentValue}</p>
    }

    return (
        <Fragment>
            {element}
        </Fragment>
    )
}

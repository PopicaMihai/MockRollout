import { FC } from 'react';
import { Button } from '@progress/kendo-react-buttons';

import { ICustomButtonProps } from './Types';
import './CustomButton.scss';

export const CustomButton: FC<ICustomButtonProps> = (props: ICustomButtonProps) => {
    return (
        <Button togglable={true} icon={props.icon} onClick={props.buttonEvent}>{props.text}</Button>
    )
}

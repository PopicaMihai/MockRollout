import './CustomButton.scss';
import { FC } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { ICustomButtonProps } from './Types';

export const CustomButton: FC<ICustomButtonProps> = ({icon, buttonEvent, text}) => {
    return (
        <Button togglable={true} icon={icon} onClick={buttonEvent}>{text}</Button>
    )
}

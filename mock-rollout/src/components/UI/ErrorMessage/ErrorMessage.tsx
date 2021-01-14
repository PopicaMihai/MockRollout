import React, { FC } from 'react';
import { IErrorMessageProps } from './Types';
import './ErrorMessage.scss';

export const ErrorMessage: FC<IErrorMessageProps> = (props: IErrorMessageProps) => {
    return (
        <div className={'errorMessage'}>
            <h2>An error occured:</h2>
            <h1>{props.text}</h1>
        </div>
    )
};
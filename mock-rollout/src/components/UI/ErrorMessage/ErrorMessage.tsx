import React, { FC } from 'react';
import { ErrorMessageProps } from './Types';
import './ErrorMessage.scss';

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
    return (
        <div className={'errorMessage'}>
            <h2>An error occured:</h2>
            <h1>{props.text}</h1>
        </div>
    )
};
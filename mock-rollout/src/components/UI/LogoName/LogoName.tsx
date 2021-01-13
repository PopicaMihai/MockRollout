import React, { FC } from 'react';
import { ILogoNameProps } from './Types';

import './LogoName.scss';

export const LogoName: FC<ILogoNameProps> = (props: ILogoNameProps) => {
    const returnFirstTwoLetters = (name: string) => {
        return name.slice(0, 2);
    }

    return (
        <div className={'logoName'}>
            <p >{returnFirstTwoLetters(props.name)}</p>
        </div>
    )
};
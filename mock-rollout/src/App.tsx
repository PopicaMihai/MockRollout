/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { ProductsList } from './Products/ProductsList/ProductsList';

export const App: FC = () => {
  return (
    <div className="App">
        <ProductsList />
    </div>
  );

}
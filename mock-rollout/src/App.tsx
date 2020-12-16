/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { ProductsList } from './components/ProductsList/ProductsList';
import { ProductContextProvider } from './store/ProductContext';

export const App: FC = () => {
  return (
    <div className="App">
      <ProductContextProvider>
        <ProductsList />
      </ProductContextProvider>
    </div>
  );

}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { FC } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import { Dashboard } from './pages/dashboard/Dashboard';
import { HardwareContextProvider } from './store/HardwareContext';
import { APIContextProvider } from './store/ApiContext';

export const App: FC = () => {
  return (
    <div className="App">
      <APIContextProvider>
        <HardwareContextProvider>
          <Dashboard />
        </HardwareContextProvider>
      </APIContextProvider>
      
    </div>
  );
}
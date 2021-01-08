import React, { FC } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { HardwareContextProvider } from './store/HardwareContext';
import { APIContextProvider } from './store/ApiContext';
import { Dashboard } from './pages/dashboard/Dashboard';
import './App.css';

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
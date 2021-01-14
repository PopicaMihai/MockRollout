import React, { FC } from 'react';
import '@progress/kendo-theme-default/dist/all.css';

import { ProjectContextProvider } from './store/ProjectContext';
import { APIContextProvider } from './store/ApiContext';
import { ProjectPage } from './pages/Project/ProjectPage';
import './App.css';

export const App: FC = () => {
  return (
    <div className="App">
      <APIContextProvider>
        <ProjectContextProvider>
          <ProjectPage />
        </ProjectContextProvider>
      </APIContextProvider>
    </div>
  );
}
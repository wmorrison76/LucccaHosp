import React, { createContext, useContext, useState } from 'react';

interface AppData {
  recipes: any[];
  collections: any[];
}

interface AppDataContextType {
  appData: AppData;
  setAppData: (data: AppData) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [appData, setAppData] = useState<AppData>({
    recipes: [],
    collections: [],
  });

  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}

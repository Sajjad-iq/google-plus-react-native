import { Colors } from '@/constants/Colors';
import { getCurrentLayoutDirection } from '@/utils/getCurrentLayoutDirection';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
    headerTitle: string;
    setHeaderTitle: (title: string) => void;
    headerColor: string;
    setHeaderColor: (color: string) => void;
    currentLayoutDirection: string;
    setCurrentLayoutDirection: (locale: string) => void;
}

const GlobalContext = createContext<HeaderContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerTitle, setHeaderTitle] = useState<string>("Home");
    const [headerColor, setHeaderColor] = useState<string>(Colors.redPrimary);
    const [currentLayoutDirection, setCurrentLayoutDirection] = useState<string>('ltr');

    // update current layout direction
    getCurrentLayoutDirection(setCurrentLayoutDirection)

    return ( // 
        <GlobalContext.Provider value={
            {
                headerTitle, setHeaderTitle,
                headerColor, setHeaderColor,
                currentLayoutDirection, setCurrentLayoutDirection
            }
        }>
            {children}
        </GlobalContext.Provider>
    );
};

export const useHeader = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useHeader must be used within a GlobalDataProvider');
    }
    return context;
};


export const useLayoutDirection = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useHeader must be used within a GlobalDataProvider');
    }
    return context;
};


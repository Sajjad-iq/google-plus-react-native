import { Colors } from '@/constants/Colors';
import { UserInfo } from '@/types/user';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
    headerTitle: string;
    setHeaderTitle: (title: string) => void;
    headerColor: string;
    setHeaderColor: (color: string) => void
    userInfo: UserInfo | null
    setUserInfo: (data: UserInfo) => void
}

const GlobalContext = createContext<HeaderContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerTitle, setHeaderTitle] = useState<string>("Home");
    const [headerColor, setHeaderColor] = useState<string>(Colors.redPrimary);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);



    return ( // 
        <GlobalContext.Provider value={
            {
                headerTitle, setHeaderTitle,
                headerColor, setHeaderColor,
                userInfo, setUserInfo
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


export const useGlobalData = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useHeader must be used within a GlobalDataProvider');
    }
    return context;
};







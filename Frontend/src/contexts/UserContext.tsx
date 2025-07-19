import React, { createContext, useContext, useState } from 'react';

interface HealthData {
  mood: string;
  severity: number;
  duration: string;
  description: string;
  files: File[];
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  healthData: HealthData;
  setHealthData: (data: HealthData) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState<HealthData>({
    mood: '',
    severity: 1,
    duration: '',
    description: '',
    files: []
  });
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      healthData,
      setHealthData,
      chatHistory,
      addChatMessage,
      clearChatHistory
    }}>
      {children}
    </UserContext.Provider>
  );
};
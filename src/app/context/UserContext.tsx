'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  profileImage: string;
  setProfileImage: (url: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children, initialImage }: { children: ReactNode; initialImage: string }) {
  const [profileImage, setProfileImage] = useState(initialImage);
  return (
    <UserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
}
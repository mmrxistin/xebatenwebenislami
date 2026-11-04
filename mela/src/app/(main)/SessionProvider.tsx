// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";

import { Session, User } from "lucia";
import React, { createContext, useContext } from "react";

// Sunucudan gelen oturum; giriş yoksa null olur.
type SessionContext = { user: User; session: Session } | null;

const SessionContext = createContext<SessionContext>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

// Oturum yoksa null döner; bileşenler `useSession()?.user` ile güvenle kullanır.
export function useSession() {
  return useContext(SessionContext);
}

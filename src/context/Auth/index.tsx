import { createContext } from "react";
import { useAuthenticate } from "../../hooks/useAthenticate";
import { Authenticate } from "../../@types/AuthUser";

interface AuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as Authenticate);

export function AuthProvider({ children }: AuthProvider) {
  const {
    signInUserWithEmailAndPassword,
    signUpUserWithEmailAndPassword,
    updateUserById,
    signOut,
    authUser,
    loadingAuthUser,
  } = useAuthenticate();

  return (
    <AuthContext.Provider
      value={{
        signInUserWithEmailAndPassword,
        signUpUserWithEmailAndPassword,
        updateUserById,
        signOut,
        authUser,
        loadingAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

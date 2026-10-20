import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthContextValue = {
  session: Session | null;
  cargando: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  cargando: true,
  error: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authEventReceived = useRef(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nuevaSesion) => {
      authEventReceived.current = true;
      setSession(nuevaSesion);
      setError(null);
      setCargando(false);
    });

    void supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (authEventReceived.current) {
          return;
        }

        if (sessionError) {
          setError(sessionError.message);
        } else {
          setSession(data.session);
        }

        setCargando(false);
      })
      .catch((sessionError: unknown) => {
        if (authEventReceived.current) {
          return;
        }

        setError(
          sessionError instanceof Error
            ? sessionError.message
            : "Ocurrió un error inesperado al consultar la sesión."
        );
        setCargando(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, cargando, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

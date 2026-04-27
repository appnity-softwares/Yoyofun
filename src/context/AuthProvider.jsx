import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { authService } from "../services/authService";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => authService.hasToken());

  const clearSession = useCallback(() => {
    setUser(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadAdmin() {
      if (!authService.hasToken()) {
        if (isActive) {
          setLoading(false);
        }
        return;
      }
      try {
        const admin = await authService.me();
        if (isActive) {
          setUser(admin);
        }
      } catch {
        if (isActive) {
          setUser(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadAdmin();
    window.addEventListener("yoyo-admin-unauthorized", clearSession);
    return () => {
      isActive = false;
      window.removeEventListener("yoyo-admin-unauthorized", clearSession);
    };
  }, [clearSession]);

  const login = useCallback(async (credentials) => {
    const admin = await authService.login(credentials);
    setUser(admin);
    return admin;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: Boolean(user) }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

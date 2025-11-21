
"use client";

import { useState, useEffect } from 'react';

// Definimos la interfaz aquí para que el hook sepa qué tipo de datos maneja
interface UserProfile {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Hook personalizado para obtener los datos del perfil del usuario.
 * Maneja los estados de 'loading', 'error' y 'data'.
 */
export const useUserProfile = () => {
  const [usuario, setUsuario] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        // Esta página ya está protegida por PanelGuard en el layout,
        // así que esta llamada a la API debería funcionar.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/perfil`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('No se pudo cargar el perfil del usuario');
        }

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // El hook devuelve el estado para que el componente lo consuma
  return { usuario, loading, error };
};
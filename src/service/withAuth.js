"use client"; // Este componente DEBE ser un Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// --- 1. IMPORTAMOS TU LOADER ---
import { LoaderOne } from "@/components/ui/loader"; // Asumo esta ruta

/**
 * Este componente protege un 'layout'.
 * Comprueba si el usuario está autenticado ANTES de renderizar el contenido (children).
 */
export default function PanelGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Intentamos obtener el perfil del usuario desde el backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/perfil`, {
          method: 'GET',
          credentials: 'include', // ¡Esencial para enviar la cookie!
        });

        if (res.ok) {
          // 2. Si res.ok, el usuario está autenticado
          setIsAuthenticated(true);
        } else {
          // 3. Si no, lo redirigimos al login
          router.push('/'); // Asume que tu login está en /login
        }
      } catch (error) {
        // 4. Si hay un error (ej. backend caído), al login
        console.error('Error de autenticación:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // --- Renderizado ---

  // 1. Mientras comprobamos, muestra tu componente LoaderOne
  if (loading) {
    // --- 2. REEMPLAZAMOS EL TEXTO CON EL LOADER ---
    // (Lo centramos para que se vea bien en el layout)
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <LoaderOne />
      </div>
    );
  }

  // 2. Si está autenticado, muestra el contenido (la página)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // 3. Si no está autenticado, no muestra nada
  // (el 'router.push' ya se está encargando de la redirección)
  return null;
}
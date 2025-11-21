"use client";

// Importamos 'useState' para el estado de carga y 'useRouter' para redirigir
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { LoaderOne } from "@/components/ui/loader"; // Importa tu loader
import { useUserProfile } from '@/service/hooks/useUserProfile'; // Importa tu hook

// --- 1. IMPORTAMOS EL SERVICIO DE AUTH ---
import * as authService from '@/service/authService';

export default function PerfilPage() {
  
  // --- 2. OBTENEMOS EL ROUTER Y EL ESTADO DE CARGA ---
  const { usuario, loading, error } = useUserProfile();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // --- 3. CREAMOS LA FUNCIÓN DE LOGOUT ---
  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await authService.logout();
    
    if (result.success) {
      // Si el logout es exitoso, redirigimos al login
      router.push('/');
    } else {
      // Si falla, mostramos un error
      alert(result.error || 'No se pudo cerrar la sesión');
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Mi Perfil
        </h1>
        
        {loading && (
          <div className="flex h-full w-full items-center justify-center">
            <LoaderOne />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {usuario && !loading && (
          <div className="text-black dark:text-white">
            <p className="text-lg"><strong>Nombre:</strong> {usuario.name || 'No especificado'}</p>
            <p className="text-lg"><strong>Email:</strong> {usuario.email}</p>
            <p className="text-lg"><strong>ID de Usuario:</strong> {usuario.id}</p>
            <p className="text-lg"><strong>Miembro desde:</strong> {new Date(usuario.createdAt).toLocaleDateString()}</p>
            
            {/* --- 4. AÑADIMOS EL BOTÓN --- */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="mt-10 max-w-xs justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
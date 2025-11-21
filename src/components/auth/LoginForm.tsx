"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as authService from "@/service/authService";

// 1. IMPORTAMOS EL LOADER (y quitamos StatefulButton)
import { LoaderOne } from "@/components/ui/loader";

// 5. Componente del Formulario de Login
const LoginForm = () => {
  // Obtiene la instancia del enrutador
  const router = useRouter();

  // --- LÓGICA IMPLEMENTADA ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Mantenemos isLoading para deshabilitar los inputs,
  // pero el botón se gestionará a sí mismo.
  const [isLoading, setIsLoading] = useState(false);

  // Esta función maneja el envío del formulario
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // El 'e' puede venir del 'onSubmit' del form (Enter key)
    if (e) {
      e.preventDefault(); // Previene que la página se recargue
    }

    setIsLoading(true);
    setError("");

    try {
      // 1. Usamos el servicio de autenticación
      // Hacemos 'return' de la promesa para que el StatefulButton
      // sepa cuánto tiempo debe durar el estado de carga.
      const result = await authService.login(email, password);

      if (result.success) {
        console.log("Inicio de sesión exitoso:", result.data);
        router.push("/dashboard"); // Redirige al dashboard
      } else {
        setError(result.error || "Error desconocido"); // Muestra el error del backend
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      // 2. Pase lo que pase, dejamos de cargar
      setIsLoading(false);
    }
  };

  return (
    // Agregamos el 'onSubmit' al formulario para manejar la tecla "Enter"
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email-login"
          className="block text-sm font-medium text-gray-700 dark:text-neutral-300"
        >
          Email
        </label>

        <input
          id="email-login"
          name="email"
          type="email"
          required
          value={email} // Controlado por el estado
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
          disabled={isLoading} // Deshabilitado durante la carga
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="password-login"
          className="block text-sm font-medium text-gray-700 dark:text-neutral-300"
        >
          Contraseña
        </label>
        <input
          id="password-login"
          name="password"
          type="password"
          required
          value={password} // Controlado por el estado
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
          disabled={isLoading} // Deshabilitado durante la carga
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          placeholder="••••••••"
        />
      </div>
      {/* Muestra de error */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {/* 3. REEMPLAZAMOS EL BOTÓN */}
      {/* 2. VOLVEMOS AL BOTÓN ESTÁNDAR */}
      <button
        type="submit" // El tipo 'submit' llamará a 'handleSubmit'
        className="mt-10 w-full flex justify-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={isLoading} // Deshabilitado durante la carga
      >
{/* 3. USAMOS EL LOADERONE EN LUGAR DEL TEXTO */}
        {isLoading ? (
          <div className="scale-75"> {/* <-- ¡AQUÍ ESTÁ EL CAMBIO! */}
            <LoaderOne />
          </div>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
};

export default LoginForm;

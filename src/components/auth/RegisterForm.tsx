"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as authService from "@/service/authService";
// 1. IMPORTAMOS EL BOTÓN 'STATEFUL'
import { Button } from "@/components/ui/stateful-button";

// 6. Componente del Formulario de Registro
const RegisterForm = () => {
  // Obtiene la instancia del enrutador
  const router = useRouter();

  // --- LÓGICA IMPLEMENTADA ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Esta función maneja el envío del formulario

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Previene que la página se recargue
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Usamos el servicio de autenticación
    const result = await authService.register(name, email, password);

    setIsLoading(false);

    if (result.success) {
      setSuccess("¡Registro exitoso! Serás redirigido al login.");
      // Opcional: redirige al login después de unos segundos
      setTimeout(() => {
        window.location.reload(); // Recarga para cambiar al tab de login
      }, 2000);
    } else {
      setError(result.error || "Error desconocido"); // Muestra el error del backend
    }
  };

  return (
    // Agregamos el 'onSubmit' al formulario
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name-register"
          className="block text-sm font-medium text-gray-700 dark:text-neutral-300"
        >
          Nombre
        </label>

        <input
          id="name-register"
          name="name"
          type="text"
          required
          value={name} // Controlado por el estado
          onChange={(e) => setName(e.target.value)} // Actualiza el estado
          disabled={isLoading} // Deshabilitado durante la carga
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          placeholder="Tu Nombre"
        />
      </div>

      <div>
        <label
          htmlFor="email-register"
          className="block text-sm font-medium text-gray-700 dark:text-neutral-300"
        >
          Email
        </label>

        <input
          id="email-register"
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
          htmlFor="password-register"
          className="block text-sm font-medium text-gray-700 dark:text-neutral-300"
        >
          Contraseña
        </label>

        <input
          id="password-register"
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
      {/* Muestra de error o éxito */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      {/* 3. REEMPLAZAMOS EL BOTÓN */}
      <Button
        // El 'onClick' ahora es nuestro 'handleSubmit'
        // Como 'handleSubmit' es 'async', automáticamente devuelve una promesa,
        // que es lo que 'StatefulButton' necesita.
        onClick={handleSubmit}
        // Le aplicamos las mismas clases de estilo que tenía el botón anterior
        className="mt-10 w-full justify-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Entrar
      </Button>
    </form>
  );
};

export default RegisterForm;

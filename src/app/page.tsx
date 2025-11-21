"use client";

// 1. Importa el componente Tabs que instalaste
import { Tabs } from "@/components/ui/tabs";

// --- IMPORTAMOS LOS NUEVOS COMPONENTES ---
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
// Ya no necesitamos 'useState' o 'authService' aquí

// 2. Esta es tu página principal de Login
export default function LoginPage() {
  // 3. Definimos los tabs: "Iniciar Sesión" y "Registrarse"
  const tabs = [
    {
      title: "Iniciar Sesión",
      value: "login",
      // Contenido del primer tab
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-black bg-white dark:bg-neutral-900 dark:text-white">
          {" "}
          <h2 className="text-2xl font-bold text-center mb-6">
            {" "}
            Bienvenido de Nuevo{" "}
          </h2>
          {/* Usamos el componente importado */}
          <LoginForm />{" "}
        </div>
      ),
    },
    {
      title: "Registrarse",
      value: "register",
      // Contenido del segundo tab
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-black bg-white dark:bg-neutral-900 dark:text-white">
          {" "}
          <h2 className="text-2xl font-bold text-center mb-6">
            {" "}
            Crear una Cuenta{" "}
          </h2>
          {/* Usamos el componente importado */}
          <RegisterForm />{" "}
        </div>
      ),
    },
  ]; // 4. Este es el 'cascarón' de la página

  return (
    // Centra el componente de Tabs en la pantalla
    <div className="h-130 flex items-center justify-center bg-gray-100 dark:bg-neutral-800 ">
      <div className="h-[30rem] md:h-[30rem] [perspective:1000px] relative b flex flex-col max-w-lg mx-auto w-full items-start justify-start">
        {/* ¡AQUÍ ESTÁ LA CORRECCIÓN! 
           Añadimos 'contentClassName="mt-4"' para reducir el espacio.
           Puedes cambiar 'mt-4' por 'mt-2' o 'mt-0' si quieres aún menos espacio.
         */}
        <Tabs tabs={tabs} contentClassName="mt-20" />
      </div>
    </div>
  );
}

// 5. Ya no definimos LoginForm aquí

// 6. Ya no definimos RegisterForm aquí
"use client";
import React, { useState } from "react";
// Importa el Sidebar de tu componente de UI
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
// Importa los iconos que usarás en tus enlaces
import {
  IconBrandTabler,
  IconShoppingCart,
  IconUsers,
  IconPackage, // Asegúrate de importar cualquier otro icono que necesites (ej. Settings, Logout) // IconSettings, // IconArrowLeft,
} from "@tabler/icons-react";
// Importa 'framer-motion' para las animaciones
import { motion } from "framer-motion";
// Importa 'Image' de Next.js para tus logos
import Image from "next/image";
// Importa la utilidad 'cn' para las clases
import { cn } from "@/lib/utils";

// --- 1. IMPORTA TU GUARDIA ---
import PanelGuard from "@/service/withAuth"; // Ajusta la ruta si es necesario

/**
 * Este es el "esqueleto" de tu panel de administración.
 * Acepta 'children', que será el componente de la página activa
 * (ej. DashboardPage, ProductosPage, etc.).
 */
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define los enlaces que aparecerán en el sidebar
  const links = [
    // ... (el resto de tu componente 'links' no cambia) ...
    {
      label: "Dashboard",
      href: "/dashboard", // Apunta a la raíz del grupo (panel)
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-black" />,
    },
    {
      label: "Productos",
      href: "/productos", // Apunta a /productos
      icon: <IconPackage className="h-5 w-5 shrink-0 text-black" />,
    },
    {
      label: "Pedidos",
      href: "/pedidos", // Apunta a /pedidos
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-black" />,
    },
    {
      label: "Clientes",
      href: "/clientes", // Apunta a /clientes
      icon: <IconUsers className="h-5 w-5 shrink-0 text-black" />,
    }, // { //   label: "Ajustes", //   href: "/ajustes", //   icon: <IconSettings className="h-5 w-5 shrink-0 text-black" />, // },
  ]; // Estado para controlar si el sidebar está abierto o cerrado

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        // ... (el resto de tu 'div' principal no cambia) ...
        " flex w-full flex-1 flex-col overflow-hidden  bg-yellow-500 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen" // Ocupa toda la altura de la pantalla
      )}
    >
      {/* El componente Sidebar (que tiene su propio fondo amarillo) */}

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          {/* Parte superior del Sidebar: Logos y Links */}

          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">

            {/* Muestra el logo correspondiente si está abierto o cerrado */}
            {open ? <Logo /> : <LogoIcon />}
            {/* Lista de enlaces de navegación */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* Parte inferior del Sidebar: Perfil de usuario */}
          <div>
            <SidebarLink
              link={{
                label: "Mi Perfil", // Puedes cambiar esto
                href: "/perfil",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png" // Reemplaza con tu imagen de avatar
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* AQUÍ ESTÁ LA MAGIA: 
        'children' es el componente de la página que se está visitando.
        Next.js lo intercambiará automáticamente (Dashboard, Productos, etc.)
      */}

      <main className={cn(
        // ... (el resto de tu 'div' principal no cambia) ...
        " flex w-full flex-1 flex-col overflow-hidden rounded-tl-2xl rounded-bl-2xl  bg-white md:flex-row  dark:bg-neutral-800",
        "h-screen" // Ocupa toda la altura de la pantalla
      )}>
        {/* --- 2. ENVUELVE A 'children' CON EL GUARDIA --- */}
        {/* PanelGuard comprobará la sesión. 
          Si es exitosa, renderizará {children}.
          Si falla, redirigirá a /login.
        */}
        <PanelGuard>{children}</PanelGuard>
      </main>
    </div>
  );
}

// ---- Componentes de Logo (viven en el Layout) ----
// ... (tus componentes Logo y LogoIcon no cambian) ...
/**
 * Componente para el Logo cuando el sidebar está EXPANDIDO.
 * Muestra el ícono y el nombre animado.
 */
export const Logo = () => {
  return (
    <a
      href="/dashboard" // El logo también debería llevar al Dashboard
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo-tienda-1.png" // Logo-ícono
        alt="Logo de Mi Tienda"
        width={200}
        height={200}
        className="h-12 w-12 object-contain"
        priority // Ayuda a que cargue más rápido
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black"
      >
        <Image
          src="/logo-nombre.png" // Logo-nombre
          alt="Nombre completo de la tienda"
          width={300}
          height={100}
          className="h-8 w-auto object-contain"
          priority
        />
      </motion.span>
    </a>
  );
};

/**
 * Componente para el Logo cuando el sidebar está COLAPSADO.
 * Muestra solo el ícono.
 */
export const LogoIcon = () => {
  return (
    <a
      href="" // El logo también debería llevar al Dashboard
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo-tienda-2.png" // Logo-ícono (puede ser el mismo que el otro)
        alt="Logo de Mi Tienda"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        priority
      />
    </a>
  );
};

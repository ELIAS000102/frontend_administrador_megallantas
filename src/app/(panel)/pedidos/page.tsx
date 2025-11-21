"use client";

// Esta es la página simple para tus pedidos.
// Se renderizará dentro de tu 'layout.tsx' (el que tiene el sidebar).

export default function PedidosPage() {
  return (
    <div className="flex flex-1">
      {/* Este 'div' es el contenedor principal del contenido */}
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border-l border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Administrar Pedidos
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Revisa y gestiona todos los pedidos de tus clientes.
            </p>
          </div>
          {/* Aquí podrías poner un botón para filtrar o exportar */}
          <button className="rounded-lg bg-gray-200 px-4 py-2 text-black hover:bg-gray-300">
            Exportar
          </button>
        </div>

        {/* Contenido de la página (ej. la tabla de pedidos iría aquí) */}
        <div className="mt-4">
          <p className="text-black dark:text-white">
            (Aquí es donde colocarás tu tabla de pedidos, filtros de estado, etc.)
          </p>
        </div>

      </div>
    </div>
  );
}
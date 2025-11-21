"use client";

// Este es el componente de contenido para tu Dashboard
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      {/* Este div es el contenedor de tu contenido. 
        El 'bg-white' le da el fondo blanco que se distingue del sidebar.
        El 'border-l' (borde izquierdo) crea la línea divisoria.
      */}
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="text-black dark:text-white">
          Bienvenido al panel de administración. Aquí irá el resumen de tu tienda.
        </p>

        {/* --- Aquí puedes empezar a poner el contenido de tu Dashboard --- */}
        {/* Por ejemplo, unas tarjetas de resumen (KPIs) */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-800">
            <h3 className="text-lg font-semibold text-black dark:text-white">Ventas de Hoy</h3>
            <p className="text-2xl font-bold text-black dark:text-white">S/ 1,200.00</p>
          </div>
          <div className="rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-800">
            <h3 className="text-lg font-semibold text-black dark:text-white">Pedidos Nuevos</h3>
            <p className="text-2xl font-bold text-black dark:text-white">15</p>
          </div>
          <div className="rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-800">
            <h3 className="text-lg font-semibold text-black dark:text-white">Nuevos Clientes</h3>
            <p className="text-2xl font-bold text-black dark:text-white">8</p>
          </div>
          <div className="rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-800">
            <h3 className="text-lg font-semibold text-black dark:text-white">Productos sin Stock</h3>
            <p className="text-2xl font-bold text-red-500">2</p>
          </div>
        </div>
        {/* --- Fin del contenido del Dashboard --- */}

      </div>
    </div>
  );
};

// La página (/) ahora simplemente exporta el componente Dashboard
export default function DashboardPage() {
  return <Dashboard />;
}
// src/app/page.tsx
import SalesChart from "@/components/SalesChart"; // Ajusta la ruta si es necesario

export default function Home() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aquí insertamos el componente */}
        <SalesChart />
        
        {/* Espacio para otro componente futuro */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 h-[450px] flex items-center justify-center text-gray-400">
            Otro gráfico aquí
        </div>
      </div>
    </main>
  );
}
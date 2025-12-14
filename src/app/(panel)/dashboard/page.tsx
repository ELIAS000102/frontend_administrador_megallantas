"use client";

import React, { useState, useEffect } from "react";
import { 
  IconTrendingUp, 
  IconPackage, 
  IconAlertTriangle, 
  IconUsers,
  IconCurrencySom
} from "@tabler/icons-react";
// Importamos el servicio existente
import { getDashboardSummary } from "@/service/dashboardService";

// --- NUEVO: Importamos el Modal que creaste ---
import { RestockModal } from "@/components/RestockModal";

interface DashboardData {
  kpis: {
    ingresos: number;
    pedidosActivos: number;
    clientes: number;
    stockCritico: number;
  };
  topProductos: {
    id: number;
    nombre: string;
    vendidos: number;
    imagenUrl: string;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // --- NUEVO: Estado para abrir/cerrar el modal ---
  const [showRestockModal, setShowRestockModal] = useState(false);

  // --- HISTORIA DE USUARIO 1: CARGA INICIAL ---
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await getDashboardSummary();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-neutral-950">
         <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
            <p className="text-gray-400 font-medium">Calculando métricas del negocio...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-gray-50 dark:bg-neutral-950 h-full overflow-hidden">
      <div className="flex h-full w-full flex-1 flex-col rounded-tl-3xl border-l border-neutral-200 bg-gray-50/30 dark:border-neutral-800 dark:bg-neutral-950 overflow-y-auto scroll-smooth">
        
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8 pb-20">
          
          {/* Encabezado */}
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Panel de Control
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
              Resumen en tiempo real de operaciones y rendimiento.
            </p>
          </div>

          {/* ----------------------------------------------------------
              BLOQUE DE ALERTA DE STOCK (NUEVO)
              Se muestra solo si hay stock crítico (> 0)
             ---------------------------------------------------------- */}
          {data?.kpis.stockCritico && data.kpis.stockCritico > 0 ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm flex flex-col sm:flex-row justify-between items-center animate-pulse">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <IconAlertTriangle className="text-red-600" size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg">¡Atención requerida en Inventario!</h3>
                  <p className="text-red-600">
                    Se han detectado <span className="font-bold">{data.kpis.stockCritico} productos</span> con stock crítico.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowRestockModal(true)} // Abre el modal
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all transform hover:scale-105"
              >
                Gestionar Reposición
              </button>
            </div>
          ) : null}

          {/* KPI CARDS (DATOS REALES DEL BACKEND) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KPI 1: Ingresos */}
            <KpiCard 
              title="Ingresos Totales" 
              value={`S/ ${(data?.kpis.ingresos || 0).toLocaleString()}`} 
              icon={<IconCurrencySom size={24} className="text-green-600 dark:text-green-400" />}
              color="bg-green-50 dark:bg-green-900/20"
            />

            {/* KPI 2: Pedidos Activos */}
            <KpiCard 
              title="Pedidos en Proceso" 
              value={data?.kpis.pedidosActivos || 0} 
              icon={<IconPackage size={24} className="text-blue-600 dark:text-blue-400" />}
              color="bg-blue-50 dark:bg-blue-900/20"
            />
            
            {/* KPI 3: Clientes */}
            <KpiCard 
              title="Clientes Registrados" 
              value={data?.kpis.clientes || 0} 
              icon={<IconUsers size={24} className="text-purple-600 dark:text-purple-400" />}
              color="bg-purple-50 dark:bg-purple-900/20"
            />

            {/* KPI 4: Alerta Stock (Visualización pequeña) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${data?.kpis.stockCritico && data.kpis.stockCritico > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-neutral-800'}`}>
                        <IconAlertTriangle size={24} className={data?.kpis.stockCritico && data.kpis.stockCritico > 0 ? 'text-red-600' : 'text-gray-400'} />
                    </div>
                    {data?.kpis.stockCritico && data.kpis.stockCritico > 0 && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">¡ALERTA!</span>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Crítico</p>
                    <h3 className={`text-2xl font-extrabold mt-1 ${data?.kpis.stockCritico && data.kpis.stockCritico > 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                        {data?.kpis.stockCritico || 0}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Productos con bajo inventario</p>
                </div>
            </div>
          </div>

          {/* LISTA DE TOP PRODUCTOS */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-6">Productos Más Vendidos</h3>
            <div className="space-y-4">
                {data?.topProductos.map((prod) => (
                    <div key={prod.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-xl transition-colors">
                        <img 
                            src={prod.imagenUrl || "https://images.unsplash.com/photo-1578844251758-2f71da645217?auto=format&fit=crop&q=80&w=200"} 
                            alt={prod.nombre} 
                            className="h-12 w-12 rounded-lg object-cover bg-gray-100" 
                        />
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{prod.nombre}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{prod.vendidos} v.</span>
                            </div>
                            {/* Barra de progreso visual simple */}
                            <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-2">
                                <div className="bg-black dark:bg-white h-2 rounded-full" style={{ width: `${Math.min((prod.vendidos / 20) * 100, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {data?.topProductos.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">No hay datos de ventas aún.</p>
                )}
            </div>
          </div>

        </div>
      </div>

      {/* ----------------------------------------------------------
          MODAL DE REPOSICIÓN (NUEVO)
          Se coloca al final para que se superponga correctamente
         ---------------------------------------------------------- */}
      <RestockModal 
        isOpen={showRestockModal} 
        onClose={() => setShowRestockModal(false)} 
      />

    </div>
  );
}

// Subcomponente simple para KPIs (Sin cambios)
function KpiCard({ title, value, icon, color }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{value}</h3>
        </div>
    </div>
  );
}
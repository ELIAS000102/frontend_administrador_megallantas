// src/components/SalesChart.tsx
"use client"; // Obligatorio para gráficos en Next.js App Router

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchVentasPorAnio, VentaMensual } from '../service/salesService';

// Plantilla para asegurar que siempre mostramos los 12 meses
const MONTHS_TEMPLATE = [
  { name: 'Ene', monthIndex: 1, total: 0 },
  { name: 'Feb', monthIndex: 2, total: 0 },
  { name: 'Mar', monthIndex: 3, total: 0 },
  { name: 'Abr', monthIndex: 4, total: 0 },
  { name: 'May', monthIndex: 5, total: 0 },
  { name: 'Jun', monthIndex: 6, total: 0 },
  { name: 'Jul', monthIndex: 7, total: 0 },
  { name: 'Ago', monthIndex: 8, total: 0 },
  { name: 'Sep', monthIndex: 9, total: 0 },
  { name: 'Oct', monthIndex: 10, total: 0 },
  { name: 'Nov', monthIndex: 11, total: 0 },
  { name: 'Dic', monthIndex: 12, total: 0 },
];

export default function SalesChart() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [chartData, setChartData] = useState(MONTHS_TEMPLATE);
  const [loading, setLoading] = useState<boolean>(false);

  const availableYears = [2023, 2024, 2025];

  // Lógica para mezclar la plantilla con los datos reales
  const processData = (apiData: VentaMensual[]) => {
    // 1. Clonar plantilla
    const normalizedData = JSON.parse(JSON.stringify(MONTHS_TEMPLATE));

    // 2. Rellenar con datos de la API
    apiData.forEach((record) => {
      // Restamos 1 porque el array empieza en 0, pero los meses en 1
      const index = record.month - 1; 
      if (normalizedData[index]) {
        normalizedData[index].total = record.total;
      }
    });

    return normalizedData;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchVentasPorAnio(selectedYear);
        const processed = processData(data);
        setChartData(processed);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYear]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-lg font-bold text-gray-800">Ingresos por Periodo</h3>
            <p className="text-sm text-gray-500">Visualización mensual de ventas</p>
        </div>
        
        {/* Selector de Año */}
        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="h-[350px] w-full">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-400 animate-pulse">
            Cargando datos...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                formatter={(value: number) => [`S/. ${value}`, 'Ingresos']}
              />
              <Bar 
                dataKey="total" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
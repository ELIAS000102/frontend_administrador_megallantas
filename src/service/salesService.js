// src/service/salesService.ts

// Definimos la "forma" de los datos que esperamos del backend
export interface VentaMensual {
    month: number;
    total: number;
}

export const fetchVentasPorAnio = async (year: number): Promise<VentaMensual[]> => {
    // Simulamos un retardo de red como si fuera una API real
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`Petición al backend recibida para el año: ${year}`);

    // SIMULACIÓN DE DATOS (MOCK)
    // Esto es lo que reemplazarás luego con tu fetch real:
    // const res = await fetch(\`http://localhost:8080/api/dashboard/ventas?year=\${year}\`);
    // return res.json();

    if (year === 2025) {
        return [
            { month: 1, total: 1500 }, // Enero
            { month: 2, total: 2300 }, // Febrero
            { month: 3, total: 3200 }, // Marzo
        ];
    } else if (year === 2024) {
        return [
            { month: 5, total: 4000 },
            { month: 6, total: 4500 },
            { month: 11, total: 8000 },
            { month: 12, total: 9500 },
        ];
    }
    
    return []; // Si no hay datos
};